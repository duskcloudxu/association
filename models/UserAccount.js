const base = require('./Base');
const ObjectId = base.ObjectId;
const UserAccountSchema = new base.Schema({
    studentID: String,                           //学号
    pwd: String,                                 //密码
    email: String,                               //邮箱
    name: String,                                //姓名
    nickname: String,                            //昵称
    sex: String,                                 //性别 m:男 f:女
    admins: [ObjectId],                          //有管理权限的社团
    associations: [ObjectId],                    //加入的社团
    mobile: String,                              //手机
    headimage: String,                           //头像
    createtime: {type: Date, default: Date.now},//创建时间
    attendedActivity:[                           //报名活动
        {
            type: ObjectId,
            unique:true
        }
    ]

});
UserAccountSchema.index({studentID: 1}, {"background": true});//设置索引
const UserAccountModel = base.mongoose.model('UserAccountModel', UserAccountSchema, 'usersaccount');
exports.UserAccountModel = UserAccountModel;//导出UserAccountModel实体