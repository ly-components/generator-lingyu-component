const path = require('path');
module.exports = {
  output: {
    path: path.join(__dirname, '/tmp'),
    filename: 'bundle.js',
    library: '<%= component %>',
    libraryTarget: 'umd'
  },
  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [path.resolve('src/')]
    }, {
      test: /\.js$/,
      include: [path.resolve('src/')],
      loader: 'babel-istanbul',
      query: {
        coverageVariable: '__coverage__'
      }
    }, {
      test: /\.less$/,
      loader: 'style!css!autoprefixer!less'
    }, {
      test: /\.css$/,
      loader: 'style!css!autoprefixer'
    }]
  }
};
