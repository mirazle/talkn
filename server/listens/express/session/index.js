import session from 'express-session';
import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import conf from '~/server/conf';

//TwitterStrategy.Strategy();

export default class Passport{

  static get TWITTER_CONSUMER_KEY(){ return 'gPahl00kmAjRVndFFAZY4lC9K' }
  static get TWITTER_CONSUMER_SECRET(){ return 'slns8crrxL5N0pM121y8EIejUg2QpnbFikKiON9s1YyY5Psa75' }

  constructor( app ){

    // セッションへの保存と読み出し ・・・・①
    passport.serializeUser((user, callback) => {
      callback(null, user);
    });
 
    passport.deserializeUser((obj, callback) => {
      callback(null, obj);
    });

    passport.use(new TwitterStrategy({
      consumerKey: Passport.TWITTER_CONSUMER_KEY,
      consumerSecret: Passport.TWITTER_CONSUMER_SECRET,
      callbackURL: `https://session.talkn.io/twitter/callback`
    }, this.twitterFetchToken ));

    // セッションの設定　・・・・①
    app.use(session({
      secret: 'reply-analyzer',
      resave: false,
      saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session()); // ・・・・①
  }

  twitterAuth( req, res, next, uid, connection ){
    console.log("START TWITTER AUTH!!!");
    passport.authenticate('twitter')(req, res, next );
  }

  twitterFetchToken( token, tokenSecret, profile, done ){
    console.log( profile );
    console.log( "twitterFetchToken" );
  }

  twitterCallback( req, res, next, uid, connection ){
    passport.authenticate('twitter', {failureRedirect: '/' })( req, res, next );
    res.redirect(`https://${conf.domain}`); 
  }
}
