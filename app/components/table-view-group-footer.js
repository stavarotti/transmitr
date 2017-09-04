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
  classNames: ['table-view-group-footer'],

  /**
   * The tag name to use.
   * 
   * @public
   * @override
   * @property tagName
   * @type {string}
   */
  tagName: 'footer',

  /**
   * The value to use as the group footer.
   * 
   * @public
   * @property value
   * @type {string}
   */
  value: ''
});
