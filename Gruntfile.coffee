
module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    concat:
      dist:
        src: [
          'lib/template.js'
          'lib/view.js'
        ]
        dest: 'dist/<%= pkg.name %>.js'
    uglify:
      dist:
        src: '<%= concat.dist.dest %>'
        dest: 'dist/<%= pkg.name %>.min.js'
    jade:
      compile:
        options:
          client: true
          compileDebug: false
          processName: (filename) ->
            "paginator"
        files:
          'lib/template.js': 'src/template.jade'
    coffee:
      compile:
        files:
          'lib/view.js': 'src/view.coffee'
    clean: [
      'lib'
      'dist'
    ]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-clean'

  grunt.registerTask 'default', [
    'clean'
    'jade'
    'coffee'
    'concat'
    'uglify'
  ]
