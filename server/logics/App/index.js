import Twitter from './Twitter';
import Facebook from './Facebook';

export default class App {

  constructor(){
    this.twitter = new Twitter();
    this.facebook = new Facebook();
  }

  getSessionSetting( params = {} ){
    return {
      ...{
        secret: 'reply-analyzer',
        resave: false,
        saveUninitialized: false
      }, ...params 
    }
  }

  getAuthStart( loginType, passport ) {
    return ( req, res, next ) => {
      if( req.query.url ){
        console.log( `1 Auth Start ${loginType} ${req.query.url}` );
        passport.st = passport[ `${loginType}Strategy` ];
        passport.referer = req.query.url;
        passport.authenticate( loginType, {callbackURL: `/auth/${loginType}/callback` })( req, res, next );
        return true;
      }else{
        res.send('Bad Request.');
        return false;
      }
    }
  }

  getAuthCallback( loginType, passport ) {
    return passport.authenticate( loginType, {failureRedirect: '/login' }), (req, res) => {
      console.log(`4 callback ${loginType} ${passport.referer}` );
      passport.st = passport[ `${loginType}Strategy` ];
      passport.loginType = loginType;
      

      // TODO session.talkn.ioに飛ばす(セッション保持どうしよう)
      res.redirect( passport.referer );
      return passport;
    }
  }
}
