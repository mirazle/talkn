import define from '~/../common/define';
import conf from '~/conf';
import Actions from '~/actions';
import Logics from '~/logics';
import https from 'https';
import express from 'express';

export default {
  setUpAssets: async () => {
    const app = express();
    app.use( express.static( conf.serverAssetsPath) );
    https.createServer( conf.clientSllOptions.pems, app )
         .listen( define.PORTS.ASSETS, ( err, req )  => {
           console.log( `LISTEN ASSETS ${define.PORTS.ASSETS}` );
    });
    return true;
  },
}
