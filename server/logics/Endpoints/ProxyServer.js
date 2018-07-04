import conf from '~/conf';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export default class ProsxyServer {

  listenHttp(){
    console.log( `@@@@@ Listen Proxy Server ${conf.domain} ${conf.proxySllOptions.httpPort} @@@@@` );
  }

  listenHttps(req){
    console.log( `@@@@@ Listen Proxy Server ${conf.domain} ${conf.proxySllOptions.httpsPort} @@@@@` );
  }

  request( req, res ) {

    let opt = {target:""};
    const protcol = 'https';//process.argv.includes('ssl') ? 'https' : 'http';
    const domain = conf.domain;

    console.log( `@@@@@ REQ PROXY: ${protcol} ${req.headers.host}` );
    console.log( domain + " " + req.headers.host );

    switch( req.headers.host ){
    case `assets.${domain}`:
      opt.target = `${protcol}//${domain}:8002`;
      break;
    case `session.${domain}`:
      opt.target = `${protcol}//${domain}:8003`;
      break;
    }

    console.log( "@@@@@ PROXY TO: " + opt.target );

    proxy.web( req, res, opt, ( err ) => {

      console.log("@@@@@@@@@@@");
      console.warn( err );
      console.log("@@@@@@@@@@@");

    } );
  }
}
