const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

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
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
