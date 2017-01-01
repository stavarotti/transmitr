import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  /**
   * Prevent dasherizing of model keys.
   * 
   * @private
   * @function keyForAttribute
   * @param {string} key The model attribute name
   * 
   * @returns {string} The unmodified attribute name.
   */
  keyForAttribute(key) {
    return key;
  }
});
