import DS from 'ember-data';

const { attr, Model } = DS;

export default Model.extend({
  bitRate: attr('number'),
  dateAdded: attr('date'),
  description: attr('string'),
  genre: attr('string'),
  location: attr('string'),
  name: attr('string'),
  persistentId: attr('string')
});