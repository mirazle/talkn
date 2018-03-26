
import 'dotenv/config';
import config from 'config';
import session from 'express-session';
import passport from 'passport';
import express from 'express';
import ejs from 'ejs';
import TwitterStrategy from 'passport-twitter';

const app = express()

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
    consumerKey: config.get('twitter.consumerKey'),
    consumerSecret: config.get('twitter.consumerSecret'),
    callbackURL: config.get('twitter.callbackUrl')

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
