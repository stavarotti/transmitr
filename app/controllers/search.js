import Ember from 'ember';
import StationCache from '../utils/station-cache';

const { Controller, RSVP, inject: { service } } = Ember;

export default Controller.extend({
  /**
   * The data store service.
   * 
   * @private
   * @property store
   * @type {Object}
   */
  store: service(),

  actions: {
    /**
     * Handler for saving a station.
     * 
     * @public
     * @function onSaveStation
     * @param {Object} station the station to save.
     */
    onSaveStation(station) {
      return RSVP.Promise.resolve().then(() => {
        station.set('favorite', true);
        StationCache.save(station.serialize());
      });
    },

    /**
     * Handler for station search.
     * 
     * @public
     * @function onStationSearch
     * @param {string} term The term with which to search.
     */
    onStationSearch(term) {
      // Replace with legit backend search
      return this.get('store').query('station', {
        name: term
      });
    }
  }
});
