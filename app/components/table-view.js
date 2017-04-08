import Ember from 'ember';

const { Component, computed } = Ember;
const hasOwnProperty = Object.prototype.hasOwnProperty;

export default Component.extend({
  
  /**
   * CSS class names to apply to the view's outer element.
   * 
   * @public
   * @override
   * @property classNames
   * @type {string[]}
   */
  classNames: ['table-view'],

  /**
   * The tag name to use.
   * 
   * @public
   * @override
   * @property tagName
   * @type {string}
   */
  tagName: 'section',

  /**
   * The content to render. This content will be mapped over.
   * 
   * @public
   * @property content
   * @type {Object[]}
   */
  content: null,

  /**
   * Whether the table is grouped.  When grouped, the table is displayed with a 
   * header and footer.
   * 
   * @public
   * @property isGrouped
   * @type {boolean}
   * @default false
   */
  isGrouped: false,

  /**
   * The value used to group the content.  This must be a key that 
   * exists on the row item to render.
   * 
   * @public
   * @property groupKey
   * @type {string}
   */
  groupKey: null,

  /**
   * The parsed content.
   * 
   * @public
   * @property parsedTableContent
   * @type {Object[]}
   */
  parsedTableContent: computed('content', 'isGrouped', {
    get() {
      let content = this.get('content');

      if (this.get('isGrouped')) {
        let groupKey = this.get('groupKey');

        if (content) {
          return content.reduce((accum, item) => {
            if (!hasOwnProperty.call(accum, item.get(groupKey))) {
              accum[item.get(groupKey)] = [];
            }

            accum[item.get(groupKey)].push(item);

            return accum;
          }, {});
        }
      }

      return content || [];
    }
  }),

  /**
   * The closure action to call when a row is clicked/tapped.
   * 
   * @public
   * @function onRowAction
   */
  onRowAction: null,

  /**
   * The closure action to call when a row has requested to be removed.
   * 
   * @public
   * @function onRowRemoveAction
   */
  onRowRemoveAction: null,

  /**
   * Whether to display the default row.
   * 
   * @public
   * @property showDefaultRow
   * @type {boolean}
   */
  showDefaultRow: false
});
