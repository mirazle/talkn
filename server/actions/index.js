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
    Logics.io.initClientState( ioUser, requestState, setting );
    return true;
  },

  find: async ( ioUser, requestState, setting ) => {

    // リクエストのあったスレッドを取得する
    let {response: thread} = await Logics.db.threads.findOne(requestState.thread.connection);

    // TODO ちゃんと機能してる？
    const isUpdatableThread = Logics.db.threads.isUpdatableThread(thread, setting);

    // リクエストのあった投稿内容を取得する
    let {response: posts} = await Logics.db.posts.find(requestState, setting );
    const offsetPostCreateTime = Logics.control.getOffsetPostCreateTime( posts );
    const user = {offsetPostCreateTime};

    // スレッドが存在しない場合、もしくは更新が必要なスレッドの場合
    if( thread === null || isUpdatableThread ){
      const {title, metas, links, h1s, contentType, uri} = await Logics.html.get( requestState.thread );
      const faviconName = Logics.favicon.getName( requestState.thread, links );
      const faviconBinary = await Logics.favicon.request( requestState.thread, faviconName );
      const writeResult = await Logics.fs.write( faviconName, faviconBinary );
      const updateThread = {title, metas, links, h1s, contentType, uri, favicon: faviconName};

      if( thread ){
        await Logics.db.threads.update( requestState, updateThread );
        await Logics.io.find( ioUser, {requestState, thread, posts, user} );
      }else{
        let {response: thread} = await Logics.db.threads.save( requestState, updateThread );
        await Logics.io.find( ioUser, {requestState, thread, posts, user} );
      }

    }else{
      await Logics.io.find( ioUser, {requestState, thread, posts, user} );
    }
    return true;
  },

  post: async ( ioUser, requestState, setting ) => {
    await Logics.db.threads.update( requestState, {$inc: {postCnt: 1}} );
    const {response: post} = await Logics.db.posts.save( requestState );
    await Logics.io.post( ioUser, {requestState, posts: [ post ] } );
    return true;
  },

  disconnect: ( ioUser, state ) => {
    //Actions.updateThreadWatchCnt( state.connection, -1 );
  },
}
