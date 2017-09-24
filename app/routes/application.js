import Ember from 'ember';
import uuid from '../utils/uuid';
import StationCache from '../utils/station-cache';

const { Route } = Ember;

export default Route.extend({
  /**
   * Attempts to run any validation before resolving the model for this route.
   * 
   * @private
   * @override
   * @function beforeModel 
   */
  beforeModel() {
    // Fetch all stations from cache
    let stations = StationCache.get();

    if (stations.length) {
      // Setup the ember-data side load structure.
      let models = {
        data: []
      };

      stations.forEach(model => {
        let m = Object.assign({}, model.data);
        m.id = uuid();
        models.data.push(m);
      });

      // Push the models into the store.
      this.get('store').pushPayload(models);
    } else {
      // Side load BBC and Flavor Mix.
      this.store.pushPayload({
        data: [
          {
            id: uuid(),
            type: 'stations',
            attributes: {
              dateAdded: '2016-12-31T18:24:08Z',
              bitRate: '128',
              description: 'The best new music and entertainment',
              favorite: true,
              genre: 'Top 40 _ Pop',
              location:
                'http://open.live.bbc.co.uk/mediaselector/5/select/mediaset/http-icy-mp3-a/vpid/bbc_radio_one/format/pls.pls',
              name: 'BBC Radio 1',
              persistentId: '12C0B20BF3E3FB1C'
            }
          },
          {
            id: uuid(),
            type: 'stations',
            attributes: {
              dateAdded: '2016-12-31T18:21:17Z',
              bitRate: '128',
              description:
                '1200 Hot Tracks A Day In The Mix! All Styles From The Old To The New!',
              favorite: true,
              genre: 'Hip Hip _ Rap',
              location: 'http://flavormix.de/flavormixhigh.pls',
              name: 'Flavor Mix',
              persistentId: '33DBD925BBDB1700'
            }
          }
        ]
      });

      // Save the stations to local storage.
      let stations = this.get('store')
        .peekAll('station')
        .reduce((accum, model) => {
          accum.push(model.serialize());
          return accum;
        }, []);

      StationCache.saveAll(stations);
    }
  }
});
