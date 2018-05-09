# 后端nodejs配置ueditor
github: [ueditor for nodejs](https://github.com/netpi/ueditor)  
`package: ueditor`  
执行`npm install ueditor --save`  

app.js加上中间件
```javascript
let bodyParser = require('body-parser')
let ueditor = require("ueditor")
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

// /ueditor 入口地址配置 https://github.com/netpi/ueditor/blob/master/example/public/ueditor/ueditor.config.js
// 官方例子是这样的 serverUrl: URL + "php/controller.php"
// 我们要把它改成 serverUrl: URL + 'ue'
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {

  // ueditor 客户发起上传图片请求

  if(req.query.action === 'uploadimage'){

    // 这里你可以获得上传图片的信息
    let foo = req.ueditor;
    console.log(foo.filename); // exp.png
    console.log(foo.encoding); // 7bit
    console.log(foo.mimetype); // image/png

    // 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径）
    let img_url = 'yourpath';
    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage'){
    let dir_url = 'your img_dir'; // 要展示给客户端的文件夹路径
    res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {

    res.setHeader('Content-Type', 'application/json');
    // 这里填写 ueditor.config.json 这个文件的路径
    res.redirect('/ueditor/ueditor.config.json')
}}));



// 多类型文件上传 （附件 视频 图片）

var bodyParser = require('body-parser')
var ueditor = require("ueditor")
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
  let imgDir = '/img/ueditor/' //默认上传地址为图片
  let ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        let file_url = imgDir;//默认上传地址为图片
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/'; //附件保存地址
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/'; //视频保存地址
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
  //客户端发起图片列表请求
  else if (ActionType === 'listimage'){
    
    res.ue_list(imgDir);  // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/ueditor/ueditor.config.json')
}}));
```

# 前端部分修改
这里使用的是ueditor的angularjs版  
修改ueditor.config.js里的serverUrl。还要弄一份ueditor.config.json文件(后端配置文件)
