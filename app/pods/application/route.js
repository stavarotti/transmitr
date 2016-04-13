import Ember from 'ember';
import generateGuid from '../../utils/generate-guid';

const { isEmpty } = Ember;

export default Ember.Route.extend({
  station: Ember.inject.service(),

  beforeModel() {
    const stationService = this.get('station');
    const stations = stationService.getStationsFromLocalStorage();

    if (isEmpty(stations)) {
      // Side load BBC and Flavor Mix.
      this.store.pushPayload({
        data: [
          {
            id: generateGuid(),
            type: 'stations/station',
            attributes: {
              name: 'BBC 1',
              description: 'BBC 1',
              stream: 'http://www.radiofeeds.co.uk/bbcradio1.pls'
            }
          }, {
            id: generateGuid(),
            type: 'stations/station',
            attributes: {
              name: 'Flavor Mix',
              description: 'By Fab 5 Finger & Grandmaster Ben - The hottest black music mixshow on air!',
              stream: 'http://www.flavormix.de/flavormixhigh.pls'
            }
          }
        ]
      });
    } else {
      let models = {
        data: []
      };

      stations.forEach(model => {
        let m = Object.assign({}, model.data);
        m.id = generateGuid();
        models.data.push(m);
      });

      // Push the models to the store
      this.store.pushPayload(models);
    }

    // Persist the stations to local storage
    stationService.saveStations();
  },

  actions: {
    didTransition() {
      // Hide the loading overlay.
      this.controllerFor('application').set('isLoading', false);
    },

    willTransition() {
      // Show the loading overlay.
      this.controllerFor('application').set('isLoading', true);
    }
  }
});