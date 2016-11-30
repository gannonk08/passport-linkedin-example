// *** dependencies *** //

const path = require('path')
const gulp = require('gulp')
const eslint = require('gulp-eslint')
const runSequence = require('run-sequence')
const nodemon = require('gulp-nodemon')
const plumber = require('gulp-plumber')

// *** config *** //

const paths = {
  scripts: [
    path.join('src', '**', '*.js'),
    path.join('src', '*.js')
  ],
  css: [
    path.join('src', 'client', 'css', '*.css')
  ],
  views: [
    path.join('src', 'server', '**', '*.html'),
    path.join('src', 'server', '*.html')
  ],
  server: path.join('src', 'server', 'server.js')
}

const nodemonConfig = {
  script: paths.server,
  ext: 'html js css',
  ignore: ['node_modules'],
  env: {
    NODE_ENV: 'development'
  }
}

// *** default task *** //

gulp.task('default', () => {
  runSequence(
    ['lint'],
    ['nodemon'],
    ['watch']
  )
})

// *** sub tasks ** //

gulp.task('lint', () => {
  return gulp.src(paths.scripts)
    .pipe(eslint())
    .pipe(eslint.format('stylish'))
    .pipe(eslint.failAfterError())
})

gulp.task('styles', () => {
  return gulp.src(paths.css)
    .pipe(plumber())
})

gulp.task('views', () => {
  return gulp.src(paths.views)
    .pipe(plumber())
})

gulp.task('nodemon', () => {
  return nodemon(nodemonConfig)
})

gulp.task('watch', () => {
  gulp.watch(paths.views, ['views'])
  gulp.watch(paths.scss, ['scss'])
  gulp.watch(paths.scripts, ['lint'])
  gulp.watch(paths.css, ['styles'])
})
