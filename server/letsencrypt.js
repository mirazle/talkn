/**************************************/
/*  talknServer
/* ( SOCKET.IO / MONGODB / REDIS )
/**************************************/

var http = require('http')
var express = require('express')

const httpApp = express();

http.createServer(( httpApp ).all( "*", ( req, res ) => {
  console.log( req.url );
  res.send("csEKOPF59h1smy-fGXqqzP5yFHfepwT0ANUP4Drvk-0.8jGwdr4wmDIONjqGNuTy8tOwF-c71GdlnOwlOLRRAHs");
})).listen( 80, () => {
  console.log("Listen 80");
} );
