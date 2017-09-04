import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import StationCache from '../utils/station-cache';

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
   * The application controller.
   * 
   * @private
   * @property applicationController
   * @type {Object}
   */
  applicationController: controller('application'),

  actions: {
    /**
     * Handler for playing selected station.
     * 
     * @public
     * @function onPlayStation
     * @param station {Object} the station to set as the current.
     */
    onPlayStation(station) {
      this.set('applicationController.currentlyPlayingStation', station);
    },

    /**
     * Handler for deleting a saved station.
     * 
     * @public
     * @function onRemoveSavedStation
     */
    onRemoveSavedStation(station) {
      if (this.get('applicationController.currentlyPlayingStation') === station) {
        this.get('applicationController').set('currentlyPlayingStation', null);
      }

      this.get('store').unloadRecord(station);

      // Save the stations to local storage.
      let stations = this.get('store')
        .peekAll('station')
        .filter(model => model && !!model.get('favorite'))
        .reduce((accum, model) => {
          if (!isEmpty(model)) {
            accum.push(model.serialize());
          }
          return accum;
        }, []);

      StationCache.replaceAll(stations);

      this.send('refreshRoute');
    },

    /**
     * Handler for transitioning to the station search route.
     * 
     * @public
     * @function onStationSearch
     */
    onStationSearch() {
      this.transitionToRoute('search');
    }
  }
});
