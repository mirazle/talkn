import Actions from '~/actions';
import Logics from '~/logics';
import utils from '~/utils';
import https from 'https';
import fs from 'fs';
import express from 'express';
import session from 'express-session';
import subdomain from 'express-subdomain';
import subdomainHandler from 'express-subdomain-handler';
import proxy from 'express-http-proxy';

const TALKN_CLIENT_LISTEN_PORT = 443;
const TALKN_CLIENT_KEY_PEM = '/etc/letsencrypt/live/client.talkn.io/privkey.pem';
const TALKN_CLIENT_CERT_PEM = '/etc/letsencrypt/live/client.talkn.io/cert.pem';


// https://client.talkn.io:8000/
export default {
  setUpClient: async () => {

/*
    // Proxy Setting
    const proxyApp = express();
    const proxyRouter = express.Router();
    proxyApp.use( subdomain('client', proxyRouter) );
    proxyApp.use('/', proxy('talkn.io:8000') );

    const proxyOptions = {key:  fs.readFileSync( TALKN_CLIENT_KEY_PEM ), cert: fs.readFileSync( TALKN_CLIENT_CERT_PEM )};
    const proxyServer = https.createServer( proxyOptions, proxyApp );
    proxyServer.listen( TALKN_CLIENT_LISTEN_PORT, () => {
       console.log( `PROXY CLIENT ${TALKN_CLIENT_LISTEN_PORT}` );
    });

    // Server Setting
    const app = express();
    app.get('/', function(req, res) {
      console.log("TOP");
      const fileName = 'talkn.client.js'; 
      const path = `${__dirname}/../endpoints/client/`; 
      console.log( path + fileName );

      res.send("HELLO!CLIENT!");
      //res.download( path, fileName );
    });
    app.listen( 8000, () => {
       console.log( `LISTEN CLIENT 8000` );
    });
*/
    return true;  
  },
}
