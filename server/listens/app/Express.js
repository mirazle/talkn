import https from 'https';
import socketIo from "socket.io";
import redis from	'socket.io-redis';
import fs from "fs";
import conf from '~/conf';

class Express{
  constructor(){
    const protcol = process.argv.includes('ssl') ? 'https' : 'http';
    return this;
  }
}

export default Express;
