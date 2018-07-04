import http from 'http';
import https from 'https';
import express from 'express';
import fs from "fs";
import conf from '~/conf';

class Express{

  constructor(){
    this.app = express();
    this.app.protocol = process.argv.includes('ssl') ? 'https' : 'http';
    this.app.server = this.app.protocol === 'https' ? https.createServer( conf.assetsExpressOprions, this.app ) : http.createServer( this.app );
  }

  listen( port, callback = () => {} ){
    this.server.listen( port, callback );
  }
}

export default Express;
