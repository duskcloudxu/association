angular.module('app.services', [])

    .factory('SystemService', function ($q, $http, hostip,activityip) {
        let user = null;
        let uid = null;
        let loginToken = null;
        return {
            hasCode: function () {
                if (user) {
                    return user.code;
                } else {
                    return null;
                }
            },
            getUser: function () {
                let userCache = null;

                if (!sessionStorage.user) {
                    userCache = null;
                }
                else {
                    userCache = JSON.parse(sessionStorage.user);
                }

                //判断是否存在用户缓存
                if (user && userCache) {
                    //判断本地缓存和session或者localstorage里面的用户信息是否相同
                    if (user._id !== userCache._id) {
                        user = userCache;
                    }
                } else if (!user && userCache) {
                    user = userCache;
                }
                return user;
            },
            setUser: function (newUser) {
                user = newUser;
                sessionStorage.user = JSON.stringify(newUser);
            },

            getUID: function () {
                if (!user) {
                    user = JSON.parse(localStorage.user);
                }
                return user._id;
            },
            setUID: function (newUID) {
                uid = newUID;
                sessionStorage.uid = newUID;
            },
            getHostIP: function () {
                // return window.location.protocol + '//' + window.location.host;
                return hostip;
            },
            getActivityIP: function () {
                return activityip;
            },
            getLoginToken: function () {
                if (!loginToken) {
                    loginToken = sessionStorage.loginToken;
                }
                return loginToken;
            },
            setLoginToken: function (newLoginToken) {
                loginToken = newLoginToken;
                sessionStorage.loginToken = loginToken;
            }
        }
    })

    .service('UserService', function ($q, $http, SystemService) {
        this.login = function (user) {
            // console.log('service');
            // console.log(user);
            const deferred = $q.defer();
            const param = {
                user: user,
            };
            $http.post(SystemService.getHostIP() + 'web/user/login', param)
                .then(function (restResult, status, headers, config) {
                    console.log(restResult);
                    let data = restResult.data;
                    if (data.code == 0) {
                        console.log('login!')
                        let user = data.returnValue.user;
                        localStorage.user = JSON.stringify(data.returnValue.user);
                        SystemService.setUser(data.returnValue.user);
                        let loginToken = data.returnValue.loginToken;
                        localStorage.loginToken = data.returnValue.loginToken;

                        SystemService.setLoginToken(data.returnValue.loginToken);
                        let uid = data.returnValue.user._id;
                        localStorage.uid = data.returnValue.user._id;
                        SystemService.setUID(data.returnValue.user._id);

                        deferred.resolve(data.returnValue);
                    } else {
                        console.log('loginErr!')
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };

        this.logout = function () {
            // console.log('service');
            // console.log(user);

            console.log('logout!');
            let user = null;
            localStorage.user = JSON.stringify(user);
            SystemService.setUser(user);
            let loginToken = null;
            localStorage.loginToken = loginToken;

            SystemService.setLoginToken(loginToken);
            let uid = null;
            localStorage.uid = uid;
            SystemService.setUID(uid);
        };

        this.register = function (user) {
            // console.log(user);
            const deferred = $q.defer();
            const param = {
                user: user
            };
            $http.post(SystemService.getHostIP() + 'web/user/register', param)
                .then(function (restResult, status, headers, config) {
                    console.log(restResult);
                    let data = restResult.data;
                    console.log(data);
                    if (data.code == 0) {
                        console.log(data.returnValue);

                        let user = data.returnValue.user;
                        localStorage.user = JSON.stringify(data.returnValue.user);
                        SystemService.setUser(data.returnValue.user);
                        let loginToken = data.returnValue.loginToken;
                        localStorage.loginToken = data.returnValue.loginToken;

                        SystemService.setLoginToken(data.returnValue.loginToken);
                        let uid = data.returnValue.user._id;
                        localStorage.uid = data.returnValue.user._id;
                        SystemService.setUID(data.returnValue.user._id);

                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };

        this.resetPwd = function (studentID, email) {
            // console.log('service');
            // console.log(user);
            const deferred = $q.defer();
            const param = {
                studentID: studentID,
                email: email
            };
            // console.log(SystemService.getHostIP());
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/user/resetPwd', param)
                .then(function (restResult, status, headers, config) {
                    console.log(restResult);
                    let data = restResult.data;
                    console.log(data);
                    if (data.code == 0) {
                        console.log(data.returnValue);
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.getLatestInformation = function (userId) {
            const deferred = $q.defer();
            const param = {
                userId: userId,
            };
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/user/getLatestInformation', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;

        }
        this.showAllUser = function () {
            const deferred = $q.defer();
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/user/showAllUser')
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    console.log(data);
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.editUser = function (user) {
            const deferred = $q.defer();
            const param = {
                user: user,
            };
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/user/editUser', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };

    })
    .service('ActivityService', function ($q, $http, SystemService) {
        this.addActivity = function (activity) {
            const deferred = $q.defer();
            const param = {
                activity: activity,
            };
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getActivityIP() + 'web/activity/addActivity', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.showAllActivity = function () {
            const deferred = $q.defer();
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getActivityIP() + 'web/activity/showAllActivity')
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    console.log(data);
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.editActivity = function (id, activity) {
            const deferred = $q.defer();
            const param = {
                id: id,
                activity: activity,
            };
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getActivityIP() + 'web/activity/editActivity', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.findActivityById = function (id) {
            const deferred = $q.defer();
            const param = {
                id: id,
            };
            console.log(param);
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getActivityIP() + 'web/activity/findActivityById', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.attendActivity = function (studentId, activityId) {
            const deferred = $q.defer();
            const param = {
                studentId: studentId,
                activityId: activityId,

            };
            console.log(param);
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getActivityIP() + 'web/activity/attendActivity', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        }
        this.showAllActivityByAssociationId = function (associationId) {
            const deferred = $q.defer();
            const param = {
                associationId: associationId,
            };
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getActivityIP() + 'web/activity/showAllActivityByAssociationId', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    console.log(data);
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        }
        this.delActivity = function (activityId) {
            const deferred = $q.defer();
            const param = {
                activityId: activityId,
            };
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getActivityIP() + 'web/activity/delActivity', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    console.log(data);
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        }
    })
    .service('FileService', function ($q, $http, SystemService) {
        this.addFile = function (file) {
            const deferred = $q.defer();
            const param = {
                file: file,
            };
            // $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/file/addFile', param)
                .then(function (restResult, status, headers, config) {
                    console.log("YES");
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.showAllFileByAssociationId = function (associationId) {
            const deferred = $q.defer();
            const param = {
                associationId: associationId,
            };
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/file/showAllFileByAssociationId', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    console.log(data);
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.delFile = function (fileId) {
            const deferred = $q.defer();
            const param = {
                fileId: fileId,
            };
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/file/delFile', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    console.log(data);
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        }
    })
    .service('AssociationService', function ($q, $http, SystemService) {
        this.addAssociation = function (association) {
            const deferred = $q.defer();
            const param = {
                association: association,
            };
            // $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/association/addAssociation', param)
                .then(function (restResult, status, headers, config) {
                    console.log("YES");
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.showAllAssociation = function () {
            const deferred = $q.defer();
            console.log("yes");
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/association/showAllAssociation')
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    console.log(data);
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        }
        this.findAssociationById = function (id) {
            const deferred = $q.defer();
            const param = {
                id: id,
            };
            console.log(param);
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/association/findAssociationById', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.delMember = function (associationId, userId, memberId) {
            const deferred = $q.defer();
            const param = {
                associationId: associationId,
                userId: userId,
                memberId: memberId
            };
            console.log(param);
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/association/delMember', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.addAdmin = function (associationId, userId, memberId) {
            const deferred = $q.defer();
            const param = {
                associationId: associationId,
                userId: userId,
                memberId: memberId
            };
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/association/addAdmin', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.addMember = function (associationId, memberId) {
            const deferred = $q.defer();
            const param = {
                associationId: associationId,
                memberId: memberId
            };
            console.log(param);
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/association/addMember', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.apply=function (associationId,memberId,statement) {
            const deferred = $q.defer();
            const param = {
                associationId: associationId,
                memberId: memberId,
                statement:statement
            };
            console.log(param);
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/association/apply', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        }
        this.delApply=function (associationId,memberId) {
            const deferred = $q.defer();
            const param = {
                associationId: associationId,
                memberId: memberId,
            };
            console.log(param);
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/association/delApply', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        }

    })
    .service('NewsService', function ($q, $http, SystemService) {
        this.addNews = function (news) {
            const deferred = $q.defer();
            const param = {
                news: news,
            };
            // $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/news/addNews', param)
                .then(function (restResult, status, headers, config) {
                    console.log("YES");
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.showAllNews = function () {
            const deferred = $q.defer();
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/news/showAllNews')
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    console.log(data);
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        }
        this.editNews = function (id, news) {
            const deferred = $q.defer();
            const param = {
                id: id,
                news: news,
            };
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/news/editNews', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.findNewsById = function (id) {
            const deferred = $q.defer();
            const param = {
                id: id,
            };
            console.log(param);
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/news/findNewsById', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        };
        this.showAllNewsByAssociationId = function (associationId) {
            const deferred = $q.defer();
            const param = {
                associationId: associationId,
            };
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/news/showAllNewsByAssociationId', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    console.log(data);
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        }
        this.delNews = function (newsId) {
            const deferred = $q.defer();
            const param = {
                newsId: newsId,
            };
            $http.defaults.headers.common['Token'] = SystemService.getLoginToken();
            $http.post(SystemService.getHostIP() + 'web/news/delNews', param)
                .then(function (restResult, status, headers, config) {
                    let data = restResult.data;
                    console.log(data);
                    if (data.code == 0) {
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                })
                .catch(function (restResult, status, headers, config) {
                    deferred.reject(restResult.data.errorReason);
                });
            return deferred.promise;
        }
    })

;