import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  /**
   * CSS class names to apply to the view's outer element.
   * 
   * @public
   * @override
   * @property classNames
   * @type {string[]}
   */
  classNames: ['table-view-title'],

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
