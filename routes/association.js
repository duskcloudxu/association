const express = require('express');
const router = express.Router();
const RestResult = require('../RestResult');
const tokenUtils = require('../util/tokenUtils');
const async = require('async');

const AssociationModel = require('../models/Association').AssociationModel;
const UserAccountModel = require('../models/UserAccount').UserAccountModel;


/**
 * 新增社团
 */
router.post('/addAssociation', function (req, res, next) {
    console.log(req.body.association);
    let association = req.body.association;
    if (!association.admins) association.admins = [association.proprieterId];
    if (!association.members) association.members = [association.proprieterId];
    if (!association.logoimage) association.logoimage = "default image";
    association.application = [];
    let associationEntity = new AssociationModel(association);
    associationEntity.save(function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        res.success(doc);
    })
});
/**
 * 查询所有社团
 */
router.post('/showAllAssociation', function (req, res, next) {
    AssociationModel.find({}, function (err, associations) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        console.log(39);
        console.log(associations);
        async.each(associations, function (association, callback) {
            UserAccountModel.findById(association.proprieterId, function (err, user) {
                if (err) {
                    console.log(err);
                    res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                    return;
                }
                if (user) {
                    association._doc.adminName = user.name;
                    callback();
                }
            });
        }, function (err) {
            if (err) {
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                return;
            }
            res.success(associations);
        })
    })
});
/**
 * id查找社团
 */
router.post('/findAssociationById', function (req, res, next) {
    let id = req.body.id;
    AssociationModel.findById(id, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
        }
        res.success(doc);
    });
});

/**
 * 删除社团成员
 */
router.post('/delMember', function (req, res, next) {
    let associationId = req.body.associationId;
    let userId = req.body.userId;
    let memberId = req.body.memberId;
    AssociationModel.findById(associationId, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
        }

        if (doc.proprieterId.toString() === userId) {
            console.log("test");
            if (userId !== memberId) {
                AssociationModel.update({_id: associationId}, {
                    $pull: {
                        admins: memberId,
                        members: memberId
                    }
                }, function (err, doc) {
                    console.log(doc);
                });
                UserAccountModel.update({_id: memberId}, {
                    $pull: {
                        admins: associationId,
                        associations: associationId
                    }
                }, function (err, doc) {
                    if (err) {
                        console.log(err);
                        res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                    }
                    console.log(doc);
                });
                res.success("success");
            }
            else {
                res.success("failed");
            }
        }
        else {
            let flag = 1;
            for (let i in doc.admins)
                if (doc.admins[i].toString() === memberId) flag = 0;
            if (flag) {
                AssociationModel.update({_id: associationId}, {
                    $pull: {
                        admins: memberId,
                        members: memberId
                    }
                }, function (err, doc) {
                    console.log(doc);
                });
                UserAccountModel.update({_id: memberId}, {
                    $pull: {
                        admins: associationId,
                        associations: associationId
                    }
                }, function (err, doc) {
                    if (err) {
                        console.log(err);
                        res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                    }
                    console.log(doc);
                });
                res.success("success");
            }
            else {
                res.success("failed");
            }
        }
    });
});

router.post('/addAdmin', function (req, res, next) {
    let associationId = req.body.associationId;
    let memberId = req.body.memberId;
    let userId = req.body.userId;
    AssociationModel.findById(associationId, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
        }
        if (doc.proprieterId.toString() === userId) {
            let flag = 1;
            for (let i in doc.admins)
                if (doc.admins[i].toString() === memberId) flag = 0;
            if (!flag) {
                res.success("alreadyHad");
            }
            else {
                AssociationModel.update({_id: associationId}, {$push: {admins: memberId}}, function (err, doc) {
                    if (err) {
                        console.log(err);
                        res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                    }
                    console.log(doc);

                });
                UserAccountModel.update({_id: memberId}, {
                    $push: {
                        admins: associationId,
                    }
                }, function (err, doc) {
                    if (err) {
                        console.log(err);
                        res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                    }
                    console.log(doc);
                });
                res.success("success");
            }
        }
        else {
            res.success("failed");
        }

    });
});

/**
 * 增加社团成员
 */
router.post('/addMember', function (req, res, next) {
    let associationId = req.body.associationId;
    let memberId = req.body.memberId;
    AssociationModel.findById(associationId, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
        }
        AssociationModel.update({_id: associationId}, {
            $push: {
                members: memberId
            }
        }, function (err, doc) {
            if (err) {
                console.log(err);
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            }
            console.log(doc);
            res.success(doc);
        });

    });
    UserAccountModel.findById(memberId, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
        }
        UserAccountModel.update({_id: memberId}, {
            $push: {
                associations: associationId,
            }
        }, function (err, doc) {
            if (err) {
                console.log(err);
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            }
            console.log(doc);
        });

    })

});

/**
 * 社团申请存储
 */
router.post('/apply', function (req, res, next) {
    let associationId = req.body.associationId;
    let memberId = req.body.memberId;
    let statement = req.body.statement;
    AssociationModel.findById(associationId, function (err, doc) {
        let flag = 1;
        console.log(255);
        console.log(doc);
        for (let i = 0; i < doc.members.length; i++) {
            if (doc.members[i].toString() === memberId) {
                res.success("alreadyHad");
                flag = 0;
                return;
            }
        }
        console.log(264);
        console.log(doc.application);
        if (doc.application.length) {
            for (let i = 0; i < doc.application.length; i++) {
                console.log(268);
                console.log(doc.application[i]);
                if (doc.application[i].memberId.toString() === memberId) {
                    res.success("alreadyApplied");
                    flag = 0;
                    return;
                }
            }
        }
        if (flag) {
            AssociationModel.findByIdAndUpdate(associationId, {
                    $push: {
                        application: {
                            statement: statement,
                            memberId: memberId
                        }
                    }
                },
                {safe: true, upsert: true, new: true},
                function (err, doc) {
                    if (err) {
                        console.log(err);
                        res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
                    }
                    res.success("success");
                });
        }

    });

});

/**
 * 社团申请删除
 */
router.post('/delApply', function (req, res, next) {
    let associationId = req.body.associationId;
    let memberId = req.body.memberId;
    AssociationModel.findByIdAndUpdate(associationId, {
        $pull: {
            application: {
                memberId: memberId
            }
        }
    }, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
        }
        res.success(doc);
    });
});

module.exports = router;
