//Array 工具 start
var ArrayUtils = {};
ArrayUtils.each = function (arr, fn) {
    if (!arr || !arr.length) {
        return;
    }
    var count = arr.length;
    for (var i = 0; i < count; i++) {
        var b = fn(arr[i], i);
        if (b === false) {//返回false表示接受数组的遍历
            return;
        }
    }
};

ArrayUtils.contains = function (arr, e) {
    var retVal = false;
    ArrayUtils.each(arr, function (e1) {
        if (e1 == e) {
            retVal = true;
            return false;
        }
    });
    return retVal;
};

exports.ArrayUtils = ArrayUtils;
//Array 工具 end

//String 工具 start
var StringUtils = {};


StringUtils.isNotEmpty = function (str) {
    if (str) {
        return str.length ? true : false;
    }
    return false;
};

StringUtils.isEmpty = function (str) {
    return !StringUtils.isNotEmpty(str);
};

StringUtils.trim = function (str) {
    return str ? str.trim() : str;

};

exports.StringUtils = StringUtils;
//String 工具 end


//ObjectIdUtils start
var ObjectIdUtils = {};

ObjectIdUtils.contains = function (objectIds, id) {
    if (id === undefined || id === null) {
        return false;
    }
    id = typeof id === 'string' ? id : id.toString();
    var retVal = false;
    ArrayUtils.each(objectIds, function (objectId) {
        objectId = objectId.toString();
        if (objectId == id) {
            retVal = true;
            return false;
        }
    });
    return retVal;
};

ObjectIdUtils.equal = function (id1, id2) {
    return id1.toString() == id2.toString();
};

exports.ObjectIdUtils = ObjectIdUtils;
//ObjectIdUtils end


//PageTools start
var DBTools = {};
/**
 * 分页工具
 * @param entityType 实体
 * @param conditions 条件
 * @param projection 投影
 * @param options
 * @param pageable 分页对象
 * @param total 是否查询出总数量,此处未实现查询总数量
 * @param callback 回调
 */
DBTools.page = function (entityType, conditions, projection, options, pageable, total, callback) {
    var page = pageable.page || 0;
    var size = pageable.size || 10;
    options = options || {};
    options.skip = page * size;
    var query;
    var sort = pageable.sort;
    if (sort) {
        query = entityType.find(conditions, projection, options).sort(sort).limit(size);
    } else {
        query = entityType.find(conditions, projection, options).limit(size);
    }
    query.exec(function (err, docs) {
        if (err) {
            callback(err, pageable);
        } else {
            pageable.list = docs;
            callback(err, pageable);
        }

    });
};

exports.DBTools = DBTools;
//PageTools end


var UrlTools = {};

UrlTools.addPrefix = function (src, prefix) {
    if (!src) {
        return src;
    }

    if (typeof src === 'string') {
        if (src.trim().length == 0) {
            return src;
        }
        return prefix + src;
    }

    if (src instanceof Array) {
        var retVal = [];
        var count = src.length;
        for (var i = 0; i < count; i++) {
            retVal.push(prefix + src[i]);
        }
        return retVal;
    }
    return src;
};

exports.UrlTools = UrlTools;


var SecurityUtils = {};
/**
 * 生成数字随机码
 * @param length 随机码长度
 * @returns {string}
 */
SecurityUtils.generateVerificationCode = function (length) {
    if (length <= 0) {
        return '';
    }
    var code = '';
    var chars = ['1','1','2','3','4','5','6','7','8','9'];
    //var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    for (var i = 0; i < length; i++) {
        var c = parseInt(Math.random() * 10);
        code += chars[c];
        //code += c;
    }
    return code;

};
exports.SecurityUtils = SecurityUtils;

Date.prototype.format = function(format) {
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format))
        format=format.replace(RegExp.$1,
            (this.getFullYear()+"").substr(4- RegExp.$1.length));

    for (var k in o)
        if (new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length==1? o[k] :
                    ("00"+ o[k]).substr((""+ o[k]).length));

    return format;
};

function isServerIP() {
    var os = require('os'),
        is120 = false,
        ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
        ifaces[dev].forEach(function (details, alias) {
            if (details.family == 'IPv4') {
                if (details.address == '120.55.74.241') {
                    return true;
                }
            }
        });
    }
    return is120;
}

exports.isServerIP = isServerIP;
