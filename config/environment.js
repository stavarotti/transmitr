/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'transmittr',
    environment: environment,
    contentSecurityPolicy: {
      "default-src": "'self'",
      "frame-src": "'self' https://*.firebaseio.com",
      "connect-src": "'self' https://auth.firebase.com wss://*.firebaseio.com",
      "script-src": "'self' 'unsafe-inline' https://*.firebaseio.com https://www.google-analytics.com",
      "img-src": "'self' data: https://www.google-analytics.com"
    },
    contentSecurityPolicyMeta: true,
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY
    },
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
