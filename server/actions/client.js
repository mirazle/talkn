import define from '~/../common/define';
import conf from '~/conf';
import Actions from '~/actions';
import Logics from '~/logics';
import https from 'https';
import express from 'express';
import fs from 'fs';

export default {
  setUpClient: async () => {
    const app = express();
    app.get('*', (req, res) => {
      res.sendFile( conf.serverClientPath );
      return true;
    });

    https.createServer( conf.clientSllOptions.pems, app )
         .listen( define.PORTS.CLIENT, ( err, req )  => {
           console.log( `LISTEN CLIENT ${define.PORTS.CLIENT}` );
    });
    return true;
  },
}
