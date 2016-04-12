import m3uParser from 'transmitr/utils/parsers/m3u/parser';
import { module, test } from 'qunit';

module('Unit | Utility | parsers/m3u/parser');

test('Can parse a simple m3u file', function (assert) {
  assert.expect(1);

  let m3u = `#EXTM3U

    #EXTINF:5,Example Artist - Example title
    http://www.example.com/music.mp3`;

  let expectedM3u = {
    numberofentries: 1,
    playlistType: 'm3u',
    tracks: [{
      artist: 'Example Artist',
      file: "http://www.example.com/music.mp3",
      length: 5,
      title: "Example title"
    }],
    version: 1
  };

  assert.deepEqual(m3uParser(m3u), expectedM3u, 'Creates correct structure');
});
