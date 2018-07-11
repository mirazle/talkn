/**************************************/
/*  talknServer
/* ( SOCKET.IO / MONGODB / REDIS )
/**************************************/

//import Actions from '~/actions';
import conf from '~/conf';
import http from 'http';
import https from 'https';
import express from 'express';

/***************************/
/* HTTP(Redirect to HTTPS) */
/***************************/

const httpApp = express();

http.createServer(( httpApp ).all( "*", ( req, res ) => {
  res.redirect(`https://${req.hostname}${req.url}`);
})).listen( 80, ( err, req )  => {
  console.log( `@@@ LISTEN HTTP 80` );
});

/***************************/
/* HTTPS(Subdomains)       */
/***************************/

const subdomainApps = express();

subdomainApps.get('*', ( req, res, next )=>{
  res.send("HELLO SUBDOMAIN " + req.headers.host);
})

https.createServer( conf.clientSllOptions.pems, ( subdomainApps ).all( "*", ( req, res ) => {
  console.log( `@@@ 443` );
})).listen( 443,( err, req )  => {
  console.log( `@@@ LISTEN SUBDOMAINS 443` );
});

/***************************/
/* HTTPS(Portal)           */
/***************************/

/*
https.createServer( conf.clientSllOptions.pems, subdomainApps )
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
