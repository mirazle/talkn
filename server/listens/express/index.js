import http from 'http';
import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import define from '~/common/define';
import Session from '~/server/listens/express/session/';
import Mail from '~/server/logics/Mail';
import Geolite from '~/server/logics/Geolite';
import conf from '~/server/conf';


class Express{

  constructor(){
    this.httpApp = express();
    this.httpsApp = express();
    this.httpsApp.set('views', conf.serverPath );
    this.httpsApp.set('view engine', 'ejs');
    this.httpsApp.set('trust proxy', true);
    this.httpsApp.use(bodyParser.urlencoded({extended: true}));
    this.httpsApp.use(compression());

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
      ( this.httpsApp ).all( "*", this.routingHttps )
    ).listen( define.PORTS.HTTPS, this.listenedHttps );
  }

  routingHttps( req, res, next ){
    let language = "en";

    console.log(req.headers.host);

    switch( req.headers.host ){
    case conf.extURL:

      // CORSを許可する
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.sendFile( conf.serverExtPath + "ext.js");
      break;
    case conf.wwwURL:
      language = req.query && req.query.lang ?
        req.query.lang : Geolite.getLanguage( req );
      if( req.method === "GET" ){

        if ( req.url === "/" || ( req.url && req.url.indexOf("/?lang=") === 0 ) )  {
          res.render( 'www/index', {
            language,
            domain: conf.domain,
            wwwURL: conf.wwwURL,
            extURL: conf.extURL,
            assetsURL: conf.assetsURL
          });
        }else{
          res.sendFile( `${conf.serverWwwPath}${req.url.replace("/", "")}` );
        }

      }else if( req.method === "POST"){

        Mail.send( req.body.inquiry );
        res.redirect(`https://${conf.wwwURL}`);
      }
      break;
    case conf.descURL:
      res.render( 'desc/index', {});
      break;
    case conf.domain:
      let iframe = false;
      let portalUrlSearch = false;
      let connection = "/";
      let hasSlash = false;
      language = req.query && req.query.lang ?
        req.query.lang : Geolite.getLanguage( req );

      if( req.originalUrl === "/robots.txt" || req.originalUrl === "/manifest.json" || req.originalUrl === "/portal_sw.js"){

        // CORSを許可する
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.sendFile( conf.serverPortalPath + req.originalUrl.replace("/", ""));
        return true;
      }
console.log("@@@ A");

      // No Assests Url
      if( `/${req.originalUrl}/` !== conf.assetsPath ){

        portalUrlSearch = req.originalUrl.indexOf(`https://${conf.domain}`) !== false;


        /*
          TODO
          ifarameでの埋め込みでPostsFooterに横のBorderがない！！
        */


        console.log(req.originalUrl);
        console.log(req.headers.referer);
        console.log(portalUrlSearch);

// Open Portal Site
        if( !req.headers.referer || portalUrlSearch ){
console.log("@@@ B");
          iframe = false;
          connection = req.originalUrl.replace(`/${conf.domain}`, '');

        // Open iFrame
        }else{
console.log("@@@ C");
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
          language,
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
      if( req.originalUrl === "/manifest.json" ){

        // CORSを許可する
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      }

      res.sendFile( conf.serverAssetsPath + req.originalUrl.replace("/", ""));
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

  listenGet(){

  }

  listenPost(){

  }
}

export default Express;
