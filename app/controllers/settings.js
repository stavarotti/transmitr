import Ember from 'ember';

const { Controller, inject: { controller, service } } = Ember;

export default Controller.extend({
  /**
   * The data store service.
   * 
   * @private
   * @property store
   * @type {Object}
   */
  store: service(),

  /**
     * The application controller.
     * 
     * @private
     * @property applicationController
     * @type {Object}
     */
  applicationController: controller('application')
});
