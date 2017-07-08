/**
 * The local storage key.
 */
const STORAGE_KEY = 'transmittr-stations';

/**
 * The storage structure version.
 */
const STORAGE_VERSION = '2';

/**
 * Returns all saved stations.
 * 
 * @public
 * @function get
 * @returns all saved stations.
 */
export function get() {
  let storedStations = window.localStorage.getItem(STORAGE_KEY);

  if (storedStations !== null) {
    return JSON.parse(storedStations).stations;
  }

  return [];
}

/**
 * Replaces the existing station list with the one provided.
 * 
 * @public
 * @function replaceAll
 * @param {Array} stations the stations to save.
 */
export function replaceAll(stations) {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      version: STORAGE_VERSION,
      stations
    })
  );
}

/**
 * Saves one or more stations.
 * 
 * @public
 * @function save
 * @param {Object} station the station to save
 */
export function save(...stations) {
  let savedStations = get();
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      version: STORAGE_VERSION,
      stations: [...savedStations, ...stations]
    })
  );
}

/**
 * Saves a list of stations.
 * 
 * @public
 * @function saveAll
 * @param {Array} stations the list of stations to save.
 */
export function saveAll(stations) {
  save(...stations);
}

export default {
  get,
  replaceAll,
  save,
  saveAll
};
