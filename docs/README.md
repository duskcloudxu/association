### 项目配置
cd 进入项目根目录(package.json所在目录)  
执行npm install

---
使用npm可能(一定)会很慢，所以可以用淘宝的npm镜像
安装淘宝镜像cnpm:  
```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
然后所有要用npm的地方都用cnpm代替：
```bash
cnpm install
```

---
### 项目运行和GitHub合作模式
统一IDE:IntelliJ IDEA  
IDEA设置git,file watcher啥的(自动编译LESS)  
安装mongodb  

idea打开项目，打开bin/www，在代码编辑区右键run  
然后去浏览器输入localhost:3000  

GitHub工作流程  
本地编辑(就是写代码没啥好说的)→  
commit(VCS->Commit Changes。Commit Message注明写了啥或者改了啥)→  
pull(VCS->Update Project，保持默认点OK。这一步不能漏)→  
merge(自动会出来的页面，解决冲突)→  
回到pull然后要merge的话继续merge，不用的话进入下一步→  
push

---
### 文件树介绍
(执行完cnpm install后会比原来多一个node_modules文件夹)
- association
    - bin
        - www 后端服务器运行入口,类似main函数
    - config
        - config.js 配置数据库连接
    - models
        - Base.js 基础数据库
        - XXX.js 数据设计
    - node_modules
        - 一大堆库文件
    - **public 前端所有页面文件**
        - index.html 前端页面入口,去掉数据库部分就是纯静态页面了
    - routes
        - XXX.js 后端接口
    - util
        - XXX.js 一些小工具
    - views
        - 后端视图
    - .gitignore git项目忽略的文件
    - app.js 后端一些配置
    - doc.md 文档
    - package.json 依赖的npm配置
    - README.md 这个文件
    - RestResult.js 一些状态常数
以及被我默认设置忽略的.idea和.iml  
(这两个是idea对于项目的配置文件，我默认忽略不显示在文件树上的)  
(设置方法：settings->Editor->File Types 最下面加上 ;\*.idea;\*.iml;)

前端页面主要修改public文件夹里的东西

---
### 开发顺序
补充于 2017.5.13周四  
每期计划均为本周五到下周四  
1. 页面布局
    - 内容
    - 排版
    - html模板
1. 页面交互
    - controller
    - service
    - 后端连接
1. 页面美化
    - css
1. 页面整合打包
    - gulp
    - webpack
1. 手机端[可选]
    - Ionic
    - Android
1. 模块化重构[可选]
    - Angular2
---
### 开发说明
以下文件目录都在public/PC下操作
1. ./templates里  
新建xxx.html
这一块的代码都会被插入到index.html的`<div ui-view></div>`里面，所以可以直接写代码块
2. ./js/router.js里  
复制一个`.state`，state名和url名都和页面名一样，类似于
```text
.state('test', {
                url: '/test',
                templateUrl: './templates/test.html',
                controller: 'testCtrl'
            })
```
修改以上代码把四个test(还有一个testCtrl的test)改成xxx(1里面html的名字)
3. ./js/controller.js里  
复制一份controller文件，把他他controller名字改成上面定义的名字
```text
.controller('testCtrl',function ($scope, $state) {
        $scope.test = 'world';
        $scope.list = [1,2,3,4,5,6];
        $scope.isadmin = false;
        $scope.aaa = function () {
            $state.go('home');
        };
    })
```
类似上述代码，把testCtrl改成xxxCtrl，(function的参数是service，可以就写一个$scope，要用到页面跳转的话可以加上$state)
4. 运行项目  
浏览器输入localhost:3000出现主页，把/home.html改成/xxx.html查看效果。每次改好都要刷新浏览器。第一阶段单纯前端开发也可以cd进入PC路径后用browser-sync，就不要每次都刷新了。

5. 若需要样式的话，在css下新建同名.less文件，并在html的第一行引入，类名开头用姓名区分比如fkq-box-xxx  

