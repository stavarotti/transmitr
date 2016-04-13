import Ember from 'ember';

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),

  tagName: 'nav',

  classNames: ['main-nav'],

  classNameBindings: ['navOpen:open'],

  navOpen: false,

  isHome: Ember.computed.equal('routing.currentPath', 'stations.index'),

  actions: {
    close() {
      this.set('navOpen', false);
    },
    toggleNav() {
      this.toggleProperty('navOpen');
    }
  }
});