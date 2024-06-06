const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
}

function html() {
  return gulp.src('src/**/*.html')
        .pipe(plumber())
				.pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

function css() {
  return gulp.src(['src/fonts/fonts.css', 'src/styles/globals.css', 'src/styles/variables.css', 'src/styles/style.css', 'src/styles/dark.css', 'src/styles/light.css'])
        .pipe(plumber())
        .pipe(concat('bundle.css'))
				.pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

function scripts() {
  return gulp.src('src/scripts/**/*.js')
        .pipe(plumber())
				.pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({stream: true}));
}

function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({stream: true}));
}

function fonts() {
  return gulp.src('src/fonts/**/*.woff')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.reload({stream: true}));
}

function clean() {
  return del('dist');
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/fonts/fonts.css', 'src/styles/globals.css', 'src/styles/variables.css', 'src/styles/style.css', 'src/styles/dark.css', 'src/styles/light.css'], css);
  gulp.watch(['src/scripts/**/*.js'], scripts);
  gulp.watch(['src/fonts/**/*.woff'], fonts);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
}

const build = gulp.series(clean, gulp.parallel(html, css, scripts, fonts, images));
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;

exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;