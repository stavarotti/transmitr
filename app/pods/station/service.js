import Ember from 'ember';
import m3uParser, {
  playlistType as m3uPlaylistType
} from '../../utils/parsers/m3u/parser';
import plsParser, {
  playlistType as plsPlaylistType
} from '../../utils/parsers/pls/parser';

const proxy = 'https://cors-anywhere.herokuapp.com/';

export default Ember.Service.extend({

  ajax: Ember.inject.service(),

  getParsedPlaylist(playlistUrl) {
    let url = this.getUrlWithProxy(playlistUrl);

    // Get the station's playlist and parse it.
    let playlistDetails = this.get('ajax')
      .request(url, {
        dataType: 'text'
      })
      .then(resp => {
        if ((new RegExp(plsPlaylistType + '$')).test(playlistUrl)) {
          return plsParser(resp);
        } else if ((new RegExp(m3uPlaylistType + '$')).test(playlistUrl)) {
          return m3uParser(resp);
        } else {
          throw new Error('Unable to detect playlist type.');
        }
      });

      return playlistDetails;
    },

    getProxy() {
      return proxy;
    },

    getUrlWithProxy(url) {
      return `${proxy}${url}`;
    }
});