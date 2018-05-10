const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const HappyPackPlugin = require('./happypack.config');
const vendorDllManifest = require('./dll/vendor.manifest.json');
const vendorDllConfig = require('./dll/vendor.config.json');


module.exports = {
    entry: {
        app: ['./src/page/index'],
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].[chunkhash:8].js',
        chunkFilename: 'assets/js/[name].[chunkhash:8].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: ['happypack/loader?id=babel']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: ['happypack/loader?id=css']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: ['happypack/loader?id=scss']
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'assets/img/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'assets/font/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ],
        // 忽略对jquery lodash的进行递归解析
        noParse: function (content) {
            return /jquery|lodash/.test(content)
        }
    },

    resolve: {
        modules: [ // 优化模块查找路径
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules') // 指定node_modules所在位置 当你import 第三方模块时 直接从这个路径下搜索寻找
        ],
        alias: {
            assets: path.resolve(__dirname, 'src/assets/'),
            components: path.resolve(__dirname, 'src/components/'),
            style: path.resolve(__dirname, 'src/style/')
        },
        extensions: ['.js', '.jsx']
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'App',
            chunks: ['app'],
            template: path.resolve(__dirname, './public/layout.ejs'),
            filename: 'index.html',
            //bundleName: vendorDllConfig.vendor.js
        }),
        new HtmlIncludeAssetsPlugin({
            assets: [vendorDllConfig.vendor.js], // 添加的资源相对html的路径
            append: false // false 在其他资源的之前添加 true 在其他资源之后添加
        }),
        new webpack.HashedModuleIdsPlugin(),
        // 当我们需要使用动态链接库时 首先会找到manifest文件 得到name值记录的全局变量名称 然后找到动态链接库文件 进行加载
        new webpack.DllReferencePlugin({
            manifest: vendorDllManifest
        })
    ].concat(HappyPackPlugin)
};