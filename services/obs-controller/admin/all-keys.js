'use strict';

const Redis = require('ioredis');
const redis = new Redis({
  sentinels: [{host: 'localhost', port: 26379}],
  name: 'mymaster',
});
const out = console.log;

async function* allKeys() {
  let cursor = 0, keys;
  do {
    [cursor, keys] = await redis.scan(cursor);
    yield* keys;
  } while (cursor != 0);
}

(async () => {
  try {
    const keys = [];
    for await (let key of allKeys()) {
      keys.push(key);
    }
    for (let key of keys.sort()) {
      out(key);
    }
  }
  catch (err) {
    console.log('error: ' + err);
  }
  redis.disconnect();
})();

