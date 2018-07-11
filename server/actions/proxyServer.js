import conf from '~/conf';
import Actions from '~/actions';
import Logics from '~/logics';
import http from 'http';
import https from 'https';
import express from 'express';
import subdomain from 'express-subdomain';

export default {
  setUpProxyServer: async () => {
    const app = express();
    const clientRouter = express.Router();

    clientRouter.get('*', (req, res) => {
        res.send('CLIENT - version 1');
    });

    app.get('*', Logics.endpoints.proxyServer.request );

    app.use(subdomain('client', clientRouter));
    https.createServer( conf.proxySllOptions.pems, app )
      .listen( conf.proxySllOptions.port, Logics.endpoints.proxyServer.listen );
/*
    app.listen( conf.proxySllOptions.httpsPort, () => {
      console.log("LISTEN PROXY " + conf.proxySllOptions.httpsPort );
    } );
*/
  }
}
