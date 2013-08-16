
module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    concat:
      dist:
        src: [
          'lib/template.js'
          'lib/<%= pkg.name %>.js'
        ]
        dest: 'dist/<%= pkg.name %>.js'

    uglify:
      dist:
        src: '<%= concat.dist.dest %>'
        dest: 'dist/<%= pkg.name %>.min.js'

    coffee:
      compile:
        files:
          'lib/<%= pkg.name %>.js': 'src/<%= pkg.name %>.coffee'

    watch:
      scripts:
        files: ['src/*.coffee', 'src/*.jade']
        tasks: ['coffee', 'jade', 'concat']

    clean: [
      'lib'
      'dist'
    ]

    jade:
      compile:
        options:
          client: true
          compileDebug: false
          processName: (filename) ->
            'chosen'
        files:
          'lib/template.js': 'src/template.jade'

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-jade'

  grunt.registerTask 'build', [
    'clean'
    'coffee'
    'jade'
    'concat'
    'uglify'
  ]

  grunt.registerTask 'default', [
    'watch'
  ]
