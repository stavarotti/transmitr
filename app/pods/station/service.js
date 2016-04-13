import Ember from 'ember';
import m3uParser, {
  playlistType as m3uPlaylistType
} from '../../utils/parsers/m3u/parser';
import plsParser, {
  playlistType as plsPlaylistType
} from '../../utils/parsers/pls/parser';

const { isEmpty } = Ember;

// The server through which playlist requests are proxied.
// Change this to a custom version at some point.
const proxy = 'https://cors-anywhere.herokuapp.com/';

const M3U_MATCHER = new RegExp(m3uPlaylistType + '$');
const PLS_MATCHER = new RegExp(plsPlaylistType + '$');

export default Ember.Service.extend({

  ajax: Ember.inject.service(),

  store: Ember.inject.service(),

  /**
    Returns an object representing a parsed m3u/pls playlist.
    See the imported parsers for an example.

    @param {string} playlistUrl The playlist to parse.
    @returns {Object} The parsed playlist.
    */
  getParsedPlaylist(playlistUrl) {
    let url = this.getUrlWithProxy(playlistUrl);

    let playlistDetails = this.get('ajax')
      .request(url, {
        dataType: 'text'
      })
      .then(resp => {
        if (PLS_MATCHER.test(playlistUrl)) {
          return plsParser(resp);
        } else if (M3U_MATCHER.test(playlistUrl)) {
          return m3uParser(resp);
        } else {
          throw new Error('Unable to detect playlist type.');
        }
      });

      return playlistDetails;
    },

    /**
      Get's the proxy URL.

      @return {string} The proxy URL.
      */
    getProxy() {
      return proxy;
    },

    /**
      Returns the given url concatenated to the proxy.

      @param {string} url The url to append to the proxy.
      @return {string} The formatted url.
      */
    getUrlWithProxy(url) {
      return `${proxy}${url}`;
    },

    /**
      Returns any saved stations.

      @returns {Array} Returns the persisted stations.
      */
    getStationsFromLocalStorage() {
      let savedStations = window.localStorage.getItem('stations');

      if (!isEmpty(savedStations)) {
        return JSON.parse(savedStations);
      }

      return [];
    },

    /**
      Persists all existing stations to local storage.

      @method
      */
    saveStations() {
      let stations = this.get('store').peekAll('stations/station').reduce((accum, model) => {
        accum.push(model.serialize());
        return accum;
      }, []);

      if (!isEmpty(stations)) {
        window.localStorage.setItem('stations', JSON.stringify(stations));
      }
    }
});