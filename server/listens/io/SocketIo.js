import https from 'https';
import socketIo from "socket.io";
import redis from	'socket.io-redis';
import fs from "fs";
import conf from '~/conf';

class SocketIo{

  constructor(){
    const httpsServer = https.createServer( conf.clientSllOptions.pems );
    httpsServer.listen( conf.socketIO.httpsPort );
    const httpsIO = socketIo( httpsServer );
    this.httpsIO = httpsIO.adapter( redis( { host: conf.redis.host, port: conf.redis.port } ));
    console.log("SOCKET IO RUN: " + conf.socketIO.httpsPort);
      
    const httpIO = socketIo( conf.socketIO.httpPort );
    this.httpIO = httpIO.adapter( redis( { host: conf.redis.host, port: conf.redis.port } ));
    console.log("SOCKET IO RUN: " + conf.socketIO.httpPort);
    return this;
  }

  async get(){
    return this.io;
  }

  async on( key, callback ){
    this.io.on( key, callback );
  }

  async broadcast( key, state ){
    console.log( "Broadcast ######" + key );
    this.io.emit( key, state );
  }

  async emit( ioUser, key, state ){
    console.log( "Emit     ###### " + key );
    ioUser.emit( key, state );
  }
}

export default SocketIo;
