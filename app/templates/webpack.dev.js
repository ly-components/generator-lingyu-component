const path = require('path');
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    demo: [
      'webpack-dev-server/client?http://127.0.0.1:8848',
      './demo/index'
    ]
  },
  output: {
    path: path.join(__dirname, '/demo'),
    filename: 'bundle.js',
    publicPath: '/',
    library: '<%= component %>',
    libraryTarget: 'umd'
  },
  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js']
  },
  postcss: [require('autoprefixer')],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel'
    }, {
      test: /\.less$/,
      loader: 'style!css!postcss!less'
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss'
    }]
  }
};
