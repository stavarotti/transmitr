import Ember from 'ember';
import routeList from '../../../enumerations/route-list';

const {
  computed,
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

  router: service('-routing'),

  currentRoute: computed('router.currentPath', {
    get() {
      const currentPath = this.get('router.currentPath');
      return routeList.find((route => route.route === currentPath));
    }
  }),

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
