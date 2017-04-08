import Ember from 'ember';

const { Component, computed: { sort } } = Ember;

export default Component.extend({
  /**
   * CSS class names to apply to the view's outer element.
   * 
   * @public
   * @property classNames
   * @type {string}
   */
  classNames: ['station-list'],

  /**
   * The list of stations.
   * 
   * @public
   * @property stations
   * @type {Object[]}
   */
  stations: null,

  /**
   * The station list sorted alphabetically.
   * 
   * @public
   * @property sortedStations
   * @type {Object[]}
   */
  sortedStations: sort('stations', (a, b) => {
    if (a.get('name') > b.get('name')) {
      return 1;
    } else if (a.get('name') < b.get('name')) {
      return -1;
    }

    return 0;
  })
});
