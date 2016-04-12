import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // The records should always be there (side-loaded).  We never
    // send any xhr requests to fetch station info.
    return this.store.peekAll('stations/station');
  }
});
