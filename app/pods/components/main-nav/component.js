import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',

  classNames: ['main-nav'],

  classNameBindings: ['navOpen:open'],

  navOpen: false,

  actions: {
    close() {
      this.set('navOpen', false);
    },
    toggleNav() {
      this.toggleProperty('navOpen');
    }
  }
});