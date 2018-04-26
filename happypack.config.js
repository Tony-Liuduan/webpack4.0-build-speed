const HappyPack = require('happypack');
const os = require('os');

// 根据我的系统的内核数量 指定线程池个数 也可以其他数量
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
module.exports = [
    new HappyPack({ // 基础参数设置
        id: 'babel',
        threadPool: happyThreadPool,
        loaders: ['babel-loader?cacheDirectory'] // 实际匹配处理的loader
    }),
    new HappyPack({
        id: 'css',
        threadPool: happyThreadPool,
        loaders: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: { sourceMap: true, config: { path: 'postcss.config.js' } }
            }
        ]
    }),    
    new HappyPack({
        id: 'scss',
        threadPool: happyThreadPool,
        loaders: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: { sourceMap: true, config: { path: 'postcss.config.js' } }
            },
            'sass-loader'
        ]
    })
]