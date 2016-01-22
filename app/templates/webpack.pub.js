const path = require('path');
module.exports = {
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
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
