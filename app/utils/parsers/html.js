import Ember from 'ember';

const {
  Logger: {
    error
  }
} = Ember;

/**
 * A simple parser that takes a HTML string and parses it into an HTML document.
 * 
 * @param {string} html The string to parse
 * @return {HTMLDocument} An HTMLDocument.
 */
export function htmlParser(html = '') {
  // Create a new DOM parser instance.
  const parser = new DOMParser();

  try {
    return parser.parseFromString(html, 'text/html');
  } catch (e) {
    error('Unable to parse the given HTML.', e);
    // Return an empty document.
    return document.implementation.createHTMLDocument();
  }
}

export default htmlParser;