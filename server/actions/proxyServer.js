import conf from '~/conf';
import Actions from '~/actions';
import Logics from '~/logics';
import http from 'http';
import https from 'https';

export default {
  setUpProxyServer: async () => {
    
    http.createServer( Logics.endpoints.proxyServer.request )
      .listen( conf.proxySllOptions.httpPort, Logics.endpoints.proxyServer.listenHttp );
    
    https.createServer( conf.proxySllOptions.pems, Logics.endpoints.proxyServer.request )
      .listen( conf.proxySllOptions.httpsPort, Logics.endpoints.proxyServer.listenHttps );
  }
}
