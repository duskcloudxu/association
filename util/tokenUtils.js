const crypto = require('crypto');
const key = '0123456789aaaa9876543210';
const iv = '12345678';

const encrypt = function (text) {
    const cipher = crypto.createCipheriv('des3', new Buffer(key), new Buffer(iv));
    let ciph = cipher.update(text, 'utf8', 'base64');
    ciph += cipher.final('base64');
    return ciph;
};


const decrypt = function (text) {
    const decipher = crypto.createDecipheriv('des3', new Buffer(key), new Buffer(iv));
    try {
        let planTxt = decipher.update(text, 'base64', 'utf8');
        planTxt += decipher.final('utf8');
        return planTxt;
    } catch (e) {
        return false;
    }

};


exports.encryptText = encrypt;
exports.decrypt = decrypt;


/**
 * 生成登陆token
 * @param id
 */
exports.getLoginAutoToken = function (id) {
    const planTxt = 'ABC-' + id + '-' + new Date().getTime();
    return encrypt(planTxt);
};

/**
 * 解析登陆token
 * @param token
 * @returns {*}
 */
exports.parseLoginAutoToken = function (token) {
    const planTxt = decrypt(token);
    if (planTxt == false) {
        return false;
    }
    const arr = planTxt.split('-');
    if (arr.length != 3 || arr[0] != 'ABC') {
        return null;
    }
    const result = {};
    result.userId = arr[1];
    result.timestamp = parseInt(arr[2]);
    return result;
};
