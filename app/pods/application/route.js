import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    // Side load flavor mix.
    // TODO: Add the ability to read from local storage and preload.
    this.store.pushPayload({
      data: [
        {
          id: '1',
          type: 'stations/station',
          attributes: {
            name: 'Flavor Mix',
            description: 'By Fab 5 Finger & Grandmaster Ben - The hottest black music mixshow on air!',
            pls: 'http://www.flavormix.de/flavormixhigh.pls',
            'currently-playing-url': 'http://flavormix.de/radio/player'
          }
        }
      ]
    });
  }
});