import conf from '~/conf';
import Actions from '~/actions';
import Logics from '~/logics';
import https from 'https';
import express from 'express';
import fs from 'fs';
import detect from 'detect-port';

export default {
  setUpClient: async () => {
    const port = 8001;
    detect(port, (err, _port) => {
      if (!err) {
        const app = express();

        app.get('*', (req, res) => {
          res.sendFile( conf.clientPath );
          return true;
        });

        app.listen( port, () => {
           console.log( `LISTEN CLIENT ${port}` );
        });
        return true;
      }
    });
  },
}
