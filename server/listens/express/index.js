import http from 'http';
import https from 'https';
import express from 'express';
import url from 'url';
import define from '~/common/define';
import Session from '~/server/listens/express/session/';
import conf from '~/server/conf';


class Express{

  constructor(){
    this.httpApp = express();
    this.httpsApp = express();
    this.httpsApp.set('views', conf.serverPath );
    this.httpsApp.set('view engine', 'ejs');
    this.session = new Session( this.httpsApp );

    this.routingHttps = this.routingHttps.bind(this);
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

  routingHttps( req, res, next ){
    console.log("============ " +  req.headers.host  );
    switch( req.headers.host ){
    case conf.domain:

      let iframe = false;
      let portalUrlSearch = false;
      let connection = "/";
      let hasSlash = false;
console.log("------- " + req.originalUrl );
      // No Assests Url
      if( `/${req.originalUrl}/` !== conf.assetsPath ){

        portalUrlSearch = req.originalUrl.indexOf(`https://${conf.domain}`) !== false;

        console.log("@@@@@@");
        console.log( req.headers.referer  );
        console.log( portalUrlSearch );

        // Open Portal Site
        if( !req.headers.referer || portalUrlSearch ){

          iframe = false;
          connection = req.originalUrl.replace(`/${conf.domain}`, '');

        // Open iFrame
        }else{

          /*
            MultiConnectionBootはreq.originalUrlのpathnameで配列形式でリクエストを受け付ける
          */

          const referer = req.headers.referer.replace('https:/', '').replace('http:/', '');
          iframe = true;

          // Auto Connection
          if(req.originalUrl === "/"){
            connection = referer;

          // Extension
          }else if(req.originalUrl !== "/"){
            connection = referer;

          // User Input Connection
          }else{

          }
        }

        hasSlash = connection.lastIndexOf("/") === ( connection.length - 1 );

        res.render( 'portal/index', {
          connection,
          hasSlash,
          iframe, 
          domain: conf.domain,
          clientURL: conf.clientURL,
          assetsURL: conf.assetsURL
        });
      }
      break;
    case conf.clientURL:
      res.sendFile( conf.serverClientPath );
      break;
    case conf.assetsURL:
      res.sendFile( conf.serverAssetsPath + req.originalUrl);
      break;
    case conf.sessionURL:
      const proccess = req._parsedUrl.pathname.split('/');

      if( proccess.length > 0 && proccess[1] !== 'favicon.ico' ){

        const socialName = proccess[ 1 ];
        const methodType = proccess[ 2 ].charAt(0).toUpperCase() + proccess[ 2 ].slice(1);
        const uid = req.query.u;
        const refererConnection = req.query.c;

        if( socialName && methodType ){
          this.session[ socialName + methodType ]( req, res, next, uid, refererConnection );
        }else{
          res.redirect(`https://${conf.domain}`);
        }
      }else{
        res.redirect(`https://${conf.domain}`);
      }
      break;
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