import http from 'http';
import https from 'https';
import express from 'express';
import fs from "fs";

class Express{

  static get KEY_PEM(){ return '/etc/letsencrypt/live/talkn.io/privkey.pem'};
  static get CERT_PEM(){ return '/etc/letsencrypt/live/talkn.io/cert.pem'};

  constructor(){
    this.app = express();
    this.protocol = process.argv.includes('ssl') ? 'https' : 'http';

    if( this.protocol === 'https' && fs.stat( Express.KEY_PEM ) && fs.stat( Express.CERT_PEM ) ){
      const options = {key:  fs.readFileSync( Express.KEY_PEM ), cert: fs.readFileSync( Express.CERT_PEM )};
      this.server = https.createServer( options, this.app );
    }else{
      this.server = http.createServer( this.app );
    }
  }

  listen( port, callback ){
    this.server.listen( port, callback );
  }
}

export default Express;
