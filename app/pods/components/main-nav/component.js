import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',

  classNames: ['main-nav'],

  navOpen: false,

  actions: {
    toggleNav() {
      this.toggleProperty('navOpen');
    }
  }
});