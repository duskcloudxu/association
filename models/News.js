const base = require('./Base');
const ObjectId = base.ObjectId;
const NewsSchema = new base.Schema({
    title: String,          //新闻标题
    content: String,        //新闻内容
    time: {                 //新闻时间
        type: Date,
        default:Date.now
    },
    associationId: ObjectId,//承办社团
    imgSrc: String,         //封面图片的img标签的src
});
const NewsModel = base.mongoose.model('NewsModel', NewsSchema, 'news');
exports.NewsModel = NewsModel;