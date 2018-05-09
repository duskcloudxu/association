const tokenUtils = require('../util/tokenUtils');
let m = '123456';
let c = tokenUtils.encryptText(m);
console.log(c);
let cc = '6yq/rDlDaXg=';
let p = tokenUtils.decrypt(cc);
console.log(p);