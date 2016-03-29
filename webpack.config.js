const webpack = require('webpack');
const path = require('path');
console.log(__dirname);
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'static'),
        publicPath: 'http://localhost:8080/build/'
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
            test: /\.(png|jpg)$/,
            loader: 'url-loader',
            query: { mimetype: 'image/png' },
          },
          {
             test: /\.json$/,
             loader: "json-loader"
          }
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
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
      }),
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    }
}
