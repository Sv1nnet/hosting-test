const gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer');

// Compile scss and sass files to css files to app/css
gulp.task('sass', function() {
  return gulp.src('app/sass/**/*.+(scss|sass)')
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }));
});

// Minify js files
gulp.task('scripts', function() {
  return gulp.src(['app/libs/**/*.js'])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

// Minify css libs
gulp.task('css-libs', ['sass'], function() {
  // Then minify css libs
  return gulp.src('app/css/libs.css') // Выбираем файл для минификации
    .pipe(cssnano()) // Сжимаем
    .pipe(rename({ suffix: '.min' })) // Добавляем суффикс .min
    .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

// Sync browser without refreshing the page
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app',
    }
  });
});

// Delete dist folder in order to clean excess files
gulp.task('clean', function() {
  return del('build');
});

// Clear cache
gulp.task('clear', function() {
  return cache.clearAll();
});

// Optimize images
gulp.task('img', function() {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      une: [pngquant()],
    })))
    .pipe(gulp.dest('build/img'));
});

// Watch changes
gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
  gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
  gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
  gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

// Build app
gulp.task('build', ['clean', 'img', 'css-libs'], function() {
  // Build css files and move them to build folder
  let buildCss = gulp.src([
    'app/css/main.css',
    'app/css/libs.min.css',
  ])
    .pipe(gulp.dest('build/css'));

  // Move font to build folder
  let buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('build/fonts'));

  // Move js files to build folder
  let buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('build/js'));

  // Move html files to build folder
  let buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('build'));
});

// Start watching and then perform others tasks
gulp.task('default', ['watch']);
