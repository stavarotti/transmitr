import Ember from 'ember';

const {
  isEmpty
} = Ember;

/**
 * Assumes a document from internet-radio.com
 */
export default function parser(root) {
  if (isEmpty(root)) {
    return null;
  }

  if (root instanceof Document) {
    // The search results contain a single table with the results.
    return [...root.querySelectorAll('table tr')]
      .map(elm => {
        let station = {
          description: '',
          name: '',
          m3u: '',
          pls: ''
        };

        let playlistName = elm.querySelector('h4');

        if (!isEmpty(playlistName)) {
          if (playlistName.children.length) {
            station.name = playlistName.firstChild.innerText;
          } else {
            station.name = playlistName.innerText;
          }
        }

        [...elm.querySelectorAll('a[href^="/servers/tools"]')].forEach(playlist => {
            let url = playlist.getAttribute('href');

            if (!isEmpty(url)) {
              let parts = url.split('?u=');

              if (parts.length > 1) {
                if (parts[1].endsWith('pls')) {
                  station.pls = parts[1].split('&t=')[0]
                } else {
                  station.m3u = parts[1].split('&t=')[0];
                }
              }
            }
          });

        return station;
      });
  }
}
