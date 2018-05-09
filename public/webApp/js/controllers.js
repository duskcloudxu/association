angular.module('app.controllers', [])

// ---------------------------------------------  主路由 AppCtrl   -------------------------------------------------
    .controller('mainCtrl', function ($scope, $state, $ionicModal, $timeout, UserService) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};
        $scope.showloginpwd = false;
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/main/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.loginModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.loginModal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.loginModal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            let promise = UserService.login($scope.loginData);

            promise.then(function (data) {
                swal('成功!', '登录成功', 'success');
                $scope.closeLogin();
                $state.go('app.home');
            }, function (data) {
                console.log(data);
                swal({
                    title: '出错啦!',
                    text: data,
                    timer: 1000,
                    type: 'error',
                    showConfirmButton: false
                });
            }).catch(function (err) {
                console.log(err);
            });

        };

        // Form data for the register modal
        $scope.registerData = {};
        $scope.showregisterpwd = false;
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/main/register.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.registerModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeRegister = function () {
            $scope.registerModal.hide();
        };

        // Open the login modal
        $scope.register = function () {
            $scope.registerModal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doRegister = function () {
            // console.log($scope.user);
            if (!$scope.registerData.studentID) {
                swal({
                    title: '出错啦!',
                    text: '学号不能为空',
                    timer: 1000,
                    type: 'error',
                    showConfirmButton: false
                });
                return;
            }
            if (!$scope.registerData.pwdText) {
                swal({
                    title: '出错啦!',
                    text: '密码不能为空',
                    timer: 1000,
                    type: 'error',
                    showConfirmButton: false
                });
                return;
            }
            if (!$scope.registerData.pwdText2) {
                swal({
                    title: '出错啦!',
                    text: '请再输入一次密码',
                    timer: 1000,
                    type: 'error',
                    showConfirmButton: false
                });
                return;
            }
            if (!$scope.registerData.email) {
                swal({
                    title: '出错啦!',
                    text: '邮箱不能为空',
                    timer: 1000,
                    type: 'error',
                    showConfirmButton: false
                });
                return;
            }
            if (!$scope.registerData.name) {
                swal({
                    title: '出错啦!',
                    text: '姓名不能为空',
                    timer: 1000,
                    type: 'error',
                    showConfirmButton: false
                });
                return;
            }
            if ($scope.registerData.pwdText !== $scope.registerData.pwdText2) {
                swal({
                    title: '出错啦!',
                    text: '两次密码不一致',
                    timer: 1000,
                    type: 'error',
                    showConfirmButton: false
                });
                return;
            }
            if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test($scope.registerData.email)) {
                swal({
                    title: '出错啦!',
                    text: '邮箱格式不正确',
                    timer: 1000,
                    type: 'error',
                    showConfirmButton: false
                });
                return;
            }
            let promise = UserService.register($scope.registerData);

            promise.then(function (data) {
                swal('成功!', '注册成功', 'success');
                $scope.closeRegister();
                $state.go('app.home');
            }, function (data) {
                swal({
                    title: '出错啦!',
                    text: '注册失败' + data,
                    timer: 1000,
                    type: 'error',
                    showConfirmButton: false
                });
            }).catch(function (err) {
                console.log(err);
            });
        };


        // Form data for the resetPwd modal
        $scope.resetPwdData = {};
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/main/resetPwd.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.resetPwdModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeResetPwd = function () {
            $scope.resetPwdModal.hide();
        };

        // Open the login modal
        $scope.resetPwd = function () {
            $scope.resetPwdModal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doResetPwd = function () {
            if (!$scope.resetPwdData.studentID) {
                swal({
                    title: '出错啦!',
                    text: '请输入学号',
                    timer: 1000,
                    type: 'error',
                    showConfirmButton: false
                });
                return;
            }
            if (!$scope.resetPwdData.email) {
                swal({
                    title: '出错啦!',
                    text: '请输入邮箱',
                    timer: 1000,
                    type: 'error',
                    showConfirmButton: false
                });
                return;
            }


            if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test($scope.resetPwdData.email)) {
                swal({
                    title: '出错啦!',
                    text: '邮箱格式不正确',
                    timer: 1000,
                    type: 'error',
                    showConfirmButton: false
                });
                return;
            }
            let promise = UserService.resetPwd($scope.resetPwdData.studentID, $scope.resetPwdData.email);
            promise.then(function (data) {
                swal('成功!', '重置密码成功', 'success');
                $scope.closeResetPwd();
            }, function (data) {
                console.log(data);
                swal({
                    title: '出错啦!',
                    text: data,
                    timer: 1000,
                    type: 'error',
                    showConfirmButton: false
                });
            }).catch(function (err) {
                console.log(err);
            });

        };
    })

    .controller('AppCtrl', function ($scope, $state, $ionicHistory, $ionicModal, $timeout, SystemService, UserService) {
        $scope.user = SystemService.getUser();
        if (!$scope.user) {
            $state.go('main');
        }
        $scope.logout = function () {
            // console.log($scope.user);
            let user = $scope.user;
            UserService.logout();
            swal('成功!', '已登出' + user.name, 'success');
            $ionicHistory.clearHistory();
            $state.go('main');
        };
    })



    //-------------------------------------- 主页 登录 注册 home login register----------------------------------------
    .controller('homeCtrl', function ($scope) {
        $scope.items = [
            {title: '社团活动'},
            {title: '社团介绍'},
            {title: '社团动态'},
        ];
    })

    .controller('aboutCtrl', function ($scope) {
        $scope.people = [
            {
                name: '傅凯琪',
                email: 'fu_kaiqi@qq.com'
            },
            {
                name: '徐韬',
                email: '624126503@qq.com'
            },
            {
                name: '岑焕亚',
                email: '837046740@qq.com'
            },
            {
                name: '韦洁',
                email: '873215214@qq.com'
            },
            {
                name: '戴雅婕',
                email: '970716011@qq.com'
            }
        ];
    })

    .controller('userCtrl', function ($scope, SystemService) {
        $scope.user = SystemService.getUser();
    })

    .controller('dynamicsCtrl', function ($scope, $state, $http, $timeout, NewsService, SystemService) {

        let promise = NewsService.showAllNews();
        promise.then(function (data) {
            console.log(data);
            $scope.datas = data;
            for (let i in data) {
                data[i].imgSrc = SystemService.getHostIP().substring(0, SystemService.getHostIP().length - 1) + data[i].imgSrc;
            }
        });

        $scope.newsInform = function (data) {
            localStorage.setItem('currentNews', JSON.stringify(data));
            $state.go('app.newsInform');
        };

        $scope.newsEdit = function () {
            $state.go('app.newsEdit')
        };

        $scope.doRefresh = function () {
            $http.get('/new-items')
                .success(function (newItems) {
                    $scope.items = newItems;
                })
                .finally(function () {
                    // 停止广播ion-refresher
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
    })
    .controller('activityCtrl', function ($scope, $state, $http, $timeout, ActivityService) {

        let itemColor = ['positive', 'energized', 'balanced', 'calm'];
        let itemStyle = ['#131dfa', '#11c1f3', '#33cd5f', '#ffcf1f'];

        const promise = ActivityService.showAllActivity();
        promise.then(function (data) {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                data[i].itemColor = 'item ' + itemColor[i % itemColor.length];
                data[i].itemStyle = {'border-top': '1px solid ' + itemStyle[i % itemStyle.length]};
            }
            $scope.datas = data;
        });

        $scope.activityInform = function (activity) {
            localStorage.setItem('currentActivity', JSON.stringify(activity));
            $state.go('app.activityInform');
        };

        $scope.activityEdit = function () {
            $state.go('app.activityEdit')
        };

        $scope.doRefresh = function () {
            $http.get('/new-items')
                .success(function (newItems) {
                    $scope.items = newItems;
                })
                .finally(function () {
                    // 停止广播ion-refresher
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
    })
    .controller('introductionCtrl', function ($scope, $state, $http, $timeout, AssociationService) {

        const promise = AssociationService.showAllAssociation();
        promise.then(function (data) {
            console.log(data);
            $scope.datas = [];
            for (let i = 0; i < data.length; i++) {
                $timeout(function () {
                    $scope.datas.push(data[i]);
                }, 100 * i);
            }
        });

        $scope.clubHomepage = function (club) {
            localStorage.setItem('currentClub', JSON.stringify(club));
            $state.go('app.clubHomepage');
        }

        $scope.doRefresh = function () {
            $http.get('/new-items')
                .success(function (newItems) {
                    $scope.items = newItems;
                })
                .finally(function () {
                    // 停止广播ion-refresher
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
    })
    .controller('registerCtrl', function ($scope, $state, UserService) {
        $scope.user = {};

        $scope.register = function () {
            // console.log($scope.user);
            let promise = UserService.register($scope.user);

            promise.then(function (data) {
                swal('成功!', '注册成功', 'success');
                $state.go('app.activity');
            }, function (data) {
                swal('出错啦!', '注册失败' + data, 'error');
            }).catch(function (err) {
                console.log(err);
            });

        };
    })
    .controller('loginCtrl', function ($scope, $state, UserService, SystemService) {

        let user = SystemService.getUser();
        console.log(user);
        $scope.islogin = !!user;
        if ($scope.islogin) {
            $scope.user = user;
        } else {
            $scope.user = {};
        }
        $scope.$on('$viewContentLoaded', function () {

        });
        $scope.login = function () {
            // console.log($scope.user);
            let promise = UserService.login($scope.user);

            promise.then(function (data) {
                swal('成功!', '登录成功', 'success');
                $state.go('app.activity');
            }, function (data) {
                console.log(data);
                swal('出错啦!', data, 'error');
            }).catch(function (err) {
                console.log(err);
            });
        };
    })



    //---------------------------  个人空间（用户 管理员） userCenter  associationManagement ---------------------------
    .controller('userCenterCtrl', function ($scope, $state, $http, SystemService) {
        let user = SystemService.getUser();
        console.log(user);
        if (!user) {
            swal('用户未登录!', '请登录', 'error');
            $state.go('login');
        }

    })
    .controller('myprofileCtrl', function ($scope, $state, $http, UserService, NewsService, ActivityService) {

        $scope.currentUser = '5926b1be5abc0621e218cce5';
        let p1 = UserService.getLatestInformation($scope.currentUser);
        p1.then(function (value) {
            $scope.person = value;
        });
        $http.get('../testdata/xt-test.json')
            .then(function (resdata) {
                $scope.content = resdata;
            });
        let p2 = NewsService.showAllNews();
        let p3 = ActivityService.showAllActivity();
        Promise.all([p1, p2, p3]).then(function (value) {
            console.log(value);
            $scope.res = [];
            let v1 = value[0];
            let v2 = value[1];
            let v3 = value[2];
            $scope.person = v1;
            console.log($scope.person);
            for (let i in v1.associations) {
                for (let j in v2) {
                    if (v1.associations[i] === v2[j].association) {
                        v2[j].type = '活动';
                        $scope.res.push(v2[j]);
                    }
                }
                for (let j in v3) {
                    if (v1.associations[i] === v3[j].association) {
                        v3[j].type = '新闻';
                        $scope.res.push(v3[j]);
                    }
                }
            }
            $scope.$apply();
            console.log($scope.res);
        });
        $scope.showDate = function (date) {
            let temp = new Date(date);
            return temp.toDateString();
        }

    })
    .controller('myAssAndActCtrl', function ($scope, $state, $http, UserService, ActivityService, AssociationService) {

        $scope.currentUser = '5926b1be5abc0621e218cce5';
        let p1 = UserService.getLatestInformation($scope.currentUser);
        let p2 = ActivityService.showAllActivity();
        let p3 = AssociationService.showAllAssociation();
        Promise.all([p1, p2, p3]).then(function (value) {
            console.log(value);
            $scope.res = [];
            $scope.asso = [];

            let v1 = value[0];
            let v2 = value[1];
            let v3 = value[2];
            for (let i in v2) {
                for (let j in v2[i].attendingStudent) {
                    if (v2[i].attendingStudent[j] === v1._id)
                        $scope.res.push(v2[i]);
                }
            }
            for (let i in v3) {
                for (let j in v3[i].members) {
                    if (v3[i].members[j] === v1._id)
                        $scope.asso.push(v3[i]);
                }
            }
            $scope.$apply();
            console.log($scope.res);
        });
        $scope.showDate = function (date) {
            let temp = new Date(date);
            return temp.toDateString();
        }
    })
    .controller('mymanagementCtrl', function ($scope, $state, $http, UserService, ActivityService, AssociationService) {

        $scope.currentUser = '5926b1be5abc0621e218cce5';
        let p1 = UserService.getLatestInformation($scope.currentUser);
        let p2 = AssociationService.showAllAssociation();
        Promise.all([p1, p2]).then(function (value) {
            $scope.asso = [];
            let v1 = value[0];
            let v2 = value[1];
            for (let i in v2) {
                for (let j in v2[i].admins) {
                    if (v2[i].admins[j] === v1._id)
                        $scope.asso.push(v2[i]);
                }
            }
            $scope.$apply();
            console.log($scope.res);
        })
    })
    //________________________________社团管理________________________________________
    .controller('associationManagementCtrl', function ($scope, $state, $http, SystemService) {
        let user = SystemService.getUser();
        console.log(user);
        if (!user) {
            swal('用户未登录!', '请登录', 'error');
            $state.go('login');
        }

    })
    .controller('activityManagementCtrl', function ($scope, $state, $http, ActivityService) {

        $scope.currentAssociation = '5926b1be5abc0621e218cceb';
        let promise = ActivityService.showAllActivityByAssociationId($scope.currentAssociation);
        promise.then(function (value) {
            $scope.data = value;
            console.log($scope.data);
            $scope.dateArray = [];
            let temp;
            for (let i in $scope.data) {
                temp = new Date($scope.data[i].time)
                $scope.dateArray.push(temp.toDateString());
            }
            console.log($scope.dateArray);
        })

    })
    .controller('dataManagementCtrl', function ($scope, $state, $http, FileService) {

        $scope.currentAssociation = '5926b1be5abc0621e218cceb';
        let promise = FileService.showAllFileByAssociationId($scope.currentAssociation);
        promise.then(function (value) {
            $scope.data = value;
            console.log($scope.data);
            $scope.dateArray = [];
            let temp;
            for (let i in $scope.data) {
                temp = new Date($scope.data[i].time)
                $scope.dateArray.push(temp.toDateString());
            }
            console.log($scope.dateArray);
        })

    })
    .controller('newsManagementCtrl', function ($scope, $state, $http, NewsService) {

        $scope.currentAssociation = '5926b1be5abc0621e218cceb';
        let promise = NewsService.showAllNewsByAssociationId($scope.currentAssociation);
        promise.then(function (value) {
            $scope.data = value;
            console.log($scope.data);
            $scope.dateArray = [];
            let temp;
            for (let i in $scope.data) {
                temp = new Date($scope.data[i].time)
                $scope.dateArray.push(temp.toDateString());
            }
            console.log($scope.dateArray);
        })

    })
    .controller('memberManagementCtrl', function ($scope, $state, $http, AssociationService, UserService) {

        $scope.currentAssociation = '5926b1be5abc0621e218cceb';
        let p1 = AssociationService.findAssociationById($scope.currentAssociation);
        let p2 = UserService.showAllUser();
        Promise.all([p1, p2]).then(function (value) {
            $scope.member = [];
            let v1 = value[0].members;
            let v2 = value[1];
            console.log(v1);
            console.log(v2);
            for (let i in v1) {
                for (let j in v2) {
                    if (v1[i] === v2[j]._id)
                        $scope.member.push(v2[j]);
                }
            }
            $scope.$apply();
            console.log($scope.member);
        })
    })



    //-------------------------------------- 活动新闻的编辑和展示 activity news----------------------------------------
    .controller('activityInformCtrl', function ($scope, $state, $http, ActivityService, $ionicHistory) {

        $scope.activity = JSON.parse(localStorage.getItem('currentActivity'));
        console.log($scope.activity);
        if (!$scope.activity) {
            swal('数据错误!', '请重试!', 'error');
            $state.go('app.activity');
        }
        $scope.back = function () {
            $ionicHistory.goBack();
        };
        $scope.activityEdit = function () {
            $state.go('app.activityEdit')
        };
    })
    .controller('newsInformCtrl', function ($scope, $state, $http) {

        $scope.news = JSON.parse(localStorage.getItem('currentNews'));
        $scope.backtoNews = function () {
            $state.go('app.dynamics');
        };
        $scope.newsEdit = function () {
            $state.go('app.newsEdit')
        };
    })
    .controller('activityEditCtrl', function ($scope, $state, $http) {

        $scope.names = ['灵动魔方社', '计算机科技协会', 'sunshine动漫社'];
        $scope.backtoActivity = function () {
            swal(
                '成功！',
                '',
                'success'
            );
            $state.go('app.activity');
        };
        $scope.activityEditCancle = function () {
            $state.go('app.activity')
        };
    })
    .controller('newsEditCtrl', function ($scope, $state, $http) {

        $scope.names = ['灵动魔方社', '计算机科技协会', 'sunshine动漫社'];
        $scope.backtoNews = function () {
            swal(
                '成功！',
                '',
                'success'
            );
            $state.go('app.dynamics');
        };
        $scope.newsEditCancle = function () {
            $state.go('app.dynamics')
        };
    })



    //--------------------------------------  社团空间 clubHomepage  ----------------------------------------------
    .controller('clubHomepageCtrl', function ($scope, $state, $http, $ionicHistory, UserService, SystemService, NewsService, ActivityService, AssociationService) {

        $scope.club = JSON.parse(localStorage.getItem('currentClub'));
        console.log($scope.club);

        $scope.user = SystemService.getUser();
        console.log($scope.club);
        let p1 = ActivityService.showAllActivityByAssociationId($scope.club._id);
        let p2 = NewsService.showAllNewsByAssociationId($scope.club._id);
        Promise.all([p1, p2]).then(function (value) {
            let v1 = value[0];
            let v2 = value[1];
            $scope.datas = [];
            console.log(v1);
            console.log(v2);
            for (let i in v1) {
                console.log('活动')
                v1[i].type = '活动';
                $scope.datas.push(v1[i]);

            }
            for (let i in v2) {
                console.log('新闻')
                v2[i].type = '新闻';
                $scope.datas.push(v2[i]);
            }
            $scope.$apply();
        });

        $scope.clubApplication = function () {
            swal({
                title: '加入社团',
                text: '请输入申请理由',
                type: 'input',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                closeOnConfirm: false,
            }, function (text) {
                console.log(text);
                let p = AssociationService.apply($scope.club._id, $scope.user._id, text);
                p.then(function (data, err) {
                    if (err) {
                        swal("未知错误", "","error");
                    }
                    else if (data === "alreadyHad")
                        swal("申请失败", "你已在社团中", "error");
                    else if (data === "alreadyapplied")
                        swal("申请失败", "你已经申请过了", "error");
                    else
                        swal("申请成功", "等待审核", "success");
                })
            })
        };

        $scope.clubDownload = function () {
            $state.go('app.clubDownload')
        };
        $scope.back = function () {
            $ionicHistory.goBack();
        };

        $scope.inform = function (data) {
            if (data.type === '新闻') {
                localStorage.setItem('currentNews', JSON.stringify(data));
                $state.go('app.newsInform');
            } else {
                localStorage.setItem('currentActivity', JSON.stringify(data));
                $state.go('app.activityInform');
            }
        };
    })

    .controller('clubIntroductionCtrl', function ($scope, $state, $http, $timeout) {

        $scope.club = JSON.parse(localStorage.getItem('currentClub'));
        console.log($scope.club);

    })

    .controller('clubActivityCtrl', function ($scope, $state, $http, $timeout, ActivityService) {

        let club = JSON.parse(localStorage.getItem('currentClub'));
        console.log(club);
        let promise = ActivityService.showAllActivityByAssociationId(club._id);
        promise.then(function (data) {
            console.log(data);
            $scope.datas = [];
            for (let i = 0; i < data.length; i++) {
                $timeout(function () {
                    $scope.datas.push(data[i]);
                }, 100 * i);
            }
        });
        $scope.activityDetail = function (activity) {
            localStorage.setItem('currentActivity', JSON.stringify(activity));
            $state.go('app.activityInform');
        };
    })

    .controller('clubApplicationCtrl', function ($scope, $state, $http) {

        $scope.apply = function () {
            // console.log($scope.user);
            let promise = UserService.apply($scope.user);

            promise.then(function (data) {
                swal('成功!', '申请成功', 'success');
                $state.go('app.home');
            }, function (data) {
                swal('出错啦!', '提交失败' + data, 'error');
            }).catch(function (err) {
                console.log(err);
            });
        };
    })

    .controller('clubDownloadCtrl', function ($scope, $state, $http, $timeout, SystemService, FileService) {

        // let user = SystemService.getUser();
        // console.log(user);
        // if (!user) {
        //     swal('用户未登录!', '请登录', 'error');
        //     $state.go('app.clubHomepage');
        // }


        let club = JSON.parse(localStorage.getItem('currentClub'));
        let promise = FileService.showAllFileByAssociationId(club._id);
        promise.then(function (data) {
            console.log(data);
            $scope.datas = data;
        });

        $scope.download = function (file) {
            console.log(file);

            let form = $('<form>');
            form.attr('style', 'display:none');
            form.attr('target', '');
            form.attr('method', 'post');
            form.attr('action', SystemService.getHostIP() + 'web/file/download');

            let input1 = $('<input>');
            input1.attr('type', 'hidden');
            input1.attr('name', 'fileUrl');
            input1.attr('value', file.url);

            let input2 = $('<input>');
            input2.attr('type', 'hidden');
            input2.attr('name', 'fileName');
            input2.attr('value', file.title);

            $('body').append(form);
            form.append(input1);
            form.append(input2);
            form.submit();
        };

    })


;