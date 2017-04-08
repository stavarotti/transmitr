/**
 * Returns all saved stations.
 * 
 * @public
 * @function getAll
 * @returns all saved stations.
 */
export function get() {
  let stations = window.localStorage.getItem('stations');

  if (stations !== null) {
    let stationList = JSON.parse(stations);

    return Array.isArray(stationList) ? stationList : [];
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
    'stations',
    JSON.stringify(stations)
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
    JSON.stringify([...savedStations, ...stations])
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
