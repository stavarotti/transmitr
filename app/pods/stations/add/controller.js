import Ember from 'ember';
import generateGuid from '../../../utils/generate-guid';
import HTMLParser from '../../../utils/parsers/html/parser';
import StationParser from '../../../utils/parsers/stations/parser';

const searchUrl = 'https://cors-anywhere.herokuapp.com/http://www.internet-radio.com/search/?radio=';

const { Logger: { error }} = Ember;

export default Ember.Controller.extend({

  ajax: Ember.inject.service(),

  station: Ember.inject.service(),

  showManualAdd: false,

  verifyPlaylistUrl(playlistUrl) {
    let url = this.get('proxy').getUrlWithProxy(playlistUrl);

    let verification = this.get('ajax')
      .request(url, {
        dataType: 'text'
      });

    return verification;
  },

  actions: {
    addStation(station) {
      return this.get('station').getParsedPlaylist(station.m3u || station.pls)
        .then(() => {
          // No need to do anything with the data since this is merely adding
          // the station
          this.store.createRecord('stations/station', {
            id: generateGuid(),
            name: station.name,
            description: station.description || station.name,
            stream: station.m3u || station.pls
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

    // refactor later
    searchStation(searchTerm) {
      let url = searchUrl + searchTerm;

      return this.get('ajax').request(url, { dataType: 'text'})
        .then(results => HTMLParser(results))
        .then(node => StationParser(node))
        .catch(e => {
          error(e);
          return [];
        });
    }
  }
});
