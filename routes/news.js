const express = require('express');
const router = express.Router();
const RestResult = require('../RestResult');
const tokenUtils = require('../util/tokenUtils');
const async = require('async');

const NewsModel = require('../models/News').NewsModel;
const AssociationModel = require('../models/Association').AssociationModel;


/**
 * 新增新闻
 */
router.post('/addNews', function (req, res, next) {
    console.log(req.body.news);
    let news = req.body.news;
    news.time = Date.now();
    let newsEntity = new NewsModel(news);
    newsEntity.save(function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        res.success(doc);
    })
});

/**
 * 查询所有新闻
 */
router.post('/showAllNews', function (req, res, next) {
    NewsModel.find({}, function (err, docs) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        console.log(docs);
        async.each(docs, function (doc, callback) {
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
            res.success(docs);
        })

    })
});

/**
 * 修改新闻
 */
router.post('/editNews', function (req, res, next) {
    // console.log(req.body.news);
    console.log("test");
    let news = req.body.news;
    let id = req.body.id;
    NewsModel.findByIdAndUpdate(id, news, {new: true}, function (err, doc) {
            if (err) {
                console.log(err);
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            }
            res.success(doc);
        }
    )
    ;
});

/**
 * 根据ID搜索新闻
 */
router.post('/findNewsById', function (req, res, next) {
    let id = req.body.id;
    NewsModel.findById(id, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
        }
        console.log(doc);
        AssociationModel.findById(doc.associationId, function (err, association) {
            if (err) {
                console.log(err);
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                return;
            }
            if (association) {
                doc._doc.association = association;
                res.success(doc);
            }
        });
    });
});

/**
 * 查询一个社团所有新闻
 */
router.post('/showAllNewsByAssociationId', function (req, res, next) {
    let associationId = req.body.associationId;
    NewsModel.find({associationId: associationId}, function (err, docs) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        console.log(docs);
        async.each(docs, function (doc, callback) {
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
            res.success(docs);
        })
    })
});


/**
 * 按id删除新闻
 */
router.post('/delNews', function (req, res, next) {
    let newsId = req.body.newsId;
    NewsModel.remove({_id: newsId}, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        res.success(doc);
    })
});
module.exports = router;
