import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',

  classNames: ['audio-player'],

  audioElement: null,

  audioSource: Ember.computed('plsDetails', {
    get() {
      return this.get('plsDetails.tracks')[0].file;
    }
  }),

  currentVolume: 0.5,

  isMuted: false,

  isPlaying: true,

  didInsertElement() {
    this._super(...arguments);

    this.set('audioElement', this.$('audio')[0]);
  },

  actions: {
    adjustVolume(volume) {
      this.set('currentVolume', volume);
      if (+volume === 0) {
        this.set('isMuted', true);
      } else {
        this.set('isMuted', false);
      }
    },

    toggleMute() {
      if (this.get('isMuted')) {
        this.get('audioElement').muted = false;
      } else {
        this.get('audioElement').muted = true;
      }

      this.toggleProperty('isMuted');
    },

    togglePlay() {
      if (this.get('isPlaying')) {
        this.get('audioElement').pause();
      } else {
        this.get('audioElement').play();
      }

      this.toggleProperty('isPlaying');
    },

    updateTrackList() {
      this.attrs.updateTrackList();
    }
  }
});
