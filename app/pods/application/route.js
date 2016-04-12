import Ember from 'ember';
import generateGuid from '../../utils/generate-guid';

export default Ember.Route.extend({
  beforeModel() {
    // Side load a couple of stations
    // TODO: Add the ability to read from local storage and preload.
    // TODO: Test and account for invalid pls
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
  }
});