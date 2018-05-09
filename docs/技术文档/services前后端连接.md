# angularjs与express的整合
## 理论部分
前端向后端请求数据两种方法：
1. form表单
2. Ajax

因为Ajax异步执行，页面无需刷新所以现在很受欢迎。  
angularjs的$http模块对Ajax请求进行了很好的封装，常用的有`$http.get`，`$http.post`。但是业务逻辑和数据模板都放到controller的话controller就会很大，所以angularjs的controller就负责控制与页面相关层，service层负责大部分业务逻辑以及与后端的交互。同时service也可以作为controller之间的数据共享($state.go之前设置service里的变量，service是单例模式，所以整个项目运行时一个名字的service只会创建一个实例)。  
  
然后前端service请求发出后到了后端，express框架的route维护了一个路由的映射表，一个路径对应一个函数。函数的签名均为`function(req,res,next)`，即对该路径的请求会由改函数处理。但是所有请求都写一块就会很庞大，所以根目录就绑定了一个文件模块，文件里面再另外写各种相关的路由。
  
所以整体数据流动是view→controller→service→route，然后查询结果再逐级返回。

## 代码部分
### 目标
在test页面添加活动后在主页显示活动（添加活动的页面没有写。。。）
### 流程
1. test.html模板编辑，要对应activity的各个字段  
>models/Activity.js
```javascript
const base = require('./Base');
const ObjectId = base.ObjectId;
const ActivitySchema = new base.Schema({
    title: String,          //活动标题
    content: String,        //活动内容
    time: Date,             //活动时间
    association: ObjectId,  //承办社团
});
const ActivityModel = base.mongoose.model('ActivityModel', ActivitySchema, 'activity');
exports.ActivityModel = ActivityModel;
```
有以下字段
```text
title: String,          //活动标题
content: String,        //活动内容
time: Date,             //活动时间
association: ObjectId,  //承办社团
```
在test.html编写以下html
```html
<div>
    <h3>以下是增加活动的测试</h3>
    title:<input type="text" ng-model="activity.title">
    content:<input type="text" ng-model="activity.content">
    time:<input type="text" ng-model="activity.time">
    association:<input type="text" ng-model="activity.association">
    <input type="button" value="添加" ng-click="addActivity()">
</div>
```
四个输入框ng-model绑定到了activity的四个属性，最后一个button执行提交代码  
在testCtrl编写以下代码
```javascript
$scope.activity = {};
$scope.addActivity = function () {
    console.log($scope.activity);
    ActivityService.addActivity($scope.activity);
}
```
别忘记将相应service注入到controller里面
```javascript
.controller('testCtrl', function ($scope, $state, $http, ActivityService) {
```
没错就是function多加一个参数就好了。  
services.js里面的ActivityService如下
```javascript
.service('ActivityService', function ($q, $http, SystemService) {
    this.addActivity = function (activity) {
        const deferred = $q.defer();
        const param = {
            activity: activity,
        };
        $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
        $http.post(SystemService.getHostIP() + 'web/activity/addActivity', param)
            .then(function (restResult, status, headers, config) {
                let data = restResult.data;
                if (data.code == 0) {
                    deferred.resolve(data.returnValue);
                } else {
                    deferred.reject(data.errorReason);
                }
            })
            .catch(function (restResult, status, headers, config) {
                deferred.reject(restResult.data.errorReason);
            });
        return deferred.promise;
    };
})
```
基本就是大部分代码改一些参数啥的。  
　　稍微解释下`const deferred = $q.defer();`deffer，promise等对象都是为了解决异步函数的回调地狱出现的库，它表示现在没有内容但是未来会有内容的对象（因为数据的异步获取的）  
　　比如 get('aaa',function(){})第二个参数就是回调函数表示get到aaa的数据后才执行，但是要是第二个函数又是一个get，又有回调就陷入了回调地狱  
`get('aaa',function(){get('bbb',function(){...})})`  
有了promise就变成了`get('aaa').then(function).then(...)`  
具体的promise比这个复杂得多，有疑问想深入了解请看[AngularJS 中的Promise --- $q服务详解](http://www.cnblogs.com/xing901022/p/4928147.html)  
`$http.defaults.headers.common['Token'] = SystemService.getLoginToken();`获得Token并传入后端，记录了登录者相关信息，这部分还未完善  
```javascript
http.post(SystemService.getHostIP() + 'web/activity/addActivity', param)
    .then(function (restResult, status, headers, config) {
        let data = restResult.data;
        if (data.code == 0) {
            deferred.resolve(data.returnValue);
        } else {
            deferred.reject(data.errorReason);
        }
    })
    .catch(function (restResult, status, headers, config) {
        deferred.reject(restResult.data.errorReason);
    });
```
发送post请求第一个参数是请求路径，第二个参数是请求携带的参数.then里面是获得请求数据后执行的代码.catch里面是异常捕获。这部分基本照抄  
`return deferred.promise;`返回值是包含数据或者错误信息的promise。
前端部分编码完成，然后是后端。  

进入后端部分前注意到`SystemService.getHostIP() + 'web/activity/addActivity`
这个post路径，前面那个就是localhost:3000，所以就是localhost:3000/web/activity/addActivity这个路径  
所以首先我们到routes文件夹下新建activity.js文件，并写入以下内容
```javascript
const express = require('express');
const router = express.Router();
const RestResult = require('../RestResult');
const tokenUtils = require('../util/tokenUtils');

const ActivityModel = require('../models/Activity').ActivityModel;


module.exports = router;
```
　　前面4行保持默认，引入相关工具，后面引入活动的ActivityModel，然后把路由导出供其他文件导入然后在后端的app.js(就是根目录下的)加上`const activity = require('./routes/activity');`获取刚刚新建的activity.js的内容，然后在下面加上`app.use('/web/activity', activity);`使用那个文件(具体位置可以show history)  
　　至于为什么这么写，因为提前引入可以减少请求时间。当然从效果上完全可以写成`app.use('/web/activity', require('./routes/activity'));`，甚至可以吧那个文件的内容都写到app.js里面比如`app.post('/web/activity/addActivity', function(req,res,next){...});`但是这么写这个文件就会很长，不易于维护  
　　完成以上代码后我们就搭好了管理activity表的框架，之后对activity表的所有操作都可以写到activity.js文件里面去。然后进一步解释下`app.use('/web/activity', activity);`。这句话的意思是，把对/web/activity路径的请求交给activity这个东西来处理，又因为`const activity = require('./routes/activity');`，即activity就是activity.js文件。  
理清了这些就可以写后端接口的代码了，完整代码如下
>activity.js
```javascript
const express = require('express');
const router = express.Router();
const RestResult = require('../RestResult');
const tokenUtils = require('../util/tokenUtils');

const ActivityModel = require('../models/Activity').ActivityModel;


/**
 * 新增活动
 */
router.post('/addActivity', function (req, res, next) {
    console.log(req.body.activity);
    let activity = req.body.activity;
    activity.time = Date.now(); //这里只是做个测试，类型不匹配会报错的
    activity.association = '58b28577f51810757f94435e'; //同上
    let activityEntity = new ActivityModel(activity);
    activityEntity.save(function (err,doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        res.success(doc);
    })
});

module.exports = router;
```
然后可以打开test状态下面进行测试。


