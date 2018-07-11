/**************************************/
/*  talknServer
/* ( SOCKET.IO / MONGODB / REDIS )
/**************************************/

import http from 'http';
import express from 'express';

const httpApp = express();

http.createServer(( httpApp ).all( "*", ( req, res ) => {
  console.log( req.url );
})).listen( 80 );
