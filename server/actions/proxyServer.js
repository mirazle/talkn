import conf from '~/conf';
import Actions from '~/actions';
import Logics from '~/logics';
import http from 'http';
import https from 'https';

export default {
  setUpProxyServer: async () => {
    const protcol = process.argv.includes('ssl') ? 'https' : 'http';
    let io;
    switch( protcol ){
    case 'https':
      https.createServer( conf.proxySllOptions.pems, Logics.endpoints.proxyServer.request )
        .listen( conf.proxySllOptions.httpsPort, Logics.endpoints.proxyServer.listenHttps );
      break;
    case 'http':
      http.createServer( Logics.endpoints.proxyServer.request )
        .listen( conf.proxySllOptions.httpPort, Logics.endpoints.proxyServer.listenHttp );
        break;
    default :
      throw 'ERROR: BAD APP PROTCOL.';
    }
  }
}
