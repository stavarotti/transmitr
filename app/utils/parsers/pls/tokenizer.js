/**
  Takes a pls (playlist) string and tokenizes it.

  @public
  @function
  @param {String} input The .pls string to tokenize.
  @returns {Array} The tokenized string.
  */
export default function tokenizer(input = '') {
  // Tracks the current position in the input string.
  let currentPosition = 0;

  // Get the length of the `input` string.
  const INPUT_LENGTH = input.length;

  // The token array.  This is return value.
  let tokens = [];

  // Loop over each `input` char and create the tokens.  We do this
  // by looking for specific patterns that describe a playlist.
  while (currentPosition < INPUT_LENGTH) {
    // Get a reference to the current char.
    let char = input[currentPosition];

    // Look for the opening bracket and push it into the tokens array.
    if (char === '[') {
      // Push the bracket to the token array.
      tokens.push({
        type: 'bracket',
        value: '['
      });

      // Increment the current position so we can move to the next char.
      currentPosition++;
      // Continue to the next token.
      continue;
    }

    // Look for the closing bracket and push it into the tokens array.
    if (char === ']') {
      tokens.push({
        type: 'bracket',
        value: ']'
      });

      currentPosition++;
      continue;
    }

    // Look for the equal-to operator and push it into the tokens array.
    if (char === '=') {
      tokens.push({
        type: 'operator',
        value: '='
      });

      currentPosition++;
      continue;
    }

    // Look for the new line char and push it into the tokens array.
    const NEW_LINE = /\n/;
    if (NEW_LINE.test(char)) {
      tokens.push({
        type: 'newline',
        value: '\n'
      });

      currentPosition++;
      continue;
    }

    // Checking for alphanumeric characters. Here, we want to capture the
    // whole word (sequence) instead of a single character.
    const ALPHANUMERIC = /[a-zA-Z0-9\/\:\%\.\~_\-]/;
    if (ALPHANUMERIC.test(char)) {
      // A string to store the sequence.
      let sequence = '';

      // Loop through each subsequent char and check to see if it's
      // alphanumeric.  If it is, append to the `sequence` and move to the
      // next char.
      while (currentPosition < INPUT_LENGTH && ALPHANUMERIC.test(char)) {
        // Append the character to the existing sequence.
        sequence += char;
        // Move to the next char.
        char = input[++currentPosition];
      }

      // Push the sequence into the tokens array.
      tokens.push({
        type: 'alphanumeric',
        value: sequence
      });

      // Move to the next character.
      continue;
    }

    // If we haven't matched a character, then it's not part of the grammer.
    throw new TypeError('Unknown token encountered: ' + char);
  }

  return tokens;
}