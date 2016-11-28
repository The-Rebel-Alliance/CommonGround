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
  port: config.get('server.port'),
  hostname: '0.0.0.0',
  db: {
    host:config.get('db.host'),
    user: config.get('db.uder'),
    password: cnfig.get('db.passwprd'),
    database: config.get('db.datbase')
  }
}))

// Watch for changes and reload stuff
gulp.task('watch', function () {
  gulp.watch('./src/client/**/*', ['webpack'])
  gulp.watch('./src/server/**/*', ['server:web'])
})

gulp.task('default', ['webpack', 'serve:web', 'watch'])
