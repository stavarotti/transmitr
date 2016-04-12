import Ember from 'ember';

const { camelize } = Ember.String;

/**
  The type of playlist.

  @public
  */
export const playlistType = 'pls';

/**
  A simple parser that takes a pls-formatted string and creates an object that
  resembles the one below:

  {
    tracks: [{
      file: "<File#>",
      length: "<Length#>",
      title: "<Title#>"
    }],
    numberOfEntries: "<NumberOfEntries>",
    version: <version>
  }

  For more on the pls format, see:
  https://en.wikipedia.org/wiki/PLS_(file_format)

  @public
  @function
  @param {String} rawPls The pls string to parse.
  @returns {Object} The playlist object as described in the above example.
  */
export default function parser(rawPls = '') {
  const NUMBER_OF_ENTRIES = 'Numberofentries';
  const VERSION = 'Version';

  // The parsed pls representation.
  let pls = {
    numberofentries: 0,
    playlistType,
    tracks: [],
    version: 2
  };

  // If the header is not available, return the unpopulated pls object.
  if (!/^\[playlist\]/.test(rawPls)) {
    // Instead of throwing, log. Doesn't help to throw in user land.
    console.error('Invalid pls file.  Received: ', rawPls);
    return pls;
  }

  // Track details and other relevant entries are separated by new lines.
  // Let's get em.
  let plsParts = rawPls.split(/\n/);

  // The playlist header is always the first entry, so let's remove it.
  plsParts.unshift();

  // Keep a record of the tracks created. Used to avoid searching
  // `pls.tracks` for already created track objects.
  let createdTracks = {};

  // Iterate through each entry and populate the pls object.
  const TRACK_PROPERTY_MATCHER = /^(File|Length|Title)\d+/;
  plsParts.forEach(entry => {
    if (TRACK_PROPERTY_MATCHER.test(entry)) {
      // Grab the key.
      let key = entry.slice(0, entry.indexOf('='));

      // Grab the value
      let value = entry.slice(entry.indexOf('=') + 1);

      // Get the property name value.
      let trackPropertyName = camelize(key.substring(0, key.search(/\d/)));

      // Check for an existing track object.
      let existingTrackKey = key.substring(key.search(/\d/));
      if (createdTracks[existingTrackKey]) {
        // Get the existing object.
        let existingTrack = pls.tracks[createdTracks[existingTrackKey]];

        // Save the value.
        existingTrack[trackPropertyName] = value;
      } else {
        // Create the track object.
        let track = {
          file: '',
          length: -1,
          title: ''
        };

        // Save the value.
        track[trackPropertyName] = value;

        // Add the track object to `pls.tracks` and save the insert position.
        createdTracks[existingTrackKey] = pls.tracks.push(track) -1;
      }
    } else if (entry.startsWith(NUMBER_OF_ENTRIES)) {
      pls[camelize(NUMBER_OF_ENTRIES)] = entry.split('=')[1];
    } else if (entry.startsWith(VERSION)) {
      pls[camelize(VERSION)] = entry.split('=')[1];
    }
  });

  return pls;
}