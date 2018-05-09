const express = require('express');
const router = express.Router();
const RestResult = require('../RestResult');
const tokenUtils = require('../util/tokenUtils');

const FileModel = require('../models/File').FileModel;

const async = require('async');

const multipart = require('connect-multiparty');
const fs = require('fs');
const multipartMiddleware = multipart();


/**
 * 上传文件
 */
router.post('/uploadFile', multipartMiddleware, function (req, res, next) {

    let uploadFile = req.files.file;
    let AssociationId = req.body.AssociationId;
    let tmp_path = uploadFile.path; //此处为页面图片存放的地址，在C盘的临时文件夹temp下。
    console.log(req.files);
    let path = './upload/file/' + AssociationId + uploadFile.name;

//跨域传递文件
    let is = fs.createReadStream(tmp_path);
    let os = fs.createWriteStream(path);
    is.pipe(os);
    is.on('end', function () {
        fs.unlinkSync(tmp_path);
    });
    res.success(uploadFile.name);
});


/**
 * 下载文件
 */
router.post('/download', function (req, res, next) {
    // let filename = req.query.filename; //get要用query
    let fileUrl = req.body.fileUrl;
    let fileName = req.body.fileName;
    res.download(fileUrl, fileName);
});


/**
 * 上传图片
 */
router.post('/uploadImg', multipartMiddleware, function (req, res, next) {

    let uploadImg = req.files.file;
    let location = req.body.location;
    let newImgName = req.body.newImgName;

    let tmp_path = uploadImg.path; //此处为页面图片存放的地址，在C盘的临时文件夹temp下。
    console.log(req.files);
    let path = './upload/img/';
    if (location)
        path = path + location + '/';
    if (newImgName)
        path = path + newImgName;
    else
        path = path + uploadImg.name;

//跨域传递文件
    let is = fs.createReadStream(tmp_path);
    let os = fs.createWriteStream(path);
    is.pipe(os);
    is.on('end', function () {
        fs.unlinkSync(tmp_path);
    });
    res.success(uploadImg.name);
});

router.get('/showImg', function (req, res, next) {
    console.log('showImg');
    console.log(req.query);
    let location = req.query.location;
    let name = req.query.name;
    let url = './upload/img/' + location + '/' + name; //相对www文件的路径
    readImg(url, res);
});


/**
 * 新增文件
 */
router.post('/addFile', function (req, res, next) {
    console.log(req.body.file);
    let file = req.body.file;
    file.time = Date.now();
    let fileEntity = new FileModel(file);
    fileEntity.save(function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        res.success(doc);
    })
});


/**
 * 查询一个社团所有文件
 */
router.post('/showAllFileByAssociationId', function (req, res, next) {
    let associationId = req.body.associationId;
    FileModel.find({associationId: associationId}, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        res.success(doc);
    })
});

/**
 * 按id删除文件
 */
router.post('/delFile', function (req, res, next) {
    let fileId = req.body.fileId;
    FileModel.remove({_id: fileId}, function (err, doc) {
        if (err) {
            console.log(err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, RestResult.SERVER_EXCEPTION_ERROR_DESCRIPTION);
            return;
        }
        res.success(doc);
    })
});

function readImg(path, res) {
    fs.readFile(path, 'binary', function (err, file) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("输出文件");
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.write(file, 'binary');
            res.end();
        }
    });
}


module.exports = router;


