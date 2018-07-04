import https from 'https';
import socketIo from "socket.io";
import redis from	'socket.io-redis';
import fs from "fs";
import conf from '~/conf';
import define from '~/../common/define';
import detect from 'detect-port';

class SocketIo{

  constructor(){
    const httpsServer = https.createServer( conf.clientSllOptions.pems );
    httpsServer.listen( conf.socketIO.httpsPort );
    const io = socketIo( httpsServer );
    console.log("SOCKET IO RUN : " + conf.socketIO.httpsPort);
    this.io = io.adapter( redis( { host: conf.redis.host, port: conf.redis.port } ));
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
