import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  /**
   * A reference to the currently playing station.
   * 
   * @public
   * @property nowPlayingStation
   * @type {Object}
   */
  nowPlayingStation: null
});
