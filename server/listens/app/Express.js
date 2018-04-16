import http from 'http';
import https from 'https';
import express from 'express';
import fs from "fs";

class Express{

  static get KEY_PEM(){ return '/etc/letsencrypt/live/talkn.io/privkey.pem'};
  static get CERT_PEM(){ return '/etc/letsencrypt/live/talkn.io/cert.pem'};

  constructor(){
    this.app = express();
    this.app.protocol = process.argv.includes('ssl') ? 'https' : 'http';

    if( this.app.protocol === 'https' && fs.statSync( Express.KEY_PEM ) && fs.statSync( Express.CERT_PEM ) ){
      const options = {key:  fs.readFileSync( Express.KEY_PEM ), cert: fs.readFileSync( Express.CERT_PEM )};
      this.app.server = https.createServer( options, this.app );
    }else{
      this.app.server = http.createServer( this.app );
    }
  }

  listen( port, callback = () => {} ){
    this.server.listen( port, callback );
  }
}

export default Express;
