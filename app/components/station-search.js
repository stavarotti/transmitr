import Ember from 'ember';

const { Component, computed, getOwner } = Ember;

export default Component.extend({
  /**
   * CSS class names to apply to the view's outer element.
   * 
   * @public
   * @property classNames
   * @type {string}
   */
  classNames: ['station-search'],

  /**
   * Closure action for station search.
   * 
   * @public
   * @function onStationSearch
   */
  onStationSearch: null,

  /**
   * Keeps track of the search term length and calculates the number
   * of characters remaining in order to conduct a search.
   * 
   * @public
   * @property remaingCharacatersMessage
   * @type {string}
   */
  remaingCharacatersMessage: computed('searchTerm', {
    get() {
      let searchTerm = this.get('searchTerm');
      
      if (searchTerm.length === 1) {
        return `2 characters remaining.`; 
      } else if (searchTerm.length === 2) {
        return `1 character remaining`; 
      }

      return `3 characters remaining`;
    }
  }),

  /**
   * The station term with which to search.
   * 
   * @public
   * @property searchTerm
   * @type {string}
   */
  searchTerm: '',

  /**
   * Whether a search can be conducted.
   * 
   * @public
   * @property canSearch
   * @type {boolean}
   */
  canSearch: computed('searchTerm', {
    get() {
      return this.get('searchTerm').length >= 3;
    }
  }),

  /**
   * The list of found stations.
   * 
   * @private
   * @property stations
   * @type {Object[]}
   */
  stations: null,

  actions: {
    noop(){},

    /**
     * Handler for adding a station.
     * 
     * @public
     * @function onAddStation
     * @param {Object} station The station to add
     */
    onAddStation(station) {
      this.get('onSaveStation')(station)
        .then(() => {
          getOwner(this).lookup('controller:search').transitionToRoute('my-stations');
        });
    },

    /**
     * Handler for station search
     * 
     * @public
     * @function onSearch
     */
    onSearch() {
      this.set('stations', null);

      if (this.get('canSearch')) {
        this.set('isLoading', true);
        
        this.get('onStationSearch')(this.get('searchTerm'))
          .then(results => {
            this.set('stations', results);
          })
          .catch(() => {
            this.set('stations', null);
          })
          .finally(() => {
            this.set('isLoading', false);
          });
      }
    }
  }
});
