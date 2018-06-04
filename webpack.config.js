const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpack = require('webpack');

//定义了一些路径
const APP_PATH = path.resolve(__dirname, 'app/app.js');
const BUILD_PATH = path.resolve(__dirname, 'build');

module.exports = {
//入口，分为app 入口和提取插件库的入口
    entry: {
        app: APP_PATH,
        vendors: ["angular", "angular-ui-route", "jquery"],
    },

    resolve: {
// 定义别名，让require引用引入min文件打包的引入压缩后的文件，减少打包后文件的体积
        alias: {
            angular: path.resolve(__dirname, "node_modules/angular/angular.min.js"),
            "angular-ui-route": path.resolve(__dirname, "node_modules/angular-ui-router/release/angular-ui-router.min.js"),
            jquery: path.resolve(__dirname, "node_modules/jquery/dist/jquery.min.js")
        }
    },

//输出文件路径和名字
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html',
            inject: 'body',
            minify: false
        }),
//添加我们的插件 提取js插件库
//         new webpack.optimize.CommonsChunkPlugin('vendor'),
//声明jQuery全局插件
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),

        //自动启动浏览器
        new OpenBrowserPlugin({url: 'http://localhost:8080'})
    ],

//dev 服务器
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: "./build"//dev server的根路径
    },

//加载器
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/,
                loader: 'url-loader?limit=1000000'
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                include: APP_PATH,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    devtool: 'source-map'
};