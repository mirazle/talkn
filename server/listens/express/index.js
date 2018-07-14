import http from 'http';
import https from 'https';
import express from 'express';
import fs from "fs";
import define from '~/common/define';
import conf from '~/server/conf';

class Express{

  constructor(){
    this.httpApp = express();
    this.httpsApp = express();
    this.httpsApp.set('views', conf.serverPortalPath );
    this.httpsApp.set('view engine', 'ejs');
  }

  /***************************/
  /* HTTP(Redirect to HTTPS) */
  /***************************/

  createHttpServer(){
    http.createServer( ( this.httpApp ).all( "*", this.routingHttp ) )
        .listen( define.PORTS.HTTP, this.listenedHttp );
  }

  routingHttp( req, res ){
    res.redirect(`https://${req.hostname}${req.url}`);
  }

  listenedHttp( err, req ){
  }

  /***************************/
  /* HTTPS                   */
  /***************************/

  createHttpsServer(){
    https.createServer(
      conf.sslOptions,
      ( this.httpsApp ).get( "*", this.routingHttps )
    ).listen( define.PORTS.HTTPS, this.listenedHttps );
  }

  routingHttps( req, res ){
    switch( req.headers.host ){
    case `${conf.domain}`:
      const connection = Object.values( req.params )[ 0 ];
      const params = {
        domain: conf.domain,
        clientURL: conf.clientURL,
        assetsURL: conf.assetsURL,
        connection : connection
      };
      res.render( 'index', params );
      break;
    case `client.${conf.domain}`:
      res.sendFile( conf.serverClientPath );
      break;
    case `assets.${conf.domain}`:
      res.sendFile( conf.serverAssetsPath + req.originalUrl);
      break;
    case `session.${conf.domain}`:
    default:
      res.redirect(`https://${conf.domain}`);
      break;
    }
  }

  listenedHttps( err, req ){
    console.log( `@@@ LISTEN HTTPS ${define.PORTS.HTTPS}` );
  }
}

export default Express;
