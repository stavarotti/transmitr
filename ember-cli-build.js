/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');
const env = process.env.EMBER_ENV;

require('dotenv').config({
  path: `.env.${env}`
});

module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
    'asset-cache': {
      include: [
        'assets/**/*'
      ]
    },

    'esw-cache-fallback': {
      patterns: [ '/' ],
      version: '1' // Changing the version will bust the cache
    },

    // Babel Options
    'ember-cli-babel': {
      optional: ['es7.decorators']
    },

    // Fingerprinting
    fingerprint: {
      exclude: ['assets/icons/'],
      enabled: env === 'production' || env === 'staging'
    },

    // Sass Options
    sassOptions: {
      extension: 'scss'
    },

    // Source Map Options
    sourcemaps: {
      enabled: true,
      extensions: ['js']
    }
  });

  // Fontello
  var fonts = new Funnel('vendor/fontello', {
    srcDir: '/',
    include: ['**/*.woff2'],
    destDir: '/'
  });
  app.import('vendor/fontello/css/animation.css');
  app.import('vendor/fontello/css/transmittr.css');

  return app.toTree(fonts);
};
