const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',    //关于source-map的几种配置方式：https://segmentfault.com/a/1190000004280859、http://sanwen.net/a/ltjldpo.html

    // 入口
    entry: {
        main: './11.App.js',
        vendors: ['vue', 'vue-router']
    },

    // 输出
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/'
    },

    // 加载器
    module: {
        // 所有的 loader 都默认必须补全 -loader ，不能使用简写形式。 据作者说 是因为有些新手会把简写名称误以为是 loader 名称而和其它模块搞混淆了所以默认移除了这个功能。
        rules: [
            {test: /\.vue$/, use: 'vue-loader'},
            {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
            {test: /\.css$/, use: 'style-loader!css!autoprefixer'},
            {test: /\.scss$/, use: 'style-loader!css!sass?sourceMap'},
            {test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, use: 'url-loader?limit=8192'},
            {test: /\.(html|tpl)$/, use: 'html-loader'}
        ],
    },

    // require中引用时忽略扩展名的处理
    resolve: {
        // resolve.extensions 不需要自己写一个空字符串在那了，webpack 会自动解析无后缀的模块加载
        extensions: ['.js', '.vue'],

        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            vue: 'vue/dist/vue.js'
            // filter: path.join(__dirname, './src/filters'),
            // components: path.join(__dirname, './src/components')
        }
    },

    // 插件
    plugins: [
        // 给输出的文件头部添加注释信息，此为输出的测试信息
        new webpack.BannerPlugin('This is file is created by orh!')

        // 压缩文件
        // new webpack.optimize.UglifyJsPlugin({   
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
};