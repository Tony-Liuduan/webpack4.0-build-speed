const HappyPack = require('happypack');
const os = require('os');


// 根据我的系统的内核数量 指定线程池个数 也可以其他数量
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const isDev = process.env.NODE_ENV !== 'production';
const cssLoaders = [
    'style-loader',
    'fast-css-loader',
    {
        loader: 'postcss-loader',
        options: { sourceMap: true, config: { path: 'postcss.config.js' } }
    }
];
if (!isDev) cssLoaders.shift();
module.exports = [
    new HappyPack({ // 基础参数设置
        id: 'babel',
        threadPool: happyThreadPool,
        loaders: ['babel-loader?cacheDirectory'] // 实际匹配处理的loader
    }),
    new HappyPack({
        id: 'css',
        threadPool: happyThreadPool,
        loaders: cssLoaders
    }),    
    new HappyPack({
        id: 'scss',
        threadPool: happyThreadPool,
        loaders: cssLoaders.concat('fast-sass-loader')
    })
]