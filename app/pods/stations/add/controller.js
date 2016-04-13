import Ember from 'ember';
import generateGuid from '../../../utils/generate-guid';

export default Ember.Controller.extend({

  ajax: Ember.inject.service(),

  station: Ember.inject.service(),

  showManualAdd: true,

  verifyPlaylistUrl(playlistUrl) {
    let url = this.get('proxy').getUrlWithProxy(playlistUrl);

    let verification = this.get('ajax')
      .request(url, {
        dataType: 'text'
      });

    return verification;
  },

  actions: {
    addStation(stationName, playlistUrl) {
      return this.get('station').getParsedPlaylist(playlistUrl)
        .then(() => {
          // No need to do anything with the data since this is merely adding
          // the station
          this.store.createRecord('stations/station', {
            id: generateGuid(),
            name: stationName,
            description: stationName,
            stream: playlistUrl
          });

          // Persist to local storage.
          this.get('station').saveStations();
        });
    },

    changePanel(panelName) {
      if (panelName === 'manual') {
        this.set('showManualAdd', true);
      } else {
        this.set('showManualAdd', false);
      }
    },

    searchStation(stationName, playlistUrl) {
      return this.send('addAction', stationName, playlistUrl);
    }
  }
});
