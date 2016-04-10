import tokenizer from '../../../utils/parsers/pls/tokenizer';
import playlistParser from '../../../utils/parsers/pls/parser';
import trackListParser from '../../../utils/parsers/tracklist/parser';

import Ember from 'ember';

const proxy = 'https://cors-anywhere.herokuapp.com/';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  getPlayerMarkup(modelId) {
    const model = this.store.peekRecord('stations.station', modelId);

    // Account for stations that don't have a currentlyPlaying list
    if (model && model.get('currentlyPlayingUrl')) {
      return this.get('ajax')
        .request(`${proxy}${model.get('currentlyPlayingUrl')}`, {
          dataType: 'text'
        })
        .then(resp => {
          return trackListParser(resp);
        });
    } else {
      return Ember.RSVP.resolve();
    }
  },

  model(params) {
    // The records should always be there (side-loaded).  We never
    // send anything external.
    let station = this.store.peekRecord('stations/station', params.id);

    // We should always resolve a model.  If not, redirect back to the
    // stations page.
    if (!station) {
      this.transitionTo('stations');
    }

    let plsDetails = this.get('ajax')
      .request(`${proxy}${station.get('pls')}`, {
        dataType: 'text'
      })
      .then(resp => {
        return playlistParser(tokenizer(resp));
      });

    // let trackList = this.getPlayerMarkup(params.id);

    // return Ember.RSVP.hash({
    //   plsDetails,
    //   station,
    //   trackList
    // });
    return Ember.RSVP.hash({
      plsDetails,
      station
    });
  },

  afterModel(model) {
    // Start polling. I need to identify stations that don't have
    // markup containing sattions.
    // this.poll(model.station.get('id'));
  },

  pollCancel: null,

  poll(modelId) {
    let cancel = Ember.run.later(() => {
      this.getPlayerMarkup(modelId)
        .then((trackList) => {
          this.controllerFor('stations.station').set('trackList', trackList);
          this.poll(modelId);
        });
    }, 10000);

    this.set('pollCancel', cancel);
  },

  actions: {
    willTransition() {
      // Ember.run.cancel(this.get('pollCancel'));
    }
  }
});