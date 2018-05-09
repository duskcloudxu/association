const base = require('./Base');
const ObjectId = base.ObjectId;
const FileSchema = new base.Schema({
    title: String,          //资料标题
    content: String,        //资料描述
    url:String,             //资料位置
    time: {                 //上传时间
        type: Date,
        default:Date.now
    },
    associationId: ObjectId,//所属社团
});
const FileModel = base.mongoose.model('FileModel', FileSchema, 'file');
exports.FileModel = FileModel;