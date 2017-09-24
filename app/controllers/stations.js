import Ember from 'ember';
import StationCache from '../utils/station-cache';

const { Controller, inject: { controller, service }, isEmpty } = Ember;

export default Controller.extend({
  /**
   * The data store service.
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

  /**
   * Whether editing saved stations.
   * 
   * @public
   * @property isEditing
   * @type {boolean}
   */
  isEditing: false,

  actions: {
    /**
     * Handler for removing a saved station.
     * 
     * @public
     * @function onRemoveSavedStation
     * @param station {Object} the station to delete.
     */
    onRemoveSavedStation(station) {
      if (this.get('applicationController.nowPlayingStation') === station) {
        this.get('applicationController').set('nowPlayingStation', null);
      }

      // Remove the station from the data store.
      this.get('store').unloadRecord(station);

      // Update and persist the saved stations list.
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

      // Refresh the route.
      this.send('refreshRoute');
    },

    /**
     * Handler for station search.
     * 
     * @public
     * @function onStationSearch
     */
    onStationSearch() {
      this.transitionToRoute('search');
    },

    /**
     * Handler for setting the "now playing" station.
     * 
     * @public
     * @function onSetNowPlayingStation
     * @param station {Object} the station to set.
     */
    onSetNowPlayingStation(station) {
      this.set('applicationController.nowPlayingStation', station);
    },

    /**
     * Handler for toggling the saved station edit option.
     * 
     * @public
     * @function onToggleEdit
     */
    onToggleEdit() {
      this.toggleProperty('isEditing');
    }
  }
});
