import Component from '@ember/component';

export default Component.extend({
  /**
   * CSS class names to apply to the view's outer element.
   * 
   * @public
   * @override
   * @property classNames
   * @type {string[]}
   */
  classNames: ['table-view-group-header'],

  /**
   * The tag name to use.
   * 
   * @public
   * @override
   * @property tagName
   * @type {string}
   */
  tagName: 'header',

  /**
   * The value to use as the group header.
   * 
   * @public
   * @property value
   * @type {string}
   */
  value: ''
});
