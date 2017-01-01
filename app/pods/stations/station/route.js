import Ember from 'ember';

export default Ember.Route.extend({

  ajax: Ember.inject.service(),

  station: Ember.inject.service(),

  model(params) {
    // The records should always be there (side-loaded).  We never
    // send any xhr requests to fetch station info.
    let station = this.store.peekRecord('stations/station', params.id);

    // We should always resolve a model.  If not, redirect back to the
    // stations page.
    if (!station) {
      this.transitionTo('stations');
    }

    // Get the station's playlist and parse it.
    let plsDetails = this.get('station')
      .getParsedPlaylist(station.get('location'));

    return Ember.RSVP.hash({
      plsDetails,
      station
    });
  }
});