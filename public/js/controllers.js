angular.module('app.controllers', [])

//---------------------------------------- test -------------------------------------------
    .controller('testCtrl', function ($scope, $state, $http, ActivityService, FileService, AssociationService, NewsService, UserService) {
        $scope.test = 'world';
        $scope.list = [1, 2, 3, 4, 5, 6];
        $scope.isadmin = false;
        $scope.gohome = function () {
            $state.go('home');
        };
        $scope.httpget = false;
        $scope.httptest = function () {
            $http.get('../testdata/test.json')
                .then(function (resdata) {
                    console.log(resdata);
                    console.log(resdata.data);
                    console.log(resdata.data.aaa);
                    $scope.httpget = true;
                    $scope.show = resdata.data;
                })
        };
        $scope.text = {};
        $scope.renderhtml = function () {
            angular.element('#render').empty().append($scope.text.content);
        };

        $scope.activity = {};
        $scope.addActivity = function () {
            console.log($scope.activity);
            let promise = ActivityService.addActivity($scope.activity);
            promise.then(function (err, data) {
                console.log(data);
                swal('添加成功！', '', 'success');

                // swal({
                //     title: 'Are you sure?',
                //     text: 'You will not be able to recover this imaginary file!',
                //     type: 'warning',
                //     showCancelButton: true,
                //     confirmButtonText: 'Yes, delete it!',
                //     cancelButtonText: 'No, keep it',
                // }).then(function(isConfirm) {
                //     if (isConfirm === true) {
                //         swal(
                //             'Deleted!',
                //             'Your imaginary file has been deleted.',
                //             'success'
                //         );
                //
                //     } else if (isConfirm === false) {
                //         swal(
                //             'Cancelled',
                //             'Your imaginary file is safe :)',
                //             'error'
                //         );
                //
                //     } else {
                //         // Esc, close button or outside click
                //         // isConfirm is undefined
                //     }
                // });
            })
        };
        $scope.association = {
            admins: []
        };
        $scope.addAssociation = function () {
            console.log($scope.association);
            let promise = AssociationService.addAssociation($scope.association);
            promise.then(function (data, err) {
                console.log(data);
                swal('添加成功！', '', 'success');
            })
        };
        $scope.news = {};
        $scope.addNews = function () {
            console.log($scope.news);
            let promise = NewsService.addNews($scope.news);
            promise.then(function (data, err) {
                console.log(data);
                swal('添加成功！', '', 'success');
            })
        };
        $scope.file = {};
        $scope.addFile = function () {
            console.log($scope.file);
            let promise = FileService.addFile($scope.file);
            promise.then(function (data, err) {
                console.log(data);
                swal('添加成功！', '', 'success');
            })
        };
        // _______________________________________________以上为各个数据的添加函数示例________________________________________
        let promise = NewsService.showAllNews();
        promise.then(function (value) {
            $scope.data = value;
        });
        // ____________________________________________________以上为获取各种数据全部列表的函数示例_____________________________
        $scope.editActivity = function () {
            console.log($scope.activity);
            let promise = ActivityService.editActivity($scope.request, $scope.activity);
            promise.then(function (data, err) {
                console.log(data);
                swal('添加成功！', '', 'success');
            })
        };
        $scope.editNews = function () {
            console.log($scope.news);
            let promise = NewsService.editNews($scope.request, $scope.news);
            promise.then(function (data, err) {
                console.log(data);
                swal('添加成功！', '', 'success');
            })
        };
        $scope.findNews = function () {
            console.log($scope.ID);
            promise = NewsService.findNewsById($scope.ID);
            promise.then(function (value, err) {
                if (err) {
                    console.log('tan90');
                }
                $scope.data = value;
                console.log($scope.data);
            })
        };
        //____________________________________已完成_____________________________________________________________
        $scope.attendActivity = function () {
            let promise = ActivityService.attendActivity($scope.studentId, $scope.activityId);
            promise.then(function (data, err) {
                console.log(data);
                swal('添加成功！', '', 'success');
            })
        }

        $scope.sendmail = function () {
            UserService.resetPwd()
        }

    })
    .controller('uploadAndDownloadTestCtrl', ['$scope', 'Upload', '$http', 'SystemService', function ($scope, Upload, $http, SystemService) {
        $scope.$watch('files', function () {
            $scope.uploadFile($scope.files);
        });
        // set default directive values
        // Upload.setDefaults( {ngf-keep:false ngf-accept:'image/*', ...} );
        $scope.uploadFile = function (files) {
            if (files && files.length) {
                for (let i = 0; i < files.length; i++) {
                    let file = files[i];
                    Upload.upload({
                        url: SystemService.getHostIP() + 'web/file/uploadFile', //此处url为向后台nodejs请求的路由
                        fields: {'username': $scope.username},
                        file: file
                    }).progress(function (evt) {
                        let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    }).error(function (data, status, headers, config) {
                        console.log('error status: ' + status);
                    })
                }
            }
        };

        $scope.download = function () {
            // let param = {'filename':$scope.filename}; //属性名漏了引号就不行了
            // console.log(param);
            // $http.get(SystemService.getHostIP() + 'web/file/download', {params: param}) //注意param传递和post的区别
            //     .then(function (restResult, status, headers, config) {
            //         console.log(restResult.data);
            //     })
            //     .catch(function (restResult, status, headers, config) {
            //         console.log(restResult.data.errorReason);
            //     });

            let form = $('<form>');   //定义一个form表单
            form.attr('style', 'display:none');   //在form表单中添加查询参数
            form.attr('target', '');
            form.attr('method', 'post');
            form.attr('action', SystemService.getHostIP() + 'web/file/download');

            let input1 = $('<input>');
            input1.attr('type', 'hidden');
            input1.attr('name', 'filename');
            input1.attr('value', $scope.filename);

            $('body').append(form);  //将表单放置在web中
            form.append(input1);   //将查询参数控件提交到表单上
            form.submit();   //表单提交
        };

        $scope.myImage = '';
        $scope.myCroppedImage = '';

        let handleFileSelect = function (evt) {
            let file = evt.currentTarget.files[0];
            console.log(file);

            let AllImgExt = '.jpg|.jpeg|.bmp|.png|';
            let extName = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();//（把路径中的所有字母全部转换为小写）
            if (AllImgExt.indexOf(extName + "|") === -1) {
                let ErrMsg = '请选择 ' + AllImgExt + ' 类型的文件<br/>当前文件类型为 ' + extName;
                swal('文件类型错误！', ErrMsg, 'error');
                return false;
            }

            let reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

        let first = 1;
        $scope.$watch('img', function () {
            if (first) {
                first--;
                return;
            }
            let img = $scope.img;
            console.log(img);
            let AllImgExt = '.jpg|.jpeg|.bmp|.png|';
            let extName = img.name.substring(img.name.lastIndexOf('.')).toLowerCase();//（把路径中的所有字母全部转换为小写）
            if (AllImgExt.indexOf(extName + "|") === -1) {
                let ErrMsg = '请选择 ' + AllImgExt + ' 类型的文件<br/>当前文件类型为 ' + extName;
                swal('文件类型错误！', ErrMsg, 'error');
                return false;
            }

            let reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.imgsrc = evt.target.result;
                });
            };
            reader.readAsDataURL(img);
        });

        $scope.uploadImg = function () {
            let img = $scope.img;
            console.log(img);
            if (img) {
                let file = img;
                Upload.upload({
                    url: SystemService.getHostIP() + 'web/file/uploadImg', //此处url为向后台nodejs请求的路由
                    fields: {'username': $scope.username},
                    file: file
                }).progress(function (evt) {
                    let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + ' uploaded. Response: ' + data);
                    swal('上传图片成功！', '文件名：' + config.file.name, 'success');
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                })
            }
        };
    }])



    //-------------------------------------- 主页 登录 注册 home login register----------------------------------------
    .controller('homeCtrl', function ($rootScope, $scope, $state, $cookieStore) {
        $cookieStore.put('currentState', 'home');
        $rootScope.ClearCenterNav = function () {
            $cookieStore.put('lastCenterNavStatus', "");
        }

    })
    .controller('aboutCtrl', function ($scope) {
        $scope.people = [
            {
                name: '傅凯琪',
                email: 'fu_kaiqi@qq.com',
                github: 'https://github.com/dreamhuan'
            },
            {
                name: '徐韬',
                email: '624126503@qq.com',
                github: 'https://github.com/duskcloudxu'
            },
            {
                name: '岑焕亚',
                email: 'cen_huanya@qq.com',
                github: 'https://github.com/Uniquec'
            },
            {
                name: '林一凡',
                email: 'nevermind1984@outlook.com',
                github: 'https://github.com/OceanApart'
            }
        ];
        $scope.openGithub = function (person) {
            window.open(person.github);
        }
    })
    .controller('dynamicsCtrl', function ($scope, $state, $http, $timeout, $cookieStore, NewsService) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'dynamics');

        // $http.get('../testdata/dynamics.json')
        //     .then(function (resdata) {
        //         console.log(resdata.data);
        //         $scope.datas = [];
        //         for (let i = 0; i < resdata.data.length; i++) {
        //             $timeout(function () {
        //                 $scope.datas.push(resdata.data[i]);
        //             }, 100 * i);
        //         }
        //     });

        let promise = NewsService.showAllNews();
        promise.then(function (data) {
            console.log(data);
            $scope.datas = data;
            // for (let i = 0; i < data.length; i++) {
            //     $timeout(function () {
            //         $scope.datas.push(data[i]);
            //     }, 100 * i);
            // }
        });
        $scope.newsInform = function (news) {
            // $cookieStore.put('currentNews', news);
            sessionStorage.setItem('currentNews', JSON.stringify(news));
            $state.go('newsInform');
        };
    })
    .controller('activityCtrl', function ($scope, $state, $http, $timeout, $cookieStore, ActivityService) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'activity');

        const promise = ActivityService.showAllActivity();
        promise.then(function (data) {
            console.log(data);
            $scope.data1 = [];
            $scope.data2 = [];
            for (let i = 0; i < data.length; i++) {
                if (i % 2)
                    $scope.data1.push(data[i]);
                else
                    $scope.data2.push(data[i]);
            }
        });
        $scope.activityInform = function (activity) {
            // $cookieStore.put('currentActivity', activity);
            sessionStorage.setItem('currentActivity', JSON.stringify(activity))
            $state.go('activityInform');
        };
        $scope.appear = function () {
            this.show = 1;
        }
        $scope.disappear = function () {
            this.show = 0;
        }
    })
    .controller('introductionCtrl', function ($scope, $state, $http, $timeout, $cookieStore, AssociationService) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'introduction');

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
            // $cookieStore.put('currentAssociation', club);
            sessionStorage.setItem('currentAssociation', JSON.stringify(club));
            $state.go('clubHomepage');
        }

    })
    .controller('registerCtrl', function ($scope, $state, UserService) {
        $scope.user = {};

        function resetFlag() {
            console.log('resetRegisterFlag!');
            $scope.user.studentIDerr = false;
            $scope.user.pwdTexterr = false;
            $scope.user.pwdText2err = false;
            $scope.user.emailerr = false;
        }

        function inputclick() {
            resetFlag();
            $scope.$apply();
        }

        angular.element('input').on('click', inputclick);
        $scope.register = function () {
            // console.log($scope.user);
            resetFlag();
            if (!$scope.user.studentID) {
                swal('出错啦！', '学号不能为空', 'error');
                $scope.user.studentIDerr = true;
                return;
            }
            if (!$scope.user.pwdText) {
                swal('出错啦！', '密码不能为空', 'error');
                $scope.user.pwdTexterr = true;
                return;
            }
            if (!$scope.user.pwdText2) {
                swal('出错啦！', '请再输入一次密码', 'error');
                $scope.user.pwdText2err = true;
                return;
            }
            if (!$scope.user.email) {
                swal('出错啦！', '邮箱不能为空', 'error');
                $scope.user.emailerr = true;
                return;
            }
            if (!$scope.user.name) {
                swal('出错啦！', '姓名不能为空', 'error');
                $scope.user.nameerr = true;
                return;
            }
            if ($scope.user.pwdText !== $scope.user.pwdText2) {
                swal('出错啦！', '两次密码不一致', 'error');
                $scope.user.pwdText2err = true;
                return;
            }
            if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test($scope.user.email)) {
                swal('出错啦！', '邮箱格式不正确', 'error');
                $scope.user.emailerr = true;
                return;
            }
            let promise = UserService.register($scope.user);

            promise.then(function (data) {
                swal('成功!', '注册成功', 'success');
                $state.go('activity');
            }, function (data) {
                swal('出错了!', '注册失败' + data, 'error');
            }).catch(function (err) {
                console.log(err);
            });

        };
    })
    .controller('loginCtrl', function ($scope, $rootScope, $state, UserService, SystemService, $cookieStore) {

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
                $rootScope.isLogin = true;
                $rootScope.headimage = data.user.headimage;
                console.log($rootScope.headimage);
                swal('成功!', '登录成功', 'success');
                let lastState = $cookieStore.get('currentState');
                if (lastState) {
                    $state.go(lastState);
                } else {
                    $state.go('activity');
                }
            }, function (data) {
                console.log(data);
                swal('出错了!', data, 'error');
            }).catch(function (err) {
                console.log(err);
            });
        };

        $scope.logout = function () {
            // console.log($scope.user);
            let user = $scope.user;
            UserService.logout();
            $rootScope.isLogin = false;
            swal('成功!', '已登出' + user.name, 'success');
            $state.go('activity');
        };

        $scope.resetPwd = function () {
            if (!$scope.user.studentID) {
                swal('出错啦', '请输入学号', 'error');
                return;
            }
            swal({
                title: '重置密码',
                text: '将会发送重置后的密码到您的邮箱',
                type: 'warning',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消',
            }).then(function (inputValue) {
                if (!inputValue) {
                    swal('出错啦', '请输入邮箱', 'error');
                    return;
                }
                if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(inputValue)) {
                    swal('出错啦！', '邮箱格式不正确', 'error');
                    return;
                }
                let promise = UserService.resetPwd($scope.user.studentID, inputValue);
                promise.then(function (data) {
                    swal('成功!', '重置密码成功', 'success');
                }, function (data) {
                    console.log(data);
                    swal('出错了!', data, 'error');
                }).catch(function (err) {
                    console.log(err);
                });

            });

            // // console.log($scope.user);
            // let user = $scope.user;
            // UserService.logout();
            // swal('成功!', '已登出' + user.name, 'success');
            // $state.go('activity');
        };
    })


    //---------------------------  个人空间（用户 管理员） userCenter  associationManagement ---------------------------
    .controller('userCenterCtrl', function ($cookieStore, $scope, $state, $http, SystemService, UserService) {
        let user = SystemService.getUser();
        if ($cookieStore.get('lastCenterNavStatus')) $scope.navStatus = $cookieStore.get('lastCenterNavStatus');
        console.log(user);
        if (!user) {
            swal('用户未登录!', '请登录', 'error');
            $state.go('login');
            return;
        }
        $scope.currentUser = user._id;
        let p1 = UserService.getLatestInformation($scope.currentUser);
        p1.then(function (value) {
            $scope.person = value;
        });
        $scope.cur = 1//当前目录的位置


    })
    .controller('myprofileCtrl', function ($scope, $timeout, $state, $http, UserService, NewsService, SystemService, ActivityService, $cookieStore) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'userCenter.myprofile');
        let user = SystemService.getUser();
        console.log(user);
        $scope.currentUser = user._id;
        let p1 = UserService.getLatestInformation($scope.currentUser);
        p1.then(function (value) {
            $scope.person = value;
        });
        let p2 = NewsService.showAllNews();
        let p3 = ActivityService.showAllActivity();
        Promise.all([p1, p2, p3]).then(function (value) {
            // console.log(value);
            $scope.data = [];
            $scope.res = [];
            let v1 = value[0];
            let v2 = value[1];
            let v3 = value[2];
            $scope.person = v1;
            // console.log($scope.person);
            console.log(v1, v2, v3);
            for (let i in v1.associations) {
                for (let j in v2) {
                    if (v1.associations[i] === v2[j].associationId) {
                        v2[j].type = '新闻';
                        $scope.data.push(v2[j]);
                    }
                }
                for (let j in v3) {
                    if (v1.associations[i] === v3[j].associationId) {
                        v3[j].type = '活动';
                        $scope.data.push(v3[j]);
                    }
                }
            }
            for (let i in  $scope.data) {
                // $timeout(function () {
                //     $scope.res.push($scope.data[i]);
                // }, 20 * i);
                $scope.res.push($scope.data[i]);
            }
            $scope.$apply();
            console.log($scope.res);

        });
        $scope.showDate = function (date) {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            let temp = new Date(date);
            let cur = Date.now();
            let diffDays = Math.ceil((cur - temp) / (1000 * 3600 * 24));
            return temp.getDay() + " " + monthNames[temp.getMonth()] + " · " + diffDays + "days";
        };
        $scope.view = function (target) {
            if (target.type === "活动") {
                // $cookieStore.put('currentActivity', target);
                sessionStorage.setItem('currentActivity', JSON.stringify(target));
                $state.go("activityInform");
                $cookieStore.put('lastCenterNavStatus', $scope.navStatus);
            }
            else {
                // $cookieStore.put('currentNews', target);
                sessionStorage.setItem('currentNews', JSON.stringify(target));
                $state.go("newsInform");
                $cookieStore.put('lastCenterNavStatus', $scope.navStatus);
            }
        };
        $scope.editInformation = function () {
            $state.go('userCenter.editInformation');
            $cookieStore.put('lastCenterNavStatus', $scope.navStatus);
        };
        $scope.hoverIn = function () {
            this.hoverEdit = true;
        };

        $scope.hoverOut = function () {
            this.hoverEdit = false;
        };


    })
    .controller('myAssAndActCtrl', function ($scope, $state, $http, UserService, ActivityService, SystemService, AssociationService, $cookieStore) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'userCenter.myAssAndAct');

        let user = SystemService.getUser();
        $scope.currentUser = user._id;
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
        };

        $scope.activityInform = function (item) {
            // $cookieStore.put('currentActivity', item);
            sessionStorage.setItem('currentActivity', JSON.stringify(item));
            $cookieStore.put('lastCenterNavStatus', $scope.navStatus);

            $state.go('activityInform');

        };

        $scope.clubHomepage = function (item) {
            // $cookieStore.put('currentAssociation', item);
            sessionStorage.setItem('currentAssociation', JSON.stringify(item));
            $cookieStore.put('lastCenterNavStatus', $scope.navStatus);

            $state.go('clubHomepage');

        };
        $scope.hoverIn = function () {
            this.hoverEdit = true;
        };

        $scope.hoverOut = function () {
            this.hoverEdit = false;
        };
        $scope.view = function (target) {
            if (target.type === "活动") {
                // $cookieStore.put('currentActivity', target);
                sessionStorage.setItem('currentActivity', JSON.stringify(target));
                $cookieStore.put('lastCenterNavStatus', $scope.navStatus);

                $state.go("activityInform");

            }
            else {
                // $cookieStore.put('currentNews', target);
                sessionStorage.setItem('currentNews', JSON.stringify(target));
                $cookieStore.put('lastCenterNavStatus', $scope.navStatus);

                $state.go("newsInform");
            }
        };

    })
    .controller('mymanagementCtrl', function ($scope, $state, $http, UserService, ActivityService, SystemService, AssociationService, $cookieStore) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'userCenter.mymanagement');
        let user = SystemService.getUser();
        $scope.currentUser = user._id;
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
        });
        $scope.activityManagement = function (item) {
            // $cookieStore.put('currentAssociation', item);
            sessionStorage.setItem('currentAssociation', JSON.stringify(item));
            $cookieStore.put('lastCenterNavStatus', $scope.navStatus);
            $cookieStore.put('lastManaNavStatus', "");
            $state.go('associationManagement.dataManagement');
        };
        $scope.hoverIn = function () {
            this.hoverEdit = true;
        };

        $scope.hoverOut = function () {
            this.hoverEdit = false;
        };
    })
    .controller('editInformationCtrl', function ($scope, $state, $http, UserService, ActivityService, SystemService, AssociationService, $cookieStore, Upload) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'userCenter.editInformation');
        $scope.user = SystemService.getUser();
        let promise = UserService.getLatestInformation($scope.user._id);
        let submituser;
        promise.then(function (value) {
            $scope.user = value;
            submituser = $scope.user;
        });
        console.log($scope.user);
        $scope.submitInformation = function () {
            if ($scope.user.pwdOld && !$scope.user.pwdNew) {
                swal('出错啦', '请输入新密码', 'error');
                return;
            }
            if (!$scope.user.pwdOld && $scope.user.pwdNew) {
                swal('出错啦', '请输入旧密码', 'error');
                return;
            }
            submituser.nickname = $scope.user.nickname;
            submituser.email = $scope.user.email;
            submituser.mobile = $scope.user.mobile;
            submituser.pwdOld = $scope.user.pwdOld;
            submituser.pwdNew = $scope.user.pwdNew;
            if (isChangeImg) {
                uploadImg(function () {
                    submituser.headimage = "/web/file/showImg?location=userheadimg&name="
                        + $scope.user.studentID
                        + $scope.img.name;

                    let promise = UserService.editUser(submituser);
                    promise.then(function (value) {
                        swal("修改成功", "", "success");
                        $state.go(lastState);
                    }, function (data) {
                        swal('出错了！', data, 'error');
                    })
                });

            } else {
                let promise = UserService.editUser(submituser);
                promise.then(function (value) {
                    swal("修改成功", "", "success");
                    $state.go(lastState);
                }, function (data) {
                    swal('出错了！', data, 'error');
                })
            }

        };
        $scope.back = function () {
            $state.go(lastState);
        };

        let isChangeImg = false;
        $scope.changeImage = function () {
            isChangeImg = true;
            let input = angular.element('#headimg');
            input.click();
        };

        let first = 1;
        $scope.$watch('img', function () {
            if (first) {
                first--;
                return;
            }
            if (!$scope.img) return;
            let img = $scope.img;
            console.log(img);
            let AllImgExt = '.jpg|.jpeg|.bmp|.png|';
            let extName = img.name.substring(img.name.lastIndexOf('.')).toLowerCase();//（把路径中的所有字母全部转换为小写）
            if (AllImgExt.indexOf(extName + "|") === -1) {
                let ErrMsg = '请选择 ' + AllImgExt + ' 类型的文件<br/>当前文件类型为 ' + extName;
                swal('文件类型错误！', ErrMsg, 'error');
                isChangeImg = false;
                return false;
            }

            let reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.user.headimage = evt.target.result;
                });
            };
            reader.readAsDataURL(img);
        });

        function uploadImg(callback) {
            let img = $scope.img;
            console.log(img);
            if (img) {
                Upload.upload({
                    url: SystemService.getHostIP() + 'web/file/uploadImg', //此处url为向后台nodejs请求的路由
                    fields: {'location': 'userheadimg', 'newImgName': $scope.user.studentID + $scope.img.name},
                    file: img
                }).progress(function (evt) {
                    let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + ' uploaded. Response: ' + data);
                    // swal('上传图片成功！', '文件名：' + config.file.name, 'success');
                    callback();

                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                })
            }
        }


    })
    //________________________________社团管理________________________________________
    .controller('associationManagementCtrl', function ($scope, $state, $http, SystemService, $cookieStore) {
      $scope.cur = 1//当前目录的位置
      let user = SystemService.getUser();
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'associationManagement.dataManagement');
        if ($cookieStore.get('lastManaNavStatus')) $scope.navStatus = $cookieStore.get('lastManaNavStatus');

        // $scope.AssociationName = $cookieStore.get('currentAssociation').name;
        $scope.AssociationName = JSON.parse(sessionStorage.getItem('currentAssociation')).name;
        console.log(user);
        if (!user) {
            swal('用户未登录!', '请登录', 'error');
            $state.go('login');
            return;
        }
        $scope.flag = 0;
        $scope.back = function () {
            if ($scope.flag === 1) {
                $state.go('userCenter.mymanagement');
            }
        };
        $scope.change = function (event) {
            console.log(event);
            $(event.target).text("返回").css("cursor", "pointer");
            $scope.flag = 1;

        };
        $scope.changeBack = function (event) {
            console.log(event);
            event.target.innerHTML = $scope.AssociationName;
            $scope.flag = 0;
        }
    })
    .controller('activityManagementCtrl', function ($scope, $state, $http, ActivityService, $cookieStore) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'associationManagement.activityManagement');

        // $scope.currentAssociation = $cookieStore.get('currentAssociation')._id;
        $scope.currentAssociation = JSON.parse(sessionStorage.getItem('currentAssociation'))._id;
        let promise = ActivityService.showAllActivityByAssociationId($scope.currentAssociation);
        promise.then(function (value) {
            $scope.data = value;
            // console.log($scope.data);
            $scope.dateArray = [];
            let temp;
            for (let i in $scope.data) {
                temp = new Date($scope.data[i].time);
                $scope.dateArray.push(temp.toDateString());
            }
            // console.log($scope.dateArray);
        });
        $scope.add = function () {
            // $cookieStore.put('currentActivity', {});
            sessionStorage.setItem('currentActivity', JSON.stringify({}));
            $cookieStore.put('lastManaNavStatus', $scope.navStatus);
            $state.go('activityEdit');
        };
        $scope.delActivity = function (activityId) {
            swal({
                title: '确定删除么?',
                text: "该操作不可撤销",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '确认删除',
                cancelButtonText: '取消'
            }).then(function () {
                let p = ActivityService.delActivity(activityId);
                p.then(function (data, err) {
                    if (err)
                        swal("删除失败", "未知错误");
                    swal("删除成功", "该条活动已被删除", "success");
                    $state.reload();
                })
            });

        };
        $scope.activityInform = function (item) {
            // $cookieStore.put('currentActivity', item);
            sessionStorage.setItem('currentActivity', JSON.stringify(item));
            $cookieStore.put('lastManaNavStatus', $scope.navStatus);

            $state.go('activityInform');
        };
        $scope.activityEdit = function (item) {
            // $cookieStore.put('currentActivity', item);
            sessionStorage.setItem('currentActivity', JSON.stringify(item));
            $cookieStore.put('lastManaNavStatus', $scope.navStatus);

            $state.go('activityEdit');
        };
        $scope.hoverIn = function () {
            this.hoverEdit = true;
        };

        $scope.hoverOut = function () {
            this.hoverEdit = false;
        };
        $scope.showDate = function (date) {
            let temp = new Date(date);
            return temp.toDateString();
        };
        $scope.viewAttendedMember = function (targetActivityId) {
            $cookieStore.put('lastActivityId', targetActivityId);
            console.log(targetActivityId);
            $state.go("associationManagement.viewAttendedMember");
        }
    })
    .controller('dataManagementCtrl', function ($scope, $state, $http, FileService, $cookieStore, SystemService, Upload) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'associationManagement.dataManagement');
        // $scope.currentAssociation = $cookieStore.get('currentAssociation')._id;
        $scope.currentAssociation = JSON.parse(sessionStorage.getItem('currentAssociation'))._id;
        // console.log($scope.currentAssociation);
        let promise = FileService.showAllFileByAssociationId($scope.currentAssociation);
        promise.then(function (value) {
            $scope.data = value;
            // console.log($scope.data);
            $scope.dateArray = [];
            let temp;
            for (let i in $scope.data) {
                temp = new Date($scope.data[i].time)
                $scope.dateArray.push(temp.toDateString());
            }
            // console.log($scope.dateArray);
        });

        $scope.addFile = function () {

            swal({
                title: '上传资料',
                text: '输入资料描述',
                type: 'info',
                input: 'text',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(function (inputValue) {
                swal({
                    title: '上传资料',
                    type: 'info',
                    input: 'file',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(function (inputFile) {
                    Upload.upload({
                        url: SystemService.getHostIP() + 'web/file/uploadFile', //此处url为向后台nodejs请求的路由
                        fields: {'AssociationId': $scope.currentAssociation},
                        file: inputFile
                    }).progress(function (evt) {
                        let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        console.log('file ' + config.file.name + 'uploaded. Response: ' + data);

                        let file = {
                            title: inputFile.name,
                            content: inputValue,
                            url: 'upload/file/' + $scope.currentAssociation + inputFile.name,
                            associationId: $scope.currentAssociation
                        };
                        let promise = FileService.addFile(file);
                        promise.then(function (value) {
                            $scope.data.push(value);
                            let temp = new Date(value.time);
                            $scope.dateArray.push(temp.toDateString());
                            swal('成功', '上传成功', 'success');
                        }, function (data) {
                            swal('出错了！', data, 'error');
                        })

                    }).error(function (data, status, headers, config) {
                        console.log('error status: ' + status);
                    })
                });
            })
        };

        $scope.delFile = function (fileId) {
            swal({
                title: '确定删除么?',
                text: "该操作不可撤销",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '确认删除',
                cancelButtonText: '取消'
            }).then(function () {
                let p = FileService.delFile(fileId);
                p.then(function (data, err) {
                    if (err)
                        swal("删除失败", "未知错误");
                    swal("删除成功", "资料已被删除", "success");
                    $state.reload();
                })
            });
        };

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

        $scope.hoverIn = function () {
            this.hoverEdit = true;
        };

        $scope.hoverOut = function () {
            this.hoverEdit = false;
        };

    })
    .controller('newsManagementCtrl', function ($scope, $state, $http, NewsService, $cookieStore, SystemService) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'associationManagement.newsManagement');
        let user = SystemService.getUser();
        $scope.currentUser = user._id;
        // $scope.currentAssociation = $cookieStore.get('currentAssociation')._id;
        $scope.currentAssociation = JSON.parse(sessionStorage.getItem('currentAssociation'))._id;
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
        });
        $scope.add = function () {
            // $cookieStore.put('currentNews', {});
            sessionStorage.setItem('currentNews', JSON.stringify({}));
            $cookieStore.put('lastManaNavStatus', $scope.navStatus);

            $state.go('newsEdit');
        };
        $scope.delNews = function (newsId) {
            swal({
                title: '确定删除么?',
                text: "该操作不可撤销",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '确认删除',
                cancelButtonText: '取消'
            }).then(function () {
                let p = NewsService.delNews(newsId);
                p.then(function (data, err) {
                    if (err)
                        swal("删除失败", "未知错误");
                    swal("删除成功", "该条新闻已被删除", "success");
                    $state.reload();
                })
            })
        };
        $scope.newsInform = function (news) {
            // $cookieStore.put('currentNews', news);
            sessionStorage.setItem('currentNews', JSON.stringify(news));
            $cookieStore.put('lastManaNavStatus', $scope.navStatus);

            $state.go('newsInform');
        };
        $scope.newsEdit = function (news) {
            // $cookieStore.put('currentNews', news);
            sessionStorage.setItem('currentNews', JSON.stringify(news));
            $cookieStore.put('lastManaNavStatus', $scope.navStatus);

            $state.go('newsEdit');
        }
        $scope.hoverIn = function () {
            this.hoverEdit = true;
        };

        $scope.hoverOut = function () {
            this.hoverEdit = false;
        };
        $scope.showDate = function (date) {
            let temp = new Date(date);
            return temp.toDateString();
        };
    })
    .controller('memberManagementCtrl', function ($scope, $state, $http, AssociationService, UserService, $cookieStore, SystemService) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'associationManagement.memberManagement');
        let user = SystemService.getUser();
        $scope.currentUser = user._id;
        // $scope.currentAssociation = $cookieStore.get('currentAssociation')._id;
        $scope.currentAssociation = JSON.parse(sessionStorage.getItem('currentAssociation'))._id;
        let p1 = AssociationService.findAssociationById($scope.currentAssociation);
        let p2 = UserService.showAllUser();
        Promise.all([p1, p2]).then(function (value) {
            $scope.member = [];
            let v1 = value[0].members;
            let v2 = value[1];
            let v3 = value[0].application;
            console.log(v1);
            console.log(v2);
            for (let i in v1) {
                for (let j in v2) {
                    if (v1[i] === v2[j]._id)
                        $scope.member.push(v2[j]);
                }
            }
            let admin = value[0].admins;
            for (let i in $scope.member) {

                if ($scope.member[i]._id === value[0].proprieterId) {
                    $scope.member[i].type = "社长";
                    continue;
                }
                let flag = 0;
                console.log(admin);
                for (let j in admin) {
                    if ($scope.member[i]._id === admin[j]) {
                        $scope.member[i].type = "管理员";
                        flag = 1;
                    }
                    if (flag) break;
                }
                if (flag) continue;
                $scope.member[i].type = "社员";
            }
            for (let i in v3) {
                for (let j in v2) {
                    if (v3[i].memberId === v2[j]._id) {
                        v2[j].type = "申请者";
                        v2[j].statement = v3[i].statement;
                        $scope.member.push(v2[j]);
                    }
                }
            }
            $scope.$apply();
            console.log($scope.member);
        });
        $scope.delMember = function (memberId) {
            swal({
                title: '确定删除么?',
                text: "该操作不可撤销",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '确认删除',
                cancelButtonText: '取消'
            }).then(function () {
                let p = AssociationService.delMember($scope.currentAssociation, $scope.currentUser, memberId);
                p.then(function (data, err) {
                    if (data == 'failed') {
                        swal("删除失败", "你没有相应的权限！", "error");
                    }
                    else {
                        swal("删除成功", "该成员已被移出社团", "success");
                        $state.go('associationManagement.memberManagement');
                    }
                })
                $scope.$apply();
            });
        }
        $scope.showMemberInfo = function (target) {
            swal({
                imageUrl: target.headimage,
                imageWidth: '100',
                imageHeight: "100",
                html: "姓名:" + target.name + '<br>' + "学号:" + target.studentID + '<br>' + "性别:" + target.sex + '<br>' + "昵称:" + target.nickname + '<br>',
            });
        }
        $scope.showApplicationInfo = function (target) {
            swal({
                imageUrl: target.headimage,
                imageWidth: '100',
                imageHeight: "100",
                html: "姓名:" + target.name + '<br>' + "学号:" + target.studentID + '<br>' + "性别:" + target.sex + '<br>' + "昵称:" + target.nickname + '<br>' + "申请理由:" + target.statement + '<br>',
            });
        }
        $scope.addAdmin = function (target) {
            swal({
                title: '提升为管理员',
                text: "确认提升为管理员么",
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(function () {
                let p = AssociationService.addAdmin($scope.currentAssociation, $scope.currentUser, target._id);
                p.then(function (data, err) {
                    if (data === 'failed') {
                        swal("提升失败", "你没有相应的权限！", "error");
                    }
                    else if (data === 'alreadyHad') {
                        swal("提升失败", "该用户已经是管理员了", "error");
                    }
                    else {
                        swal("提升成功", "py交易完成", "success");
                        $state.go('associationManagement.memberManagement');
                    }
                })
            })
        }
        $scope.hoverIn = function () {
            this.hoverEdit = true;
        };

        $scope.hoverOut = function () {
            this.hoverEdit = false;
        };
        $scope.addMember = function (target) {
            swal({
                title: '加入社团',
                text: "该申请者将加入社团",
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(function () {
                let p = AssociationService.addMember($scope.currentAssociation, target._id);
                let p2 = AssociationService.delApply($scope.currentAssociation, target._id);
                p.then(function (data, err) {
                    if (err)
                        swal("提升失败", "未知原因！", "error");
                    else {
                        swal("提升成功", "py交易完成", "success");
                        $state.go('associationManagement.memberManagement');
                    }
                })
            })
        }
        $scope.denyApplication = function (targetId) {
            swal({
                title: '拒绝该名申请者',
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(function () {
                let p = AssociationService.delApply($scope.currentAssociation, targetId);
                p.then(function (data, err) {
                    if (err)
                        swal("操作失败", "未知原因！", "error");
                    else {
                        swal("操作成功", "py交易完成", "success");
                        $state.go('associationManagement.memberManagement');
                    }
                })
            })
        }

    })
    .controller('viewAttendedMemberCtrl', function ($scope, $state, $http, ActivityService, UserService, $cookieStore, SystemService) {
        $scope.targetActivityId = $cookieStore.get("lastActivityId");//放在cookies里面的目标的ID
        let p1 = ActivityService.findActivityById($scope.targetActivityId);
        let p2 = UserService.showAllUser();
        Promise.all([p1, p2]).then(function (value) {
            $scope.member = [];
            let v1 = value[0].attendingStudent;
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
        });

        $scope.hoverIn = function () {
            this.hoverEdit = true;
        };

        $scope.hoverOut = function () {
            this.hoverEdit = false;
        };

        $scope.showMemberInfo = function (target) {
            swal({
                imageUrl: target.headimage,
                imageWidth: '100',
                imageHeight: "100",
                html: "姓名:" + target.name + '<br>' + "学号:" + target.studentID + '<br>' + "性别:" + target.sex + '<br>' + "昵称:" + target.nickname + '<br>',
            });
        }
    })
    // .controller('showApplicationCtrl', function ($scope, $state, $http, $cookieStore) {
    //
    // })

    .controller('addNewAssociationCtrl', function ($scope, $state, $http, AssociationService, $cookieStore, SystemService, Upload) {
        $scope.newAssociation = {};
        let user = SystemService.getUser();
        if (!user) {
            swal("请登录以后操作！", "error");
            $state.go("login");
            return;
        }
        $scope.submitInformation = function () {

            if (!$scope.newAssociation.name) {
                swal('出错啦', '请输入社团名', 'error');
                return;
            }
            if (!$scope.newAssociation.introduction) {
                swal('出错啦', '请输入社团简介', 'error');
                return;
            }
            if (!$scope.newAssociation.logoimage) {
                swal('出错啦', '请选择社团logo', 'error');
                return;
            }
            $scope.newAssociation.proprieterId = user._id;
            swal({
                title: '创建社团',
                text: '创建后无法修改!',
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(function (isConfirm) {
                if (!isConfirm) return;
                if (isChangeImg) {
                    uploadImg(function () {
                        $scope.newAssociation.logoimage = "/web/file/showImg?location=clubheadimg&name="
                            + user.studentID
                            + $scope.img.name;

                        let promise = AssociationService.addAssociation($scope.newAssociation);
                        promise.then(function (data) {
                            swal("成功", "py交易完成", "success");
                        }, function (err) {
                            swal("失败", err, "error");
                        })
                    });

                } else {
                    let promise = AssociationService.addAssociation($scope.newAssociation);
                    promise.then(function (data) {
                        swal("成功", "py交易完成", "success");
                    }, function (err) {
                        swal("失败", err, "error");
                    })
                }
            });
        };

        let isChangeImg = false;
        $scope.changeImage = function () {
            isChangeImg = true;
            let input = angular.element('#headimg');
            input.click();
        };

        let first = 1;
        $scope.$watch('img', function () {
            if (first) {
                first--;
                return;
            }
            if (!$scope.img) return;
            let img = $scope.img;
            console.log(img);
            let AllImgExt = '.jpg|.jpeg|.bmp|.png|';
            let extName = img.name.substring(img.name.lastIndexOf('.')).toLowerCase();//（把路径中的所有字母全部转换为小写）
            if (AllImgExt.indexOf(extName + "|") === -1) {
                let ErrMsg = '请选择 ' + AllImgExt + ' 类型的文件<br/>当前文件类型为 ' + extName;
                swal('文件类型错误！', ErrMsg, 'error');
                isChangeImg = false;
                return false;
            }

            let reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.newAssociation.logoimage = evt.target.result;
                });
            };
            reader.readAsDataURL(img);
        });

        function uploadImg(callback) {
            let img = $scope.img;
            console.log(img);
            if (img) {
                Upload.upload({
                    url: SystemService.getHostIP() + 'web/file/uploadImg', //此处url为向后台nodejs请求的路由
                    fields: {'location': 'clubheadimg', 'newImgName': user.studentID + $scope.img.name},
                    file: img
                }).progress(function (evt) {
                    let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + ' uploaded. Response: ' + data);
                    // swal('上传图片成功！', '文件名：' + config.file.name, 'success');
                    callback();

                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                })
            }
        }


    })
    //-------------------------------------- 活动新闻的编辑和展示 activity news----------------------------------------
    .controller('activityInformCtrl', function ($scope, $state, $http, $cookieStore, SystemService, ActivityService) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'activityInform');

        // $scope.activity = $cookieStore.get('currentActivity');
        $scope.activity = JSON.parse(sessionStorage.getItem('currentActivity'));
        console.log($scope.activity);
        if (!$scope.activity) {
            swal('数据错误!', '请重试!', 'error');
            $state.go('activity');
        }
        $scope.enter = function () {
            let user = SystemService.getUser();
            console.log(user);
            if (!user) {
                swal('用户未登录!', '请登录', 'error');
                // $state.go('login');
                return;
            }

            swal({
                title: '报名活动？',
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(function (isConfirm) {
                if (!isConfirm) return;
                if (isConfirm) {
                    let promise = ActivityService.attendActivity(user._id, $scope.activity._id);
                    promise.then(function (data) {
                        swal("成功", "报名成功", "success");
                        console.log(lastState);
                        $state.go(lastState);
                    }, function (err) {
                        swal("失败！", err, "error");
                    });

                }
            });
        };
        $scope.back = function () {
            console.log(lastState);
            $state.go(lastState);
        };
    })
    .controller('newsInformCtrl', function ($scope, $state, $http, $cookieStore) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'newsInform');

        // $scope.news = $cookieStore.get('currentNews');
        $scope.news = JSON.parse(sessionStorage.getItem('currentNews'))
        console.log($scope.news);
        $scope.back = function () {
            $state.go(lastState);
        };
    })
    .controller('activityEditCtrl', function ($scope, $state, $http, $cookieStore, ActivityService) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'activityEdit');

        const editor = new MediumEditor('.MediumEditor',{
            placeholder: {
                text: '',
                hideOnClick: true
            }
        });

        // $scope.activity = $cookieStore.get('currentActivity');
        $scope.activity = JSON.parse(sessionStorage.getItem('currentActivity'));
        document.querySelector('.MediumEditor').innerHTML = $scope.activity.content || '';
        $scope.activity.time = $scope.activity.time && new Date($scope.activity.time);
        // $scope.activity.association = $cookieStore.get('currentAssociation');
        $scope.activity.association = JSON.parse(sessionStorage.getItem('currentAssociation'));
        console.log($scope.activity);

        $scope.submit = function () {
            console.log(document.querySelector('.MediumEditor').innerHTML);
            $scope.activity.content = document.querySelector('.MediumEditor').innerHTML;
            console.log($scope.activity);
            if (!$scope.activity.content) {
                swal('出错了！', '活动内容不能为空！', 'error');
                return;
            }
            if (!$scope.activity.title) {
                swal('出错了！', '活动名称不能为空！', 'error');
                return;
            }
            if (!$scope.activity.time) {
                swal('出错了！', '活动时间不能为空！', 'error');
                return;
            }
            if (!$scope.activity.place) {
                swal('出错了！', '活动地点不能为空！', 'error');
                return;
            }
            if (!$scope.activity._id) {
                let promise = ActivityService.addActivity($scope.activity);
                promise.then(function (value) {
                    swal('添加成功！', value.title, 'success');
                    $state.go(lastState);
                }, function (err) {
                    swal('出错了！', err, 'error');
                })
            } else {
                let promise = ActivityService.editActivity($scope.activity._id, $scope.activity);
                promise.then(function (value) {
                    swal('修改成功！', value.title, 'success');
                    $state.go(lastState);
                }, function (err) {
                    swal('出错了！', err, 'error');
                })
            }
        };
        $scope.cancel = function () {
            // $cookieStore.put('currentActivity', {});
            sessionStorage.setItem('currentActivity', JSON.stringify({}));
            $state.go(lastState);
        };
    })
    .controller('newsEditCtrl', function ($scope, $state, $http, $cookieStore, Upload, SystemService, NewsService) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'newsEdit');

        const editor = new MediumEditor('.MediumEditor',{
            placeholder: {
                text: '',
                hideOnClick: true
            }
        });

        // $scope.news = $cookieStore.get('currentNews');
        $scope.news = JSON.parse(sessionStorage.getItem('currentNews'));
        document.querySelector('.MediumEditor').innerHTML = $scope.news.content || '';
        // $scope.association = $cookieStore.get('currentAssociation');
        $scope.association = JSON.parse(sessionStorage.getItem('currentAssociation'));


        let isChangeImg = false;
        $scope.changeImage = function () {
            isChangeImg = true;
            console.log('changeImg');
        };

        let first = 1;
        $scope.$watch('img', function () {
            if (first) {
                first--;
                return;
            }
            if (!$scope.img) return;
            let img = $scope.img;
            console.log(img);
            let AllImgExt = '.jpg|.jpeg|.bmp|.png|';
            let extName = img.name.substring(img.name.lastIndexOf('.')).toLowerCase();//（把路径中的所有字母全部转换为小写）
            if (AllImgExt.indexOf(extName + "|") === -1) {
                let ErrMsg = '请选择 ' + AllImgExt + ' 类型的文件<br/>当前文件类型为 ' + extName;
                swal('文件类型错误！', ErrMsg, 'error');
                isChangeImg = false;
                return false;
            }

            let reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.news.imgSrc = evt.target.result;
                });
            };
            reader.readAsDataURL(img);
        });


        $scope.submit = function () {
            $scope.news.content = document.querySelector('.MediumEditor').innerHTML;
            console.log($scope.news);
            if (!$scope.news.content) {
                swal('出错啦！', '内容不能为空', 'error');
                return;
            }
            if (!$scope.news.title) {
                swal('出错啦！', '标题不能为空', 'error');
                return;
            }
            if (!$scope.img && !$scope.news.imgSrc) {
                swal('出错啦！', '封面图片不能为空', 'error');
                return;
            }


            if (isChangeImg) {
                let img = $scope.img;
                uploadImg(img, 'newsimg', $scope.association._id + $scope.img.name, submitNews);

            } else {
                submitNews()
            }
        };

        function submitNews() {
            console.log($scope.news);
            let news = {
                title: $scope.news.title,
                content: $scope.news.content,
                associationId: $scope.association._id,
            };
            if ($scope.img) {
                news.imgSrc = '/web/file/showImg?location=newsimg&name=' + $scope.association._id + $scope.img.name;
            }
            let promise;
            if (!$scope.news._id) {
                promise = NewsService.addNews(news);
                promise.then(function (value) {
                    swal('添加成功！', value.title, 'success');
                    $state.go(lastState);
                }, function (err) {
                    swal('出错了！', err, 'error');
                })
            } else {
                promise = NewsService.editNews($scope.news._id, news);
                promise.then(function (value) {
                    swal('修改成功！', value.title, 'success');
                    $state.go(lastState);
                }, function (err) {
                    swal('出错了！', err, 'error');
                })
            }

        }

        function uploadImg(img, location, newImgName, callback) {

            console.log(img);
            if (img) {
                Upload.upload({
                    url: SystemService.getHostIP() + 'web/file/uploadImg', //此处url为向后台nodejs请求的路由
                    fields: {'location': location, 'newImgName': newImgName},
                    file: img
                }).progress(function (evt) {
                    let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + ' uploaded. Response: ' + data);
                    // swal('上传图片成功！', '文件名：' + config.file.name, 'success');
                    callback();

                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                })
            }
        }

        $scope.cancel = function () {
            // $cookieStore.put('currentNews', {});
            sessionStorage.setItem('currentNews', JSON.stringify({}));
            $state.go(lastState);
        };
    })



    //--------------------------------------  社团空间 clubHomepage  ----------------------------------------------
    .controller('clubHomepageCtrl', function ($scope, $state, $http, $cookieStore) {
        $state.go("testclubHomepage");
        // $scope.club = $cookieStore.get('currentAssociation');
        $scope.club = JSON.parse(sessionStorage.getItem('currentAssociation'));
        console.log($scope.club);

        $scope.clubIntroduction = function () {
            $state.go('clubHomepage.clubIntroduction');
            $('html,body').animate({scrollTop: $('.dyj-middle-border').offset().top}, 600);
        };
        $scope.clubActivity = function () {
            $state.go('clubHomepage.clubActivity');
            $('html,body').animate({scrollTop: $('.dyj-middle-border').offset().top}, 600);
        };
        $scope.clubApplication = function () {
            $state.go('clubHomepage.clubApplication');
            $('html,body').animate({scrollTop: $('.dyj-middle-border').offset().top}, 600);
        };
        $scope.clubDownload = function () {
            $state.go('clubHomepage.clubDownload');
            $('html,body').animate({scrollTop: $('.dyj-middle-border').offset().top}, 600);
        };

    })

    .controller('clubIntroductionCtrl', function ($scope, $state, $http, $timeout, $cookieStore) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'clubHomepage.clubIntroduction');

        // $scope.club = $cookieStore.get('currentAssociation');
        $scope.club = JSON.parse(sessionStorage.getItem('currentAssociation'));
        console.log($scope.club);

    })

    .controller('clubActivityCtrl', function ($scope, $state, $http, $timeout, $cookieStore, ActivityService) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'clubHomepage.clubActivity');

        // let club = $cookieStore.get('currentAssociation');
        let club = JSON.parse(sessionStorage.getItem('currentAssociation'));
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
            // $cookieStore.put('currentActivity', activity);
            sessionStorage.setItem('currentActivity', JSON.stringify(activity));
            $state.go('activityInform');
        };
    })

    .controller('clubApplicationCtrl', function ($scope, $state, $http, $cookieStore, SystemService) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'application');

        $scope.apply = function () {
            let user = SystemService.getUser();
            if (!user) {
                swal('出错了!', '请登录', 'error');
                return;
            }
            $scope.user = user;
            // console.log($scope.user);
            let promise = UserService.apply($scope.user);

            promise.then(function (data) {
                swal('成功!', '申请成功', 'success');
                $state.go('home');
            }, function (data) {
                swal('出错了!', '提交失败' + data, 'error');
            }).catch(function (err) {
                console.log(err);
            });
        };
    })

    .controller('clubDownloadCtrl', function ($scope, $state, $http, $timeout, $cookieStore, SystemService, FileService) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);

        let user = SystemService.getUser();
        console.log(user);
        if (!user) {
            swal('用户未登录!', '请登录', 'error');
            $state.go('clubHomepage');
            return;
        }

        $cookieStore.put('currentState', 'clubHomepage.clubDownload');

        // let club = $cookieStore.get('currentAssociation');
        let club = JSON.parse(sessionStorage.getItem('currentAssociation'));
        let promise = FileService.showAllFileByAssociationId(club._id);
        promise.then(function (data) {
            console.log(data);
            $scope.datas = [];
            for (let i = 0; i < data.length; i++) {
                $timeout(function () {
                    $scope.datas.push(data[i]);
                }, 100 * i);
            }
        })
    })

    .controller('testclubHomepageCtrl', function ($scope, $state, $http, $cookieStore) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'testclubHomepage');
        // $scope.club = $cookieStore.get('currentAssociation');
        $scope.club = JSON.parse(sessionStorage.getItem('currentAssociation'));
        $state.go('testclubHomepage.homepage');
        console.log($scope.club);
        $scope.back = function () {
            $state.go(lastState)
        }
        $scope.cur = 1//当前目录的位置
    })
    .controller('homepageCtrl', function ($scope, $state, $http, $cookieStore, ActivityService, NewsService, $timeout, AssociationService, SystemService) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'testclubHomepage.homepage');
        // $scope.club = $cookieStore.get('currentAssociation');
        $scope.club = JSON.parse(sessionStorage.getItem('currentAssociation'));
        $scope.user = SystemService.getUser();
        // if (!$scope.club) $scope.club = $cookieStore.get('currentAssociation');
        if (!$scope.club) $scope.club = JSON.parse(sessionStorage.getItem('currentAssociation'));
        console.log($scope.club);
        let p1 = ActivityService.showAllActivityByAssociationId($scope.club._id);
        let p2 = NewsService.showAllNewsByAssociationId($scope.club._id);
        Promise.all([p1, p2]).then(function (value) {
            let v1 = value[0];
            let v2 = value[1];
            $scope.data = [];
            console.log(v1);
            console.log(v2);
            for (let i in v1) {
                v1[i].type = '活动';
                $scope.data.push(v1[i]);

            }
            for (let i in v2) {
                v2[i].type = '新闻';
                $scope.data.push(v2[i]);
            }
            $scope.$apply();
        });
        $scope.showDate = function (date) {
            let temp = new Date(date);
            return temp.toDateString();
        };
        $scope.hoverIn = function () {
            this.hoverEdit = true;
        };

        $scope.hoverOut = function () {
            this.hoverEdit = false;
        };
        $scope.view = function (target) {
            if (target.type === "活动") {
                // $cookieStore.put('currentActivity', target);
                sessionStorage.setItem('currentActivity', JSON.stringify(target));
                $state.go("activityInform");
            }
            else {
                // $cookieStore.put('currentNews', target);
                sessionStorage.setItem('currentNews', JSON.stringify(target));
                $state.go("newsInform");
            }
        };
        $scope.application = function () {
            let user = SystemService.getUser();
            console.log(user);
            if (!user) {
                swal('用户未登录!', '请登录', 'error');
                // $state.go('login');
                return;
            }

            swal({
                title: '加入社团',
                type: 'question',
                text: '请输入申请理由',
                input: 'text',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(function (text) {
                if (!text) {
                    console.log(text);
                    swal("出错啦", "请输入申请理由", "error");
                    return;
                }
                console.log(text);
                let p = AssociationService.apply($scope.club._id, $scope.user._id, text);
                p.then(function (data, err) {
                    if (err) {
                        swal("未知错误", "error");
                    }
                    else if (data === "alreadyHad")
                        swal("申请失败", "你已在社团中", "error");
                    else if (data === "alreadyapplied")
                        swal("申请失败", "你已经申请过了", "error");
                    else
                        swal("申请成功", "等待审核", "success");
                })
            })
        }

    })
    .controller('datapageCtrl', function ($scope, $state, $http, $cookieStore, $timeout, SystemService, FileService) {
        let lastState = $cookieStore.get('currentState');
        $cookieStore.put('lastState', lastState);
        $cookieStore.put('currentState', 'testclubHomepage.datapage');
        // $scope.club = $cookieStore.get('currentAssociation');
        $scope.club = JSON.parse(sessionStorage.getItem('currentAssociation'));
        console.log($scope.club);
        let user = SystemService.getUser();
        console.log(user);
        if (!user) {
            swal('用户未登录!', '请登录', 'error');
            $state.go('clubHomepage');
            return;
        }
        // let club = $cookieStore.get('currentAssociation');
        let club = JSON.parse(sessionStorage.getItem('currentAssociation'));
        let promise = FileService.showAllFileByAssociationId(club._id);
        promise.then(function (value) {
            console.log(value);
            $scope.data = [];
            for (let i = 0; i < value.length; i++) {
                $timeout(function () {
                    $scope.data.push(value[i]);
                }, 100 * i);
            }
        });
        $scope.showDate = function (date) {
            let temp = new Date(date);
            return temp.toDateString();
        };
        $scope.hoverIn = function () {
            this.hoverEdit = true;
        };

        $scope.hoverOut = function () {
            this.hoverEdit = false;
        };
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