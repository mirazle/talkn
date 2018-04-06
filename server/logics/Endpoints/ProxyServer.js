import conf from '~/conf';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export default class ProsxyServer {

  listenHttp(){
    console.log( `@@@@@ Listen Proxy Server ${conf.domain} 80 @@@@@` );
  }

  listenHttps(){
    console.log( `@@@@@ Listen Proxy Server ${conf.domain} 443 @@@@@` );
  }

  request( req, res ) {

    let opt = {target:""};
    const domain = conf.domain;
    console.log( `@@@@@ REQ PROXY: ${req.headers.host}` );

    switch( req.headers.host ){
    case 'talkn.io':
    case 'portal.talkn.io':
      opt.target = `http://${domain}:8000`;
      break;
    case 'client.talkn.io':
      opt.target = `http://${domain}:8001`;
      break;
    case 'assets.talkn.io':
      opt.target = `http://${domain}:8002`;
      break;
    case 'session.talkn.io':
      opt.target = `http://${domain}:8003`;
      break;
    }

    console.log( "@@@@@ PROXY TO: " + opt.target );

    proxy.web( req, res, opt, ( err ) => {
      console.warn( err );
    } );
  }
}
