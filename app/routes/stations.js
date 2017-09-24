import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  /**
   * Converts the URL into the model for this route.
   * 
   * @private
   * @override
   * @function model 
   */
  model() {
    // We're only interested in saved stations.
    return this.store.peekAll('station').filterBy('favorite', true);
  },

  actions: {
    refreshRoute() {
      this.refresh();
    }
  }
});
