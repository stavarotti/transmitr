import Ember from 'ember';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Component.extend({
  tagName: 'main',

  classNames: ['main-container'],

  /**
   * Manages the both the site-head and site navigation options.
   * 
   * @private
   * @property navigation
   * @type {Object}
   */
  navigation: service(),

  click(e) {
    if (e.target.classList.contains('main-container')) {
      this.get('navigation').toggleProperty('isNavigationDrawerOpen');
    }
  },

  // TODO: Fix me.  When testing via chrome, both touch and click are
  //       invoked.
  touchStart(e) {
    if (e.target.classList.contains('main-container')) {
      this.get('navigation').toggleProperty('isNavigationDrawerOpen');
    }
  }
});
