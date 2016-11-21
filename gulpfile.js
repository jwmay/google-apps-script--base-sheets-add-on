// Copyright 2016 Joseph W. May. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


'use strict';

var gulp = require('gulp');

var jshint = require('gulp-jshint');
var shell = require('gulp-shell');
var minimist = require('minimist');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var debug = require('gulp-debug');
var del = require('del');


// Process user input using minimist to select the build type.
// minimist structure and defaults for this task configuration
var knownOptions = {
  string: ['env'],
  'default': {
    env: 'dev'
  }
};
var options = minimist(process.argv.slice(2), knownOptions);


// The root directories
var bases = {
  src: 'src/',
  dist: 'build/' + options.env + '/src/'
};

// The file paths. 
var paths = {
  tests: [
    bases.src + 'tests/lib.testing.js',
    bases.src + 'tests/*.server.main.js',
    bases.src + 'tests/*.js'
  ],

  server: [
    bases.src + 'server/*.server.addon.js',
    bases.src + 'server/*.main.js',
    bases.src + 'server/*.js'
  ]
};


// Perform linting on all JavaScript files
gulp.task('lint', function() {
  return gulp.src(bases.src + '**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
});


// Delete all files in all build directories
gulp.task('clean', function() {
  return del([
    'build/dev/src/*.*',
    'build/tst/src/*.*' ,
    'build/prd/src/*.*'
  ]);
});


// Delete all files in the selected build directory
gulp.task('clean-build', function() {
  return del([
    bases.dist + '*.*'
  ]);
});


// Concat all .js files in the libs directory
gulp.task('compile-lib', ['clean-build'], function() {
  return gulp.src(bases.src + 'libs/*.js')
      .pipe(concat('libs.js'))
      .pipe(gulp.dest(bases.dist));
});


// Concat all .js files in the server directory
gulp.task('compile-server', ['compile-lib'], function() {
  return gulp.src(paths.server)
      .pipe(concat('server.js'))
      .pipe(gulp.dest(bases.dist));
});


// Concat all .server.js files in the ui directory
gulp.task('compile-ui', ['compile-server'], function() {
  copyClientCode();
  return gulp.src(bases.src + 'ui/*.server.js')
      .pipe(concat('ui.server.js'))
      .pipe(gulp.dest(bases.dist));
});


// Does any environment specific work.
// the "lint" step is also here, as that is only done on "dev"
// targeted updates.
gulp.task('compile-env', ['compile-ui'], function() {
  // Do target environment specific work
  switch (options.env) {
    case 'dev':
      gulp.src(bases.src + '**/*.js')
          .pipe(jshint())
          .pipe(jshint.reporter('jshint-stylish'));
      break;

    case 'tst':
      // Concat test scripts, if target is "tst"
      gulp.src(paths.tests)
          .pipe(concat('tests.js'))
          .pipe(gulp.dest(bases.dist));
      break;

    default:
      break;
  }

  return gulp.src(bases.src + 'environments/' + options.env + '/*.js')
      .pipe(gulp.dest(bases.dist));
});


// Runs the copy-latest task, then calls gapps upload in the correct
// configuration directory based on the target environment
gulp.task('upload-latest', ['compile-env'], shell.task(['gapps upload'],
    {cwd: 'build/' + options.env}));


// Appends ".html" to any css, and any js that will be included in client code
// Then copies those .html files to the upload staging folder.
function copyClientCode() {
  return gulp.src([
    bases.src + 'ui/*.html',
    bases.src + 'ui/*.css',
    bases.src + 'ui/*.client.js'])
      .pipe(
      rename(function(path) {
        if (path.extname !== '.html') {
          path.extname = path.extname + '.html';
        }
        return path;
      }))
      .pipe(gulp.dest(bases.dist));
}