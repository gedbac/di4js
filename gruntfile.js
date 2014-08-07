'use strict';

module.exports = function (grunt) {

  var os = require('os');
  var path = require('path');

  var src = [
    './src/DependencyResolverException.js',
    './src/InstanceFactoryOptions.js',
    './src/IInstanceFactory.js',
    './src/InstanceFactory.js',
    './src/INameTransformer.js',
    './src/NameTransformer.js',
    './src/IDependencyResolver.js',
    './src/DependencyResolver.js',
    './src/DefaultDependencyResolver.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      'browser-lib': {
        src: [
          './<%= pkg.name %>.js',
          './<%= pkg.name %>.min.js'
        ]
      },
      'node-lib': {
        src: [
          './lib/<%= pkg.name %>.js'
        ]
      }
    },
    concat: {
      'browser-lib': {
        options: {
          separator: os.EOL + os.EOL,
          banner:
            "var di = (function () {" + os.EOL + os.EOL +
            "  'use strict';" + os.EOL + os.EOL +
            "  var di = {};" + os.EOL + os.EOL +
            "  di.version = '<%= pkg.version %>';" + os.EOL + os.EOL,
          footer:
            os.EOL + os.EOL +
            "  Object.freeze(di);" + os.EOL + os.EOL +
            "  return di;" + os.EOL + os.EOL +
            "} ());",
          process: function (src, filepath) {
            var lines = src.split(os.EOL);
            for (var i = 0; i < lines.length; i++) {
              lines[i] = '  ' + lines[i];
            }
            return lines.join(os.EOL);
          }
        },
        src: src,
        dest: './<%= pkg.name %>.js',
        nonull: true
      },
      'node-lib': {
        options: {
          separator: os.EOL + os.EOL,
          banner:
            "'use strict';" + os.EOL + os.EOL +
            "var di = {};" + os.EOL + os.EOL +
            "di.version = '<%= pkg.version %>';" + os.EOL + os.EOL,
          footer:
            os.EOL + os.EOL +
            "module.exports = di;"
        },
        src: src,
        dest: './lib/<%= pkg.name %>.js',
        nonull: true
      }
    },
    jshint: {
      options: {
        indent: 2,
        curly: true,
        maxlen: 120,
        trailing: true,
        smarttabs: false,
        white: true
      },
      'spec': {
        options: {
          strict: false,
          globalstrict: true,
          globals: {
            console: true,
            jasmine: true,
            describe: true,
            expect: true,
            it: true,
            beforeEach: true,
            afterEach: true,
            di: true,
            require: true
          },
          '-W087': false,
          '-W065': false
        },
        files: {
          src: [
            './spec/**/*.spec.js'
          ]
        }
      },
      'src': {
        options: {
          browser: true,
          strict: false
        },
        files: {
          src: src
        }
      },
      'browser-lib': {
        options: {
          browser: true,
          strict: true
        },
        files: {
          src: [ './<%= pkg.name %>.js' ]
        }
      },
      'node-lib': {
        options: {
          node: true,
          strict: true
        },
        files: {
          src: [ './<%= pkg.name %>.js' ]
        }
      }
    },
    uglify: {
      options: {
        mangle: false,
        compress: false,
        sourceMap: true,
        sourceMapName: './<%= pkg.name %>.map'
      },
      'browser-min-lib': {
        files: {
          './<%= pkg.name %>.min.js': [ './<%= pkg.name %>.js' ]
        }
      }
    },
    jasmine: {
      'spec': {
        src: './<%= pkg.name %>.js',
        version: '2.0.1',
        options: {
          specs: './spec/**/*.spec.js',
          outfile: './spec-runner.html',
          keepRunner: true
        }
      },
      'min-spec': {
        src: './<%= pkg.name %>.min.js',
        version: '2.0.1',
        options: {
          specs: './spec/**/*.spec.js',
          outfile: './spec-runner.html',
          keepRunner: true
        }
      }
    },
    jasmine_node: {
      spec: ['spec/']
    },
    watch: {
      options: {
        livereload: false,
        interrupt: true,
        dateFormat: function (time) {
          grunt.log.writeln('Completed in ' + time + 'ms ');
          grunt.log.writeln('Waiting...');
        },
        spawn: false
      },
      'browser-src': {
        files: './src/**/*.js',
        tasks: [ 'jshint:src', 'clean:browser-lib', 'concat:browser-lib', 'jasmine:spec', 'clean:node-lib',
          'concat:node-lib', 'jasmine_node:spec' ]
      },
      'browser-spec': {
        files: './spec/**/*.spec.js',
        tasks: [ 'jshint:spec', 'jasmine:spec', 'jasmine_node:spec' ]
      }
    }
  });

  grunt.event.on('watch', function (action, filepath, target) {
    if (target === 'src') {
      grunt.config('jshint.src.src', filepath);
    } else if (target === 'spec') {
      grunt.config('jshint.spec.src', filepath);
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [
    'jshint:src',
    'jshint:spec',
    'clean:browser-lib',
    'concat:browser-lib',
    'jshint:browser-lib',
    'jasmine:spec',
    'clean:node-lib',
    'concat:node-lib',
    'jshint:node-lib',
    'jasmine_node:spec',
    'uglify:browser-min-lib',
    'jasmine:min-spec'
  ]);

};