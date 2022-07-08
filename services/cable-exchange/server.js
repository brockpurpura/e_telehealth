'use strict';

const WebSocket = require('ws');
const {promisify} = require('util');
const redisMod = require('redis');
const logMessage = console.log;
const reconnectMs = 5000;
const processingErrorThresholdCount = 10;
//const processingErrorThresholdIntervalMs = 1000;
let processingErrorCount = 0;

// Connect to Redis
const redisClient = redisMod.createClient();
const redis = {};
['brpoplpush','eval'].forEach(f => redis[f] = promisify(redisClient[f]).bind(redisClient));

process.on('exit', code => {
  logMessage('shutting down');
  process.exit(code);
});
process.on('uncaughtException', err => {
  logMessage(`uncaught exception: ${err}`);
  process.exit(1);
});
process.on('SIGHUP', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

const params = process.argv.slice(2);
if (params.length < 2) {
  logMessage('missing required server addresses as command-line arguments: local address followed by remote websocket URLs');
  process.exit(1);
}
const [localAddr, ...remoteUrls] = params;

const webSockets = new Map();
const webSocketsUp = new Set();

function subscribe(remoteUrl) {
  function handleDown() {
    webSocketsUp.delete(remoteUrl);
    setTimeout(function reconnect() {
      subscribe(remoteUrl);
    }, reconnectMs);
  }

  try {
    let ws = new WebSocket(remoteUrl, null, {rejectUnauthorized: false});
    webSockets.set(remoteUrl, ws);
    let wsSubscribed = false;
    let wsSubscribing = false;

    ws.on('open', function webSocketOpen() {
      logMessage(`connected to ${remoteUrl}`);
    });

    ws.on('close', function webSocketClose() {
      logMessage(`connection closed by ${remoteUrl}, will attempt to reconnect in ${reconnectMs} ms`);
      handleDown();
    });

    ws.on('message', function incoming(message) {
      try {
        let decoded = JSON.parse(message);
        if (decoded.type === 'welcome') {
          if (!wsSubscribed && !wsSubscribing) {
            let msg = `{"command":"subscribe","identifier":"{\\"channel\\":\\"ExchangeChannel\\",\\"addr\\":\\"${localAddr}\\"}"}`;
            logMessage(`subscribing to ${remoteUrl} with ${msg}`);
            ws.send(msg);
            wsSubscribing = true;
          }
        } else if (decoded.type === 'confirm_subscription') {
          if (wsSubscribing) {
            let id = JSON.parse(decoded.identifier);
            logMessage(`subscribed to ${remoteUrl} ${id.channel} as ${id.addr}`);
            wsSubscribed = true;
            wsSubscribing = false;
            webSocketsUp.add(remoteUrl);
          }
        } else if (decoded.type === 'ping') {
          // TODO: if pings get stale then: alert, disconnect, and schedule reconnection attempt
        } else {
          logMessage(`received unexpected message from ${remoteUrl}: '${message}'`);
        }
      }
      catch (err) {
        logMessage(`WebSocket non-JSON message: '${message}' error: ${err}`);
      }
    });

    ws.onerror = function webSocketError(err) {
      if (err && err.error && err.error.code == "ECONNREFUSED" && err.message) {
        console.log(err.message);
      } else {
        console.log("unexpected error:", err);
      }
    };
  }
  catch (err) {
    logMessage(`error connecting with ${remoteUrl}, will attempt to reconnect in ${reconnectMs} ms - ${err}`);
    handleDown();
  }
}

remoteUrls.map(subscribe);

async function nextMessage() {
  return await redis.brpoplpush('exchange:forward', 'exchange:forwarding', 0);
}

async function completeMessage(encodedMessage) {
  return await redis.eval(`
    local processingKey = KEYS[1]
    local encodedMessage = ARGV[1]
    return redis.call('lrem', processingKey, 0, encodedMessage)
    `, 1, 'exchange:forwarding', encodedMessage);
}

async function rollbackQueues() {
  return await redis.eval(`
    local processingKey = KEYS[1]
    local queueKey = KEYS[2]
    local incomplete = redis.call('lrange', processingKey, 0, -1)
    if #incomplete > 0 then
        redis.call('rpush', queueKey, unpack(incomplete))
        redis.call('del', processingKey)
    end
    return #incomplete
    `, 2, 'exchange:forwarding', 'exchange:forward');
}

async function initializeRedis() {
  try {
    let numRolledBack = await rollbackQueues();
    logMessage(`initialized Redis DB - rolled back ${numRolledBack} incomplete messages`);
  }
  catch (err) {
    logMessage(`error initializing Redis: ${err}`);
  }
}

function forwardMessage(encodedMessage, remoteUrl) {
  let ws = webSockets.get(remoteUrl);
  if (!ws) {
    return;
  }
  let doubleEncodedMessage = JSON.stringify(encodedMessage);
  let msg = `{"command":"message","identifier":"{\\"channel\\":\\"ExchangeChannel\\",\\"addr\\":\\"${localAddr}\\"}","data":${doubleEncodedMessage}}`;
  logMessage(`ready to send to ${remoteUrl} -- ${msg}`);
  ws.send(msg);
}

async function processNextMessage() {
  let encodedMessage = await nextMessage();

  logMessage(`forwarding ${encodedMessage}`);

  for (let remoteUrl of webSocketsUp) {
    forwardMessage(encodedMessage, remoteUrl);
  }

  let completedResult = await completeMessage(encodedMessage);
  if (completedResult == 1) {
    logMessage(`completed  ${encodedMessage}`);
  } else {
    logMessage(`unexpected result ${completedResult} forwarding ${encodedMessage}`);
  }
}

async function queueLoop() {
  try {

    try {
      await processNextMessage();
    }
    catch (err) {
      ++processingErrorCount;
      logMessage(`processing error: ${err}`);
    }
    if (processingErrorCount >= processingErrorThresholdCount) {
      logMessage(`exceeded error threshold of ${processingErrorThresholdCount}`);
      process.exit(1);
    } else {
      setImmediate(queueLoop);
    }

  }
  catch (err) {
    logMessage(`error in forwarding queue loop logic: ${err}`);
    process.exit(1);
  }
}

(async () => {
  try {
    await initializeRedis();
    await queueLoop();
  }
  catch (err) {
    logMessage(`initializing top-level error: ${err}`);
    process.exit(1);
  }
})();

