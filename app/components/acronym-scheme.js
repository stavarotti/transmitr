import Ember from 'ember';

const { Component, computed, isEmpty } = Ember;

export default Component.extend({
  /**
   * CSS class names to apply to the view's outer element.
   * 
   * @public
   * @property classNames
   * @type {string}
   */
  classNames: ['acronym-scheme'],

  /**
   * The acronymized phrase.
   * 
   * @public
   * @property acronym
   * @type {string}
   */
  acronym: computed('phrase', {
    get() {
      if (isEmpty(this.get('phrase'))) {
        return 't';
      }

      let phraseParts = this.get('phrase').split(/\s+/);

      if (phraseParts.length === 1) {
        if (phraseParts[0].length < 3) {
          return phraseParts.length[0];
        }

        return phraseParts.length[0][0];
      } else if (phraseParts.length === 2) {
        return phraseParts[0][0] + phraseParts[1][0];
      } else {
        return phraseParts[0][0] + phraseParts[phraseParts.length - 1][0];
      }
    }
  }),

  /**
   * The phrase to acronymize.
   * 
   * @public
   * @property phrase
   * @type {string}
   */
  phrase: null
});
