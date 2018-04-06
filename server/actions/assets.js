import conf from '~/conf';
import Actions from '~/actions';
import Logics from '~/logics';
import https from 'https';
import express from 'express';
import fs from 'fs';
import detect from 'detect-port';

export default {
  setUpAssets: async () => {
    const port = 8002;
    detect(port, (err, _port) => {
      if (!err && port == _port ) {
        const app = express();
        app.use( express.static( conf.assetsPath) );
        app.listen( port, () => {
           console.log( `LISTEN ASSETS ${port}` );
        });
      }
    });
    return true;
  },
}
