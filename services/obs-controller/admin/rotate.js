'use strict';

const ROTATE_STREAMS_MS = 2592000000;
const ROTATE_STREAM_LOGS_MS = 2592000000;
const ROTATE_STREAM_STATS_MS = 604800000;

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

function* withScores(arrayReply) {
  let key = null;
  for (const v of arrayReply) {
    if (key) {
      yield [key, v];
      key = null;
    } else {
      key = v;
    }
  }
}

function parseNumericTimestamp(ts) {
  return new Date(parseInt(ts.substr(0, 4), 10),
      parseInt(ts.substr(4, 2), 10) - 1,
      parseInt(ts.substr(6, 2), 10),
      parseInt(ts.substr(8, 2), 10),
      parseInt(ts.substr(10, 2), 10),
      parseInt(ts.substr(12, 2), 10));
}

function formatTimestamp(dt = null) {
  if (!dt) {
    dt = new Date();
  }
  let o = Math.trunc(dt.getTimezoneOffset());
  return dt.getFullYear().toString() + '-' +
    (dt.getMonth()+1).toString().padStart(2, '0') + '-' +
    dt.getDate().toString().padStart(2, '0') + 'T' +
    dt.getHours().toString().padStart(2, '0') + ':' +
    dt.getMinutes().toString().padStart(2, '0') + ':' +
    dt.getSeconds().toString().padStart(2, '0') + '.' +
    dt.getMilliseconds().toString().padStart(3, '0') +
    (o < 0 ? '+' : '-') + // this is intentionally reversed
    Math.trunc(Math.abs(o) / 60).toString().padStart(2, '0') + ':' +
    (Math.abs(o) % 60).toString().padStart(2, '0');
}

function* withDateScores(arrayReply) {
  for (const [key, score] of withScores(arrayReply)) {
    yield [key, parseNumericTimestamp(score)];
  }
}

(async () => {
  try {
    const now = Date.now();
    for (const [stream, timestamp] of withDateScores(await redis.zrange('streams', 0, -1, 'withscores'))) {
      const streamElapsed = now - timestamp;
      if (streamElapsed > ROTATE_STREAMS_MS) {
        const nKeysDeleted = await redis.del('stream:'+stream, 'stream:log:'+stream, 'stream:stats:'+stream);
        const nStreamsRemoved = await redis.zrem('streams', stream);
        out(`expired stream ${stream} - ${formatTimestamp(timestamp)} - ${(streamElapsed) / 86400000} days elapsed: ${nKeysDeleted} deleted, ${nStreamsRemoved} removed from streams`);
      } else {
        //out(`OK: ${stream} - ${formatTimestamp(timestamp)} - ${(streamElapsed) / 86400000} days elapsed`);
        for (const [log, logTimestamp] of withDateScores(await redis.zrange('stream:log:'+stream, 0, -1, 'withscores'))) {
          const logElapsed = now - logTimestamp;
          if (logElapsed > ROTATE_STREAM_LOGS_MS) {
            const nKeysDeleted = await redis.zrem('stream:log:'+stream, log);
            out(`expired log ${stream} - ${log} - ${formatTimestamp(logTimestamp)} - ${(logElapsed) / 86400000} days elapsed: ${nKeysDeleted} deleted`);
          } else {
            //out(` OK log - ${log} - ${formatTimestamp(logTimestamp)} - ${(logElapsed) / 86400000} days elapsed`);
          }
        }
        for (const [stats, statsTimestamp] of withDateScores(await redis.zrange('stream:stats:'+stream, 0, -1, 'withscores'))) {
          const statsElapsed = now - statsTimestamp;
          if (statsElapsed > ROTATE_STREAM_STATS_MS) {
            const nKeysDeleted = await redis.zrem('stream:stats:'+stream, stats);
            out(`expired stats ${stream} - ${formatTimestamp(statsTimestamp)} - ${statsElapsed / 86400000} days elapsed: ${nKeysDeleted} deleted`);
          }
        }
      }
    }
  }
  catch (err) {
    console.log('error: ' + err);
  }
  redis.disconnect();
})();

