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
    const assetsRouter = express.Router();

    assetsRouter.get('/', (req, res) => {
        res.send('ASEETS - version 1');
    });

    app.use(subdomain('assets', assetsRouter));
    app.listen( conf.proxySllOptions.httpsPort, () => {
      console.log("LISTEN PROXY " + conf.proxySllOptions.httpsPort );
    } );
  }
}
