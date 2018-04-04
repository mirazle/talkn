import Actions from '~/actions';
import Logics from '~/logics';
import utils from '~/utils';
import https from 'https';
import fs from 'fs';
import express from 'express';
import session from 'express-session';
import subdomain from 'express-subdomain';
import subdomainHandler from 'express-subdomain-handler';
import passport from 'passport';

const TALKN_SESSION_LISTEN_PORT = 443;
const TALKN_SESSION_KEY_PEM = '/etc/letsencrypt/live/session.talkn.io/privkey.pem';
const TALKN_SESSION_CERT_PEM = '/etc/letsencrypt/live/session.talkn.io/cert.pem';

export default {
  setUpSession: async () => {

    if( utils.includeProcessKey( 'ssl' ) ){
/*
      passport.referer = '//talkn.io';
      passport.facebookStrategy = Logics.passport.getFacebookStrategy();
      passport.twitterStrategy = Logics.passport.getTwitterStrategy();
      passport.serializeUser( Logics.passport.serializeUser );
      passport.deserializeUser( Logics.passport.deserializeUser );
      passport.use( passport.facebookStrategy );
      passport.use( passport.twitterStrategy );

      const app = express();
      app.use( subdomainHandler({ baseUrl: 'talkn.io'} ) );
      //const router = express.Router();
      //app.use(subdomain('session', router));
      const options = {key:  fs.readFileSync( TALKN_SESSION_KEY_PEM ), cert: fs.readFileSync( TALKN_SESSION_CERT_PEM )};
      const server = https.createServer( options, app );


      // セッションの設定
      app.use( session( Logics.app.getSessionSetting() ) );
      app.use( passport.initialize() );
      app.use( passport.session() );

      // Facebook & Twitter
      app.get('/subdomain/session/auth/facebook', Logics.app.getAuthStart( 'facebook', passport ) );
      app.get('/subdomain/session/auth/facebook/callback', Logics.app.getAuthCallback( 'facebook', passport ) );
      app.get('/subdomain/session/auth/twitter', Logics.app.getAuthStart( 'twitter', passport ) );
      app.get('/subdomain/session/auth/twitter/callback', Logics.app.getAuthCallback( 'twitter', passport ) );
      
      app.get('/subdomain/client/', function( req, res ){
        console.log( req );
      } );

      app.get('/', function(req, res) {
          console.log("TOP " );
          const user = req.user ? req.user : {} ;
          if( user.id ){

            ts._oauth.getProtectedResource(
              `https://api.twitter.com/1.1/followers/ids.json?user_id=${user.id}&stringify_ids=true`,
              'GET',
              req.user.accessToken,
              req.user.refreshToken,
              function (err, data, response) {

                if(err) {
                  res.send(err, 500);
                  return false;
                }

                user.friends = JSON.parse(data);
              }
             );


            ts._oauth.getProtectedResource(
              `https://api.twitter.com/1.1/followers/list.json?user_id=${user.id}&count=200&skip_status=true&include_user_entities=false`,
              'GET',
              req.user.accessToken,
              req.user.refreshToken,
              function (err, data, response) {

                if(err) {
            console.log("CC");
                  res.send(err, 500);
                  return false;
                }

                user.friends = JSON.parse(data);
                res.send(user);
              }
             );

          }else{
            res.send('No Routing.');
          }
      });

      // イベント待機
      server.listen( TALKN_SESSION_LISTEN_PORT, () => {
        console.log( `LISTEN SESSION ${TALKN_SESSION_LISTEN_PORT}` );
      });
*/
    }
  }
}
