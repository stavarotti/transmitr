/**
 * The current cache version.
 */
const CACHE_VERSION = 2;

/**
 * Returns all saved stations.
 * 
 * @public
 * @function get
 * @returns all saved stations.
 */
export function get() {
  let stations;

  let storedStations = window.localStorage.getItem('stations');

  if (storedStations !== null) {
    let parsedStations = JSON.parse(storedStations);

    if (Array.isArray(parsedStations)) {
      stations = parsedStations;
    } else {
      // Detected new version.
      stations = parsedStations.stations;
    }
  } else {
    stations = [];
  }

  return stations;
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
    'stations',
    JSON.stringify({
      version: CACHE_VERSION,
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
    'stations',
    JSON.stringify({
      version: CACHE_VERSION,
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
