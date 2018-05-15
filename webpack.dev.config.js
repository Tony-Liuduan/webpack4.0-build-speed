const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const vendorDllManifest = require('./dll/vendor.manifest.json');
const vendorDllConfig = require('./dll/vendor.config.json');


module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        app: ['./src/page/index'],
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].js',
        chunkFilename: 'assets/js/[name].chunk.js'
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
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: false, config: { path: 'postcss.config.js' } }
                    }
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: false, config: { path: 'postcss.config.js' } }
                    },
                    'sass-loader'
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
                            name: 'assets/img/[name].[ext]'
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
                            name: 'assets/font/[name].[ext]'
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
        // 当我们需要使用动态链接库时 首先会找到manifest文件 得到name值记录的全局变量名称 然后找到动态链接库文件 进行加载
        new webpack.DllReferencePlugin({
            manifest: vendorDllManifest
        })
    ],

    devServer: {
        contentBase: path.resolve(__dirname, 'dll'),
        compress: true, // 开启Gzip压缩
        port: 9000,
        inline: true // 自动刷新
    }
};