import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  pls: DS.attr('string'),
  currentlyPlayingUrl: DS.attr('string')
});
