import Actions from '~/actions';
import Logics from '~/logics';
import User from '~/../common/schemas/state/User'
import Thread from '~/../common/schemas/state/Thread'
import Sequence from '~/../common/Sequence'

export default {

  setUpApp: async () => {
    await Logics.db.threads.resetWatchCnt();
    return await Logics.db.users.drop();
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
    let {response: thread} = await Logics.db.threads.findOne(requestState.thread.connection);
    const isUpdatableThread = Logics.db.threads.isUpdatableThread(thread, setting);

    // リクエストのあった投稿内容を取得する
    let {response: posts} = await Logics.db.posts.find(requestState, setting );
    const offsetFindId = Logics.control.getOffsetFindId( posts );
    const user = {connectioned: requestState.thread.connection ,offsetFindId};

    // スレッドが存在しない場合 || 更新が必要なスレッドの場合
    if( thread === null || isUpdatableThread ){

      let updateThread = {title: '', metas: [], links: [], h1s: [], contentType: '', uri: '', favicon: ''};

      if( requestState.thread.protocol !== Sequence.TALKN_PROTOCOL ){

        const {title, metas, links, h1s, contentType, uri} = await Logics.html.get( requestState.thread );
        const faviconName = Logics.favicon.getName( requestState.thread, links );
        const faviconBinary = await Logics.favicon.request( requestState.thread, faviconName );
        const writeResult = await Logics.fs.write( faviconName, faviconBinary );
        updateThread = {title, metas, links, h1s, contentType, uri, favicon: faviconName};
      }

      // スレッド更新
      if( thread ){

        updateThread.watchCnt = updateThread.watchCnt < 0 ? 1  : thread.watchCnt + 1;
        await Logics.db.threads.update( requestState, updateThread );
        Logics.io.find( ioUser, {requestState, thread, posts, user} );
      // スレッド新規作成
      }else{
        const watchCnt = 1;
        const connections = Thread.getConnections( requestState.thread.connection );
        updateThread = {...updateThread, watchCnt, connections };

        let {response: thread} = await Logics.db.threads.save( requestState, updateThread );
        Logics.io.find( ioUser, {requestState, thread, posts, user} );
      }

    }else{

      if( requestState.user.offsetFindId === User.defaultOffsetFindId ){
        const addWatchCnt = thread.watchCnt < 0 ? 2 : 1 ;
        thread.watchCnt = await Actions.updateThreadWatchCnt( requestState.thread.connection, addWatchCnt );
      }

      Logics.io.find( ioUser, {requestState, thread, posts, user} );
    }
  },

  post: async ( ioUser, requestState, setting ) => {
    await Logics.db.threads.update( requestState, {$inc: {postCnt: 1}} );
    const {response: post} = await Logics.db.posts.save( requestState );
    await Logics.io.post( ioUser, {requestState, posts: [ post ] } );
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
