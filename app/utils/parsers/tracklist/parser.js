import htmlParser from  '../html/parser';

/**
  Simple parser that scrapes the given markup and extracts track information.

  @public
  @function
  @param {String} html The html from which to extract the tracks.
  @returns {Array} An array of tracks.
  */
export default function tracklistParser(html = '') {
  // Convert the markup into a DOM.
  const tDom = htmlParser(html);

  // The currently playing, and two upcoming tracks.
  let trackList = [];

  // Get the tracks.
  Array.from(tDom.querySelectorAll('#splaylisttracks > div'))
    .forEach(track => {
      trackList.push({
        artist: track.querySelector('strong').innerText,
        title: track.querySelector('i').innerText
      });
    });

  return trackList;
}
