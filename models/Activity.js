const base = require('./Base');
const ObjectId = base.ObjectId;
const ActivitySchema = new base.Schema({
    title: String,           //活动标题
    content: String,         //活动内容
    number: Number,          //限制人数
    time: Date,              //活动时间
    place: String,           //活动地点
    associationId: ObjectId, //承办社团
    associationName: String, //承办社团名字
    attendingStudent:[       //参加学生ID
        {
            type: ObjectId,
            unique:true
        }
    ]
});
const ActivityModel = base.mongoose.model('ActivityModel', ActivitySchema, 'activity');
exports.ActivityModel = ActivityModel;