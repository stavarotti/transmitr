import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',

  classNames: ['station-list'],

  sortedStationList: Ember.computed.sort('stations', (a, b) => {
    if (a.get('description') > b.get('description')) {
      return 1;
    } else if (a.get('description') < b.get('description')) {
      return -1;
    }

    return 0;
  })
});
