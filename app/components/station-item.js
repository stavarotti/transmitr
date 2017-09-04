import Component from '@ember/component';

export default Component.extend({
  /**
   * CSS class names to apply to the view's outer element.
   * 
   * @public
   * @property classNames
   * @type {string}
   */
  classNames: ['station-item'],

  /**
   * The station model
   * 
   * @public
   * @property station
   * @type {Object[]}
   */
  station: null
});
