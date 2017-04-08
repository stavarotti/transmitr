import Ember from 'ember';
import DS from 'ember-data';

const { attr, Model } = DS;
const { computed: { alias } } = Ember;

export default Model.extend({
  /**
   * The streaming bitrate.
   * 
   * @public
   * @property bitRate
   * @type {number}
   */
  bitRate: attr('number'),

  /**
   * The date when the station was added.
   * 
   * @public
   * @property dateAdded
   * @type {Date}
   */
  dateAdded: attr('date'),

  /**
   * The station long description.
   * 
   * @public
   * @property description
   * @type {string}
   */
  description: attr('string'),

  /**
   * Whether the this station has been saved as a favorite.
   * 
   * @public
   * @property favorite
   * @type {boolean}
   */
  favorite: attr('boolean', { defaultValue: false }),

  /**
   * The music type
   * 
   * @public
   * @property genre
   * @type {string}
   */
  genre: attr('string'),

  /**
   * The station url.
   * 
   * @public
   * @property location
   * @type {string}
   */
  location: attr('string'),

  /**
   * The station name.
   * 
   * @public
   * @property name
   * @type {string}
   */
  name: attr('string'),

  /**
   * The the iTunes-specifi station id.
   * 
   * @public
   * @property persistentId
   * @type {string}
   */
  persistentId: attr('string'),

  /**
   * The value to use as the subtitle on the view.
   * 
   * @public
   * @property subTitle
   * @type {string}
   */
  subTitle: alias('genre'),

  /**
   * The value to use as the title on the view.
   * 
   * @public
   * @property title
   * @type {string}
   */
  title: alias('name')
});
