import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'https://fy2j99evc0.execute-api.us-east-1.amazonaws.com',
  namespace: 'dev'
});
