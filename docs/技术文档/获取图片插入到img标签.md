# img标签从服务器获取图片
1. img标签的src属性就是一个get请求，只要后端有对应的路由处理这个请求就好了
1. src是相对PC/index.html的路径（因为这个文件被插入到那个html里）
1. 整个localhost文件路径是public即localhost:3000/aaa对应public/aaa
1. 所以如果src是aaa，get请求就是localhost:3000/PC/aaa
1. 而我们后端file.js文件的路由对应的是localhost:3000/web/file/xxx

比如我们专门写一个处理图片get请求的路由
```javascript
router.get('/showImg', function (req, res, next){xxxxx})
```
写到src里面就是../web/file/showImg（./对应PC所以用../）
```html
<img src="../web/file/showImg">
```
但是怎么知道获取哪张图呢？直接get请求加参数就好了
```html
<img src="../web/file/showImg?name=梦幻.jpg">
```
后端可以通过req.query获取这个键值对并发送图片
```javascript
function readImg(path, res) {
    fs.readFile(path, 'binary', function (err, file) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("输出文件");
            res.writeHead(200,  {'Content-Type':'image/jpeg'});
            res.write(file, 'binary'); //二进制输出
            res.end();
        }
    });
}
router.get('/showImg', function (req, res, next) {
    console.log('showImg');
    console.log(req.query);
    let name = req.query.name;
    let url = './upload/img/' + name; //相对/bin/www文件的路径
    readImg(url,res);
});
```

最后，使用方法：
```html
<img src="../web/file/showImg?name={{imgName}}">
```
然后controller里面给出这个imgName字段就好了