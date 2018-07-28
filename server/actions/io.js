import Sequence from '~/common/Sequence'
import User from '~/common/schemas/state/User'
import Thread from '~/common/schemas/state/Thread'
import Logics from '~/server/logics';
import Actions from '~/server/actions';
import tests from '~/server/utils/testRequestState';

export default {

  setUp: async () => {
    const io = await Logics.io.get();
    return io.on( 'connection', Actions.io.attachAPI );
  },

  attachAPI: async ( ioUser ) => {
    const setting = await Actions.db.setUpUser();
    Object.keys( Sequence.map ).forEach( endpoint => {
      const oneSequence = Sequence.map[ endpoint ];
      ioUser.on( endpoint, ( requestState ) => {
        Actions.io[ endpoint ]( ioUser, requestState, setting );
      });
    });
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
    Actions.io.exeFind( ioUser, requestState, setting );
  },

  changeThread: async ( ioUser, requestState, setting ) => {
    const connectioned = requestState.user.connectioned;

    if( connectioned !== '' ){

      const connection = requestState.thread.connection;
      let {response: thread} = await Logics.db.threads.findOne( connectioned );
      thread.watchCnt = await Actions.io.updateThreadWatchCnt( connectioned, -1 );
      Logics.io.changeThread( ioUser, {requestState, thread, user: {connectioned: connection, offsetFindId: User.defaultOffsetFindId} } );
      console.log("======== CHANGE THREAD DECREMENT " + connectioned + " warchCnt = " + thread.watchCnt);
    }
    await Actions.io.exeFind( ioUser, requestState, setting );
  },

  exeFind: async ( ioUser, requestState, setting ) => {

    // リクエストのあったスレッドを取得する
    const connection = requestState.thread.connection;

    // Thread
    let {response: thread} = await Logics.db.threads.findOne( connection );
    const isUpdatableThread = Logics.db.threads.isUpdatableThread(thread, setting);

    // Posts
    const {postCnt, multiPostCnt} = await Logics.db.posts.getCounts( connection );
    const {response: posts} = await Logics.db.posts.find(requestState, setting );
    const offsetFindId = Logics.control.getOffsetFindId( posts );

    // User
    const user = {connectioned: connection ,offsetFindId};

    // スレッドが存在しない場合 || 更新が必要なスレッドの場合
    if( thread === null || isUpdatableThread ){

      const { title, serverMetas, links, h1s, videos, audios, contentType, uri, getHtmlThread } = await Logics.html.get( requestState.thread );
      requestState.thread = Logics.db.threads.merge( requestState.thread, getHtmlThread );
      const faviconDatas = Logics.favicon.getDatas( requestState.thread, links );
      const {faviconName, faviconType} = await Logics.favicon.requests( faviconDatas );
      let createThread = {title, serverMetas, links, h1s, videos, audios, contentType, uri, favicon: faviconName, faviconType};

      // スレッド更新
      if( thread ){

        createThread.postCnt = postCnt;
        createThread.multiPostCnt = multiPostCnt;
        createThread.watchCnt = createThread.watchCnt < 0 ? 1  : thread.watchCnt + 1;
        await Logics.db.threads.update( connection, createThread );
        Logics.io.find( ioUser, {requestState, thread, posts, user} );
console.log("======= UPDATE");
      // スレッド新規作成
      }else{
console.log("======= NEW");
        const watchCnt = 1;
        const connections = Thread.getConnections( connection );
        const protocol =  ( createThread && createThread.uri && createThread.uri.protocol ) ? createThread.uri.protocol : Sequence.TALKN_PROTOCOL ;
        const layer = Thread.getLayer( connection );

        createThread = {...createThread, watchCnt, connections, postCnt, multiPostCnt, protocol, layer };
        let {response: thread} = await Logics.db.threads.save( connection, createThread );
        Logics.io.find( ioUser, {requestState, thread, posts, user} );
      }

    // スレッドが存在して、更新も必要ない場合
    }else{

      // 初回表示の場合
      if( requestState.user.offsetFindId === User.defaultOffsetFindId ){

        let addWatchCnt = 1;
        addWatchCnt = thread.watchCnt < 0 ? 2 : 1 ;
        thread.watchCnt = await Actions.io.updateThreadWatchCnt( connection, addWatchCnt );

console.log("======= EXIST INCREMENT " + connection + " watchCnt = " + thread.watchCnt);

      // GET MOREを押した場合
      }else{
console.log("======= GET MORE");
      }

      thread.postCnt = postCnt;
      thread.multiPostCnt = multiPostCnt;
      Logics.io.find( ioUser, {requestState, thread, posts, user} );
    }
  },

  //
  findMenuIndex: async ( ioUser, requestState, setting ) => {
    // リクエストのあったスレッドを取得する
    const connection = requestState.thread.connection;
    const menuIndex = await Logics.db.threads.findMenuIndex( connection, setting );
    Logics.io.findMenuIndex( ioUser, {requestState, menuIndex} );
  },

  post: async ( ioUser, requestState, setting ) => {
    const { app, user, thread } = requestState;
    const { connection } = thread;
    const lastPost = {
      protocol: thread.protocol,
      connection: thread.connection,
      connections: thread.connections,
      uid: user.uid,
      utype: user.utype,
      favicon: thread.favicon,
      post: app.inputPost,
      data: '',
      updateTime: new Date(),
    }

    await Logics.db.threads.update( connection, {$inc: {postCnt: 1}, lastPost} );
    const {response: post} = await Logics.db.posts.save( requestState );
    const {postCnt, multiPostCnt} = await Logics.db.posts.getCounts( connection );
    const ioThread = {postCnt, multiPostCnt};
    await Logics.io.post( ioUser, {requestState, posts: [ post ], thread: ioThread } );
    return true;
  },

  updateThreadServerMetas: async ( ioUser, requestState, setting ) => {
    const { connection } = requestState.thread;
    await Logics.db.threads.update( connection, requestState.thread );
    const {response: thread} = await Logics.db.threads.findOne( connection );
    await Logics.io.updateThreadServerMetas( ioUser, {requestState, thread} );
    return true;
  },

  disconnect: async ( ioUser, requestState, setting ) => {

    const {response: user }  = await Logics.db.users.findOne( ioUser.conn.id );

    if( user && user.connection ){
      Logics.db.users.remove( ioUser.conn.id );
      const watchCnt = await Actions.io.updateThreadWatchCnt( user.connection , -1 );
      console.log("======== DISCONNECT DECREMENT " + user.connection + " warchCnt = " + watchCnt);
      Logics.io.updateWatchCnt(
        ioUser, {
        requestState: {type: 'disconnect'},
        thread: {watchCnt, connection: user.connection}
      });
    }
    return true;
  },

  testAPI: ( ioUser, setting ) => {
    if( Object.keys( tests ).length > 0 ){

      let {connections, state} = tests.find();

      connections.forEach( ( connection, index ) => {
        const requestState = {...state,
          thread: {...state.thread,
            connection
          }
        }
        Actions.io[ 'find' ]( ioUser, requestState, setting );
      });
    }
  }
}
