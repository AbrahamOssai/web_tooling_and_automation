/* eslint-disable no-console */
import sass from 'gulp-sass';
import {
  dest, src, watch, series,
} from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import BrowserSync from 'browser-sync';
import eslint from 'gulp-eslint';


const jasmineBrowser = require('gulp-jasmine-browser');


const browserSync = BrowserSync.create();

export const test = () => (
  src('tests/spec/extraSpec.js')
    .pipe(jasmineBrowser.specRunner({ console: true }))
    .pipe(jasmineBrowser.server({ port: 8888 }))
);

export const lint = () => (
  src(['js/**/*.js'])
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
    .pipe(eslint())
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())
);

export const styles = () => src('sass/**/*.scss')
  .pipe(sass())
  .on('error', sass.logError)
  .pipe(autoprefixer())
  .pipe(dest('./css'))
  .pipe(browserSync.stream());

export const log = (done) => {
  console.log('In log file');
  done();
};

export const watchScss = (done) => {
  watch(['sass/**/*.scss'], styles);
  watch(['js/**/*.js'], lint);

  browserSync.init({
    server: './',
  });

  done();
};

export default series(styles, lint, watchScss);
