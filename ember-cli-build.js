/*eslint-disable */
const EmberApp = require("ember-cli/lib/broccoli/ember-app");
const Funnel = require('broccoli-funnel');
const env = process.env.EMBER_ENV;

require("dotenv").config({
    path: `.env.${env}`
});

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Babel Options
    babel: {
      optional: ['es7.decorators']
    },

    // Fingerprinting
    fingerprint: {
        exclude: ["assets/icons/"],
        enabled: (env === "production" || env === "staging"),
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
    include: ['**/*.woff2',],
    destDir: '/'
  });

  return app.toTree(fonts);
};
