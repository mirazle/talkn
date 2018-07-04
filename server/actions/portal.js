import define from '~/../common/define';
import conf from '~/conf';
import Actions from '~/actions';
import Logics from '~/logics';
import express from 'express';
import https from 'https';

export default {

  setUpPortal: async () => {
    const app = express();
    app.set('views', `${__dirname}/../endpoints/portal/ejs/`);
    app.set('view engine', 'ejs');
    app.get('*', (req, res) => {
      const connection = Object.values( req.params )[ 0 ];
      if( connection !==  '/favicon.ico'){
        res.render('index', {connection : connection, clientSrcPath: conf.clientSrcPath});
      }
    });

    https.createServer( conf.clientSllOptions.pems, app )
         .listen( define.PORTS.PORTAL, ( err, req )  => {
           console.log( `LISTEN PORTAL ${define.PORTS.PORTAL}` );
    });

    return true;
  },
}
