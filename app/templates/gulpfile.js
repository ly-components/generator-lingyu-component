const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const pretty = require('pretty-error');
const open = require('open');
const gulp = require('gulp');
const del = require('del');
const uglify = require('gulp-uglify');
const gulpWebpack = require('gulp-webpack');
const execSync = require('child_process').execSync;
const cmd = command => execSync(command, {
  stdio: 'inherit'
});

gulp.task('clean', cb => del(['dist', 'coverage'], cb));

gulp.task('build', ['clean'], () => {
  return gulp.src('./src/index.js')
    .pipe(gulpWebpack(require('./webpack.pub')))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('dev', () => {
  new WebpackDevServer(webpack(require('./webpack.dev')), {
    contentBase: 'demo'
  }).listen(8848, 'localhost', err => {
    if (err) return pretty(err);
    console.log('Listening at http://127.0.0.1:8848');
    open('http://127.0.0.1:8848');
  });
});

gulp.task('pre-test', ['clean'], () => {
  return gulp.src('./test/test.js')
    .pipe(gulpWebpack(require('./webpack.test')))
    .pipe(gulp.dest('test'));
});

gulp.task('test', ['pre-test'], () => {
  cmd('./node_modules/.bin/mocha-phantomjs ./test/test.html');
});

gulp.task('coverage', ['pre-test'], () => {
  cmd('./node_modules/.bin/mocha-phantomjs ./test/test.html --hooks ./node_modules/mocha-phantomjs-coverage-hook/index.js');
  cmd('./node_modules/.bin/istanbul report --root coverage lcov');
  cmd('./node_modules/.bin/istanbul report --root coverage text-summary');
});

gulp.task('default', ['build']);
