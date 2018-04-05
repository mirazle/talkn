import conf from '~/conf';
import Actions from '~/actions';
import Logics from '~/logics';
import https from 'https';
import express from 'express';
import fs from 'fs';

export default {
  setUpAssets: async () => {

    const app = express();
    app.use( express.static( conf.assetsPath) );

    app.listen( 8002, () => {
       console.log( `LISTEN ASSETS 8002` );
    });

    return true;
  },
}
