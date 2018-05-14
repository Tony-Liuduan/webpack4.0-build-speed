const path = require('path');
const os = require('os');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HappyPackPlugin = require('./happypack.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    mode: 'production',
    devtool: 'source-map',
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
                use: [
                    //MiniCssExtractPlugin.loader,
                    'happypack/loader?id=css'
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    //MiniCssExtractPlugin.loader,
                    'happypack/loader?id=scss'
                ]
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
            return /jquery|lodash/i.test(content)
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
        extensions: ['.js', '.jsx'],
        // 考虑到 Scope Hoisting 依赖源码需采用 ES6 模块化语法，还需要配置 mainFields。因为大部分 Npm 中的第三方库采用了 CommonJS 语法，但部分库会同时提供 ES6 模块化的代码，为了充分发挥 Scope Hoisting 的作用，需要增加以下配置
        // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
        mainFields: ['jsnext:main', 'browser', 'main']
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'App',
            chunks: ['common', 'app'],
            template: path.resolve(__dirname, './public/layout.ejs'),
            filename: 'index.html',
            //bundleName: vendorDllConfig.vendor.js
        }),
        new webpack.HashedModuleIdsPlugin(),
        // 在webpack4中当mode为production时默认开启了Scope Hoisting 可以让webpack打包出来的代码文件更小、运行更快。
        // new webpack.optimize.ModuleConcatenationPlugin(), // webpack3 配置，webpack4 在mode为production时无需配置
        new MiniCssExtractPlugin({ //提取为外部css代码
            filename: 'assets/css/[name].[contenthash:8].css'
        }),
        // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh|en/), 语言支持过滤
        /* new ParallelUglifyPlugin({
            exclude: path.resolve(__dirname, 'node_modules'),
            include: path.resolve(__dirname, 'src'),
            workerCount: os.cpus().length,
            sourceMap: true,
            uglifyJS: {
                output: {
                    beautify: false, // 不需要格式化
                    comments: false // 保留注释
                },
                compress: { // 压缩
                    warnings: false, // 删除无用代码时不输出警告
                    drop_console: true, // 删除console语句
                    collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        }), */
        /* new webpack.ProvidePlugin({ // 全局加载jquery
            $: "jquery",
            jQuery: "jquery"
        }), */
    ].concat(HappyPackPlugin),

    optimization: {
        // runtimeChunk: {  // 小于10k内联处理，减少请求次数
        //     name: "runtime"
        // },
        splitChunks: {
            cacheGroups: {
                common: { // 抽离自己写的公共代码，common这个名字可以随意起
                    name: 'common',  // 任意命名
                    minChunks: 2
                },
                styles: {
                    name: 'common',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                    minChunks: 2
                }
            }
        }
    },

    performance: {
        hints: 'error',
        maxEntrypointSize: 400000, // 入口文件的最大体积 400000bytes = 390kb, 默认是250000bytes (包括 app.js+common.js+runtime.js)
        maxAssetSize: 300000,  // 资源文件大小 300000bytes = 244kb, 默认是250000bytes
        // assetFilter: function (assetFilename) {
        //     // 只给出.js 文件的性能提示
        //     return assetFilename.endsWith('.js');
        // }
    }
};