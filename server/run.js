/**************************************/
/*  talknServer
/* ( SOCKET.IO / MONGODB / REDIS )
/**************************************/

//import Actions from '~/actions';
import conf from '~/conf';
import http from 'http';
import https from 'https';
import express from 'express';

const httpsApp = express();
const httpApp = express();

/**************************/
/* HTTP                   */
/**************************/

httpsApp.get('*', ( req, res, next )=>{
  console.log( "https " + req.headers.host );
  res.send("HELLO HTTPS " + req.headers.host);
})

http.createServer(( httpApp ).all( "*", ( req, res ) => {
  res.redirect(`https://${req.hostname}${req.url}`);
})).listen( 80 );

/**************************/
/* HTTPS                  */
/**************************/

httpsApp.use( (err, req, res, next) => {
  console.log("@@@@@@@@@@@@@");
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

https.createServer( conf.clientSllOptions.pems, ( httpsApp ).all( "*", ( req, res ) => {
  console.log( `@@@ 443` );
})).listen( 443,( err, req )  => {
  console.log( `LISTEN 443` );
});

/*
https.createServer( conf.clientSllOptions.pems, httpsApp )
  .on('error', ( err, socket ) => { console.log( 'ERROR' ); })
  .on('clientError', ( err, socket ) => { console.log( 'clientError' ); })
  .on('connect', function onCliConn(cliReq, cliSoc, cliHead) { console.log("connect https") })
  .on('connection', function onConn(cliSoc) { console.log("connection https") })
  .listen( 443, ( err, req )  => {
    console.log( `LISTEN PROXY 443` );
});
*/
class TalknServer{

  async start(){
    await Actions.setUpDB();
    await Actions.setUpAPI();

    await Actions.setUpProxyServer();
    await Actions.setUpPortal();
    await Actions.setUpClient();
    await Actions.setUpAssets();
//    await Actions.setUpSession();
  }
}

const talknServer = new TalknServer();
//talknServer.start();
