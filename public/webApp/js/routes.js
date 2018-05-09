angular.module('app.routes', [])
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.views.maxCache(100);

//-------------------------以下是公共的状态-------------------------------------------------------------------------
        $stateProvider

            .state('main', {
                url: '/main',
                templateUrl: 'templates/main/main.html',
                controller: 'mainCtrl'
            })

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/main/menu.html',
                controller: 'AppCtrl'
            })

            //-------------------------------------- 左侧列表----------------------------------------
            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/main/home.html',
                        controller: 'homeCtrl'
                    }
                }
            })

            .state('app.about', {
                url: '/about',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/main/about.html',
                        controller: 'aboutCtrl'
                    }
                }
            })

            //-------------------------------------- 活动、社团、动态列表----------------------------------------
            .state('app.activity', {
                url: '/activity',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home/activity.html',
                        controller: 'activityCtrl'
                    }
                }
            })

            .state('app.introduction', {
                url: '/introduction',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home/introduction.html',
                        controller: 'introductionCtrl'
                    }
                }
            })

            .state('app.dynamics', {
                url: '/dynamics',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home/dynamics.html',
                        controller: 'dynamicsCtrl'
                    }
                }
            })

            //-------------------------------------- 活动、动态详情和编辑----------------------------------------
            .state('app.activityInform', {
                url: '/activityInform',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/activitynews/activityInform.html',
                        controller: 'activityInformCtrl'
                    }
                }
            })

            .state('app.activityEdit', {
                url: '/activityEdit',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/activitynews/activityEdit.html',
                        controller: 'activityEditCtrl'
                    }
                }
            })

            .state('app.newsInform', {
                url: '/newsInform',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/activitynews/newsInform.html',
                        controller: 'newsInformCtrl'
                    }
                }
            })

            .state('app.newsEdit', {
                url: '/newsEdit',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/activitynews/newsEdit.html',
                        controller: 'newsEditCtrl'
                    }
                }
            })

            //-------------------------------------- 社团空间----------------------------------------
            .state('app.clubHomepage', {
                url: '/clubHomepage',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/clubHome/clubHomepage.html',
                        controller: 'clubHomepageCtrl'
                    }
                }
            })

            .state('app.clubApplication', {
                url: '/clubApplication',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/clubHome/clubApplication.html',
                        controller: 'clubApplicationCtrl'
                    }
                }
            })

            .state('app.clubDownload', {
                url: '/clubDownload',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/clubHome/clubDownload.html',
                        controller: 'clubDownloadCtrl'
                    }
                }
            })

            //-------------------------------------- 用户个人界面----------------------------------------

            .state('app.user', {
                url: '/user',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/user/user.html',
                        controller: 'userCtrl'
                    }
                }
            })




        ;

//---------------------------------默认启动状态---------------------------------------------------------------------------
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/main');

    });



