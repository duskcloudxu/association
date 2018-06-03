angular.module('app.routes', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home/activity');

        $stateProvider

        //---------------------------------------- test -------------------------------------------
            .state('test', {
                url: '/test',
                templateUrl: './templates/test.html',
                controller: 'testCtrl'
            })
            .state('uploadanddownloadtest', {
                url: '/uploadanddownloadtest',
                templateUrl: './templates/uploadAndDownloadTest.html',
                controller: 'uploadAndDownloadTestCtrl'
            })


            //-------------------------------------- 主页 登录 注册 home login register----------------------------------------
            .state('home', {
                url: '/home',
                templateUrl: './templates/main/home.html',
                controller: 'homeCtrl',
                abstract: true
            })

            .state('home.dynamics', {
                url: '/dynamics',
                templateUrl: './templates/home/dynamics.html',
                controller: 'dynamicsCtrl'
            })

            .state('home.activity', {
                url: '/activity',
                templateUrl: './templates/home/activity.html',
                controller: 'activityCtrl'
            })

            .state('home.introduction', {
                url: '/introduction',
                templateUrl: './templates/home/introduction.html',
                controller: 'introductionCtrl'
            })

            // about
            .state('about', {
                url: '/about',
                views: {
                    '': {templateUrl: './templates/main/about.html'},
                    'columnOne@about': {template: '<a href="https://github.com/dreamhuan/association" target="_blank">click : association with MEAN</a>'},
                    'columnTwo@about': {
                        templateUrl: './templates/main/about-table.html',
                        controller: 'aboutCtrl'
                    }
                }
            })

            .state('login', {
                url: '/login',
                templateUrl: './templates/main/login.html',
                controller: 'loginCtrl'
            })

            .state('register', {
                url: '/register',
                templateUrl: './templates/main/register.html',
                controller: 'registerCtrl'
            })


            //---------------------------  个人空间（用户 管理员） userCenter  associationManagement ---------------------------

            .state('userCenter', {
                url: '/userCenter',
                templateUrl: './templates/main/userCenter.html',
                controller: 'userCenterCtrl',
                abstract: true
            })
            .state('userCenter.myprofile', {
                url: '/myprofile',
                templateUrl: './templates/user/userprofile.html',
                controller: 'myprofileCtrl'
            })
            .state('userCenter.myAssAndAct', {
                url: '/myAssAndAct',
                templateUrl: './templates/user/userAssAndAct.html',
                controller: 'myAssAndActCtrl'
            })
            .state('userCenter.mymanagement', {
                url: '/mymanagement',
                templateUrl: './templates/user/usermanagement.html',
                controller: 'mymanagementCtrl'
            })
            .state('userCenter.editInformation', {
                url: '/editInformation',
                templateUrl: './templates/user/editInformation.html',
                controller: 'editInformationCtrl'
            })
            .state('associationManagement', {
                url: '/associationManagement',
                templateUrl: './templates/admin/associationManagement.html',
                controller: 'associationManagementCtrl',
                abstract: true
            })
            .state('associationManagement.activityManagement', {
                url: '/activityManagement',
                templateUrl: './templates/admin/activityManagement.html',
                controller: 'activityManagementCtrl'

            })
            .state('associationManagement.dataManagement', {
                url: '/dataManagement',
                templateUrl: './templates/admin/dataManagement.html',
                controller: 'dataManagementCtrl'

            })
            .state('associationManagement.newsManagement', {
                url: '/newsManagement',
                templateUrl: './templates/admin/newsManagement.html',
                controller: 'newsManagementCtrl'

            })
            .state('associationManagement.memberManagement', {
                url: '/memberManagement',
                templateUrl: './templates/admin/memberManagement.html',
                controller: 'memberManagementCtrl'

            })
            .state('associationManagement.viewAttendedMember', {
              url: '/viewAttendedMember',
              templateUrl: './templates/admin/viewAttendedMember.html',
              controller: 'viewAttendedMemberCtrl'

            })
            .state('showApplication', {
                url: '/showApplication',
                templateUrl: './templates/admin/showApplication.html',
                controller: 'showApplicationCtrl'

            })
            .state('addNewAssociation', {
                url: '/addNewAssociation',
                templateUrl: './templates/admin/addNewAssociation.html',
                controller: 'addNewAssociationCtrl'
            })


            //-------------------------------------- 活动新闻的编辑和展示 activity news----------------------------------
            .state('activityInform', {
                url: '/activityInform',
                templateUrl: './templates/activitynews/activityInform.html',
                controller: 'activityInformCtrl'
            })
            .state('newsInform', {
                url: '/newsInform',
                templateUrl: './templates/activitynews/newsInform.html',
                controller: 'newsInformCtrl'
            })
            .state('activityEdit', {
                url: '/activityEdit',
                templateUrl: './templates/activitynews/activityEdit.html',
                controller: 'activityEditCtrl'
            })
            .state('newsEdit', {
                url: '/newsEdit',
                templateUrl: './templates/activitynews/newsEdit.html',
                controller: 'newsEditCtrl'
            })


            //--------------------------------------  社团空间 clubHomepage  ----------------------------------------------
            .state('clubHomepage', {
                url: '/clubHomepage',
                templateUrl: './templates/clubHome/clubHomepage.html',
                controller: 'clubHomepageCtrl'
            })
            .state('clubHomepage.clubIntroduction', {
                url: '/clubIntroduction',
                templateUrl: './templates/clubHome/clubIntroduction.html',
                controller: 'clubIntroductionCtrl'
            })
            .state('clubHomepage.clubActivity', {
                url: '/clubActivity',
                templateUrl: './templates/clubHome/clubActivity.html',
                controller: 'clubActivityCtrl'
            })
            .state('clubHomepage.goHomepage', {
                url: '/goHomepage',
                templateUrl: './templates/main/home.html',
                controller: 'goHomepageCtrl'
            })
            .state('clubHomepage.clubApplication', {
                url: '/clubApplication',
                templateUrl: './templates/clubHome/application.html',
                controller: 'clubApplicationCtrl'
            })
            .state('clubHomepage.clubDownload', {
                url: '/clubDownload',
                templateUrl: './templates/clubHome/download.html',
                controller: 'clubDownloadCtrl'
            })
            .state('testclubHomepage', {
                url: '/testclubHomepage',
                templateUrl: './templates/clubHome/testclubHomepage.html',
                controller: 'testclubHomepageCtrl'
            })
            .state('testclubHomepage.homepage', {
                url: '/homepage',
                templateUrl: './templates/clubHome/homepage.html',
                controller: 'homepageCtrl'
            })
            .state('testclubHomepage.datapage', {
                url: '/datapage',
                templateUrl: './templates/clubHome/datapage.html',
                controller: 'datapageCtrl'
            })

        ;
    });