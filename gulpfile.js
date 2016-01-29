"use strict";
var gulp = require('gulp'),
    gls = require('gulp-live-server'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require("vinyl-source-stream");

gulp.task('browserify', function() {
    var sourceFile = './client/js/core.js',
        destFolder = './client/public/js/',
        destFile = 'main.js';

    var bundler = browserify({
        entries: sourceFile,
        cache: {}, packageCache: {}, fullPaths: true, debug: false
    });

    var bundle = function() {
        return bundler
            .bundle()
            .on('error', function (err) {
                console.log(err);
            })
            .pipe(source(destFile))
            .pipe(gulp.dest(destFolder));
    };

    if(global.isWatching) {
        bundler = watchify(bundler);
        bundler.on('update', bundle);
    }
    return bundle();
});

gulp.task('default', function () {
    gulp.start('browserify');

    gulp.watch('client/js/**/*.js', ['browserify']);
});
