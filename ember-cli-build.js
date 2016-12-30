/*jshint node:true*/
/* global require, module */
var Funnel = require('broccoli-funnel');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Babel Options
    babel: {
      optional: ['es7.decorators']
    },

    // Sass Options
    sassOptions: {
      extension: 'scss',
      includePaths: [
        'bower_components/bootstrap/scss',
        'bower_components/font-awesome/scss'
      ]
    },

    // Source Map Options
    sourcemaps: {
      enabled: true,
      extensions: ['js']
    }
  });

  // Font Awesome
  var fonts = new Funnel('bower_components/font-awesome', {
    srcDir: '/',
    include: ['**/*.woff'],
    destDir: '/'
  });

  return app.toTree(fonts);
};
