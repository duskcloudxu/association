const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Requires multiparty
const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();

// Requires ueditor
const ueditor = require("ueditor");

const util = require('util');
const myUtils = require('./util/myUtils');
const tokenUtils = require('./util/tokenUtils');
const RestResult = require('./RestResult');
const config = require('./config/config');


const routes = require('./routes/index');
const user = require('./routes/user');
const file = require('./routes/file');
const activity = require('./routes/activity');
const association = require('./routes/association');
const news = require('./routes/news');


const UserAccountModel = require('./models/UserAccount').UserAccountModel;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app访问预处理中间件
app.use(function (req, res, next) {

    res.setHeader("Access-Control-Allow-Origin", "*"); //允许哪些url可以跨域请求到本域
    res.setHeader("Access-Control-Allow-Methods", "GET,POST"); //允许的请求方法，一般是GET,POST,PUT,DELETE,OPTIONS
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with,content-type,Token"); //允许哪些请求头可以跨域

    res.error = function (errorCode, errorReason) {
        const restResult = new RestResult();
        restResult.code = errorCode;
        restResult.errorReason = errorReason;
        res.send(restResult);
    };


    res.success = function (returnValue) {
        const restResult = new RestResult();
        restResult.code = RestResult.NO_ERROR;
        restResult.returnValue = returnValue || {};
        res.send(restResult);
    };


    const ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress; //设置ip
    req.clientIP = ip;//将解析后的ip放入req中,一遍方便使用

    let needLogin = false;
    const requestUrl = req.url;
    myUtils.ArrayUtils.each(config.needLoginUrlRegs, function (urlReg) {//片段请求路径是否为安全路径
        if (urlReg.test(requestUrl)) {
            needLogin = true;
            return false;//返回false表示结束数组的遍历
        }
    });
    if (needLogin) {
        const token = req.headers.token;
        let result;
        if (myUtils.StringUtils.isNotEmpty(token) && (result = tokenUtils.parseLoginAutoToken(token))) {

            /*对token的next();时间有限制,可以在这里做处理
             const timestamp = result.timestamp;
             const timespan = (new Date().getTime()-timestamp)/1000/60/60/24;
             if(timespan>15){//天数大于15就重新登陆
             res.error(RestResult.AUTH_ERROR_CODE, "登陆超时请重新登陆");
             return;
             }*/

            const userId = result.userId;
            if (userId === '573c00206d8592e8288a3edf' || typeof  userId !== 'string' || userId === undefined || userId.length < 20) {
                res.error(RestResult.AUTH_ERROR_CODE, "请重新登录");
            } else {
                UserAccountModel.findById(userId, '_id code', function (err, user) {
                    if (!user) {
                        res.error(RestResult.AUTH_ERROR_CODE, "请重新登录");
                    } else {
                        //跟新最后活动时间和ip地址
                        UserAccountModel.update({_id: userId}, {$set: {lastActionTime: new Date()}, ip: ip}).exec();
                        //将当前登陆的用户id设置到req中
                        req.loginUserId = userId;
                        req.loginUserCode = user.code;
                        //进入路由中间件
                        next();
                    }
                })
            }

        } else {
            res.error(RestResult.AUTH_ERROR_CODE, "请重新登录");
        }
    } else {
        next();
    }
});

app.use('/', routes);
app.use('/web/user', user);
app.use('/web/file', file);
app.use('/web/activity', activity);
app.use('/web/association', association);
app.use('/web/news', news);

// /ueditor 入口地址配置 https://github.com/netpi/ueditor/blob/master/example/public/ueditor/ueditor.config.js
// 官方例子是这样的 serverUrl: URL + "php/controller.php"
// 我们要把它改成 serverUrl: URL + 'ue'
// app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
//     console.log('/ueditor/ue');
//     // ueditor 客户发起上传图片请求
//     if (req.query.action === 'uploadimage') {
//         // 这里你可以获得上传图片的信息
//         let foo = req.ueditor;
//         console.log(foo.filename); // exp.png
//         console.log(foo.encoding); // 7bit
//         console.log(foo.mimetype); // image/png
//
//         // 下面填写你要把图片保存到的路径 （以 path.join(__dirname, 'public') 作为根路径）
//         let img_url = 'ueditor/upload/img';
//         res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
//     }
//     //  客户端发起图片列表请求
//     else if (req.query.action === 'listimage') {
//         let dir_url = 'ueditor/upload/img'; // 要展示给客户端的文件夹路径
//         res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
//     }
//     // 客户端发起其它请求
//     else {
//         res.setHeader('Content-Type', 'application/json');
//         // 这里填写 ueditor.config.json 这个文件的路径
//         res.redirect('/PC/lib/ueditor/ueditor.config.json')
//     }
// }));

// 多类型文件上传 （附件 视频 图片）
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    console.log('/ueditor/ue');
    let imgDir = '/ueditor/img/'; //默认上传地址为图片
    let ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        let file_url = imgDir;//默认上传地址为图片
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/ueditor/file/'; //附件保存地址
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/ueditor/video/'; //视频保存地址
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //客户端发起图片列表请求
    else if (ActionType === 'listimage') {
        res.ue_list(imgDir);  // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/PC/lib/ueditor/ueditor.config.json')
    }
}));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.render('error', {
        message: error.message,
        error: error
    });
});


module.exports = app;
