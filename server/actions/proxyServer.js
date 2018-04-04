import conf from '~/conf';
import Actions from '~/actions';
import Logics from '~/logics';
import https from 'https';

export default {
  setUpProxyServer: async () => {
    https.createServer( conf.proxySllOptions.pems, Logics.endpoints.proxyServer.request )
      .listen( conf.proxySllOptions.port, Logics.endpoints.proxyServer.listen );
  }
}
