/**
  A relatively simple parser that creates an object that resembles the one
  below:

  {
    tracks: [{
      file: "<File#>",
      length: "<Length#>",
      title: "<Title#>",
      trackId: <#>
    }],
    numberOfEntries: "<NumberOfEntries>",
    version: "2"
  }

  @public
  @function
  @param {Array} tokens The array of tokens to parse.
  @returns {Object} The playlist object as described in the above example.
  */
export default function parser(tokens) {
  const ALPHANUMERIC = 'alphanumeric';
  const BRACKET = 'bracket';
  const FILE = 'file';
  const LENGTH = 'length';
  const NEWLINE = 'newline';
  const NUMBER_OF_ENTRIES = 'numberofentries';
  const TITLE = 'title';

  // The token position
  let currentPosition = 0;

  // Get the length of the `tokens` array.
  const TOKEN_LENGTH = tokens.length;

  // Keeps track of the already created track objects.  The tokens are not
  // not guaranteed to come in order, so we can not depend on a tuple
  // in an order such as {File1, Title1, Length1}.
  let existingTracks = {};

  // The playlist object.  `numberOfEntries` and `version` have defaults since
  // the values may or may not appear in the `tokens`. `version` is currently
  // standardized to 2.
  let playlist = {
    header: '',
    numberOfEntries: 0,
    tracks: [],
    version: '2'
  };

  // Loop through the tokens and update the `playlist` with the entries
  // found in the tokens.
  while (currentPosition < TOKEN_LENGTH) {
    // Get a reference to the current token.
    let token = tokens[currentPosition];

    // Assumption is that brackets only exist to mark the header.
    if (token.type === BRACKET && token.value === '[') {
      // A string to store the header sequence.
      let sequence = '';

      // Move on to the next the token.  Since we matched on the opening
      // bracket we'll get the subsequent tokens until we arrive to the
      // closing bracket.
      token = tokens[++currentPosition];

      // Loop through each subsequent token until we reach the closing bracket.
      while (token.type !== BRACKET && token.value !== ']') {
        // Append the token value to the existing sequence.
        sequence += token.value;
        // Move to the next token.
        token = tokens[++currentPosition];
      }

      // Save the sequence to the header property on the playlist object.
      playlist.header = sequence;

      // Increment the current position so we can move to the next token.
      currentPosition++;
      // Continue to the next token.
      continue;
    }

    // A track has 3 attributes: File, Length, and Title.  Match on one of
    // these values and add them to the track object.
    const TRACK_ATTRIBUTE = /^(File|Length|Title)([0-9]+)?$/i;
    if (token.type === ALPHANUMERIC && TRACK_ATTRIBUTE.test(token.value)) {
      // For the current attribute, get numeric portion.  This value is the
      // same for all attributes belonging to a particular track.  We
      // extract the number so we can keep track of the track objects that
      // have been created.
      let existingTrackKey = '' + token.value.substring(
        token.value.search(/[0-9]/)
      );

      // Used determine track property to update. Example value is File,
      // Length, or Title.
      let attributeName = token.value.substring(
        0, token.value.search(/[0-9]/)
      ).toLowerCase();

      // Value to store the track names and values.
      let track;

      // The attribute name (File|Length|Title) is usually followed by an
      // equal-to operator and then the attribute value. Since we have not
      // use for the operator, we'll skip it.
      token = tokens[(currentPosition += 2)];

      // Check to see if the track exists and if it does, update it with
      // current token's value.
      if (existingTracks[existingTrackKey]) {
        // Get the existing track object.
        track = playlist.tracks[existingTracks[existingTrackKey]];

        // Always check to see if it's the correct type.
        if (token.type === ALPHANUMERIC) {
          switch (attributeName) {
            case FILE:
              track.file = token.value;
              break;
            case LENGTH:
              track.length = token.value;
              break;
            case TITLE:
              track.title = token.value;
              break;
            default:
          }
        }
      } else {
        // The track object doesn't exist, let's create it.
        track = {
          file: '',
          length: 0,
          title: ''
        };

        switch (attributeName) {
          case FILE:
            track.file = token.value;
            break;
          case LENGTH:
            track.length = token.value;
            break;
          case TITLE:
            track.title = token.value;
            break;
          default:
        }

        // Add the track object to the tracks array, get its position, and
        // update the track map.
        existingTracks[existingTrackKey] = `${playlist.tracks.push(track) - 1}`;
      }

      currentPosition++;
      continue;
    }

    // Get the number of track entries.
    if (token.type === ALPHANUMERIC && token.value.toLowerCase() === NUMBER_OF_ENTRIES) {

      // The attribute name (File|Length|Title) is usually followed by an
      // equal-to operator and then the attribute value. Since we have not
      // use for the operator, we'll skip it.
      playlist.numberOfEntries = tokens[(currentPosition += 2)].value;

      currentPosition++;
      continue;
    }

    // Get the version.
    if (token.type === NUMBER_OF_ENTRIES && token.value.toLowerCase() === 'version') {
      // The attribute name (File|Length|Title) is usually followed by an
      // equal-to operator and then the attribute value. Since we have not
      // use for the operator, we'll skip it.
      playlist.version = tokens[(currentPosition += 2)].value;

      currentPosition++;
      continue;
    }

    // Ignore new lines as they aren't needed to create the  playlist object.
    if (token.type === NEWLINE) {
      currentPosition++;
      continue;
    }
  }

  return playlist;
}