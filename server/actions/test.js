import conf from '~/conf';
import Actions from '~/actions';
import Logics from '~/logics';
import https from 'https';
import express from 'express';
import fs from 'fs';
import detect from 'detect-port';

export default {
  setUpSession: async () => {

    const port = 8003;
    detect(port, (err, _port) => {
      if (!err && port == _port ) {
        const app = express();
        app.get('*', (req, res) => {
          res.send("SESSION");
          return true;
        });

        app.listen( port, () => {
           console.log( `LISTEN SESSION 8003` );
        });
      }
    });
    return true;
  },
}
