const mongodb = require('../config/config');
const mongoose = mongodb.mongoose;
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const AutoIncrementIdSchema = new Schema({
    nextId: {type: Number, default: 1},
    collectionName: String
});

//model的第三个参数指定在数据库中的collection名称，若省略即为第一个参数的复数形式
const AutoIncrementIdModel = mongoose.model('AutoIncrementIdModel', AutoIncrementIdSchema, 'autoIncrementId');

exports.mongodb = mongodb;
exports.mongoose = mongoose;
exports.Schema = Schema;
exports.ObjectId = ObjectId;
exports.Mixed = Schema.Types.Mixed;

/**
 * 自增长工具
 * @param collection  记录哪一个集合的自增长值
 * @param callback 回调函数
 * @param start 开始值
 * @param step 增长步长
 */
exports.nextId = function (collection, callback, start, step) {
    AutoIncrementIdModel.findOne({collectionName: collection}, function (err, adventure) {
        if (adventure) {
            const nextId = parseInt(adventure.nextId);
            AutoIncrementIdModel.update({_id: adventure.id}, {$set: {nextId: nextId + (step || 1)}}, function () {
                callback(nextId);
            });
        } else {
            adventure = new AutoIncrementIdModel({nextId: (start || 1), collectionName: collection});
            adventure.save(function () {
                callback(1);
            });
        }
    });
};
