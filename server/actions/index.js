import Actions from '~/actions';
import Logics from '~/logics';
import User from '~/../common/schemas/state/User'
import Thread from '~/../common/schemas/state/Thread'
import Sequence from '~/../common/Sequence'
import https from 'https';
import fs from 'fs';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import FacebookStrategy from 'passport-facebook';

const KEY_PEM = '/etc/letsencrypt/live/talkn.io/privkey.pem';
const CERT_PEM = '/etc/letsencrypt/live/talkn.io/cert.pem';

export default {

  setUpApp: async () => {
    await Logics.db.threads.resetWatchCnt();
    return await Logics.db.users.removeAll();
  },

  setUpEndpoints: async () => {
		const protcol = process.argv.includes('ssl') ? 'https' : 'http';

    if( protcol === 'https'){

      let callback = '';

      // セッションへの保存と読み出し
      passport.serializeUser((user, callback) => {
        console.log( "3 Serialize(Save Session & Read Session)" );
        callback(null, user);
      });

      passport.deserializeUser((obj, callback) => {
        console.log( "5 Deserialize" );
        callback(null, obj);
      });

      // 認証の設定
      const fb_s = new FacebookStrategy({
        clientID: '1655931587827697',
        clientSecret: '64c9192a5ea216be390f990eb2365fa6',
        callbackURL: "https://talkn.io:8443/auth/facebook/callback",
        enableProof: true

      // 認証後のアクション
      },(accessToken, refreshToken, profile, callback) => {
          profile.accessToken = accessToken;
          profile.refreshToken = refreshToken;
          process.nextTick(() => {

              console.log("2 Auth Facebook Finish"); //必要に応じて変更

              return callback(null, profile);
          });
      });

      // 認証の設定
      const tw_s = new TwitterStrategy({
          consumerKey: 'gPahl00kmAjRVndFFAZY4lC9K',
          consumerSecret: 'slns8crrxL5N0pM121y8EIejUg2QpnbFikKiON9s1YyY5Psa75',
          callbackURL: "https://talkn.io:8443/auth/twitter/callback"

      // 認証後のアクション
      },(accessToken, refreshToken, profile, callback) => {
          profile.accessToken = accessToken;
          profile.refreshToken = refreshToken;
          process.nextTick(() => {

              console.log("2 Auth Twitter Finish"); //必要に応じて変更

              return callback(null, profile);
          });
      });

      passport.use( fb_s );
      passport.use( tw_s );

      const app = express();
      const options = {key:  fs.readFileSync( KEY_PEM ), cert: fs.readFileSync( CERT_PEM )};
      const server = https.createServer( options, app );

      // セッションの設定
      app.use(session({
          secret: 'reply-analyzer',
          resave: false,
          saveUninitialized: false
      }));

      app.use(passport.initialize());
      app.use(passport.session());

      // 指定のpathで認証
      app.get('/auth/facebook', function(req,res,next) {
        if( req.query.url ){
          console.log("1 Auth Start " + req.query.url);
          callback = req.query.url;
          passport.authenticate('facebook',{callbackURL: '/auth/facebook/callback'})( req, res, next );
        }else{
          res.send('Bad Request.');
        }
      });

      // callback後の設定
      app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login' }), (req, res) => {
          console.log("4 callback " + req.query.url );
          console.log( "@@@@" + callback );
          res.redirect( callback );
      });


      // 指定のpathで認証
      app.get('/auth/twitter', function(req,res,next) {
        if( req.query.url ){
          console.log("1 Auth Start " + req.query.url);
          passport.authenticate('twitter',{callbackURL: '/auth/twitter/callback/?url=' + req.query.url})( req, res, next );
        }else{
          res.send('Bad Request.');
        }
      });

      // callback後の設定
      app.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/login' }), (req, res) => {
          console.log("4 callback " + req.query.url );
          res.redirect( req.query.url );
      });

      app.get('/', function(req, res) {
          console.log("TOP");
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
            res.send('No Auth.');
          }
      });

      // イベント待機
      server.listen(8443, () => {
        console.log("LISTEN 8443");
      });
    }
  },

  setUpUser: async () => {
    return await Logics.db.setting.findOne();
  },

  getIo: async () => {
    return await Logics.io.get();
  },

  updateThreadWatchCnt: async ( connection, watchCnt ) => {
    await Logics.db.threads.updateWatchCnt( connection, watchCnt );
    return await Logics.db.threads.findOneWatchCnt( connection );
  },

  initClientState: ( ioUser, requestState, setting ) => {
    Logics.db.users.update( ioUser.conn.id, requestState.thread );
    Logics.io.initClientState( ioUser, requestState, setting );
    return true;
  },

  find: async ( ioUser, requestState, setting ) => {

    // リクエストのあったスレッドを取得する
    const connection = requestState.thread.connection;
    let {response: thread} = await Logics.db.threads.findOne( connection );
    const isUpdatableThread = Logics.db.threads.isUpdatableThread(thread, setting);

    // リクエストのあった投稿内容を取得する
    const {postCnt, multiPostCnt} = await Logics.db.posts.getCounts( connection );
    const {response: posts} = await Logics.db.posts.find(requestState, setting );
    const offsetFindId = Logics.control.getOffsetFindId( posts );
    const user = {connectioned: connection ,offsetFindId};

    // スレッドが存在しない場合 || 更新が必要なスレッドの場合
    if( thread === null || isUpdatableThread ){
      const { title, serverMetas, links, h1s, contentType, uri, getHtmlThread } = await Logics.html.get( requestState.thread );
      requestState.thread = Logics.db.threads.merge( requestState.thread, getHtmlThread );
      const faviconName = Logics.favicon.getName( requestState.thread, links );
      const faviconBinary = await Logics.favicon.request( faviconName );
      const writeResult = await Logics.fs.write( faviconName, faviconBinary );
      let createThread = {title, serverMetas, links, h1s, contentType, uri, favicon: faviconName};

      // スレッド更新
      if( thread ){
        createThread.postCnt = postCnt;
        createThread.multiPostCnt = multiPostCnt;
        createThread.watchCnt = createThread.watchCnt < 0 ? 1  : thread.watchCnt + 1;
        await Logics.db.threads.update( requestState, createThread );
        Logics.io.find( ioUser, {requestState, thread, posts, user} );
console.log("UPDATE");
      // スレッド新規作成
      }else{
console.log("NEW");
        const watchCnt = 1;
        const connections = Thread.getConnections( connection );
        const protocol =  ( createThread && createThread.uri && createThread.uri.protocol ) ? createThread.uri.protocol : Sequence.TALKN_PROTOCOL ;
        createThread = {...createThread, watchCnt, connections, postCnt, multiPostCnt, protocol };

        let {response: thread} = await Logics.db.threads.save( requestState, createThread );
        Logics.io.find( ioUser, {requestState, thread, posts, user} );
      }

    // スレッドが存在して、更新も必要ない場合
    }else{
console.log("EXIST");
      // 初回表示(GET MOREでない場合)
      if( requestState.user.offsetFindId === User.defaultOffsetFindId ){
        const addWatchCnt = thread.watchCnt < 0 ? 2 : 1 ;
        thread.watchCnt = await Actions.updateThreadWatchCnt( connection, addWatchCnt );
      }

      thread.postCnt = postCnt;
      thread.multiPostCnt = multiPostCnt;
      Logics.io.find( ioUser, {requestState, thread, posts, user} );
    }
  },

  post: async ( ioUser, requestState, setting ) => {
    requestState.thread.thum = requestState.thread.favicon;
    delete requestState.thread.favicon;
    await Logics.db.threads.update( requestState, {$inc: {postCnt: 1}} );
    const {response: post} = await Logics.db.posts.save( requestState );
    const {postCnt, multiPostCnt} = await Logics.db.posts.getCounts( requestState.thread.connection );
    const thread = {postCnt, multiPostCnt};
    await Logics.io.post( ioUser, {requestState, posts: [ post ], thread } );
    return true;
  },

  updateThreadServerMetas: async ( ioUser, requestState, setting ) => {
    await Logics.db.threads.update( requestState, requestState.thread );
    const {response: thread} = await Logics.db.threads.findOne( requestState.thread.connection );
    await Logics.io.updateThreadServerMetas( ioUser, {requestState, thread} );
    return true;
  },

  disconnect: async ( ioUser, requestState, setting ) => {

    const {response: user }  = await Logics.db.users.findOne( ioUser.conn.id );

    if( user && user.connection ){
      Logics.db.users.remove( ioUser.conn.id );
      const watchCnt = await Actions.updateThreadWatchCnt( user.connection , -1 );
      Logics.io.updateWatchCnt(
        ioUser, {
        requestState: {type: 'disconnect'},
        thread: {watchCnt, connection: user.connection}
      });
    }
    return true;
  },

  login: async ( ioUser, requestState, setting ) => {
    const { requestLoginType, href: callback } = requestState.control;
    const { href } = requestState.user;
    Logics.login[ requestLoginType ]( href );
  }
}
