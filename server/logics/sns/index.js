import Twitter from '~/server/logics/sns/Twitter';
import Facebook from '~/server/logics/sns/Facebook';

export default class Sns {

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
      passport.loginType = loginType;
      const st = passport[ `${loginType}Strategy` ];
      const oauth = st._oauth2 ? st._oauth2 : st._oauth ;

      oauth.getProtectedResource;

      // TODO session.talkn.ioに飛ばす(セッション保持どうしよう)
      // サブドメインで起動出来ない？
      res.redirect( passport.referer );
      return passport;
    }
  }
}
