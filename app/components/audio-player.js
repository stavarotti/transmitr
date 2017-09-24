import Ember from 'ember';
import request from 'ember-ajax/request';
import { getProxiedURL } from '../utils/proxy';
import { M3U_MATCHER, m3uParser } from '../utils/parsers/m3u';
import { PLS_MATCHER, plsParser } from '../utils/parsers/pls';

const { Component, computed, isEmpty, run: { scheduleOnce } } = Ember;

export default Component.extend({
  /**
   * CSS class names to apply to the view's outer element.
   * 
   * @public
   * @property classNames
   * @type {string}
   */
  classNames: ['audio-player'],

  /**
   * A list of properties of the view to apply as class names.
   * 
   * @public
   * @property classNameBindings
   * @type {string[]}
   */
  classNameBindings: [
    'isMiniPlayerActive:mini:full',
    'isLoadingStation:loading'
  ],

  /**
   * A reference to the audio DOM element.
   * 
   * @private
   * @property audioElement
   * @type {Object}
   */
  audioElement: null,

  /**
   * The computed audio url.
   * 
   * @public
   * @property audioSource
   * @type {string}
   */
  audioSource: '',

  /**
   * The current volume. Note, this is only applicable on desktops.
   * 
   * @public
   * @property currentVolume
   * @type {number}
   */
  currentVolume: 0.5,

  /**
   * Whether the station is loading.
   * 
   * @public
   * @property isLoadingStation
   * @type {boolean}
   */
  isLoadingStation: false,

  /**
   * True to show the mini player, else false.
   * 
   * @public
   * @property isMiniPlayerActive
   * @type {boolean}
   */
  isMiniPlayerActive: true,

  /**
   * True if the volume is muted.
   * 
   * @public
   * @property isMuted
   * @type {boolean}
   */
  isMuted: false,

  /**
   * True if the station is being played, else false.
   * 
   * @public
   * @property isPlaying
   * @type {boolean}
   */
  isPlaying: false,

  /**
   * The icon to use for the play button.
   * 
   * @public
   * @property playIcon
   * @type {string}
   */
  playIcon: computed('isLoadingStation', 'isPlaying', {
    get() {
      if (this.get('isLoadingStation')) {
        return 'animate-spin icon-spin3';
      } else {
        if (this.get('isPlaying')) {
          return 'icon-pause';
        } else {
          return 'icon-play';
        }
      }
    }
  }),

  /**
   * The playlist object.
   * 
   * @public
   * @property plsDetails
   * @type {Object}
   */
  plsDetails: null,

  /**
   * The station to play.
   * 
   * @public
   * @property station
   * @type {string}
   */
  station: null,

  /**
    Returns an object representing a parsed m3u/pls playlist.
    See the imported parsers for an example.

    @param {string} playlistUrl The playlist to parse.
    @returns {Object} The parsed playlist.
    */
  getParsedPlaylist(playlistUrl) {
    return request(getProxiedURL(playlistUrl), {
      dataType: 'text'
    }).then(resp => {
      if (PLS_MATCHER.test(playlistUrl)) {
        return plsParser(resp);
      } else if (M3U_MATCHER.test(playlistUrl)) {
        return m3uParser(resp);
      } else {
        throw new Error('Unable to detect playlist type.');
      }
    });
  },

  /**
   * A listener for handling the `error` event.
   * 
   * @private
   * @function errorHandler
   */
  errorHandler() {},

  /**
   * A listener for handling the `playing` event.
   * 
   * @private
   * @function playingHandler
   */
  playingHandler() {
    this.set('isLoadingStation', false);
  },

  /**
   * A listener for handling the `stalled` event. This generally happens
   * when the network is changed/lost.
   * 
   * @private
   * @function stalledHandler
   */
  stalledHandler() {
    this.setProperties({
      audioSource: '',
      isLoadingStation: false,
      isPlaying: false
    });

    this.send('onTogglePlay');
  },

  /**
   * A listener for handling the `waiting` event. The event is dispatched
   * when the station is getting ready to play.
   * 
   * @private
   * @function waitingHandler
   */
  waitingHandler() {
    this.set('isLoadingStation', true);
  },

  /**
   * Called when the element of the view has been inserted into the DOM
   * 
   * @private
   * @override
   * @function didInsertElement
   */
  didInsertElement() {
    let audioElement = this.$('audio')[0];

    // Listener for when an error occurs.  Note, this generally happens when
    // changing the `audioSource` and doesn't need any special handling
    // hence the no-op.
    audioElement.addEventListener('error', this.errorHandler.bind(this), false);

    // Listener for handling the `stalled` event. This generally happens
    // when the network is changed/lost.
    audioElement.addEventListener(
      'playing',
      this.playingHandler.bind(this),
      false
    );

    // Listener for handling the `stalled` event. This generally happens
    // when the network is changed/lost.
    audioElement.addEventListener(
      'stalled',
      this.stalledHandler.bind(this),
      false
    );

    // Listener for toggling the play button state when waiting for the audio.
    audioElement.addEventListener(
      'waiting',
      this.waitingHandler.bind(this),
      false
    );

    this.set('audioElement', audioElement);
  },

  /**
   * Called when the attributes passed into the component have been updated.
   * 
   * @private
   * @override
   * @function didReceiveAttrs
   */
  didReceiveAttrs() {
    // `station` is the only prop to this component, so when it changes,
    // reset everything.
    this.setProperties({
      audioSource: '',
      isLoadingStation: false,
      isPlaying: false
    });
  },

  /**
   * Called when the element of the view is going to be destroyed.
   * 
   * @private
   * @override
   * @function willDestroyElement
   */
  willDestroyElement() {
    let audioElement = this.get('audioElement');

    // Remove all previously attached handlers.
    audioElement.removeEventListener('error', this.errorHandler);
    audioElement.removeEventListener('playing', this.playingHandler);
    audioElement.removeEventListener('stalled', this.stalledHandler);
    audioElement.removeEventListener('waiting', this.waitingHandler);
  },

  actions: {
    /**
     * Handler for adjusting volume.
     * 
     * @public
     * @property onAdjustVolume
     */
    onAdjustVolume(volume) {
      this.set('currentVolume', volume);

      if (+volume === 0) {
        this.set('isMuted', true);
      } else {
        this.set('isMuted', false);
      }
    },

    /**
     * Handler for toggling the mini player.
     * 
     * @public
     * @function onToggleMiniPlayer
     */
    onToggleMiniPlayer() {
      this.toggleProperty('isMiniPlayerActive');
    },

    /**
     * Handler for muting the volume.
     * 
     * @public
     * @property onToggleMute
     */
    onToggleMute() {
      if (this.get('isMuted')) {
        this.get('audioElement').muted = false;
      } else {
        this.get('audioElement').muted = true;
      }

      this.toggleProperty('isMuted');
    },

    /**
     * Handler for the play/pause button.
     * 
     * @public
     * @property onTogglePlay
     */
    onTogglePlay() {
      if (isEmpty(this.get('audioSource'))) {
        this.set('isLoadingStation', true);

        let location = this.get('station.location');

        this.getParsedPlaylist(location)
          .then(pls => {
            // The station can be updated upstream while the previous request
            // is in flight. Do nothing is the station has changed.
            if (this.get('station.location') === location) {
              this.setProperties({
                audioSource: pls.tracks[0].file,
                isPlaying: true
              });

              // Wait for the audio element's attributes to be updated.
              scheduleOnce('afterRender', this, function() {
                let audioElement = this.get('audioElement');
                audioElement.load();
                audioElement.play();
              });
            }
          })
          .catch(() => {
            this.setProperties({
              audioSource: '',
              isLoadingStation: false,
              isPlaying: false
            });
          });
      } else {
        if (this.get('isPlaying')) {
          let audioElement = this.get('audioElement');

          // The HTML5 audio element will continue to buffer even when paused.
          // The spec doesn't mandate what should be done, so currently the
          // only option is to pause and change the src attribute.
          audioElement.pause();
          this.setProperties({
            audioSource: this.get('audioSource') + '#pause',
            isPlaying: false
          });
        } else {
          this.setProperties({
            isPlaying: true,
            isLoadingStation: true,
            audioSource: this.get('audioSource').substring(
              0,
              this.get('audioSource').indexOf('#pause')
            )
          });

          // Wait for the component to be updated
          scheduleOnce('afterRender', this, function() {
            let audioElement = this.$('audio')[0];

            audioElement.load();
            audioElement.play();

            this.setProperties({
              audioElement: audioElement,
              isLoadingStation: false
            });
          });
        }
      }
    }
  }
});
