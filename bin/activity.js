const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const async = require('async');
const kue = require('kue');
const redis = require('redis');
const bluebird = require('bluebird');

const RestResult = require('../RestResult');
const ActivityModel = require('../models/Activity').ActivityModel;
const UserAccountModel = require('../models/UserAccount').UserAccountModel;

//使redis避免回调地狱
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const queue = kue.createQueue();

//默认redis客户端运行在localhost:6379端口，如果需要修改可以在createClient(username,port)来指定
const client = redis.createClient();

client.on('connect', function () {
    console.log('=============redis数据库连接成功=============');
});
//监听错误
client.on('error', function (err) {
    console.log('error event - ' + redis.host + ':' + redis.port + ' - ' + err);
});

const app = express();
app.listen(8080);

kue.app.listen(8081);
console.log('kue UI started on port http://localhost:8081');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

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
    next();
});

/**
 * 处理队列，这里的第一个参数，是任务的名称, 需要和添加的任务名称一致。
 * job.data 是创建任务传过来的数据
 * done 执行完成后的回调
 */
queue.process('activity', 5, async (job, done) => { //job.data放的是用户报名的信息
    console.log('activity:', job.id + '  ' + job.data.activityid + '  ' + job.data.uid);
    let activity = await client.hgetallAsync('activity:' + job.data.activityid);
    console.log(activity);
    let isAlready = await client.sismemberAsync('activity:' + activity.id + ':ok', job.data.uid); // 1在其中 0不在其中
    if (isAlready) { //已报名
        done(null, '已报名')
    } else {
        if (+activity.number) { //number不为0
            console.log('ok');
            await client.saddAsync('activity:' + activity.id + ':ok', job.data.uid); // 把uid加到数组
            activity.number--;
            await client.hmsetAsync('activity:' + activity.id, activity);
            done(null, 'ok')
        } else {
            console.log('人满啦');
            done(null, '人满啦')
        }
    }
});

/**
 * 发布活动后存入redis中
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 */
async function release(req, res, next) {
    console.log(req.body);
    await client.hmsetAsync('activity:' + req.body.id, {
        id: req.body.id,
        number: req.body.number
    });
    res.send('activity released!')
}

/**
 * 新的事件加入消息队列
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 */
async function apply(req, res, next) {
    const job = queue
        .create('activity', {
            activityid: req.body.activityid,
            uid: req.body.uid
        })
        .save(err => {
            if (!err) {
                console.log('your apply succeed, jobid:', job.id);
            }
        }).on('complete', (result) => {
            console.log('Job completed with data ', result);
            if (result === 'ok') {
                res.send('your apply succeed');
            } else {
                res.send('your apply failed, ' + result);
            }
        }).on('failed attempt', (errorMessage, doneAttempts) => {
            console.log('Job failed');
        }).on('failed', (errorMessage) => {
            console.log('Job failed');
        }).on('progress', (progress, data) => {
            console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data);
        });
}


/**
 * 新增活动
 */
app.post('/web/activity/addActivity', function (req, res, next) {
    // console.log(req.body.activity);
    console.log("addActivity");
    let activity = {
        title: req.body.activity.title,
        content: req.body.activity.content,
        number: req.body.activity.number,
        time: req.body.activity.time,
        place: req.body.activity.place,
        associationId: req.body.activity.association._id,
        associationName: req.body.activity.association.name,
        attendingStudent: []
    };
    let activityEntity = new ActivityModel(activity);
    activityEntity.save(function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
        }
        res.success(doc);
    })
});

/**
 * 查询所有活动
 */
app.post('/web/activity/showAllActivity', function (req, res, next) {
    ActivityModel.find({}, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        res.success(doc);
    })
});

/**
 * 修改活动
 */
app.post('/web/activity/editActivity', function (req, res, next) {
    // console.log(req.body.activity);
    console.log("test");
    let activity = req.body.activity;
    let id = req.body.id;

    ActivityModel.findByIdAndUpdate(id, activity, {new: true}, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
        }
        res.success(doc);
    });
    // ActivityModel.findByIdAndUpdate({_id: id},
    //     {
    //         $set: {
    //             content: activity.content
    //         }
    //     }, {new: true}, function (err, doc) {
    //         if (err) {
    //             res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
    //             return;
    //         }
    //         res.success(doc);
    //     });
});

/**
 * 根据ID搜索活动
 */
app.post('/web/activity/findActivityById', function (req, res, next) {
    let id = req.body.id;
    ActivityModel.findById(id, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
        }
        res.success(doc);
    });
});


/**
 * 添加参与人
 */
app.post('/web/activity/attendActivity', function (req, res, next) {
    let studentId = req.body.studentId;
    let activityId = req.body.activityId;
    console.log("test");
    console.log(studentId);
    ActivityModel.findById(activityId, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
        }
        let activityEntity = new ActivityModel(doc);
        let flag = 1;
        for (let i = 0; i < activityEntity.attendingStudent.length; i++) {
            if (activityEntity.attendingStudent[i].toString() === studentId) {
                flag = 0;
                res.success("already has");
                return;
            }
        }
        if (flag === 1) {
            ActivityModel.findByIdAndUpdate(activityId, {$push: {'attendingStudent': studentId}}, function (err, doc) {
                if (err) {
                    console.log(err);
                    res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                }

            });
            UserAccountModel.findByIdAndUpdate(studentId, {$push: {'attendedActivity': activityId}}, function (err, doc) {
                if (err) {
                    console.log(err);
                    res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                }

            });
            res.success(doc);
        }
    });

});
/**
 * 查询一个社团所有活动
 */
app.post('/web/activity/showAllActivityByAssociationId', function (req, res, next) {
    let associationId = req.body.associationId;
    ActivityModel.find({associationId: associationId}, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        res.success(doc);
    })
});

/**
 * 按id删除活动
 */
app.post('/web/activity/delActivity', function (req, res, next) {
    let activityId = req.body.activityId;
    ActivityModel.remove({_id: activityId}, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        res.success(doc);
    })
});
