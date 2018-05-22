const path = require('path');
const os = require('os');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        app: ['./src/page/index'],
        user: ['./src/page/user'],
        vendor: ['react', 'react-dom'],
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'assets/js/[name].[chunkhash:8].js',
        chunkFilename: 'assets/js/[name].[chunkhash:8].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'babel-loader?cacheDirectory'
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'style-loader',
                    //MiniCssExtractPlugin.loader,
                    'fast-css-loader',
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: 'postcss.config.js' } }
                    }
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'style-loader',
                    //MiniCssExtractPlugin.loader,
                    'fast-css-loader',
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: 'postcss.config.js' } }
                    },
                    'fast-sass-loader'
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
        ]
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
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            title: 'App',
            chunks: [/* 'runtime',  */'vendor', 'common', 'app'],
            template: path.resolve(__dirname, './public/layout.ejs'),
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'User',
            chunks: [/* 'runtime',  */'vendor', 'common', 'user'],
            template: path.resolve(__dirname, './public/layout.ejs'),
            filename: 'user.html'
        }),
        new webpack.HashedModuleIdsPlugin(),
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
        new MiniCssExtractPlugin({ //提取为外部css代码
            filename: 'assets/css/[name].[contenthash:8].css'
        })
        /* new webpack.optimize.UglifyJsPlugin({ // webpack3.0写法
            // 利用多核能力压缩
            beautify: {
                cache: true,
                workers: os.cpus().length
            },
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告 
                warnings: false,
                // 删除所有的 `console` 语句
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            },
            sourceMap: true
        }) */
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                common: { // 抽离自己写的公共代码，common这个名字可以随意起
                    name: 'common',  // 任意命名
                    minChunks: 2
                },
                vendor: { // 将第三方模块提取出来
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10, // 优先
                    enforce: true
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    }
};
