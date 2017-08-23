var gulp = require('gulp');
var runSequence = require('run-sequence');
var to5 = require('gulp-babel');
var paths = require('../paths');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var typescript = require('gulp-typescript');
var tsc = require('typescript');

var tsProjectES6 = typescript.createProject('./tsconfig.json', { typescript: tsc });
var tsProjectES5 = typescript.createProject('./tsconfig.json', { typescript: tsc, target: 'es5' });
var tsProjectAMD = typescript.createProject('./tsconfig.json', { typescript: tsc, target: 'es5', module: 'amd' });
var tsProjectCJS = typescript.createProject('./tsconfig.json', { typescript: tsc, target: 'es5', module: 'commonjs' });
var tsProjectSystem = typescript.createProject('./tsconfig.json', { typescript: tsc, target: 'es5', module: 'system' });

function buildFromTs(tsProject, outputPath, includeEs6Dts) {
    return tsProject.src()   
    .pipe(sourcemaps.init())
    .pipe(tsProject())  
    .pipe(sourcemaps.write("."))  
    .pipe(gulp.dest(outputPath));
}


gulp.task('build-html', function() {
    return gulp.src(paths.html)
      .pipe(gulp.dest(paths.output + 'es2015'))
      .pipe(gulp.dest(paths.output + 'commonjs'))
      .pipe(gulp.dest(paths.output + 'amd'))
      .pipe(gulp.dest(paths.output + 'system'));
  });
  
gulp.task('build-css', function() {
  return gulp.src(paths.css)
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-es6', function () {
    return buildFromTs(tsProjectES6, paths.output + 'es6', false);
});

gulp.task('build-es5', function () {
    return tsProjectES5.src()   
    .pipe(sourcemaps.init())
    .pipe(tsProjectES5())  
    .pipe(to5(assign({}, compilerOptions.es2015())))
    .pipe(sourcemaps.write("."))  
    .pipe(gulp.dest(paths.output + 'es2015'));
});

gulp.task('build-commonjs', function () {
    return tsProjectCJS.src()   
    .pipe(sourcemaps.init())
    .pipe(tsProjectCJS())  
    .pipe(to5(assign({}, compilerOptions.commonjs())))
    .pipe(sourcemaps.write("."))  
    .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-amd', function () {
    return buildFromTs(tsProjectSystem, paths.output + 'amd', true);
});

gulp.task('build-system', function () {
  return buildFromTs(tsProjectSystem, paths.output + 'system', true);
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-css', 'build-es6', 'build-es5', 'build-commonjs'],
    callback
  );
});