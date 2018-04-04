import Actions from '~/actions';
import Logics from '~/logics';
import utils from '~/utils';
import http from 'http';
import https from 'https';
import fs from 'fs';
import express from 'express';
import session from 'express-session';
import subdomain from 'express-subdomain';
import subdomainHandler from 'express-subdomain-handler';
import proxy from 'express-http-proxy';
import httpProxy from 'http-proxy';

const TALKN_LISTEN_PORT = 443;
const TALKN_KEY_PEM = '/etc/letsencrypt/live/talkn.io-0001/privkey.pem';
const TALKN_CERT_PEM = '/etc/letsencrypt/live/talkn.io-0001/cert.pem';

export default {

  client: async () => {
  },

  setUpProxyApp: async () => {

    const proxy = httpProxy.createProxyServer();
    const options = {key:  fs.readFileSync( TALKN_KEY_PEM ), cert: fs.readFileSync( TALKN_CERT_PEM )};
    const proxyServer = https.createServer( options, ( req, res ) =>{

      console.log( "@@@@@@@@@@ " + req.headers.host );
      let opt = {target:""};

      switch( req.headers.host ){
      case 'client.talkn.io':
        opt.target = "http://talkn.io:8000";
        break;
      case 'assets.talkn.io':
        opt.target = "http://talkn.io:8001";
        break;
      case 'session.talkn.io':
        opt.target = "http://talkn.io:8002";
        break;
      }

      console.log( opt );

      proxy.web( req, res, opt, ( err ) => {
        console.log( err );
      } );
    } );

    proxyServer.listen( TALKN_LISTEN_PORT, () => {
      console.log( "LISTEN PROXY@@@@@@@@@@@" );
    } );

    const app1 = express();
    app1.get('*', ( req, res ) => {
      console.log( "session server " );
      res.send("SESSION!");
    });
    app1.listen( 8002, ( req, res ) => {
      console.log( "LISTEN 8002" );
    } );

    const app2 = express();
    app2.get('*', ( req, res ) => {
      console.log( "assets server " );
      res.send("ASSETS!");
    });
    app2.listen( 8001, ( req, res ) => {
      console.log( "LISTEN 8001" );
    } );

  }
}
