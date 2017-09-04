import Controller from '@ember/controller';

export default Controller.extend({
  /**
   * A reference to the currently active station.
   * 
   * @public
   * @property currentlyPlayingStation
   * @type {Object}
   */
  currentlyPlayingStation: null,

  /**
   * Whether editing saved stations.
   * 
   * @public
   * @property isEditing
   * @type {boolean}
   */
  isEditing: false,

  /**
   * Managers
   */
  actions: {
    /**
     * Handler for toggling edit mode for a given screen.
     * 
     * @public
     * @function onToggleEdit
     */
    onToggleEdit() {
      this.toggleProperty('isEditing');
    }
  }
});
