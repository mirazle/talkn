import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export default class ProsxyServer {

  listen(){
    console.log( "@@@@@ Listen Proxy Server @@@@@" );
  }

  request( req, res ) {

    let opt = {target:""};

    console.log( "@@@@@ REQ PROXY: " + req.headers.host );

    switch( req.headers.host ){
    case 'talkn.io':
    case 'portal.talkn.io':
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

    console.log( "@@@@@ PROXY TO: " + opt.target );

    proxy.web( req, res, opt, ( err ) => {
      console.warn( err );
    } );
  }
}
