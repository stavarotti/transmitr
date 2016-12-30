import Ember from 'ember';
import routeList from '../../../enumerations/route-list';

const {
  computed,
  inject: {
    service
  }
} = Ember;

export default Ember.Component.extend({
  classNames: ['navigation-drawer', 'slide-in-effect'],

  /**
   * Manages the both the site-head and site navigation options.
   * 
   * @private
   * @property navigation
   * @type {Object}
   */
  navigation: service(),

  isOpen: false,

  /**
   * The list of all possible routes.
   * 
   * @public
   * @property navigationItems
   * @type {Object[]}
   */
  navigationItems: computed('isOpen', {
    get() {
      return routeList;
    }
  }),

  actions: {
    /**
     * Handles the intent to sign out of the current session.
     * 
     * @private
     * @function onLogout
     */
    onLogout() {
      this.get('session').invalidate();
    },

    /**
     * Handles the intent to close the drawer on navigation.
     * 
     * @private
     * @function onNavigate
     */
    onNavigate() {
      this.get('navigation').toggleProperty('isNavigationDrawerOpen');
    }
  }
});
