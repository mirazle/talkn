import conf from '~/conf';
import Actions from '~/actions';
import Logics from '~/logics';
import express from 'express';
import detect from 'detect-port';

export default {

  setUpPortal: async () => {
    const port = 8000;
    detect(port, (err, _port) => {
      if (!err && port == _port ) {
        const app = express();
        app.set('views', `${__dirname}/../endpoints/portal/ejs/`);
        app.set('view engine', 'ejs');
        app.get('*', function(req, res) {
          const connection = Object.values( req.params )[ 0 ];
          res.render('index', {connection : connection, clientSrcPath: conf.clientSrcPath});
        });

        app.listen( port, () => {
          console.log( `LISTEN PORTAL 8000` );
        } );
      }
    });
    return true;
  },
}
