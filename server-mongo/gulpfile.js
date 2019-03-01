const gulp = require('gulp'),
      nodemon = require('gulp-nodemon'),
      gulpMocha = require('gulp-mocha'),
      env = require('gulp-env'), // Let us manipulate the environment variables in Gulp, so that we can setup a test environment.
      supertest = require('supertest'); // This one allow us to make http calls

gulp.task('default', function() {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT:8000
    },
    ignore: ['./node_modules/**']
  })
  .on('restart', function() {
    console.log('Restarting');
  });
});

gulp.task('tests', function (){
  /*
    When we get into our app.js I can do a process.env and pull in our environement,
    so it'll either be prod, dev or test and that will be governed by Gulp execution.
  */
  env({vars: {ENV:'Test'}});
  gulp.src('Tests/*.js', { read: false })
    .pipe(gulpMocha({reporter: 'nyan'}));
});
