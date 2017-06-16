var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: ["webpack/hot/dev-server", path.resolve(__dirname, './src/index.js')],
    output: {
        path: path.resolve(__dirname, './dist'),//打包输出文件路径
        filename: "bundle.js"//打包输出文件名
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },{
                test: /\.css$/,
                loader:['style-loader','css-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};