import Actions from '~/actions';
import Logics from '~/logics';
import utils from '~/utils';
import https from 'https';
import fs from 'fs';
import express from 'express';

const TALKN_PORTAL_LISTEN_PORT = 443;
const TALKN_PORTAL_KEY_PEM = '/etc/letsencrypt/live/talkn.io/privkey.pem';
const TALKN_PORTAL_CERT_PEM = '/etc/letsencrypt/live/talkn.io/cert.pem';

export default {

  setUpPortal: async () => {
/*
    const app = express();
    const options = {key:  fs.readFileSync( TALKN_PORTAL_KEY_PEM ), cert: fs.readFileSync( TALKN_PORTAL_CERT_PEM )};
    const server = https.createServer( options, app );

    app.set('views', `${__dirname}/../endpoints/portal/ejs/`);
    app.set('view engine', 'ejs');

    app.get('*', function(req, res) {
      const params = Object.values( req.params )[ 0 ];
      res.render('index', {title : params });
    });

    server.listen( TALKN_PORTAL_LISTEN_PORT, () => {
      console.log( `LISTEN PORTAL ${TALKN_PORTAL_LISTEN_PORT}` );
    } );
*/
    return true;  

  },
}
