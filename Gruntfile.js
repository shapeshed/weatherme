module.exports = function (grunt) {

  "use strict";

  grunt.initConfig({

    jshint: {
      files: [
        'Gruntfile.js',
        'lib/**/*.js',
        'index.js',
        'package.json',
        'test/**/*.js',
        '.jshintrc'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    mochaTest: {
      all: {
        src: 'test/**/*.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('build', ['jshint', 'mochaTest']);

};
