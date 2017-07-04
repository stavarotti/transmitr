import Ember from 'ember';

const { Component, computed, getOwner } = Ember;

export default Component.extend({
  /**
   * Tag name for the view's outer element.
   * 
   * @public
   * @property tagName
   * @type {string}
   */
  tagName: 'header',

  /**
   * The router instance.
   * 
   * @private
   * @property router
   * @type {Object}
   */
  router: computed({
    get() {
      return getOwner(this).lookup('router:main');
    }
  }),

  /**
   * CSS class names to apply to the view's outer element.
   * 
   * @public
   * @property classNames
   * @type {string}
   */
  classNames: ['navigation-bar'],

  /**
   * 
   * @public
   * @property classNameBindings
   * @type {string[]}
   */
  classNameBindings: ['hasPreviousScreen:previous-active'],

  /**
   * The current route name.
   * 
   * @private
   * @property currentRoute
   * @type {string}
   */
  currentRouteName: computed('router.currentRouteName', {
    get() {
      let routeName;
      
      switch(this.get('router.currentRouteName')) {
        case 'my-stations':
        default:
          routeName = 'Home';
          break;
        case 'search':
          routeName = 'Search';
          break;
      }

      return routeName;
    }
  }),

  /**
   * Tracks whether there is a previous screen.
   * 
   * @public
   * @property hasPreviousScreen
   * @type {boolean}
   */
  hasPreviousScreen: computed('router.currentRouteName', {
    get() {
      return this.get('router.currentRouteName') !== 'my-stations';
    }
  })
});
