import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('stations', { path: '/' }, function() {
    this.route('station', { path: '/stations/:id' });
    this.route('add');
  });

  this.route('favorites');
});

export default Router;
