import Ember from 'ember';

const { isEmpty } = Ember;

export default Ember.Component.extend({

  invalidStationName: false,

  invalidPlaylistUrl: false,

  playlistUrl: '',

  stationName: '',

  playlistUrlClassNames: Ember.computed('invalidPlaylistUrl', {
    get() {
      let classNames = 'form-control';

      if (this.get('invalidPlaylistUrl')) {
        return classNames + ' form-control-danger';
      }

      return classNames;
    }
  }),

  stationNameClassNames: Ember.computed('invalidStationName', {
    get() {
      let classNames = 'form-control';

      if (this.get('invalidStationName')) {
        return classNames + ' form-control-danger';
      }

      return classNames;
    }
  }),

  isSavingStation: false,

  showSaveStationErrorMessage: false,

  showSaveStationSuccessMessage: false,

  resetForm() {
    this.setProperties({
      stationName: '',
      playlistUrl: '',
      showSaveStationErrorMessage: false
    });
  },

  actions: {
    addStation() {
      let stationName = this.get('stationName');
      let playlistUrl = this.get('playlistUrl');

      if (isEmpty(playlistUrl)) {
        this.set('invalidPlaylistUrl', true);
      } else {
        this.set('invalidPlaylistUrl', false);
      }

      if (isEmpty(stationName)) {
        this.set('invalidStationName', true);
      } else {
        this.set('invalidStationName', false);
      }

      if (!this.get('invalidPlaylistUrl') && !this.get('invalidStationName')) {
        this.setProperties({
          isSavingStation: true,
          showSaveStationErrorMessage: false
        });

        this.attrs.addStation(stationName, playlistUrl)
          .then(() => {
            this.setProperties({
              showSaveStationSuccessMessage: true,
              isSavingStation: false
            });

            this.resetForm();

            Ember.run.later(() => {
              this.set('showSaveStationSuccessMessage', false);
            }, 1000);
          })
          .catch(() => {
            this.setProperties({
              isSavingStation: false,
              showSaveStationErrorMessage: true
            });
          });
      }
    }
  }
});
