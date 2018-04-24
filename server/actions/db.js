import Actions from '~/actions';
import Logics from '~/logics';
import utils from '~/utils';
import User from '~/../common/schemas/state/User'
import Thread from '~/../common/schemas/state/Thread'
import Favicon from '~/logics/Favicon'
import Sequence from '~/../common/Sequence'
import fs from 'fs';

export default {

  setUpDB: async () => {
    await Logics.db.threads.resetWatchCnt();
    return await Logics.db.users.removeAll();
  },

  setUpUser: async () => {
    return await Logics.db.setting.findOne();
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
      let faviconName = Logics.favicon.getName( requestState.thread, links );
      const faviconBinary = await Logics.favicon.request( faviconName );
      if( faviconBinary ){
        await Logics.fs.write( faviconName, faviconBinary );
      }else{
        faviconName = Favicon.getDefaultFaviconFullname();
      }
      let createThread = {title, serverMetas, links, h1s, contentType, uri, favicon: faviconName};

      // スレッド更新
      if( thread ){
        createThread.postCnt = postCnt;
        createThread.multiPostCnt = multiPostCnt;
        createThread.watchCnt = createThread.watchCnt < 0 ? 1  : thread.watchCnt + 1;
        await Logics.db.threads.update( requestState, createThread );
        Logics.io.find( ioUser, {requestState, thread, posts, user} );
//console.log("UPDATE");
      // スレッド新規作成
      }else{
//console.log("NEW");
        const watchCnt = 1;
        const connections = Thread.getConnections( connection );
        const protocol =  ( createThread && createThread.uri && createThread.uri.protocol ) ? createThread.uri.protocol : Sequence.TALKN_PROTOCOL ;

        createThread = {...createThread, watchCnt, connections, postCnt, multiPostCnt, protocol };
        let {response: thread} = await Logics.db.threads.save( requestState, createThread );
        Logics.io.find( ioUser, {requestState, thread, posts, user} );
      }

    // スレッドが存在して、更新も必要ない場合
    }else{
//console.log("EXIST");
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
}
