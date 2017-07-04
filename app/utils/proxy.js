/**
 * The server through which playlist requests are proxied. Change this to a 
 * custom version at some point.
 * 
 * @public
 * @const
 * @type {string}
 */
export const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

/**
 * Returns the given URL in proxied form.
 * 
 * @public
 * @function getProxiedURL
 * @param {string} url The URL to proxy.
 * @return {string} The proxied URL.
 */
export function getProxiedURL(url) {
  return `${PROXY_URL}${url}`;
}

export default {
  getProxiedURL,
  PROXY_URL
};
