import conf from '~/conf';
import Actions from '~/actions';
import Logics from '~/logics';
import express from 'express';

export default {

  setUpPortal: async () => {

    const app = express();
    app.set('views', `${__dirname}/../endpoints/portal/ejs/`);
    app.set('view engine', 'ejs');
    app.get('*', function(req, res) {
      const params = Object.values( req.params )[ 0 ];
      res.render('index', {title : params, clientSrcPath: conf.clientSrcPath});
    });

    app.listen( 8000, () => {
      console.log( `LISTEN PORTAL 8000` );
    } );
    return true;
  },
}
