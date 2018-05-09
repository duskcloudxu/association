const base = require('./Base');
const ObjectId = base.ObjectId;
const AssociationSchema = new base.Schema({
    name: String,          //社团名
    proprieterId: ObjectId,//社长
    admins: [ObjectId],    //管理员（社长，部长）
    members:[ObjectId],    //普通社员
    logoimage: String,     //logo
    introduction: String,  //社团介绍
    application:[
        {
            statement:String,
            memberId:ObjectId
        }
    ]


});
const AssociationModel = base.mongoose.model('AssociationModel', AssociationSchema, 'association');
exports.AssociationModel = AssociationModel;