import express from 'express';
import passport from 'passport';
import TwitterStrategy from 'passport-twitter';

const TWITTER_CONSUMER_KEY = 'gPahl00kmAjRVndFFAZY4lC9K';
const TWITTER_CONSUMER_SECRET = 'slns8crrxL5N0pM121y8EIejUg2QpnbFikKiON9s1YyY5Psa75';
const BASE_URL = 'http://localhost:3000';

//Expressの初期化
const app = express();

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
const server = app.listen(3000, function(){
    console.log( server.address() );
});


app.use(passport.initialize());

//Expressでpassportが使えるようにする
app.use(passport.session());

// passport-twitterの初期化
passport.use(new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,//TwitterのconsumerKey
        consumerSecret: TWITTER_CONSUMER_SECRET,//TwitterのconsumerSecret
        callbackURL: BASE_URL+'/auth/twitter/callback'//認証成功時の戻り先URL
    },
    function(token, tokenSecret, profile, done) {
        // 認証が完了したtwitterIdを検証する
        // 例えばtwitteridがDBの中に存在するかということを確認する
        // 検証結果によってdoneの書き方を以下のように指定する
        //     検証成功 : return done(null,profile);
        //     検証失敗 : return done(null,false);
        //     例外発生 : return done(null);
        console.log( '############' );
        return done(null,profile);
    }
));


app.get('/', (req, res) => res.send('endpoints/login'))


//自作サービス中でtwitter認証を行うURLを設定する
app.get('/auth/twitter', ( req, res ) =>{
  console.log( passport.authenticate('twitter') );
  res.send('/auth/twitter');
});

//認証正常時の戻り先URLの設定をする
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/' }),//認証失敗時のリダイレクト先を書く
    function(req, res) {
        // ここでは認証成功時のルーティング設定を書く
        // ちなみにreq.userでログインユーザの情報が取れる
        //     例) req.user.useridでユーザIDがとれます
        res.redirect('/');
});
