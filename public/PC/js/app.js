angular.module('app', [
    'app.routes',
    'app.controllers',
    'app.services',
    'ng.ueditor',  //文本编辑器
    'ngSanitize',  //页面渲染安全过滤模块
    'ngAnimate',   //动画
    'ngFileUpload',//文件上传
    'ngCookies',   //操作cookie
    'ngImgCrop'    //截图插件
])

    .constant('hostip', 'http://localhost:3000/')  // 本地开发环境地址
    //.constant('hostip', 'http://192.168.1.170:3000/')  // 本地开发环境地址
    //.constant('hostip', 'http://123.206.111.244:3000/')  // 正式环境地址
    .constant('activityip', 'http://localhost:8888/')  // redis 和 kue 单机地址

    .filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }])

    .directive('starCanvas', function () {
        return {
            template: '<canvas id="canvas"></canvas>',
            replace: false,
            restrict: 'E',
            scope: false,
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {
                        "use strict";
                        let canvas = document.getElementById('canvas'),
                            ctx = canvas.getContext('2d'),
                            w = canvas.width = window.innerWidth,
                            h = canvas.height = window.innerHeight,

                            hue = 217,
                            stars = [],
                            count = 0,
                            maxStars = 1200;

                        canvas.setAttribute('style', 'position:fixed;left:0px;top:0px');

                        let canvas2 = document.createElement('canvas'),
                            ctx2 = canvas2.getContext('2d');
                        canvas2.width = 100;
                        canvas2.height = 100;
                        let half = canvas2.width / 2,
                            gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
                        gradient2.addColorStop(0.025, '#fff');
                        gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
                        gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
                        gradient2.addColorStop(1, 'transparent');

                        ctx2.fillStyle = gradient2;
                        ctx2.beginPath();
                        ctx2.arc(half, half, half, 0, Math.PI * 2);
                        ctx2.fill();

                        // End cache

                        function random(min, max) {
                            if (arguments.length < 2) {
                                max = min;
                                min = 0;
                            }

                            if (min > max) {
                                let hold = max;
                                max = min;
                                min = hold;
                            }

                            return Math.floor(Math.random() * (max - min + 1)) + min;
                        }

                        function maxOrbit(x, y) {
                            let max = Math.max(x, y),
                                diameter = Math.round(Math.sqrt(max * max + max * max));
                            return diameter / 2;
                        }

                        let Star = function () {

                            this.orbitRadius = random(maxOrbit(w, h));
                            this.radius = random(60, this.orbitRadius) / 12;
                            this.orbitX = w / 2;
                            this.orbitY = h / 2;
                            this.timePassed = random(0, maxStars);
                            this.speed = random(this.orbitRadius) / 900000;
                            this.alpha = random(2, 10) / 10;

                            count++;
                            stars[count] = this;
                        };

                        Star.prototype.draw = function () {
                            let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
                                y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
                                twinkle = random(10);

                            if (twinkle === 1 && this.alpha > 0) {
                                this.alpha -= 0.05;
                            } else if (twinkle === 2 && this.alpha < 1) {
                                this.alpha += 0.05;
                            }

                            ctx.globalAlpha = this.alpha;
                            ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
                            this.timePassed += this.speed;
                        };

                        for (let i = 0; i < maxStars; i++) {
                            new Star();
                        }

                        function animation() {
                            ctx.globalCompositeOperation = 'source-over';
                            ctx.globalAlpha = 0.8;
                            ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
                            ctx.fillRect(0, 0, w, h);

                            ctx.globalCompositeOperation = 'lighter';
                            for (let i = 1, l = stars.length; i < l; i++) {
                                stars[i].draw();
                            }

                            window.requestAnimationFrame(animation);
                        }

                        animation();
                        window.addEventListener('resize', function () {
                            w = window.innerWidth;
                            h = window.innerHeight;
                            canvas.width = w;
                            canvas.height = h;
                        }, false);

                    },
                    post: function postLink(scope, iElement, iAttrs, controller) {

                    }
                }
            },
            link: function postLink(scope, iElement, iAttrs) {

            }
        };
    })

    .directive('pointCanvas', function () {
        return {
            template: '<canvas id="canvas"></canvas>',
            replace: false,
            restrict: 'E',
            scope: false,
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {
                        "use strict";

                        // 全屏浮动修改以下代码：
                        // let w = screen.width;
                        // let h = screen.height;
                        // canvas.setAttribute('style', 'position:fixed;left:0px;top:0px');
                        // window.addEventListener('resize' 里删除前两行

                        let canvas = document.getElementById("canvas");
                        let num = 500;  //总共的点的数量
                        let w = window.innerWidth;
                        let h = window.innerHeight * 0.4;
                        let max = 1;
                        let _x = 0;
                        let _y = 0;
                        let _z = 150;
                        let dtr = function (d) {
                            return d * Math.PI / 180;
                        };

                        canvas.setAttribute('style', 'position:fixed;left:0;top:0');
                        let rnd = function () {
                            return Math.sin(Math.floor(Math.random() * 360) * Math.PI / 180);
                        };
                        let dist = function (p1, p2, p3) {
                            return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
                        };

                        let cam = {
                            obj: {
                                x: _x,
                                y: _y,
                                z: _z
                            },
                            dest: {
                                x: 0,
                                y: 0,
                                z: 1
                            },
                            dist: {
                                x: 0,
                                y: 0,
                                z: 200
                            },
                            ang: {
                                cplane: 0,
                                splane: 0,
                                ctheta: 0,
                                stheta: 0
                            },
                            zoom: 1,
                            disp: {
                                x: w / 2,
                                y: h / 2,
                                z: 0
                            },
                            upd: function () {
                                cam.dist.x = cam.dest.x - cam.obj.x;
                                cam.dist.y = cam.dest.y - cam.obj.y;
                                cam.dist.z = cam.dest.z - cam.obj.z;
                                cam.ang.cplane = -cam.dist.z / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
                                cam.ang.splane = cam.dist.x / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
                                cam.ang.ctheta = Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
                                cam.ang.stheta = -cam.dist.y / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
                            }
                        };

                        let trans = {
                            parts: {
                                sz: function (p, sz) {
                                    return {
                                        x: p.x * sz.x,
                                        y: p.y * sz.y,
                                        z: p.z * sz.z
                                    };
                                },
                                rot: {
                                    x: function (p, rot) {
                                        return {
                                            x: p.x,
                                            y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
                                            z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x))
                                        };
                                    },
                                    y: function (p, rot) {
                                        return {
                                            x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
                                            y: p.y,
                                            z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y))
                                        };
                                    },
                                    z: function (p, rot) {
                                        return {
                                            x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
                                            y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
                                            z: p.z
                                        };
                                    }
                                },
                                pos: function (p, pos) {
                                    return {
                                        x: p.x + pos.x,
                                        y: p.y + pos.y,
                                        z: p.z + pos.z
                                    };
                                }
                            },
                            pov: {
                                plane: function (p) {
                                    return {
                                        x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
                                        y: p.y,
                                        z: p.x * -cam.ang.splane + p.z * cam.ang.cplane
                                    };
                                },
                                theta: function (p) {
                                    return {
                                        x: p.x,
                                        y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
                                        z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta
                                    };
                                },
                                set: function (p) {
                                    return {
                                        x: p.x - cam.obj.x,
                                        y: p.y - cam.obj.y,
                                        z: p.z - cam.obj.z
                                    };
                                }
                            },
                            persp: function (p) {
                                return {
                                    x: p.x * cam.dist.z / p.z * cam.zoom,
                                    y: p.y * cam.dist.z / p.z * cam.zoom,
                                    z: p.z * cam.zoom,
                                    p: cam.dist.z / p.z
                                };
                            },
                            disp: function (p, disp) {
                                return {
                                    x: p.x + disp.x,
                                    y: -p.y + disp.y,
                                    z: p.z + disp.z,
                                    p: p.p
                                };
                            },
                            steps: function (_obj_, sz, rot, pos, disp) {
                                let _args = trans.parts.sz(_obj_, sz);
                                _args = trans.parts.rot.x(_args, rot);
                                _args = trans.parts.rot.y(_args, rot);
                                _args = trans.parts.rot.z(_args, rot);
                                _args = trans.parts.pos(_args, pos);
                                _args = trans.pov.plane(_args);
                                _args = trans.pov.theta(_args);
                                _args = trans.pov.set(_args);
                                _args = trans.persp(_args);
                                _args = trans.disp(_args, disp);
                                return _args;
                            }
                        };

                        (function () {
                            "use strict";
                            let threeD = function (param) {
                                this.transIn = {};
                                this.transOut = {};
                                this.transIn.vtx = (param.vtx);
                                this.transIn.sz = (param.sz);
                                this.transIn.rot = (param.rot);
                                this.transIn.pos = (param.pos);
                            };

                            threeD.prototype.vupd = function () {
                                this.transOut = trans.steps(
                                    this.transIn.vtx,
                                    this.transIn.sz,
                                    this.transIn.rot,
                                    this.transIn.pos,
                                    cam.disp
                                );
                            };

                            let Build = function () {
                                this.vel = 0.04;
                                this.lim = 360;
                                this.diff = 200;
                                this.initPos = 100;
                                this.toX = _x;
                                this.toY = _y;
                                this.go();
                            };

                            Build.prototype.go = function () {
                                this.canvas = document.getElementById("canvas");
                                this.canvas.width = w;
                                this.canvas.height = h;
                                this.$ = canvas.getContext("2d");
                                this.$.globalCompositeOperation = 'source-over';
                                this.letr = [];
                                this.dist = [];
                                this.calc = [];

                                for (let i = 0, len = num; i < len; i++) {
                                    this.add();
                                }

                                this.rotObj = {
                                    x: 0,
                                    y: 0,
                                    z: 0
                                };
                                this.objSz = {
                                    x: w / 5,
                                    y: h / 5,
                                    z: w / 5
                                };
                            };

                            Build.prototype.add = function () {
                                this.letr.push(new threeD({
                                    vtx: {
                                        x: rnd(),
                                        y: rnd(),
                                        z: rnd()
                                    },
                                    sz: {
                                        x: 0,
                                        y: 0,
                                        z: 0
                                    },
                                    rot: {
                                        x: 20,
                                        y: -20,
                                        z: 0
                                    },
                                    pos: {
                                        x: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
                                        y: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
                                        z: this.diff * Math.sin(360 * Math.random() * Math.PI / 180)
                                    }
                                }));
                                this.calc.push({
                                    x: 360 * Math.random(),
                                    y: 360 * Math.random(),
                                    z: 360 * Math.random()
                                });
                            };

                            Build.prototype.upd = function () {
                                cam.obj.x += (this.toX - cam.obj.x) * 0.05;
                                cam.obj.y += (this.toY - cam.obj.y) * 0.05;
                            };

                            Build.prototype.draw = function () {
                                this.$.clearRect(0, 0, this.canvas.width, this.canvas.height);
                                cam.upd();
                                this.rotObj.x += 0.1;
                                this.rotObj.y += 0.1;
                                this.rotObj.z += 0.1;

                                for (let i = 0; i < this.letr.length; i++) {
                                    for (let val in this.calc[i]) {
                                        if (this.calc[i].hasOwnProperty(val)) {
                                            this.calc[i][val] += this.vel;
                                            if (this.calc[i][val] > this.lim) this.calc[i][val] = 0;
                                        }
                                    }

                                    this.letr[i].transIn.pos = {
                                        x: this.diff * Math.cos(this.calc[i].x * Math.PI / 180),
                                        y: this.diff * Math.sin(this.calc[i].y * Math.PI / 180),
                                        z: this.diff * Math.sin(this.calc[i].z * Math.PI / 180)
                                    };
                                    this.letr[i].transIn.rot = this.rotObj;
                                    this.letr[i].transIn.sz = this.objSz;
                                    this.letr[i].vupd();
                                    if (this.letr[i].transOut.p < 0) continue;
                                    let g = this.$.createRadialGradient(this.letr[i].transOut.x, this.letr[i].transOut.y, this.letr[i].transOut.p, this.letr[i].transOut.x, this.letr[i].transOut.y, this.letr[i].transOut.p * 2);
                                    this.$.globalCompositeOperation = 'lighter';
                                    g.addColorStop(0, 'hsla(255, 255%, 255%, 1)');
                                    g.addColorStop(.5, 'hsla(' + (i + 2) + ',85%, 40%,1)');
                                    g.addColorStop(1, 'hsla(' + (i) + ',85%, 40%,.5)');
                                    this.$.fillStyle = g;
                                    this.$.beginPath();
                                    this.$.arc(this.letr[i].transOut.x, this.letr[i].transOut.y, this.letr[i].transOut.p * 2, 0, Math.PI * 2, false);
                                    this.$.fill();
                                    this.$.closePath();
                                }
                            };
                            Build.prototype.anim = function () {
                                window.requestAnimationFrame = (function () {
                                    return window.requestAnimationFrame ||
                                        function (callback, element) {
                                            window.setTimeout(callback, 1000 / 60);
                                        };
                                })();
                                let anim = function () {
                                    this.upd();
                                    this.draw();
                                    window.requestAnimationFrame(anim);
                                }.bind(this);
                                window.requestAnimationFrame(anim);
                            };

                            Build.prototype.run = function () {
                                this.anim();

                                window.addEventListener('mousemove', function (e) {
                                    this.toX = (e.clientX - this.canvas.width / 2) * -0.8;
                                    this.toY = (e.clientY - this.canvas.height / 2) * 0.8;
                                }.bind(this));
                                // window.addEventListener('touchmove', function (e) { //手指滑动
                                //     e.preventDefault();
                                //     this.toX = (e.touches[0].clientX - this.canvas.width / 2) * -0.8;
                                //     this.toY = (e.touches[0].clientY - this.canvas.height / 2) * 0.8;
                                // }.bind(this));
                                // window.addEventListener('mousedown', function (e) {
                                //     for (let i = 0; i < 100; i++) {
                                //         this.add();
                                //     }
                                // }.bind(this));
                                // window.addEventListener('touchstart', function (e) { //手指触摸
                                //     e.preventDefault();
                                //     for (let i = 0; i < 100; i++) {
                                //         this.add();
                                //     }
                                // }.bind(this));
                            };
                            let app = new Build();
                            app.run();
                        })();
                        window.addEventListener('resize', function () {
                            w = window.innerWidth;
                            h = window.innerHeight * 0.4;
                            canvas.width = w;
                            canvas.height = h;
                        }, false);

                    },
                    post: function postLink(scope, iElement, iAttrs, controller) {

                    }
                }
            },
            link: function postLink(scope, iElement, iAttrs) {

            }
        };
    })

    .filter("myDateTime", function () { //ISODate格式到本地时间转换
        return function (input) {
            let date = new Date(input);
            return (date.toLocaleDateString() + ' ' + date.toLocaleTimeString());
        }
    })

    .run(function ($rootScope) {
        $rootScope.$on('$routeChangeStart', function (evt, next, current) {

        });
    });