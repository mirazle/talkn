import https from 'https';
import socketIo from "socket.io";
import redis from	'socket.io-redis';
import fs from "fs";
import conf from '~/conf';

class SocketIo{

  constructor(){
    const protcol = process.argv.includes('ssl') ? 'https' : 'http';
    let io;
    switch( protcol ){
    case 'https':

      const httpsServer = https.createServer( conf.clientSllOptions.pems );
      httpsServer.listen( conf.socket_io.https_port );
      io = socketIo( httpsServer );
      console.log("SOCKET IO RUN: " + protcol + " " + conf.socket_io.https_port);
      break;
    case 'http':
      io = socketIo( conf.socket_io.http_port );
      console.log("SOCKET IO RUN: " + protcol + " " + conf.socket_io.http_port);
      break;
    default:
      throw 'ERROR: BAD PROTCOL.';
    }

    // Adapt Redis-Server .
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
