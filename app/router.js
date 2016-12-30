import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('stations', { path: '/'}, function() {
    this.route('index', { path: '/'});
    this.route('station', { path: '/stations/:id' });
    this.route('add');
  });

  this.route('about');
});

export default Router;
