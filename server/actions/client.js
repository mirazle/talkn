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
      res.sendFile( '/usr/share/app/talkn/server/endpoints/client/talkn.client.js');
      return true;
    });

    app.listen( 8001, () => {
       console.log( `LISTEN CLIENT 8001` );
    });
    return true;  
  },
}
