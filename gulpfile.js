var gulp = require('gulp')
var webpack = require('webpack-stream')
var config = require('config')
var serve = require('./src/server')

// Webpack
gulp.task('webpack', function () {
  return gulp.src('./src/client/app.js')
    .pipe(webpack(require('./build/webpack.config.js')))
    .pipe(gulp.dest('./dist'))
})

// Simple Server
gulp.task('serve:web', serve({
  root: './dist',
  hostname: '0.0.0.0'
}))

var filesToMove = [
  './src/client/video/**/*.*'
]

gulp.task('move:static', function () {
  return gulp.src(filesToMove, {base:'./src/client/video'})
    .pipe(gulp.dest('./dist/v/'))
})

// Watch for changes and reload stuff
gulp.task('watch', function () {
  gulp.watch('./src/client/**/*', ['webpack'])
})

gulp.task('default', ['webpack', 'serve:web', 'move:static', 'watch'])
