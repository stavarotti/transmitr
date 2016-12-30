import Ember from 'ember';

const {
  isEmpty,
  Logger: {
    error
  }
} = Ember;

/**
  The type of playlist.

  @public
  */
export const playlistType = 'm3u';

/**
  A simple parser that takes an m3u-formatted string and creates an object that
  resembles the one below:

  {
    tracks: [{
      file: "<File#>",
      length: "<Length#>",
      title: "<Title#>",
      trackId: <#>
    }],
    numberOfEntries: "<NumberOfEntries>",
    version: <version>
  }

  For more on the pls format, see: https://en.wikipedia.org/wiki/M3U

  @public
  @function
  @param {String} rawM3u The m3u string to parse.
  @returns {Object} The playlist object as described in the above example.
  */
export default function parser(rawM3u = '') {
  // The parsed pls representation.
  let m3u = {
    numberofentries: 0,
    tracks: [],
    playlistType,
    version: 1
  };

  // If the header is not available, return the unpopulated pls object.
  if (!/^\#EXTM3U/.test(rawM3u)) {
    // Instead of throwing, log. Doesn't help to throw in user land.
    error('Invalid m3u file.  Received: ', rawM3u);
    return m3u;
  }

  // Track details and other relevant entries are separated by new lines.
  // Let's get em.
  let m3uParts = rawM3u.split(/\n/);

  // The playlist header is always the first entry, so let's remove it.
  m3uParts.shift();

  // A reference to the new track.
  let currentTrack;
  // Iterate through each entry and populate the m3u object.
  const NEWLINE_REGEX = /^\s*$/;
  m3uParts.forEach(entry => {
    entry = entry.trim();

    if (!NEWLINE_REGEX.test(entry)) {
      if (entry.startsWith('#EXTINF')) {
        // Create the track object.
        currentTrack = {
          file: '',
          length: -1,
          title: ''
        };

        // Save the newly created track.
        m3u.tracks.push(currentTrack);

        // Get the relevant tokens.
        let trackParts = entry.split(/[\:,-]+/);

        // The first entry is the track info identifier. Let's dump it
        trackParts.shift();

        // Track info is in a specific order: length, artist, and title
        // TODO: account for grouping in the next iteration
        currentTrack.length = +trackParts[0].trim();
        currentTrack.artist = trackParts[1].trim();
        currentTrack.title = trackParts[2].trim();
      } else if (!isEmpty(entry)) {
        // Looks like we are dealing with the track title
        // TODO: need to account for multiple files
        currentTrack.file = entry.trim();
      }
    }
  });

  // m3u doesn't have entries metadata.  Calculate based on number of tracks.
  m3u.numberofentries = m3u.tracks.length;

  return m3u;
}