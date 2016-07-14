const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    entry: './src/renderer/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'app', 'out', 'static'),
    },
    target: 'electron',
    module: {
        loaders: [
          {
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: /src/,
          },
          {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
          },
          {
            test: /(\.woff2?|\.ttf|\.eot|\.svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file',
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg|mp4)$/,
            loader: 'url-loader?limit=100000'
          },
          {
             test: /\.json$/,
             loader: "json-loader"
          },
          {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
          },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
            exclude: /flexboxgrid/,
          },
          {
            test: /\.css$/,
            loader: 'style!css?modules',
            include: /flexboxgrid/,
          },
          { test: /\.tsx?$/, loader: 'ts-loader' },
        ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
        'Hammer': 'hammerjs/hammer',
      }),
      new HtmlWebpackPlugin({
        template: 'src/renderer/index.html',
      }),
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },
}
