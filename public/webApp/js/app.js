// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', [
    'ionic',
    'app.routes',
    'app.services',
    'app.controllers',
    'ng.ueditor',
    'ngSanitize'
])
    .constant('hostip', 'http://localhost:3000/')  //本地开发环境地址
    //.constant('hostip', 'http://123.206.111.244:3000/')  //正式环境地址


    .filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }])

    .filter("myDateTime", function () { //ISODate格式到本地时间转换
        return function (input) {
            let date = new Date(input);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        }
    })

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

;
