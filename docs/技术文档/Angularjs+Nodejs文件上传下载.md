## Angularjs+Nodejs文件上传
来自[Angularjs+Nodejs图片上传](http://www.aichengxu.com/javascript/4731985.htm)  
1.插件  
```
1.前端angular插件 ng-file-upload  
2.后端nodejs插件 connect-multiparty  
```

2.html
```html
<input type="file" ngf-select ng-model="files" ngf-multiple="true" />
```
3.前端配置
```javascript
//可以参考https://github.com/danialfarid/ng-file-upload
//inject angular file upload directives and services.
const app = angular.module('fileUpload', ['ngFileUpload']);
app.controller('MyCtrl', ['$scope', 'Upload', function ($scope, Upload) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
// set default directive values
// Upload.setDefaults( {ngf-keep:false ngf-accept:'image/*', ...} );
    $scope.upload = function (files) {
        if (files && files.length) {
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                Upload.upload({
                    url: 'url', //此处url为向后台nodejs请求的路由
                    fields: {'username': $scope.username},
                    file: file
                }).progress(function (evt) {
                    let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                })
            }
        }
    };
}]);
```

4.nodejs
后台接收的数据是存在于临时文件夹内。因此使用fs.rename()有肯能会报错。（我这边是确确实实报错了）
```javascript
const multipart = require('connect-multiparty');
const fs = require('fs');
const multipartMiddleware = multipart();


//此处'/url'应与angular发送的路由一致，
router.post('/url', multipartMiddleware,function(req, res, next){

    let profile_image = req.files.file;
    let tmp_path = profile_image.path; //此处为页面图片存放的地址，在C盘的临时文件夹temp下。 
    console.log(req.files);
    let path = './url' + profile_image.name; //此处'./url'为上传的图片希望存放的地址.可以为绝对地址

//跨域传递文件
    let is = fs.createReadStream(tmp_path);
    let os = fs.createWriteStream(path);
    is.pipe(os);
    is.on('end',function() {
        fs.unlinkSync(tmp_path);
    });
//跨域传递文件
//-----------此处可以写点传递回前台的数据 --------此处不完整，不能完全照搬。如果写全的话，太麻烦。
});
```

从最开始的不懂，到后面逐渐把坑填满，花费了太多时间。里面的坑着实不少，能走通一次后，回头再看，代码量就那么点。写一下我犯过的错误吧.  
1. 插件版本错误。之前的插件貌似叫做angular-file-upload.悲催的我拿着ng-file-upload，却用angular-file-upload的写法。
2. angular-file-upload需要在用到的congtroller加载'$upload'，而ng-file-upload加载'Upload'.
3. angular-file-upload加载中间件的名称是['angularFileUpload'],而ng-file-upload加载['ngFileUpload']
4. nodejs接收不到 req.files.file.一个原因是nodejs插件选择有问题,还有一个原因是插件的写法有问题.个人倾向于使用connect-multiparty.
5. nodejs的fs.rename()方法报错。猜测：因为上传的图片存在于C盘的临时文件夹内，可能涉及到系统权限的问题导致fs.rename()方法报错。所以，从网上搜了一个跨域读取文件的方法。

## 下载
以下为自己心得体会  
直接用form形式发送请求，ajax无法下载文件，只会发送json给前端，要另外写js.  
所以我选择用jQuery伪装一个表单提交的形式实现下载
```html
<input type="text" ng-model="filename"><button ng-click="download()">下载</button>
```
```javascript
$scope.download = function () {
            let form = $("<form>");   //定义一个form表单
            form.attr('style','display:none');   //在form表单中添加查询参数
            form.attr('target','');
            form.attr('method','post');
            form.attr('action',SystemService.getHostIP() + 'web/file/download');

            let input1 = $('<input>');
            input1.attr('type','hidden');
            input1.attr('name','filename');
            input1.attr('value',$scope.filename);

            $('body').append(form);  //将表单放置在web中
            form.append(input1);   //将查询参数控件提交到表单上
            form.submit();   //表单提交
        }
```
```javascript
router.post('/download', function (req, res, next) {
    // let filename = req.query.filename; //get要用query
    let filename = req.body.filename;
    res.download('upload/'+filename);
});
```