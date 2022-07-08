'use strict';

// HTTP and Web Socket server
const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer);

// Adapt some of the Socket.IO callback API to use promises
const {promisify} = require('util');
const ioClients = promisify(io.clients).bind(io);

const logMessage = console.log;

const localAddresses = Object.values(require('os').networkInterfaces()).reduce((l, i) => l.concat(i)).map(i => i.address);

// Connect to Redis
const Redis = require('ioredis');
const redis = new Redis({
  sentinels: [{host: 'localhost', port: 26379}],
  name: 'mymaster',
  lazyConnect: true,
});
//const sentinel = new Redis({
//  host: 'localhost',
//  port: 26379
//});

// Track Redis master
let masterUrl = null;
let prevMasterUrl = null;
let isCurrentMaster = false;
const masterChangeNotification = new Map();

function updateRedisMaster(newRedisMaster, newRedisIpAddr) {
  isCurrentMaster = localAddresses.includes(newRedisIpAddr);
  logMessage(`current instance is master: ${isCurrentMaster ? 'yes' : 'no'}`);
  masterUrl = `wss://${newRedisMaster}:3443`;
  if (!prevMasterUrl) {
    prevMasterUrl = masterUrl;
    logMessage(`Master: ${masterUrl}`);
  } else {
    if (masterUrl !== prevMasterUrl) {
      logMessage(`Master changed to ${masterUrl} from ${prevMasterUrl}`);
      prevMasterUrl = masterUrl;
    }
  }
  for (let [socket, fn] of masterChangeNotification) {
    fn();
  }
}

async function getRedisMasterName(ipAddress) {
  return await redis.eval(`return redis.call('hget', KEYS[1], ARGV[1])`,
      1, 'master:name', ipAddress);
}

redis.on('connect', async function onRedisConnect() {
  try {
    const newRedisIpAddr = redis.stream.remoteAddress;
    let masterName = await getRedisMasterName(newRedisIpAddr);
    if (!masterName) {
      masterName = newRedisIpAddr;
    }
    updateRedisMaster(masterName, newRedisIpAddr);

    if (isCurrentMaster) {
      let prevOnlineNodes = await redis.eval(`
          local allNodesOnKey = KEYS[1]
          local allNodesOnInfoKey = KEYS[2]
          local prevOnlineNodes = redis.call('zrange', allNodesOnKey, 0, -1)
          redis.call('del', allNodesOnKey, allNodesOnInfoKey);
          return prevOnlineNodes`, 2,
          'nodes:on',
          'nodes:on:info');
      for (let nodeId of prevOnlineNodes) {
        await redis.eval(`
            local nodeKey = KEYS[1]
            local nodeOnLogKey = KEYS[2]
            local numericTimestamp = ARGV[1]
            local timestamp = ARGV[2]
            redis.call('hmset', nodeKey, 'websocket', 'down', 'websocketTime', timestamp)
            redis.call('zadd', nodeOnLogKey, numericTimestamp, 'controllerUp:'..numericTimestamp)
            `, 2,
            'node:'+nodeId,
            'node:on:log:'+nodeId,
            numericTimestamp(),
            timestamp());
        logMessage(`previously online node: ${nodeId}`);
      }
      logMessage('reconciled Redis state');
    } else {
      logMessage(`skipping Redis state reconciliation - not master ${masterUrl}`);
    }
  }
  catch (err) {
    logMessage(`error on connect: ${err}`);
  }
});

// Initialize Redis
(async () => {
  try {
    await redis.connect();
    logMessage('finished connecting');

    //await sentinel.subscribe('+switch-master');
    //sentinel.on('message', function onSenintelMessage(channel, message) {
    //  logMessage(`sentinel ${channel} - ${message}`);
    //});
  }
  catch (err) {
    logMessage(`error initializing Redis: ${JSON.stringify(err)}`);
  }
})();

async function getNodeSocket(nodeId) {
  try {
    const socketId = await redis.eval(`
        local nodeKey = KEYS[1]
        local socketId = redis.call('hget', nodeKey, 'socket')
        return socketId
        `, 1, 'node:'+nodeId);
    if (!socketId) {
      return null;
    }
    if (socketId === socket.id) {
      return socket;
    }
    return socket.to(socketId);
  }
  catch (err) {
    log(`database error getting ${nodeId} socket: ${err}`);
    return null;
  }
}

async function getNodeSocketId(nodeId) {
  try {
    return await redis.eval(`
        local nodeKey = KEYS[1]
        local socketId = redis.call('hget', nodeKey, 'socket')
        return socketId
        `, 1, 'node:'+nodeId);
  }
  catch (err) {
    log(`database error getting ${nodeId} socket ID: ${err}`);
    return null;
  }
}

async function getUserNodeId(userId) {
  return await redis.eval(`
      local userKey = KEYS[1]
      return redis.call('hget', userKey, 'node')
      `, 1, 'user:'+userId);
}

function getSocket(socket, socketId) {
  if (!socketId) {
    return null;
  }
  if (socket) {
    if (socketId === socket.id) {
      return socket;
    }
    return socket.to(socketId);
  } else {
    return io.to(socketId);
  }
}

function generalEmitToSocket(socket, socketId, ...message) {
  let destSocket = getSocket(socket, socketId);
  if (destSocket) {
    destSocket.emit.apply(destSocket, message);
  }
}

async function setStreamOn(sourceId, mediaId, sinkId, purpose, log, type, mediaUser, destUser) {
  try {
    let sourceMediaSink = sourceId+':'+mediaId+':'+sinkId;
    let newStream = await redis.eval(`
        local streamKey = KEYS[1]
        local streamLogKey = KEYS[2]
        local allStreamsOnKey = KEYS[3]
        local allStreamsOnLogKey = KEYS[4]
        local streamsOnSourceKey = KEYS[5]
        local allStreamsKey = KEYS[6]
        local sourceMediaSink = ARGV[1]
        local mediaSink = ARGV[2]
        local purpose = ARGV[3]
        local type = ARGV[4]
        local mediaUser = ARGV[5]
        local destUser = ARGV[6]
        local numericTimestamp = ARGV[7]
        local timestamp = ARGV[8]
        local newStream = redis.call('zadd', allStreamsOnKey, numericTimestamp, sourceMediaSink)
        redis.call('zadd', allStreamsOnLogKey, numericTimestamp, 'on:'..sourceMediaSink..':'..numericTimestamp);
        redis.call('zadd', streamsOnSourceKey, numericTimestamp, mediaSink)
        redis.call('zadd', allStreamsKey, numericTimestamp, sourceMediaSink)
        redis.call('zadd', streamLogKey, numericTimestamp, 'on:' .. numericTimestamp)
        redis.call('hmset', streamKey, 'switch', 'on', 'switchTime', timestamp, 'purpose', purpose, 'type', type)
        if newStream > 0 then
            redis.call('hmset', streamKey, 'state', 'new', 'stateTime', timestamp, 'created', timestamp)
        end
        if #mediaUser > 0 then
          redis.call('hset', streamKey, 'mediaUser', mediaUser)
        else
          redis.call('hdel', streamKey, 'mediaUser');
        end
        if #destUser > 0 then
          redis.call('hset', streamKey, 'destUser', destUser)
        else
          redis.call('hdel', streamKey, 'destUser')
        end
        return newStream
        `, 6,
        'stream:'+sourceMediaSink,
        'stream:log:'+sourceMediaSink,
        'streams:on',
        'streams:on:log',
        'streams:on:source:'+sourceId,
        'streams',
        // ARGS
        sourceMediaSink,
        mediaId+':'+sinkId,
        purpose,
        type,
        mediaUser || '',
        destUser || '',
        numericTimestamp(),
        timestamp());
    return newStream > 0;
  }
  catch (err) {
    log(`database error switching on ${mediaId} ${sourceId}->${sinkId} stream for ${purpose}: ${err}`);
    return false;
  }
}

async function setStreamOff(sourceId, mediaId, sinkId, log) {
  try {
    let sourceMediaSink = sourceId+':'+mediaId+':'+sinkId;
    let deleted = await redis.eval(`
        local streamKey = KEYS[1]
        local streamLogKey = KEYS[2]
        local allStreamsOnKey = KEYS[3]
        local allStreamsOnLogKey = KEYS[4]
        local streamsOnSourceKey = KEYS[5]
        local allStreamsKey = KEYS[6]
        local sourceMediaSink = ARGV[1]
        local mediaSink = ARGV[2]
        local numericTimestamp = ARGV[3]
        local timestamp = ARGV[4]
        local deleted = redis.call('zrem', allStreamsOnKey, sourceMediaSink)
        redis.call('zadd', allStreamsOnLogKey, numericTimestamp, 'off:'..sourceMediaSink..':'..numericTimestamp);
        redis.call('zrem', streamsOnSourceKey, mediaSink)
        redis.call('zadd', streamLogKey, numericTimestamp, 'off:' .. numericTimestamp)
        redis.call('zadd', allStreamsKey, numericTimestamp, sourceMediaSink)
        redis.call('hmset', streamKey, 'switch', 'off', 'switchTime', timestamp)
        return deleted
        `, 6,
        'stream:'+sourceMediaSink,
        'stream:log:'+sourceMediaSink,
        'streams:on',
        'streams:on:log',
        'streams:on:source:'+sourceId,
        'streams',
        // ARGS
        sourceMediaSink,
        mediaId+':'+sinkId,
        numericTimestamp(),
        timestamp());
    return deleted > 0;
  }
  catch (err) {
    log(`database error switching off ${mediaId} ${sourceId}->${sinkId} stream: ${err}`);
    return false;
  }
}

async function streamOn(sourceId, mediaId, sinkId, save, purpose, socket, log, type, mediaUser = null, destUser = null) {
  try {
    if (save) {
      const newStream = await setStreamOn(sourceId, mediaId, sinkId, purpose, log, type, mediaUser, destUser);
      log(`${newStream ? 'saved new' : 'updated saved'} stream: ${type} ${mediaId} from ${sourceId} to ${sinkId}`);
    }
    let sourceSocketId = await getNodeSocketId(sourceId);
    if (!sourceSocketId) {
      log(`cannot yet signal ${sourceId} to stream ${mediaId} media to ${sinkId}`);
      return;
    }
    let sinkSocketId = await getNodeSocketId(sinkId);
    if (!sinkSocketId) {
      log(`cannot yet signal ${sinkId} to receive ${mediaId} media from ${sourceId}`);
      return;
    }
    generalEmitToSocket(socket, sourceSocketId, 'add sink', mediaId, sinkId);
    log(`notified ${sourceId} to stream ${mediaId} media to ${sinkId}`);
    generalEmitToSocket(socket, sinkSocketId, 'add source', sourceId, mediaId);
    log(`notified ${sinkId} to expect ${mediaId} media from ${sourceId}`);
  }
  catch (err) {
    log(`error turning on ${mediaId} stream from ${sourceId} to ${sinkId}: ${err}`);
  }
}

async function streamOff(sourceId, mediaId, sinkId, socket, log) {
  try {
    let sourceSocketId = await getNodeSocketId(sourceId);
    if (sourceSocketId) {
      generalEmitToSocket(socket, sourceSocketId, 'remove sink', mediaId, sinkId);
      log(`notified ${sourceId} to stop ${mediaId} stream to ${sinkId}`);
    } else {
      log(`cannot signal absent ${sourceId} to stop ${mediaId} stream to ${sinkId}`);
    }
    let sinkSocketId = await getNodeSocketId(sinkId);
    if (sinkSocketId) {
      generalEmitToSocket(socket, sinkSocketId, 'remove source', sourceId, mediaId);
      log(`notified ${sinkId} to not expect ${mediaId} media from ${sourceId}`);
    } else {
      log(`cannot signal absent ${sinkId} to not expect ${mediaId} from ${sourceId}`);
    }
    let deleted = await setStreamOff(sourceId, mediaId, sinkId, log);
    log(`${deleted ? 'deleted' : 'previously deleted'} stream: ${mediaId} from ${sourceId} to ${sinkId}`);
  }
  catch (err) {
    log(`error turning off ${mediaId} stream from ${sourceId} to ${sinkId}: ${err}`);
  }
}

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

function timestamp(dt = null) {
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

function parseTimestamp(ts) {
  let tz = ts.lastIndexOf('+');
  if (tz < 0) {
    tz = ts.lastIndexOf('-');
  }
  let ms = (tz <= 20 ? 0 : parseInt(ts.substring(20, tz), 10));
  return new Date(parseInt(ts.substr(0, 4), 10),
      parseInt(ts.substr(5, 2), 10) - 1,
      parseInt(ts.substr(8, 2), 10),
      parseInt(ts.substr(11, 2), 10),
      parseInt(ts.substr(14, 2), 10),
      parseInt(ts.substr(17, 2), 10),
      ms);
}

function numericTimestamp(dt = null) {
  if (!dt) {
    dt = new Date();
  }
  return dt.getFullYear().toString() +
    (dt.getMonth()+1).toString().padStart(2, '0') +
    dt.getDate().toString().padStart(2, '0') +
    dt.getHours().toString().padStart(2, '0') +
    dt.getMinutes().toString().padStart(2, '0') +
    dt.getSeconds().toString().padStart(2, '0');
}

function limitLength(msg, len = 177) {
  if (msg.length <= len) {
    return msg;
  }
  return msg.substring(0, len-3)+"...";
}

io.on('connection', function onConnect(socket) {
  let currentNodeId = null;
  let provisionalNodeId = null;
  let currentUserId = null;

  function emitToSocket(socketId, ...message) {
    generalEmitToSocket(socket, socketId, ...message);
  }

  function showId() {
    const nodeId = currentNodeId ? currentNodeId : (provisionalNodeId ? provisionalNodeId + '*' : null);
    return nodeId ? (currentUserId ? currentUserId + ' ' + nodeId : nodeId ) : 'authenticating';
  }

  function log(message) {
    logMessage(limitLength(`${socket.id} ${showId()} controller> ${message}`, 400));
  }

  masterChangeNotification.set(socket, function masterChanged() {
    socket.emit('master change', masterUrl);
    log(`notified master change to ${masterUrl}`);
  });

  function on(messageName, asyncHandler) {
    socket.on(messageName, async function logHandler(...params) {
      try {
        await asyncHandler.apply(null, params);
      }
      catch (err) {
        log(`error in '${messageName}': ${err}`);
      }
    });
  }

  function auth(asyncHandler) {
    return async function checkNodeAuthorization(...params) {
      if (!currentNodeId) {
        throw 'node not authenticated';
      } else {
        await asyncHandler.apply(null, params);
      }
    }
  }

  log('socket online');

  on('log', function onLog(...message) {
    logMessage(socket.id + ' ' + showId() + '> ' + message.join(' '));
  });

  on('get master', function onGetMaster(fn) {
    log(`sending master ${JSON.stringify(masterUrl)}`);
    fn(masterUrl);
  });

  function formatIceServer(mediaRelay) {
    const proto = mediaRelay.proto ? mediaRelay.proto.toLowerCase() : 'turn';
    const f = {
      urls: [`${proto}:${mediaRelay.address}`]
    };
    if (mediaRelay.username) {
      f.username = mediaRelay.username;
    }
    if (mediaRelay.credential) {
      f.credential = mediaRelay.credential;
    }
    return f;
  }

  function formatIceServers(mediaRelays) {
    return {
      iceServers: mediaRelays.map(formatIceServer),
      iceTransportPolicy: "all",
      iceCandidatePoolSize: "0"
    };
  }

  function parseIceServer(mediaRelay) {
    const [proto, address] = mediaRelay.urls[0].split(':');
    const r = {address: address, proto: proto.toUpperCase()};
    if (mediaRelay.username) {
      r.username = mediaRelay.username;
    }
    if (mediaRelay.credential) {
      r.credential = mediaRelay.credential;
    }
    return r;
  }

  function parseIceServers(mediaRelays) {
    return (mediaRelays && mediaRelays.iceServers) ? mediaRelays.iceServers.map(parseIceServer) : null;
  }

  async function saveMediaRelays(mediaRelays, mediaRelayGroup) {
    const relaysJson = JSON.stringify(formatIceServers(mediaRelays));
    return await redis.eval(`return redis.call('hset', KEYS[1], ARGV[1], ARGV[2])`,
        1, 'relays', mediaRelayGroup, relaysJson);
  }

  async function queryMediaRelays(mediaRelayGroup) {
    let relays = JSON.parse(await redis.eval(`return redis.call('hget', KEYS[1], ARGV[1])`, 1, 'relays', mediaRelayGroup));
    log(`queried media relays for '${mediaRelayGroup}' group: ${JSON.stringify(relays)}`);
    return relays;
  }

  async function redisDeleteMediaRelayGroup(mediaRelayGroup) {
    return await redis.eval(`return redis.call('hdel', KEYS[1], ARGV[1])`, 1, 'relays', mediaRelayGroup);
  }

  async function queryMediaRelayGroups() {
    return (await redis.eval(`return redis.call('hkeys', KEYS[1])`, 1, 'relays')).sort();
  }

  on('set media relays', auth(async function setMediaRelays(mediaRelays, mediaRelayGroup = 'default') {
    await saveMediaRelays(mediaRelays, mediaRelayGroup);
    log(`set media relays for '${mediaRelayGroup}' group: ${JSON.stringify(mediaRelays)}`);
  }));

  on('get media relays', auth(async function getMediaRelays(mediaRelayGroup = 'default', fn) {
    fn(parseIceServers(await queryMediaRelays(mediaRelayGroup)));
  }));

  on('get media relay groups', auth(async function getMediaRelayGroups(fn) {
    const relayGroups = await queryMediaRelayGroups();
    fn(relayGroups);
    log(`queried media relay groups: ${JSON.stringify(relayGroups)}`);
  }));

  on('send', auth(async function onSend(nodeId, ...message) {
    let nodeSocketId = await getNodeSocketId(nodeId);
    if (!nodeSocketId) {
      log(`cannot send from ${currentNodeId} to absent ${nodeId}: ${JSON.stringify(message)}`);
    } else {
      message.splice(1, 0, currentNodeId);
      emitToSocket(nodeSocketId, ...message);
      log(`sent from ${currentNodeId} to ${nodeId}: ${JSON.stringify(message)}`);
    }
    // TODO return true/false acknowledgement to sender
  }));

  on('echo', auth(async function onEcho(...message) {
    message.splice(1, 0, currentNodeId);
    socket.emit.apply(socket, message);
  }));

  on('debug', async function onDebug(nodeId, command) {
    let nodeSocketId = await getNodeSocketId(nodeId);
    logMessage(`debug command to ${nodeId} at ${nodeSocketId || 'unknown socket'}: ${command}`);
    emitToSocket(nodeSocketId, 'debug', command);
  });

  async function setPeerIceState(peerId, peerIceState, peerSignalingState) {
    try {
      const nodeId = currentNodeId || provisionalNodeId;
      log(`set ${peerId} peer ICE state to ${peerIceState} (signaling ${peerSignalingState})`);
      await redis.eval(`
          local connKey = KEYS[1]
          local connLogKey = KEYS[2]
          local allConnsLogKey = KEYS[3]
          local allConnsOnKey = KEYS[4]
          local peerIceState = ARGV[1]
          local peerSignalingState = ARGV[2]
          local numericTimestamp = ARGV[3]
          local timestamp = ARGV[4]
          local nodePeer = string.sub(connKey, 6)
          redis.call('hmset', connKey, 'ice', peerIceState, 'iceTime', timestamp)
          redis.call('zadd', connLogKey, numericTimestamp, 'ice:'..peerIceState..':'..numericTimestamp)
          redis.call('zadd', allConnsLogKey, numericTimestamp, nodePeer..':ice:'..peerIceState..':'..numericTimestamp)
          if peerSignalingState == 'closed' then
            redis.call('zrem', allConnsOnKey, nodePeer)
          else
            redis.call('zadd', allConnsOnKey, numericTimestamp, nodePeer)
          end
          `, 4,
          'conn:'+nodeId+':'+peerId,
          'conn:log:'+nodeId+':'+peerId,
          'conns:log',
          'conns:on',
          // ARGS
          peerIceState,
          peerSignalingState,
          numericTimestamp(),
          timestamp());
    }
    catch (err) {
      log(`database error setting peer ICE state ${peerId} to ${peerIceState}: ${err}`);
    }
  }

  async function setPeerSignalingState(peerId, peerSignalingState) {
    try {
      const nodeId = currentNodeId || provisionalNodeId;
      log(`set ${peerId} peer signaling state to ${peerSignalingState}`);
      await redis.eval(`
          local connKey = KEYS[1]
          local connLogKey = KEYS[2]
          local allConnsLogKey = KEYS[3]
          local allConnsOnKey = KEYS[4]
          local peerSignalingState = ARGV[1]
          local numericTimestamp = ARGV[2]
          local timestamp = ARGV[3]
          local nodePeer = string.sub(connKey, 6)
          redis.call('hmset', connKey, 'signaling', peerSignalingState, 'signalingTime', timestamp)
          redis.call('zadd', connLogKey, numericTimestamp, 'signaling:'..peerSignalingState..':'..numericTimestamp)
          redis.call('zadd', allConnsLogKey, numericTimestamp, nodePeer..':signaling:'..peerSignalingState..':'..numericTimestamp)
          if peerSignalingState == 'closed' then
            redis.call('zrem', allConnsOnKey, nodePeer)
          else
            redis.call('zadd', allConnsOnKey, numericTimestamp, nodePeer)
          end
          `, 4,
          'conn:'+nodeId+':'+peerId,
          'conn:log:'+nodeId+':'+peerId, 
          'conns:log',
          'conns:on',
          // ARGS
          peerSignalingState,
          numericTimestamp(),
          timestamp());
    }
    catch (err) {
      log(`database error setting peer signaling state ${peerId} to ${peerSignalingState}: ${err}`);
    }
  }

  function decodeRedisNodeInfo(encoded) {
    const [nodeId,callType,mediaType,streamId,canvasStreamId] = encoded.split('+');
    const n = { nodeId: nodeId };
    if (callType.length > 0) {
      n.callType = callType;
    }
    if (mediaType.length > 0) {
      n.mediaType = mediaType;
    }
    if (streamId.length > 0) {
      n.streamId = streamId;
    }
    if (canvasStreamId.length > 0) {
      n.canvasStreamId = canvasStreamId;
    }
    return n;
  }

  async function getLogins() {
    const encoded = await redis.eval(`
        local allUsersSocketsKey = KEYS[1]
        local logins = {}
        local r = redis.call('hgetall', allUsersSocketsKey)
        local userId
        for i,v in ipairs(r) do
            if i%2==0 then
                table.insert(logins, userId..':'..v)
            else
                userId = v
            end
        end
        return logins
        `, 1, 'users:sockets');
    const logins = new Map();
    for (let login of encoded) {
      let [userId, socketId] = login.split(':');
      logins.set(userId, socketId);
    }
    return logins;
  }

  async function getOnlineNodes() {
    const encodedList = await redis.eval(`
        local allNodesOnInfoKey = KEYS[1]
        local nodes = {}
        local r = redis.call('hgetall', allNodesOnInfoKey)
        local nodeId
        for i,v in ipairs(r) do
          if i%2==0 then
            table.insert(nodes, nodeId..'+'..v)
          else
            nodeId = v
          end
        end
        return nodes
        `, 1, 'nodes:on:info');
    return encodedList.map(decodeRedisNodeInfo);
  }

  async function getStreamsFromSource(sourceId) {
    let streams = await redis.eval(`
        local streamsOnSourceKey = KEYS[1]
        return redis.call('zrange', streamsOnSourceKey, 0, -1)
        `, 1, 'streams:on:source:'+sourceId);
    log(`streams saved for source ${sourceId}: ${JSON.stringify(streams)}`);
    return streams.map(stream => {
      let [mediaId, sinkId] = stream.split(':');
      return {mediaId: mediaId, sinkId: sinkId};
    });
  }

  function sourceSinksContains(sourceStreams, stream) {
    for (let sourceStream of sourceStreams) {
      if (sourceStream.mediaId === stream.mediaId && sourceStream.sinkId === stream.sinkId) {
        return true;
      }
    }
    return false;
  }

  async function validateDestUsers(sourceId, streams) {
    let validStreams = [];
    for (let stream of streams) {
      let destUser = await redis.eval(`
          local streamOnKey = KEYS[1]
          return redis.call('hget', streamOnKey, 'destUser')
          `, 1, 'stream:'+sourceId+':'+stream.mediaId+':'+stream.sinkId);
      if (destUser) {
        let userNode = await redis.eval(`
            local userKey = KEYS[1]
            return redis.call('hget', userKey, 'node')
            `, 1, 'user:'+destUser);
        if (!userNode) {
          log(`user ${destUser} is not logged in and is no longer at sink node ${stream.sinkId}`);
        } else if (userNode !== stream.sinkId) {
          log(`user ${destUser} is logged in at node ${userNode} and is no longer at sink node ${stream.sinkId}`);
        } else {
          validStreams.push(stream);
          continue;
        }
      } else {
        log(`sink node ${stream.sinkId} is an anonymous destination`);
      }
      let deleted = await setStreamOff(sourceId, stream.mediaId, stream.sinkId, log);
      log(`${deleted ? 'deleted' : 'previously deleted'} stream: ${stream.mediaId} from ${sourceId} to ${stream.sinkId}`);
    }
    log(`valid streams saved for source ${sourceId}: ${JSON.stringify(validStreams)}`);
    return validStreams;
  }

  on('login node', async function loginNode(nodeId, nodeInfo, peerStates, sinks = []) {
    try {
      provisionalNodeId = nodeId;
      log(`logging in with info: ${JSON.stringify(nodeInfo)}, peers ${JSON.stringify(peerStates)}, sinks ${JSON.stringify(sinks)}`);

      // Update the database with the online node status and peer states
      await redis.eval(`
          local nodeKey = KEYS[1]
          local mediaLogKey = KEYS[2]
          local allNodesKey = KEYS[3]
          local allNodesOnInfoKey = KEYS[4]
          local allNodesOnKey = KEYS[5]
          local nodeOnLogKey = KEYS[6]
          local socketId = ARGV[1]
          local callType = ARGV[2]
          local mediaType = ARGV[3]
          local streamId = ARGV[4]
          local canvasStreamId = ARGV[5]
          local numericTimestamp = ARGV[6]
          local timestamp = ARGV[7]
          local nodeId = string.sub(nodeKey, 6)
          redis.call('hmset', nodeKey, 'socket', socketId, 'websocket', 'up', 'websocketTime', timestamp)
          if #callType > 0 then
            redis.call('hset', nodeKey, 'callType', callType)
          else
            redis.call('hdel', nodeKey, 'callType')
          end
          if #mediaType > 0 then
            redis.call('hset', nodeKey, 'mediaType', mediaType)
          else
            redis.call('hdel', nodeKey, 'mediaType')
          end
          if #streamId > 0 then
            redis.call('hset', nodeKey, 'streamId', streamId)
          else
            redis.call('hdel', nodeKey, 'streamId')
          end
          if #canvasStreamId > 0 then
            redis.call('hset', nodeKey, 'canvasStreamId', canvasStreamId)
          else
            redis.call('hdel', nodeKey, 'canvasStreamId')
          end
          redis.call('zadd', mediaLogKey, numericTimestamp, mediaType..':'..numericTimestamp)
          redis.call('zadd', allNodesKey, numericTimestamp, nodeId)
          redis.call('zadd', allNodesOnKey, numericTimestamp, nodeId)
          local nodeInfo = callType..'+'..mediaType..'+'..streamId..'+'..canvasStreamId
          redis.call('hset', allNodesOnInfoKey, nodeId, nodeInfo)
          redis.call('zadd', nodeOnLogKey, numericTimestamp, 'on:' .. numericTimestamp)
          `, 6,
          'node:'+nodeId,
          'node:media:log:'+nodeId,
          'nodes',
          'nodes:on:info',
          'nodes:on',
          'node:on:log:'+nodeId,
          // ARGS
          socket.id,
          nodeInfo.callType || '',
          nodeInfo.mediaType || '',
          nodeInfo.streamId || '',
          nodeInfo.canvasStreamId || '',
          numericTimestamp(),
          timestamp());

      for (let ps of peerStates) {
        setPeerIceState(ps.peerId, ps.iceState, ps.signalingState);
        setPeerSignalingState(ps.peerId, ps.signalingState);
      }

      // Notify the node of its ICE servers
      let mediaRelayGroup = nodeInfo.mediaRelayGroup || 'default';
      let iceServers = await queryMediaRelays(mediaRelayGroup);
      if (!iceServers && mediaRelayGroup !== 'default') {
        log('fallback to default media relay group for ' + mediaRelayGroup);
        iceServers = await queryMediaRelays('default');
      }
      if (iceServers) {
        socket.emit('iceservers', iceServers);
      }

      // Propagate information of all online nodes
      let onlineNodes = await getOnlineNodes();
      socket.emit('online nodes', onlineNodes);
      socket.broadcast.emit('node online', nodeId, nodeInfo);

      // Notify the node of its current sinks
      let streams = await getStreamsFromSource(nodeId);
      log(`saved streams from source ${nodeId}: ${JSON.stringify(streams)}`);
      streams = await validateDestUsers(nodeId, streams);
      log(`validated streams from source ${nodeId}: ${JSON.stringify(streams)}`);
      for (let sink of sinks) {
        if (!sourceSinksContains(streams, sink)) {
          log(`signaling removal of outdated stream: ${sink.mediaId} media to sink ${sink.sinkId}`);
          socket.emit('remove sink', sink.mediaId, sink.sinkId);
        }
      }
      streams.forEach(stream => {
        socket.emit('add sink', stream.mediaId, stream.sinkId);
        log(`stream ${stream.mediaId} media to ${stream.sinkId}`);
      });

      // Completed node login
      socket.emit('node login success', nodeId);
      currentNodeId = nodeId;
      provisionalNodeId = null;
    }
    catch (err) {
      log(`error logging in node ${nodeId}: ${err}`);
      try {
        socket.emit('node login failure', nodeId, err);
      }
      catch (err) {
        log(`error responding with login node failure: ${err}`);
      }
    }
    provisionalNodeId = null;
  });

  on('get node identity', async function onGetNodeIdentity() {
    const workstationId = await redis.incr('workstation:id');
    socket.emit('node identity', `workstation${workstationId}`);
  });

  on('stream on', auth(async function onStreamOn(sourceId, mediaId, sinkId, type) {
    await streamOn(sourceId, mediaId, sinkId, true, 'manual', socket, log, type);
  }));

  on('stream off', auth(async function onStreamOff(sourceId, mediaId, sinkId) {
    await streamOff(sourceId, mediaId, sinkId, socket, log);
  }));

  on('start call', auth(async function onStartCall(workstationId, monitorSinkId, nodeInfo) {
    await streamOn(workstationId, workstationId, monitorSinkId, true, 'call', socket, log, nodeInfo.callType, currentUserId);
    const nodeId = currentNodeId || provisionalNodeId;
    socket.broadcast.emit('node online', nodeId, nodeInfo);
  }));

  on('end call', auth(async function onStreamOff(workstationId, monitorSinkId, nodeInfo) {
    await streamOff(workstationId, workstationId, monitorSinkId, socket, log);
    const nodeId = currentNodeId || provisionalNodeId;
    socket.broadcast.emit('node online', nodeId, nodeInfo);
  }));

  async function getUserMonitorEndpoints(userId) {
    let encoded = await redis.eval(`
        local userEndpointsOnKey = KEYS[1]
        return redis.call('zrange', userEndpointsOnKey, 0, -1)
        `, 1, 'user:endpoints:on:'+userId);
    return encoded.map(endpoint => {
      let [sourceId, mediaId] = endpoint.split(':');
      return {sourceId: sourceId, mediaId: mediaId};
    });
  }

  async function toggleUserStreams(userId, toggle) {
    try {
      let userNodeId = await getUserNodeId(userId);
      if (!userNodeId) {
        log(`cannot toggle streams ${toggle?'on':'off'} for user ${userId}: not logged in`);
        return;
      }
      let endpoints = await getUserMonitorEndpoints(userId);
      for (let endpoint of endpoints) {
        log(`turn ${toggle ? 'on' : 'off'} ${endpoint.mediaId} media from ${endpoint.sourceId} linked to user ${userId} at ${userNodeId}`);
        if (toggle) {
          await streamOn(endpoint.sourceId, endpoint.mediaId, userNodeId, true, 'userEndpoint:'+userId+':'+endpoint.sourceId+':'+endpoint.mediaId, socket, log, 'monitor', null, currentUserId);
        } else {
          await streamOff(endpoint.sourceId, endpoint.mediaId, userNodeId, socket, log);
        }
      }
    }
    catch (err) {
      log(`error toggling user streams ${toggle ? 'on' : 'off'} for ${userId}: ${err}`);
    }
  }

  async function loginUser(userId) {
    try {
      const fixedUserId = userId ? userId.toLowerCase() : null;
      if (!fixedUserId)
        throw 'missing user ID parameter';
      if (!currentNodeId)
        throw 'node not authenticated';
      if (fixedUserId.includes(':'))
        throw 'illegal name';
      if (currentUserId && currentUserId === fixedUserId)
        return true;

      await redis.eval(`
          local userKey = KEYS[1]
          local allUsersKey = KEYS[2]
          local usersLogKey = KEYS[3]
          local allUsersSocketsKey = KEYS[4]
          local nodeId = ARGV[1]
          local socketId = ARGV[2]
          local numericTimestamp = ARGV[3]
          local timestamp = ARGV[4]
          local userId = string.sub(userKey, 6)
          redis.call('hmset', userKey, 'node', nodeId, 'connection', 'on', 'connectionTime', timestamp)
          redis.call('zadd', allUsersKey, numericTimestamp, userId)
          redis.call('zadd', usersLogKey, numericTimestamp, 'on:'..userId..':'..numericTimestamp)
          redis.call('hset', allUsersSocketsKey, userId, socketId)
          `, 4,
          'user:'+fixedUserId,
          'users',
          'users:log',
          'users:sockets',
          // ARGS
          currentNodeId,
          socket.id,
          numericTimestamp(),
          timestamp());

      currentUserId = fixedUserId;
      log(`user ${currentUserId} logged in`);
      await toggleUserStreams(currentUserId, true);
      return true;
    }
    catch (err) {
      log(`error logging in user ${userId}: ${err}`);
      return false;
    }
  }

  async function logoutUser() {
    if (!currentUserId)
      return true;
    const userId = currentUserId;
    try {
      await toggleUserStreams(currentUserId, false);

      await redis.eval(`
          local userKey = KEYS[1]
          local usersLogKey = KEYS[2]
          local allUsersSocketsKey = KEYS[3]
          local numericTimestamp = ARGV[1]
          local timestamp = ARGV[2]
          local userId = string.sub(userKey, 6)
          redis.call('hmset', userKey, 'connection', 'off', 'connectionTime', timestamp)
          redis.call('hdel', userKey, 'node')
          redis.call('zadd', usersLogKey, numericTimestamp, 'off:'..userId..':'..numericTimestamp)
          redis.call('hdel', allUsersSocketsKey, userId)
          `, 3,
          'user:'+userId,
          'users:log',
          'users:sockets',
          // ARGS
          numericTimestamp(),
          timestamp());

      currentUserId = null;
      log(`logged out user ${userId}`);
      return true;
    }
    catch (err) {
      log(`error logging out ${userId}: ${err}`);
      return false;
    }
  }

  on('login user', async function onLoginUser(userId, respond) {
    respond(await loginUser(userId) ? 'yes' : 'no');
  });

  on('logout user', async function onLogoutUser(respond) {
    respond(await logoutUser() ? 'yes' : 'no');
  });

  on('get current user', async function onGetCurrentUser(respond) {
    respond(currentUserId);
  });

  on('node info', auth(async function onNodeInfo(nodeInfo) {
    const nodeId = currentNodeId || provisionalNodeId;
    await redis.eval(`
        local nodeKey = KEYS[1]
        local mediaLogKey = KEYS[2]
        local allNodesOnInfoKey = KEYS[3]
        local callType = ARGV[1]
        local mediaType = ARGV[2]
        local streamId = ARGV[3]
        local canvasStreamId = ARGV[4]
        local numericTimestamp = ARGV[5]
        local timestamp = ARGV[6]
        local nodeId = string.sub(nodeKey, 6)
        if #callType > 0 then
            redis.call('hset', nodeKey, 'callType', callType)
        else
            redis.call('hdel', nodeKey, 'callType')
        end
        if #mediaType > 0 then
            redis.call('hset', nodeKey, 'mediaType', mediaType)
        else
            redis.call('hdel', nodeKey, 'mediaType')
        end
        if #streamId > 0 then
            redis.call('hset', nodeKey, 'streamId', streamId)
        else
            redis.call('hdel', nodeKey, 'streamId')
        end
        if #canvasStreamId > 0 then
            redis.call('hset', nodeKey, 'canvasStreamId', canvasStreamId)
        else
            redis.call('hdel', nodeKey, 'canvasStreamId')
        end
        redis.call('zadd', mediaLogKey, numericTimestamp, mediaType..':'..numericTimestamp)
        local nodeInfo = callType..'+'..mediaType..'+'..streamId..'+'..canvasStreamId
        redis.call('hset', allNodesOnInfoKey, nodeId, nodeInfo)
        `, 3,
        'node:'+nodeId,
        'node:media:log:'+nodeId,
        'nodes:on:info',
        // ARGS
        nodeInfo.callType || '',
        nodeInfo.mediaType || '',
        nodeInfo.streamId || '',
        nodeInfo.canvasStreamId || '',
        numericTimestamp(),
        timestamp());

    log(`node info ${JSON.stringify(nodeInfo)}`);
    socket.broadcast.emit('node online', nodeId, nodeInfo);
  }));

  on('peer ice state', auth(async function onPeerIceState(peerId, peerState, peerSignalingState) {
    await setPeerIceState(peerId, peerState, peerSignalingState);
  }));

  on('peer signaling state', auth(async function onPeerSignalingState(peerId, peerSignalingState) {
    await setPeerSignalingState(peerId, peerSignalingState);
  }));

  async function linkUserEndpoint(sourceId, mediaId, userId) {
    try {
      await redis.eval(`
          local userEndpointsOnKey = KEYS[1]
          local allUsersEndpointsOnKey = KEYS[2]
          local allUsersEndpointsOnLogKey = KEYS[3]
          local endpoint = ARGV[1]
          local userEndpoint = ARGV[2]
          local numericTimestamp = ARGV[3]
          redis.call('zadd', userEndpointsOnKey, numericTimestamp, endpoint)
          redis.call('zadd', allUsersEndpointsOnKey, numericTimestamp, userEndpoint)
          redis.call('zadd', allUsersEndpointsOnLogKey, numericTimestamp, 'on:'..userEndpoint..':'..numericTimestamp)
          `, 3,
          'user:endpoints:on:'+userId,
          'users:endpoints:on',
          'users:endpoints:on:log',
          // ARGS
          sourceId+':'+mediaId,
          userId+':'+sourceId+':'+mediaId,
          numericTimestamp());
      log(`linked ${mediaId} media from ${sourceId} to user ${userId}`);
      let userNodeId = await getUserNodeId(userId);
      if (!userNodeId) {
        log(`cannot immediately stream ${mediaId} from ${sourceId} to ${userId} - user not logged in`);
      } else {
        await streamOn(sourceId, mediaId, userNodeId, true, 'userEndpoint:'+userId+':'+sourceId+':'+mediaId, socket, log, 'monitor', null, currentUserId);
      }
    }
    catch (err) {
      log(`database error linking user ${userId} to endpoint ${sourceId}:${mediaId}: ${err}`);
    }
  }

  async function unlinkUserEndpoint(sourceId, mediaId, userId) {
    try {
      await redis.eval(`
          local userEndpointsOnKey = KEYS[1]
          local allUsersEndpointsOnKey = KEYS[2]
          local allUsersEndpointsOnLogKey  = KEYS[3]
          local endpoint = ARGV[1]
          local userEndpoint = ARGV[2]
          local numericTimestamp = ARGV[3]
          redis.call('zrem', userEndpointsOnKey, endpoint)
          redis.call('zrem', allUsersEndpointsOnKey, userEndpoint)
          redis.call('zadd', allUsersEndpointsOnLogKey, numericTimestamp, 'off:'..userEndpoint..':'..numericTimestamp)
          `, 3,
          'user:endpoints:on:'+userId,
          'users:endpoints:on',
          'users:endpoints:on:log',
          // ARGS
          sourceId+':'+mediaId,
          userId+':'+sourceId+':'+mediaId,
          numericTimestamp());
      log(`unlinked ${mediaId} media from ${sourceId} to user ${userId}`);
      let userNodeId = await getUserNodeId(userId);
      if (!userNodeId) {
        log(`no need to immediately stop streaming ${mediaId} from ${sourceId} to ${userId} - user not logged in`);
      } else {
        await streamOff(sourceId, mediaId, userNodeId, socket, log);
      }
    }
    catch (err) {
      log(`database error unlinking user ${userId} from endpoint ${sourceId}:${mediaId}: ${err}`);
    }
  }

  on('link user endpoint', auth(async function onLinkUserEndpoint(sourceId, mediaId, userId) {
    await linkUserEndpoint(sourceId, mediaId, userId);
  }));

  on('unlink user endpoint', auth(async function onUnlinkUserEndpoint(sourceId, mediaId, userId) {
    await unlinkUserEndpoint(sourceId, mediaId, userId);
  }));

  async function unlinkUser(userId) {
    const endpoints = await getUserMonitorEndpoints(userId);
    for (let endpoint of endpoints) {
      await unlinkUserEndpoint(endpoint.sourceId, endpoint.mediaId, userId);
    }
    log(`unlinked all monitor endpoints from user ${userId}`);
  }

  on('unlink user', auth(async function onUnlinkUser(userId) {
    await unlinkUser(userId);
  }));

  on('new user session', auth(async function onNewUserSession(userId) {
    await unlinkUser(userId);
    await loginUser(userId);
  }));

  on('close user session', auth(async function onCloseUserSession() {
    const userId = currentUserId;
    if (userId) {
      log(`closing session of user ${userId}`);
      await logoutUser();
      await unlinkUser(userId);
    } else {
      log('cannot close out user session - no user is logged into this connection');
    }
  }));

  on('started stream', auth(async function onStartedStream(mediaId, sinkId, mediaType) {
    log(`started sending ${mediaId} ${mediaType} to ${sinkId}`);
    const nodeId = currentNodeId || provisionalNodeId;
    const sourceMediaSink = nodeId+':'+mediaId+':'+sinkId;
    await redis.eval(`
        local streamKey = KEYS[1]
        local streamLogKey = KEYS[2]
        local numericTimestamp = ARGV[1]
        local timestamp = ARGV[2]
        redis.call('hmset', streamKey, 'sending', 'true', 'sendingTime', timestamp)
        redis.call('zadd', streamLogKey, numericTimestamp, 'started:sending:'..numericTimestamp)
        `, 2, 'stream:'+sourceMediaSink, 'stream:log:'+sourceMediaSink,
        numericTimestamp(), timestamp());
  }));

  on('stopped stream', auth(async function onStoppedStream(mediaId, sinkId) {
    log(`stopped sending ${mediaId} to ${sinkId}`);
    const nodeId = currentNodeId || provisionalNodeId;
    let sourceMediaSink = nodeId+':'+mediaId+':'+sinkId;
    await redis.eval(`
        local streamKey = KEYS[1]
        local streamLogKey = KEYS[2]
        local numericTimestamp = ARGV[1]
        local timestamp = ARGV[2]
        redis.call('hmset', streamKey, 'sending', 'false', 'sendingTime', timestamp)
        redis.call('zadd', streamLogKey, numericTimestamp, 'stopped:sending:'..numericTimestamp)
        `, 2, 'stream:'+sourceMediaSink, 'stream:log:'+sourceMediaSink,
        numericTimestamp(), timestamp());
  }));

  on('receiving media', auth(async function onReceivingMedia(sourceId, mediaId, mediaType) {
    log(`receiving ${mediaId} ${mediaType} media from ${sourceId}`);
    const nodeId = currentNodeId || provisionalNodeId;
    const sourceMediaSink = sourceId+':'+mediaId+':'+nodeId;
    await redis.eval(`
        local streamKey = KEYS[1]
        local streamLogKey = KEYS[2]
        local numericTimestamp = ARGV[1]
        local timestamp = ARGV[2]
        redis.call('hmset', streamKey, 'receiving', 'true', 'receivingTime', timestamp)
        redis.call('zadd', streamLogKey, numericTimestamp, 'started:receiving:'..numericTimestamp)
        `, 2, 'stream:'+sourceMediaSink, 'stream:log:'+sourceMediaSink,
        numericTimestamp(),
        timestamp());
  }));

  on('dropped media', auth(async function onDroppedMedia(sourceId, mediaId) {
    log(`dropped ${mediaId} media from ${sourceId}`);
    const nodeId = currentNodeId || provisionalNodeId;
    const sourceMediaSink = sourceId+':'+mediaId+':'+nodeId;
    await redis.eval(`
        local streamKey = KEYS[1]
        local streamLogKey = KEYS[2]
        local numericTimestamp = ARGV[1]
        local timestamp = ARGV[2]
        redis.call('hmset', streamKey, 'receiving', 'false', 'receivingTime', timestamp)
        redis.call('zadd', streamLogKey, numericTimestamp, 'stopped:receiving:'..numericTimestamp)
        `, 2, 'stream:'+sourceMediaSink, 'stream:log:'+sourceMediaSink,
        numericTimestamp(),
        timestamp());
  }));

  on('stats', auth(async function onStats(peerId, mediaId, audioStats, videoStats) {
    const nodeId = currentNodeId || provisionalNodeId;
    let sourceMediaSink = peerId+':'+mediaId+':'+nodeId;
    await redis.eval(`
        local streamStatsKey = KEYS[1]
        local sourceMediaSink = ARGV[1]
        local numericTimestamp = ARGV[2]
        local stats = ARGV[3]
        redis.call('zadd', streamStatsKey, numericTimestamp, stats)
        `, 1, 'stream:stats:'+sourceMediaSink,
        sourceMediaSink,
        numericTimestamp(),
        JSON.stringify({audio: audioStats, video: videoStats}));
  }));

  on('monitor motion', auth(async function onMonitorMotion(mediaId, userId) {
    await redis.eval(`
        local motionMonitorsKey = KEYS[1]
        local userId = ARGV[1]
        local numericTimestamp = ARGV[2]
        redis.call('zadd', motionMonitorsKey, numericTimestamp, userId)
        `, 1, 'motion:monitors:'+mediaId, userId, numericTimestamp());
    log(`${userId} monitoring motion from ${mediaId}`);
  }));

  on('unmonitor motion', auth(async function onUnmonitorMotion(mediaId, userId) {
    await redis.eval(`
        local motionMonitorsKey = KEYS[1]
        local userId = ARGV[1]
        local numericTimestamp = ARGV[2]
        redis.call('zrem', motionMonitorsKey, userId)
        `, 1, 'motion:monitors:'+mediaId, userId, numericTimestamp());
    log(`${userId} no longer monitoring motion from ${mediaId}`);
  }));

  on('motion detected', auth(async function onMotionDetected(moving, movingRatio) {
    const nodeId = currentNodeId || provisionalNodeId;
    const monitoringUsers = await redis.eval(`
        local motionMonitorsKey = KEYS[1]
        return redis.call('zrange', motionMonitorsKey, 0, -1)
        `, 1, 'motion:monitors:'+nodeId);
    if (monitoringUsers && monitoringUsers.length > 0) {
      let logins = await getLogins();
      for (let userId of monitoringUsers) {
        let userSocket = logins.get(userId);
        if (userSocket) {
          //log(`inform ${userId} that ${nodeId} is ${moving ? '' : 'not '}moving`);
          socket.to(userSocket).emit('motion detected', nodeId, moving, movingRatio);
        }
      }
    }
  }));

  on('disconnect', async function onDisconnect() {
    masterChangeNotification.delete(socket);
    const nodeId = currentNodeId || provisionalNodeId;
    if (!nodeId ) {
      log('socket offline');
      return;
    }
    await redis.eval(`
        local nodeKey = KEYS[1]
        local allNodesKey = KEYS[2]
        local allNodesOnInfoKey = KEYS[3]
        local allNodesOnKey = KEYS[4]
        local nodeOnLogKey = KEYS[5]
        local numericTimestamp = ARGV[1]
        local timestamp = ARGV[2]
        local nodeId = string.sub(nodeKey, 6)
        redis.call('hmset', nodeKey, 'websocket', 'down', 'websocketTime', timestamp)
        redis.call('hdel', nodeKey, 'socket')
        redis.call('zadd', allNodesKey, numericTimestamp, nodeId)
        redis.call('zrem', allNodesOnKey, nodeId)
        redis.call('hdel', allNodesOnInfoKey, nodeId)
        redis.call('zadd', nodeOnLogKey, numericTimestamp, 'off:' .. numericTimestamp)
        `, 5,
        'node:'+nodeId,
        'nodes',
        'nodes:on:info',
        'nodes:on',
        'node:on:log:'+nodeId,
        // ARGS
        numericTimestamp(),
        timestamp());

    log(`node ${nodeId} offline`);
    socket.broadcast.emit('node offline', nodeId);
    currentNodeId = null;
    provisionalNodeId = null;
  });
});

let monitorRunning = null;

async function getNodeOnlineStatus(nodeId) {
  return await redis.eval(`
      local nodeKey = KEYS[1]
      return redis.call('hmget', nodeKey, 'websocket', 'websocketTime')
      `, 1, 'node:'+nodeId);
}

setInterval(async function monitorNodes() {
  if (!isCurrentMaster) {
    return;
  }
  if (monitorRunning) {
    logMessage('not starting monitor, already running, started ' + monitorRunning);
    return;
  }
  try {
    monitorRunning = timestamp();
    const now = Date.now();
    const onlineSocketIds = new Set(await ioClients());
    const nodesOn = new Set(await redis.eval(`
        return redis.call('zrange', KEYS[1], 0, -1)`,
        1, 'nodes:on'));
    //logMessage(`monitoring online nodes ${JSON.stringify(Array.from(nodesOn))}`);
    const usersEndpointsOn = new Set(await redis.eval(`
        return redis.call('zrange', KEYS[1], 0, -1)
        `, 1, 'users:endpoints:on'));
    //logMessage(`monitoring user/endpoint links ${JSON.stringify(usersEndpointsOn)}`);
    //const userEndpointsOnNodes = new Map();
    //for (let userEndpoint of usersEndpointsOn) {
    //  let [userId, sourceId, mediaId] = userEndpoint.split(':', 3);
    //}
    const streamsOn = await new Set(await redis.eval(`
        return redis.call('zrange', KEYS[1], 0, -1)`,
        1, 'streams:on'));
    //logMessage(`monitoring streams ${JSON.stringify(streamsOn)}`);
    const streamsOnPeers = new Set();
    const dropStreams = new Set();
    for (let stream of streamsOn) {
      let [sourceId, mediaId, sinkId] = stream.split(':', 3);
      streamsOnPeers.add(sourceId+':'+sinkId);
      streamsOnPeers.add(sinkId+':'+sourceId);
      let purpose = await redis.eval(`
          return redis.call('hget', KEYS[1], 'purpose')`,
          1, 'stream:'+stream);
      if (purpose && purpose.startsWith('userEndpoint:')) {
        let userEndpoint = purpose.substring(13);
        let [monitorUserId] = userEndpoint.split(':');
        if (!usersEndpointsOn.has(userEndpoint)) {
          logMessage(`monitor turning off stream ${stream} - ${sourceId}:${mediaId} is no longer linked to user ${monitorUserId}`);
          dropStreams.add(stream);
        } else {
          let userNodeId = await getUserNodeId(monitorUserId);
          if (userNodeId !== sinkId) {
            logMessage(`monitor turning off stream ${stream} - linked user ${monitorUserId} is now logged into node ${userNodeId}`);
            dropStreams.add(stream);
          }
        }
      }
    }
    for (let stream of dropStreams) {
      let [sourceId, mediaId, sinkId] = stream.split(':', 3);
      await streamOff(sourceId, mediaId, sinkId, null, logMessage);
      streamsOn.delete(stream);
    }
    //logMessage(`monitoring stream peers ${JSON.stringify(Array.from(streamsOnPeers))}`);
    const connsOn = await redis.eval(`
        local allConnsOnKey = KEYS[1]
        return redis.call('zrange', allConnsOnKey, 0, -1)
        `, 1, 'conns:on');
    //logMessage(`monitoring connections ${JSON.stringify(connsOn)}`);
    for (let nodePeer of connsOn) {
      let [nodeId, peerId] = nodePeer.split(':', 2);
      if (!streamsOnPeers.has(nodePeer)) {
        if (nodesOn.has(nodeId)) {
          logMessage(`monitor signaling ${nodeId} to close unused peer connection to ${peerId}`);
          generalEmitToSocket(null, getNodeSocketId(nodeId), 'close peer', peerId);
        } else {
          logMessage(`monitor deleting defunct peer connection from offline node ${nodeId} to ${peerId}`);
          await redis.eval(`
              local connLogKey = KEYS[1]
              local allConnsLogKey = KEYS[2]
              local allConnsOnKey = KEYS[3]
              local nodePeer = ARGV[1]
              local numericTimestamp = ARGV[2]
              local timestamp = ARGV[3]
              redis.call('zadd', connLogKey, numericTimestamp, 'controller:defunct:'..numericTimestamp)
              redis.call('zadd', allConnsLogKey, numericTimestamp, nodePeer..':controller:defunct:'..numericTimestamp)
              redis.call('zrem', allConnsOnKey, nodePeer)
                `, 3,
              'conn:log:'+nodeId+':'+peerId,
              'conns:log',
              'conns:on',
              // ARGS
              nodePeer,
              numericTimestamp(),
              timestamp());
        }
      }
    }
    const startStreams = new Set();
    for (let stream of streamsOn) {
      let [sourceId, mediaId, sinkId] = stream.split(':', 3);
      let [receiving, sourceSinkOn, sinkSourceOn] = await redis.eval(`
          local streamKey = KEYS[1]
          local allConnsOnKey = KEYS[2]
          local sourceSink = ARGV[1]
          local sinkSource = ARGV[2]
          local receiving = redis.call('hget', streamKey, 'receiving')
          local sourceSinkOn = redis.call('zscore', allConnsOnKey, sourceSink)
          local sinkSourceOn = redis.call('zscore', allConnsOnKey, sinkSource)
          return {receiving, sourceSinkOn, sinkSourceOn}
          `, 2, 'stream:'+stream, 'conns:on',
          sourceId+':'+sinkId,
          sinkId+':'+sourceId);
      if (receiving === 'false' && !sourceSinkOn && !sinkSourceOn) {
        logMessage(`monitor starting stream ${stream} - both nodes are online, sink lost stream, peer connections are closed`);
        startStreams.add(stream);
      }
    }
    for (let stream of startStreams) {
      let [sourceId, mediaId, sinkId] = stream.split(':', 3);
      await streamOn(sourceId, mediaId, sinkId, false, null, null, logMessage, null);
    }

    for (let stream of streamsOn) {
      let [sourceId, mediaId, sinkId] = stream.split(':', 3);
      let state = 'good';
      let reason = null;
      let [streamOnTime, lastState, lastStateTime, sending, sendingTime, receiving, receivingTime, destUser, created] = await redis.eval(`
          return redis.call('hmget', KEYS[1], 'switchTime', 'state', 'stateTime', 'sending', 'sendingTime', 'receiving', 'receivingTime', 'destUser', 'created')`,
          1, 'stream:'+stream);
      let outboundConnected = (await redis.eval(`return redis.call('exists', KEYS[1])`, 1, 'conn:'+sourceId+':'+sinkId)) === 1;
      let inboundConnected = (await redis.eval(`return redis.call('exists', KEYS[1])`, 1, 'conn:'+sinkId+':'+sourceId)) === 1;
      let [oSignaling, oSignalingTime, oIce, oIceTime, iSignaling, iSignalingTime, iIce, iIceTime] = await redis.eval(`
          local a = redis.call('hmget', KEYS[1], 'signaling', 'signalingTime', 'ice', 'iceTime')
          local b = redis.call('hmget', KEYS[2], 'signaling', 'signalingTime', 'ice', 'iceTime')
          return {a[1], a[2], a[3], a[4], b[1], b[2], b[3], b[4]}`,
          2, 'conn:'+sourceId+':'+sinkId, 'conn:'+sinkId+':'+sourceId);
      let sourceSocketId = await getNodeSocketId(sourceId);
      let [sourceOnline, sourceOnlineTime] = await getNodeOnlineStatus(sourceId);
      if (sourceOnline == 'up' && sourceSocketId && !onlineSocketIds.has(sourceSocketId)) {
        logMessage(`*** clean up abandoned session ${sourceId}`);
      }
      let sinkSocketId = await getNodeSocketId(sinkId);
      let [sinkOnline, sinkOnlineTime] = await getNodeOnlineStatus(sinkId);
      if (sinkOnline === 'up' && sinkSocketId && !onlineSocketIds.has(sinkSocketId)) {
        logMessage(`*** clean up abandoned session ${sinkId}`);
      }
      let mediaType = await redis.eval(`
          return redis.call('hget', KEYS[1], 'mediaType')`,
          1, 'node:'+mediaId);
      let destUserNodeId = destUser ? await getUserNodeId(destUser) : null;
      let problemState = !(sourceOnline && sinkOnline
          && oIce !== 'closed' && oIce !== 'failed' && oIce !== 'disconnected'
          && iIce !== 'closed' && iIce !== 'failed' && iIce !== 'disconnected'
          && sending === 'true' && receiving === 'true');
      let outboundConnInfo = outboundConnected ? `${oSignaling}/${oIce}` : 'not connected';
      let inboundConnInfo = inboundConnected ? `${iSignaling}/${iIce}` : 'not connected';
      logMessage(`monitoring ${problemState ? 'problem ' : 'good '}${stream} ${lastState} since ${lastStateTime}, on since ${streamOnTime}, source ${sourceOnline} since ${sourceOnlineTime}, ${sending === 'true' ? '' : 'not '}sending${sendingTime ? ' since ' + sendingTime : ''}, outbound ${outboundConnInfo}, media ${mediaType ? mediaType : 'none'}, sink ${sinkOnline} since ${sinkOnlineTime}, ${receiving === 'true' ? '' : 'not '}receiving${receivingTime ? ' since ' + receivingTime : ''}, inbound ${inboundConnInfo}, user ${destUser ? destUser : 'unspecified'}`);
    }
  } catch (err) {
    logMessage(`error in node monitor: ${err}`);
  }
  monitorRunning = null;
}, 10000);

httpServer.listen(3000, () => logMessage('Listening on *:3000'));
