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
      this.get('store').pushPayload({
        data: [
          {
            id: generateGuid(),
            type: 'stations/station',
            attributes: {
              dateAdded: '2016-12-31T18:24:08Z',
              bitRate: '128',
              description: 'The best new music and entertainment',
              genre: 'Top 40 _ Pop',
              location: 'http://open.live.bbc.co.uk/mediaselector/5/select/mediaset/http-icy-mp3-a/vpid/bbc_radio_one/format/pls.pls',
              name: 'BBC Radio 1',
              persistentId: '12C0B20BF3E3FB1C'
            }
          }, {
            id: generateGuid(),
            type: 'stations/station',
            attributes: {
              dateAdded: '2016-12-31T18:21:17Z',
              bitRate: '128',
              description: '1200 Hot Tracks A Day In The Mix! All Styles From The Old To The New!',
              genre: 'Hip Hip _ Rap',
              location: 'http://flavormix.de/flavormixhigh.pls',
              name: 'Flavor Mix',
              persistentId: '33DBD925BBDB1700'
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
      this.get('store').pushPayload('stations/station', models);
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