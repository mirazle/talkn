import Actions from '~/actions';
import Logics from '~/logics';

export default {

  setUp: async () => {
    await Logics.db.threads.resetWatchCnt();
    return await Logics.db.setting.findOne();
  },

  getIo: async () => {
    return await Logics.io.get();
  },

  updateThreadWatchCnt: async ( connection, cnt ) => {
    await Logics.db.threads.updateWatchCnt( connection, cnt );
    const response = await Logics.db.thread.findOne( connection, cnt );
    await Logics.io.updateThreadWatchCnt( response );
    return true;
  },

  initClientState: ( ioUser, requestState, setting ) => {
    Logics.io.initClientState( ioUser, requestState );
    return true;
  },

  find: async ( ioUser, requestState, setting ) => {

    // リクエストのあったスレッドを取得する
    let {response: thread} = await Logics.db.threads.findOne(requestState.connection);
    const isUpdatableThread = Logics.db.threads.isUpdatableThread(thread, setting);

    // リクエストのあった投稿内容を取得する
    let {response: posts} = await Logics.db.posts.find(requestState.connection);

    // スレッドが存在しない場合、もしくは更新が必要なスレッドの場合
    if( thread === null || isUpdatableThread ){
      const {title, metas, links, h1s, contentType, uri} = await Logics.html.get( requestState );
      const faviconName = Logics.favicon.getName( requestState, links );
      const faviconBinary = await Logics.favicon.request( requestState, faviconName );
      const writeResult = await Logics.fs.write( faviconName, faviconBinary );
      const updateThread = {title, metas, links, h1s, contentType, uri, favicon: faviconName};

      if( thread ){
        let {response: thread} = await Logics.db.threads.update( requestState, updateThread );
      }else{
        let {response: thread} = await Logics.db.threads.save( requestState, updateThread );
      }
    }

    await Logics.io.find( ioUser, {requestState, thread, posts} );
    return true;
  },

  post: async ( ioUser, requestState, setting ) => {
    const {response: post} = await Logics.db.posts.save( requestState );
    await Logics.io.post( ioUser, {requestState, posts: [ post ] } );
    return true;
  },

  disconnect: ( ioUser, state ) => {
    //Actions.updateThreadWatchCnt( state.connection, -1 );
  },
}
