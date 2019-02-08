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

/* 
    // LetsEncrypt       
    http.createServer( ( this.httpApp ).get( "/.well-known/acme-challenge/2tdSd66wthMy5Hwu8SDeAE9vhYGggmYeO9l1qkq5N5M", (req, res, next) => {
      res.send("2tdSd66wthMy5Hwu8SDeAE9vhYGggmYeO9l1qkq5N5M.R3ycRYQnSvnHo8mj7Jd-qYml4b23Issp4LNtOD5uK2I");
    } ) )
    .listen( define.PORTS.HTTP, this.listenedHttp );
*/
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
    switch( req.headers.host ){
    case conf.domain:
      /*
      TODO referer でポータルを開いたか、iframeかと判定できる！

      ポータルを開く場合はrefererがlocalhostもしくはtalkn.ioの場合
      if(){

      }else{
        if(){
          iframeで自動コネクションで開く場合(ドメインだけの場合)
        }else{
          iframeで主導コネクションで開く場合(ドメイン＋パスがある場合)
        }
      }
      */
      res.render( 'portal/index', {
        domain: conf.domain,
        clientURL: conf.clientURL,
        assetsURL: conf.assetsURL
      } );
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