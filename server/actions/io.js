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
      Logics.db.users.update( ioUser.conn.id, requestState.thread );
      Logics.io.changeThread( ioUser, {requestState, thread, user: {connectioned: connection, offsetFindId: User.defaultOffsetFindId} } );
    }

    requestState.type = 'find';
    await Actions.io.exeFind( ioUser, requestState, setting );
  },

  exeFind: async ( ioUser, requestState, setting ) => {

    // リクエストのあったconnectionを取得する
    const { connection } = requestState.thread;

    // Thread
    let {response: thread} = await Logics.db.threads.findOne( connection, {}, {}, true );

    // Posts
    thread.postCnt = await Logics.db.posts.getCounts( requestState );
    const {response: posts} = await Logics.db.posts.find(requestState, setting );
    const offsetFindId = Logics.control.getOffsetFindId( posts );

    // User
    const user = {connectioned: connection ,offsetFindId};

    // Threadの状態
    const threadStatus = Logics.db.threads.getStatus( thread, user, setting );

    // 作成・更新が必要なスレッドの場合
    if( threadStatus.isRequireUpsert ){

      thread = await Logics.db.threads.requestHtmlParams( thread );

      // スレッド新規作成
      if( threadStatus.isSchema ){

        thread.watchCnt = 1;
        thread = await Logics.db.threads.save( {thread} );
        Logics.io.find( ioUser, {requestState, thread, posts, user} );

      // スレッド更新
      }else{

        thread.watchCnt = thread.watchCnt < 0 ? 1  : thread.watchCnt + 1;
        await Logics.db.threads.save( connection, thread );
        Logics.io.find( ioUser, {requestState, thread, posts, user} );
      }

    // スレッドが存在して、更新も必要ない場合
    }else{

      // 初回表示の場合
      if( threadStatus.isFirstView ){

        let addWatchCnt = 1;
        addWatchCnt = thread.watchCnt < 0 ? 2 : 1 ;
        thread.watchCnt = await Actions.io.updateThreadWatchCnt( connection, addWatchCnt );
      }

      Logics.io.find( ioUser, {requestState, thread, posts, user} );
    }
  },

  //
  findMenuIndex: async ( ioUser, requestState, setting ) => {
    // リクエストのあったスレッドを取得する
    const connection = requestState.thread.connection;
    const menuIndex = await Logics.db.threads.findMenuIndex( requestState, setting );
    Logics.io.findMenuIndex( ioUser, {requestState, menuIndex} );
  },

  post: async ( ioUser, requestState, setting ) => {
    const { connection } = requestState.thread;
    const post = await Logics.db.posts.save( requestState );
    const response = await Logics.db.threads.update( connection, {$inc: {postCnt: 1}, lastPost: post } );
    const postCnt = await Logics.db.posts.getCounts( requestState );
    const thread = {postCnt, connection};
    await Logics.io.post( ioUser, {requestState, posts:[ post ] , thread } );
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
