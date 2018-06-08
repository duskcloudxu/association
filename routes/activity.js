const express = require('express');
const router = express.Router();
const RestResult = require('../RestResult');
const tokenUtils = require('../util/tokenUtils');
const mongoose = require('mongoose');
const ActivityModel = require('../models/Activity').ActivityModel;
const UserAccountModel = require('../models/UserAccount').UserAccountModel;
const AssociationModel = require('../models/Association').AssociationModel;
const async = require('async');


/**
 * 新增活动
 */
router.post('/addActivity', function (req, res, next) {
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
router.post('/showAllActivity', function (req, res, next) {
  ActivityModel.find({}, function (err, doc) {
    if (err) {
      console.log(err);
      res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
      return;
    }
    async.each(doc, function (doc, callback) {
      AssociationModel.findById(doc.associationId, function (err, association) {
        if (err) {
          console.log(err);
          res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
          return;
        }
        if (association) {
          doc._doc.association = association;
          callback();
        }
      });
    }, function (err) {
      if (err) {
        res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
        return;
      }
      res.success(doc);
    })
  })
});

/**
 * 修改活动
 */
router.post('/editActivity', function (req, res, next) {
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
router.post('/findActivityById', function (req, res, next) {
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
router.post('/attendActivity', function (req, res, next) {
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
router.post('/showAllActivityByAssociationId', function (req, res, next) {
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
router.post('/delActivity', function (req, res, next) {
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
module.exports = router;
