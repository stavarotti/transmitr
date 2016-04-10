export default function parser(html = '') {
  // Create a new DOM parser instance.
  const parser = new DOMParser();

  try {
    return parser.parseFromString(html, 'text/html');
  } catch (e) {
    console.error('Unable to parse the given HTML.', e);
    // Need to re-evaluate on what to send back.
    return null;
  }
}
