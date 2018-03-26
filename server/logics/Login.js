//import LoginWithTwitter from 'login-with-twitter';


import express from 'express';
import session from 'express-session';
import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import ejs from 'ejs';

export default class Login {

  static get TWITTER_CONSUMER_KEY(){ return 'gPahl00kmAjRVndFFAZY4lC9K' }
  static get TWITTER_CONSUMER_SECRET(){ return 'slns8crrxL5N0pM121y8EIejUg2QpnbFikKiON9s1YyY5Psa75' }
  static get ACCESS_TOKEN_KEY(){ return '94465436-ilw0Q2AFpf0sF3ActmrjGJFvWU0Tn96qi3zjMTlSx' }
  static get ACCESS_TOKEN_SECRET(){ return 'gelAu4sZ00kmhKlPwYhVM2zvvgi9CrnxAEP75yzshx6Fm' }

  constructor(){
/*
    console.log("LOGIN BOOT");
    const app = express();

    // セッションへの保存と読み出し
    passport.serializeUser((user, callback) => {
      console.log( "2 シリアライズ(セッションへの保存と読み出し)" );
    //  console.log( user );
      callback(null, user);
    });

    passport.deserializeUser((obj, callback) => {
      console.log( "4 デシリアライズ" );
      callback(null, obj);
    });

    // 認証の設定
    passport.use(new TwitterStrategy({
        consumerKey: Login.TWITTER_CONSUMER_KEY,
        consumerSecret: Login.TWITTER_CONSUMER_SECRET,
        callbackURL: "localhost:8080"

    // 認証後のアクション
    },(accessToken, refreshToken, profile, callback) => {
        process.nextTick(() => {

            console.log("1 認証完了"); //必要に応じて変更

            return callback(null, profile);
        });
    }));

    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    // セッションの設定
    app.use(session({
        secret: 'reply-analyzer',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // 指定のpathで認証
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // callback後の設定
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/login' }), (req, res) => {
      console.log("3 callback");
        res.redirect('/');
    });

    app.get('/', function(req, res) {
      console.log("5 TOP");
        const username = req.user ? req.user.username : 'GUEST' ;
        res.render('index', {title : username});
    });

    app.listen(8000)
*/
  }

  twitter( callback ){
/*
    console.log( callback );
    const tw = new LoginWithTwitter({
      consumerKey: Login.TWITTER_CONSUMER_KEY,
      consumerSecret: Login.TWITTER_CONSUMER_SECRET,
      callbackUrl: callback
    });
    console.log( tw );
*/
    /*
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
    */
  }
}
