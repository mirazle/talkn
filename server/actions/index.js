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
console.log("A");
    // リクエストのあったスレッドを取得する
    let {response: thread} = await Logics.db.threads.findOne(requestState.thread.connection);
console.log("B");
    const isUpdatableThread = Logics.db.threads.isUpdatableThread(thread, setting);
console.log("C");
    // リクエストのあった投稿内容を取得する
    let {response: posts} = await Logics.db.posts.find(requestState, setting );
console.log("D");
    // スレッドが存在しない場合、もしくは更新が必要なスレッドの場合
    if( thread === null || isUpdatableThread ){
console.log("E");
      const {title, metas, links, h1s, contentType, uri} = await Logics.html.get( requestState.thread );
console.log("F");
      const faviconName = Logics.favicon.getName( requestState.thread, links );
console.log("G");
      const faviconBinary = await Logics.favicon.request( requestState.thread, faviconName );
console.log("H");
      const writeResult = await Logics.fs.write( faviconName, faviconBinary );
console.log("I");
      const updateThread = {title, metas, links, h1s, contentType, uri, favicon: faviconName};
console.log("J");

      if( thread ){
console.log("K");
        let {response: thread} = await Logics.db.threads.update( requestState, updateThread );
console.log("L");
        await Logics.io.find( ioUser, {requestState, thread, posts} );
console.log("M");
      }else{
console.log("N");
        let {response: thread} = await Logics.db.threads.save( requestState, updateThread );
console.log("O");
        await Logics.io.find( ioUser, {requestState, thread, posts} );
console.log("P");
      }

    }else{
console.log("Q");
      await Logics.io.find( ioUser, {requestState, thread, posts} );
    }
    return true;
    // TODO postCntが1にならない！
    // GET MOREを表示
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
