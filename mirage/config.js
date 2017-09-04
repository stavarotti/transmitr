export default function () {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */
  this.get('/stations', ({
    stations
  }, request) => {
    if (request.queryParams.name) {
      return stations.all().filter(station => station.name.toLowerCase().indexOf(request.queryParams.name.toLowerCase()) > -1);
    }

    return stations.all();
  });

  this.get('/stations/:id');

  this.passthrough('https://cors-anywhere.herokuapp.com/**');
  this.passthrough('https://fy2j99evc0.execute-api.us-east-1.amazonaws.com/**')
}
