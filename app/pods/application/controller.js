import Ember from 'ember';

const {
  Controller,
  inject: {
    service
  }
} = Ember;

export default Controller.extend({
  /**
   * Manages the both the site-head and site navigation options.
   * 
   * @private
   * @property navigation
   * @type {Object}
   */
  navigation: service(),

  /**
   * When true displays an overlay when transitioning routes.
   * 
   * @private
   * @property isLoading
   * @type {boolean}
   */
  isLoading: false
});
