# AngularJS操作cookie

>use `npm` or `brower`
### npm
```bash
npm install angular-cookies
```
Then add ngCookies as a dependency for your app:
```bash
angular.module('myApp', [require('angular-cookies')]);
```
### bower
```bash
bower install angular-cookies
```
Add a `<script>` to your index.html:
```html
<script src="/bower_components/angular-cookies/angular-cookies.js"></script>
```
Then add ngCookies as a dependency for your app:
```javascript
angular.module('myApp', ['ngCookies']);
```

ngCookies模块中有两个cookies读写相关的服务：$cookies和$cookieStroe。无论使用哪种都要先将其注入到控制器中，为了比较二者的区别，都将其注入到控制器中：
```javascript
app.controller('namesCtrl', ['$cookies','$cookieStore',function($cookies, $cookieStore){}]);
```
cookies存储少量数据
```bash
使用格式：$cookies.变量名 = 变量值
不能使用：$cookies.变量名 = {
    变量名1： 变量值，
    变量名2： 变量名，
    .............
}
```
因为这样使用：$cookies.变量名.变量名1的方式就不被识别

cookieStore采用key-value(String-object)方式存储数据,  
put,get,remove分别用于存数据，取数据，移除数据  
```javascript
angular.module('cookieStoreExample', ['ngCookies'])
  .controller('ExampleController', ['$cookieStore', Function($cookieStore) {
    // Put cookie
    $cookieStore.put('myFavorite','oatmeal');
    // Get cookie
    var favoriteCookie = $cookieStore.get('myFavorite');
    // Removing a cookie
    $cookieStore.remove('myFavorite');
  }]);
```

可以以对象的形式存储
```javascript
$cookieStore.put("user",{id: "id",name: "name"});
```

设置cookie用put()方法:
```javascript
$cookies.put(key, value[, options]);
$cookieStore.put(key, value);
```

例如设置一个cookie，名为“userName”，值为“yangmin”：
```javascript
//使用$cookies设置cookie
$cookies.put('userName', 'yangmin');
//使用$cookieStore设置cookie
$cookieStore.put('userName','yangmin');
```

获取cookie用get()方法:
```javascript
$cookies.get(key);
$cookieStore.get(key);
```

例如获取上面设置的“userName”：
```javascript
$cookies.get(userName);//yangmin
$cookieStore.get("userName"); //yangmin
```

删除cookie用remove():
```javascript
$cookies.remove(key[, options]);
$cookieStore.remove(key);
```

例如删除“userName”
```javascript
$cookies.remove("userName");
$cookieStore.remove("userName");
```

$cookies和$cookieStore的区别：

1.$cookies设置的cookie值一般为字符串，$cookieStroe可用于设置字符串、对象、数组等。
```javascript
$cookies.put("person",{name:"Amy",age:23});
var person = $cookies.get("person");
console.log(person.age);//undefined
$cookieStore.put("person",{name:"Amy",age:23});
var person = $cookieStore.get("person");
console.log(person.age);//23
```

2.$cookies可设置参数，例如可设置cookie的过期时间。$cookieStore无法设置参数
```javascript
var expireDate = new Date();
expireDate.setDate(expireDate.getDate() + 1);
$cookies.put("userName",“yangmin”,{'expires': expireDate});//“userName”一天后过期
```
