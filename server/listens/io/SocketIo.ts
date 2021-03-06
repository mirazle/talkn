import https from "https";
import socketIo from "socket.io";
import redis from "socket.io-redis";
import fs from "fs";
import define from "common/define";
import conf from "server/conf";

class SocketIo {
  io: any;
  constructor() {
    const httpsServer = https.createServer(conf.sslOptions);
    httpsServer.listen(conf.socketIO.port);
    const io = socketIo(httpsServer);
    console.log("SOCKET IO RUN : " + conf.socketIO.port);
    this.io = io.adapter(redis({ host: conf.redis.host, port: conf.redis.port }));
  }

  async get() {
    return this.io;
  }

  async on(key, callback) {
    this.io.on(key, callback);
  }

  async broadcast(key, state) {
    //    console.log( "Broadcast ######" + key );
    this.io.emit(key, state);
  }

  async emit(ioUser, key, state) {
    //    console.log( "Emit     ###### " + key );
    ioUser.emit(key, state);
  }
}

export default SocketIo;
