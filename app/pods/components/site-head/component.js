import Ember from 'ember';

const {
  inject: {
    service
    }
  } = Ember;

/**
 * The "top bar" navigation component.
 *
 * @public
 * @extends Component
 */
export default Ember.Component.extend({

  classNames: ['site-head', 'fixed-header'],

  /**
   * Manages the both the site-head and site navigation options.
   *
   * @private
   * @property navigation
   * @type {Object}
   */
  navigation: service(),

  actions: {
    /**
     * Handler for intent to toggle the site navigation.
     *
     * @private
     * @function onToggleNavigationDrawer
     */
    onToggleNavigationDrawer() {
      this.get('navigation').toggleProperty('isNavigationDrawerOpen');
    },

    goToRoute(routeName) {
      // TODO Could inject something here
      this.container.lookup('controller:application').transitionToRoute(routeName);
    }
  }
});
