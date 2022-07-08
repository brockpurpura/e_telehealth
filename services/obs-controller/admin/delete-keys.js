'use strict';

const readline = require('readline');
const Redis = require('ioredis');
const redis = new Redis({
  sentinels: [{host: 'localhost', port: 26379}],
  name: 'mymaster',
});
const out = console.log;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const keys = new Set();

rl.on('line', (key) => {
  keys.add(key);
});

rl.on('close', () => {
  (async () => {
    try {
      for (const key of keys) {
        await redis.del(key);
      }
    }
    catch (err) {
      console.log('error: ' + err);
    }
    redis.disconnect();
  })();
});

