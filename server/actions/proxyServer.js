import conf from '~/conf';
import Actions from '~/actions';
import Logics from '~/logics';
import utils from '~/utils';
import http from 'http';
import https from 'https';
import fs from 'fs';
import express from 'express';
import session from 'express-session';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export default {

  setUpProxyServer: async () => {
    
    const talknPort = conf.proxySllPort;
    const talknKeyPem = conf.proxySllKeyPem;
    const talknCertPem = conf.proxySllCertPem;
    const options = {key:  fs.readFileSync( talknKeyPem ), cert: fs.readFileSync( talknCertPem )};
    const proxyServer = https.createServer( options, Logics.endpoints.proxyServer.request );
    proxyServer.listen( talknPort, Logics.endpoints.proxyServer.listen );

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

    const app3 = express();
    app3.get('*', ( req, res ) => {
      console.log( "client server " );
      res.send("CLIENT!");
    });
    app3.listen( 8000, ( req, res ) => {
      console.log( "LISTEN 8000" );
    } );

  },

  callbackProxyServer: ( req, res ) => {

    let opt = {target:""};

    switch( req.headers.host ){
    case 'talkn.io':
      opt.target = "http://talkn.io:8000";
      break;
    case 'client.talkn.io':
      opt.target = "http://talkn.io:8001";
      break;
    case 'assets.talkn.io':
      opt.target = "http://talkn.io:8002";
      break;
    case 'session.talkn.io':
      opt.target = "http://talkn.io:8003";
      break;
    }

    console.log( opt );

    proxy.web( req, res, opt, ( err ) => {
      console.log( err );
    } );
  }

}
