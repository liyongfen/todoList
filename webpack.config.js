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
                    presets: ['es2015', 'react'],
                    plugins: [['import', {"libraryName": "antd", "style": "css"}]]
                }
            },{
                test: /\.css$/,
                loader:['style-loader','css-loader']
            },{
                test: /\.(png|jpg|gif|woff|woff2)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};