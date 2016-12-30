import Ember from 'ember';
import RunMixin from 'ember-lifeline/mixins/run';

const {
  computed,
  getOwner,
  isEmpty
} = Ember;

export default Ember.Component.extend(RunMixin, {
  classNames: ['search-station'],

  canShowNoResultsMessage: false,

  isLoading: false,

  remainingCharacters: computed('searchTerm', {
    get() {
      let searchTerm = this.get('searchTerm').trim();

      if (searchTerm.length < 3) {
        return 3 - searchTerm.length;
      }

      return 0;
    }
  }),

  searchTerm: '',

  searchTokenCounter: 0,

  stationList: null,

  getStations() {
    let searchTerm = this.get('searchTerm');
    this.incrementProperty('searchTokenCounter');

    this.get('searchStation')(searchTerm)
      .then(stations => this.set('stationList', stations))
      .finally(() => {
        this.decrementProperty('searchTokenCounter');

        if (this.get('searchTokenCounter') === 0) {
          this.set('isLoading', false);

          if (isEmpty(this.get('stationList'))) {
            this.set('canShowNoResultsMessage', true);
          } else {
            this.set('canShowNoResultsMessage', false);
          }
        }
      });
  },

  actions: {
    noop() {},

    onAddStation(station) {
      this.get('addStation')(station)
        .then(() => {
          getOwner(this).lookup('controller:application').transitionToRoute('stations.index');
        })
        .finally(() => {
          this.setProperties({
            isLoading: false
          });
        });
    },

    onSearch() {
      let searchTerm = this.get('searchTerm').trim();

      if (!isEmpty(searchTerm) && searchTerm.length > 2) {
        this.setProperties({
          canShowNoResultsMessage: false,
          isLoading: true
        });
        this.debounceTask('getStations', 500);
      } else {
        this.setProperties({
          canShowNoResultsMessage: false,
          stationList: null
        });
      }
    }
  }
});
