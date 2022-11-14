import fs from 'fs';
import https from 'https';
import { RedisClient } from 'redis';
import { Server as IoServer } from 'socket.io';
import { createAdapter } from 'socket.io-redis';

import define from 'common/define';

import conf from 'server/conf';

class SocketIo {
  io: IoServer;
  constructor() {
    const httpsServer = https.createServer(conf.sslOptions);
    httpsServer.listen(conf.socketIO.port);
    const io = new IoServer(httpsServer, { cors: { credentials: true } });
    const pubClient = new RedisClient({
      host: conf.redis.host,
      port: conf.redis.port,
    });
    const subClient = pubClient.duplicate();
    console.log('SOCKET IO RUN : ' + conf.socketIO.port);
    this.io = io.adapter(createAdapter({ pubClient, subClient }));
  }

  async get() {
    return this.io;
  }

  async on(key, callback) {
    this.io.on(key, callback);
  }

  async broadcast(key, state) {
    this.io.emit(key, state);
  }

  async emit(ioUser, key, state) {
    ioUser.emit(key, state);
  }
}

export default SocketIo;
