const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/association', function (err) {
    if (err) {
        console.log('connection err', err);
    } else {
        console.log('connection successful');
    }
});

exports.mongoose = mongoose;//导出mongoose对象
// 配置需要登陆认证的访问路径(post请求)
exports.needLoginUrlRegs = [
    // /^(\/)+web(\/)+user(\/)+user/,
    /^(\/)+web(\/)+clubHomepage(\/)+clubDownload/,
];