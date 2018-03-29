import TwitterStrategy from 'passport-twitter';

export default class AuthTwitter {

  static get TWITTER_CONSUMER_KEY(){ return 'gPahl00kmAjRVndFFAZY4lC9K' }
  static get TWITTER_CONSUMER_SECRET(){ return 'slns8crrxL5N0pM121y8EIejUg2QpnbFikKiON9s1YyY5Psa75' }
  static get ACCESS_TOKEN_KEY(){ return '94465436-ilw0Q2AFpf0sF3ActmrjGJFvWU0Tn96qi3zjMTlSx' }
  static get ACCESS_TOKEN_SECRET(){ return 'gelAu4sZ00kmhKlPwYhVM2zvvgi9CrnxAEP75yzshx6Fm' }

  // 認証の設定
  constructor( passport ){
/*
    passport.serializeUser( this.callbackSerializeUser );
    passport.deserializeUser( this.callbackDeserializeUser );

    this.ts = new TwitterStrategy({
      consumerKey: AuthTwitter.TWITTER_CONSUMER_KEY,
      consumerSecret: AuthTwitter.TWITTER_CONSUMER_SECRET,
      callbackURL: "http://localhost:8000/auth/twitter/callback"
      // 認証後のアクション
    }, this.callbackAuth );

    passport.use( this.ts );
    */
  }

  callbackAuth( accessToken, refreshToken, profile, callback ){
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;
    process.nextTick(() => {
      console.log("2 Auth Finish"); //必要に応じて変更
      return callback(null, profile);
    });
  }

  callbackSerializeUser(user, callback){
    console.log( "3 Serialize(Save Session & Read Session)" );
    callback(null, user);
  }

  callbackDeserializeUser(obj, callback){
    console.log( "5 Deserialize" );
    callback(null, obj);
  }
}
