import Ember from 'ember';

const { Component } = Ember;

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
   * CSS class names to apply to the view's outer element.
   * 
   * @public
   * @property classNames
   * @type {string}
   */
  classNames: ['global-nav'],

  /**
   * A list of properties of the view to apply as class names.
   * 
   * @public
   * @property classNameBindings
   * @type {string[]}
   */
  classNameBindings: ['isShowingNavSheet:nav-sheet-active'],

  /**
   * Whether the nav sheet is currently being displayed.
   * 
   * @public
   * @property isShowingNavSheet
   * @type {boolean}
   */
  isShowingNavSheet: false,

  actions: {
    /**
     * Handler for hiding the nav sheet when changing routes.
     * 
     * @public
     * @function onNavigate
     */
    onNavigate() {
      this.set('isShowingNavSheet', false);
    },

    /**
     * Handler for toggling the nav sheet state.
     * 
     * @public
     * @function onToggleNavSheet
     */
    onToggleNavSheet() {
      this.toggleProperty('isShowingNavSheet');
    }
  }
});
