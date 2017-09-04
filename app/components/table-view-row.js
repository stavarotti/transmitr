import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  /**
   * CSS class names to apply to the view's outer element.
   * 
   * @public
   * @override
   * @property classNames
   * @type {string[]}
   */
  classNames: ['table-view-row'],

  /**
   * A list of properties of the view to apply as class names.
   * 
   * @public
   * @override
   * @property classNameBindings
   * @type {string[]}
   */
  classNameBindings: ['isEditing:editing'],

  /**
   * Click handler for entire row.
   * 
   * @public
   * @override
   * @function click
   */
  click() {
    if (this.get('onRowAction')) {
      this.get('onRowAction')(this.get('model'));
    }
  },

  /**
   * The model containing all attributes.
   * 
   * @public
   * @property model
   * @type {Object}
   */
  model: null,

  /**
   * The supplementary row image to display.
   * 
   * @public
   * @property imageViewURL
   * @type {string}
   */
  imageViewURL: '',

  /**
   * Whether the row is elligable for removal.
   * 
   * @public
   * @property canRemoveRow
   * @type {boolean}
   */
  canRemoveRow: false,

  /**
   * The closure action to trigger when a row is tapped/clicked.
   * 
   * @public
   * @function onRowAction
   */
  onRowAction: null,

  /**
   * The closure action to trigger when a row is removed.
   * 
   * @public
   * @function onRowRemoveAction
   */
  onRowRemoveAction: null,

  /**
   * Whether to show the arrow view.
   * 
   * @public
   * @property showArrowView
   * @type {boolean}
   */
  showArrowView: false,

  /**
   * Whether to show the supplementary row image.
   * 
   * @public
   * @property showImageView
   * @type {boolean}
   */
  showImageView: false,

  /**
   * Whether to show the sub title.
   * 
   * @public
   * @property showSubTitle
   * @type {boolean}
   */
  showSubTitle: computed('subTitle', {
    get() {
      return !isEmpty(this.get('subTitle'));
    },
    set(key, value) {
      return value;
    }
  }),

  /**
   * The row sub title.
   *
   * @public
   * @property subTitle
   * @type {string}
   */
  subTitle: computed('model.subTitle', {
    get() {
      return this.get('model.subTitle') || '';
    },

    set(key, value) {
      return value;
    }
  }),

  /**
   * The row title.
   *
   * @public
   * @property title
   * @type {string}
   */
  title: computed('model.title', {
    get() {
      return this.get('model.title') || '';
    },

    set(key, value) {
      return value;
    }
  })
});
