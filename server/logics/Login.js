import express from 'express';
import localStorage from 'localStorage';
import passport from 'passport';
import TwitterStrategy from 'passport-twitter';

export default class Login {

  static get TWITTER_CONSUMER_KEY(){ return 'gPahl00kmAjRVndFFAZY4lC9K' }
  static get TWITTER_CONSUMER_SECRET(){ return 'slns8crrxL5N0pM121y8EIejUg2QpnbFikKiON9s1YyY5Psa75' }

  constructor(){
/*
    console.log("LOGIN BOOT");
    this.app = express();
    this.app.use(passport.session());
    passport.session();
console.log(this.app);
    this.app.get('/auth/twitter', ()=>{
      console.log("AUTH/TWITTER");
      passport.authenticate('twitter');
    });

    //認証正常時の戻り先URLの設定をする
    this.app.get('/auth/twitter/callback',
      passport.authenticate('twitter', {failureRedirect: '/' }),//認証失敗時のリダイレクト先を書く
      (req, res) => {
        // ここでは認証成功時のルーティング設定を書く
        // ちなみにreq.userでログインユーザの情報が取れる
        //     例) req.user.useridでユーザIDがとれます
        res.redirect('/');
    });
*/
  }

  twitter( callback ){
    return new Promise( resolve => {

      // passport-twitterの初期化
      passport.use(new TwitterStrategy({
        consumerKey: Login.TWITTER_CONSUMER_KEY,//TwitterのconsumerKey
        consumerSecret: Login.TWITTER_CONSUMER_SECRET,//TwitterのconsumerSecret
        callbackURL: callback //認証成功時の戻り先URL
      },(token, tokenSecret, profile, done) => {
          // 認証が完了したtwitterIdを検証する
          // 例えばtwitteridがDBの中に存在するかということを確認する
          // 検証結果によってdoneの書き方を以下のように指定する
          //     検証成功 : return done(null,profile);
          //     検証失敗 : return done(null,false);
          //     例外発生 : return done(null);
          console.log(profile);
          resolve({profile});
          return done(null,profile);
        }
      ));

      passport.authenticate('twitter');

    });
  }
}
