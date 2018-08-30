import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import conf from '~/server/conf';

//TwitterStrategy.Strategy();

export default class Passport{

  static get TWITTER_CONSUMER_KEY(){ return 'gPahl00kmAjRVndFFAZY4lC9K' }
  static get TWITTER_CONSUMER_SECRET(){ return 'slns8crrxL5N0pM121y8EIejUg2QpnbFikKiON9s1YyY5Psa75' }

  constructor( app ){
    passport.use(new TwitterStrategy({
      consumerKey: Passport.TWITTER_CONSUMER_KEY,
      consumerSecret: Passport.TWITTER_CONSUMER_SECRET,
      callbackURL: `${conf.sessionURL}`
    }, this.twitterFetchToken ));
  }

  twitterAuth( req, res, next, uid, connection ){
    console.log("TWITTER AUTH!!!");
    passport.authenticate('twitter')(req, res, next );
  }

  twitterFetchToken( token, tokenSecret, profile, done ){

  }

  twitterCallback(){

  }
}
