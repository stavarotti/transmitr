import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import Ember from 'ember';
import { task } from 'ember-concurrency';
import StationCache from '../utils/station-cache';

const {
  $: { getJSON }
} = Ember;

export default Controller.extend({
  /**
   * The data store.
   * 
   * @private
   * @property store
   * @type {Object}
   */
  store: service(),

  /**
   * Task for station search.
   * 
   * @public
   * @property searchTask
   * @type {Object}
   */
  searchTask: task(function*(term) {
    let stations = yield getJSON(
      `https://vf278w2uqf.execute-api.us-east-1.amazonaws.com/prod/search?q=${term}`
    );
    console.log('stations => ', stations);
    return this.get('store').push(stations);
  }),

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
      return this.get('searchTask').perform(term);
    }
  }
});
