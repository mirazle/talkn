import conf from '~/conf';
import Actions from '~/actions';
import Logics from '~/logics';
import https from 'https';
import express from 'express';
import fs from 'fs';

export default {
  setUpSession: async () => {

    const app = express();

    app.get('*', (req, res) => {
      res.send("SESSION");
      return true;
    });

    app.listen( 8003, () => {
       console.log( `LISTEN SESSION 8003` );
    });
    return true;
  },
}
