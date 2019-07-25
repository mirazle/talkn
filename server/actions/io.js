import Sequence from '~/common/Sequence'
import Thread from '~/common/schemas/state/Thread';
import Collections from '~/server/logics/db/collections/'
import Logics from '~/server/logics';
import Threads from '~/server/logics/db/collections/Threads';
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
        console.log("------------------------------- " + endpoint);
        //console.log( requestState );
        Actions.io[ endpoint ]( ioUser, requestState, setting );
      });
    });
  },

  initClientState: ( ioUser, requestState, setting ) => {
    Logics.db.users.update( ioUser.conn.id, requestState.thread.connection );
    Logics.io.initClientState( ioUser, requestState, setting );
    return true;
  },

  find: async ( ioUser, requestState, setting ) => {
    Actions.io.exeFind( ioUser, requestState, setting );
  },

  getMore: async ( ioUser, requestState, setting ) => {
    let { app } = requestState;
    const { connection } = requestState.thread;
    let thread = {connection};

    const isMultistream = Thread.getStatusIsMultistream( app );
    const postCntKey = isMultistream ? 'multiPostCnt' : 'postCnt';
    thread[postCntKey] = await Logics.db.posts.getCounts( requestState, {isMultistream} );
    const {response: posts} = await Logics.db.posts.find(requestState, setting, {isMultistream, getMore: true} );

    app = Collections.getNewApp(requestState.type, app, thread, posts);
    Logics.io.getMore( ioUser, {requestState, thread, posts, app} );
  },

  changeThread: async ( ioUser, requestState, setting ) => {
    const connectioned = requestState.app.connectioned;

    if( connectioned !== '' ){
      const connection = requestState.thread.connection;
      const thread = await Logics.db.threads.saveOnWatchCnt(
        {connection: connectioned},
        -1
      );
      //const user = Collections.getNewApp(requestState.type, app, thread, [], requestState.user);

      // ユーザーの接続情報を更新
      Logics.db.users.update( ioUser.conn.id, connection );

      // 配信
      Logics.io.changeThread( ioUser, {
        requestState,
        thread,
        app: {
          connectioned: connection
        }
      });
    }

    requestState.type = 'find';
    await Actions.io.exeFind( ioUser, requestState, setting );
  },

  exeFind: async ( ioUser, requestState, setting ) => {

    let { app } = requestState;

    // リクエストのあったconnectionを取得する
    const { connection } = requestState.thread;

    // Thread
    let {response: thread} = await Logics.db.threads.findOne( connection, {}, {}, true );
    thread.hasSlash = requestState.thread.hasSlash;

    // Threadの状態
    const threadStatus = Thread.getStatus( thread, app, setting );  

    // Posts
    const postCntKey = threadStatus.isMultistream ? 'multiPostCnt' : 'postCnt';
    thread[postCntKey] = await Logics.db.posts.getCounts( requestState, threadStatus );
    const {response: posts} = await Logics.db.posts.find(requestState, setting, threadStatus );

    // appの状況を更新する
    app = Collections.getNewApp(requestState.type, app, threadStatus, thread, posts);

    // 作成・更新が必要なスレッドの場合
    if( threadStatus.isRequireUpsert ){

      thread = await Logics.db.threads.requestHtmlParams( thread, requestState );

      // スレッド新規作成
      if( threadStatus.isSchema ){

        thread = await Logics.db.threads.save( thread );
        Logics.io.find( ioUser, {requestState, thread, posts, app} );
      // スレッド更新
      }else{

        thread = await Logics.db.threads.saveOnWatchCnt( thread, +1 );
        Logics.io.find( ioUser, {requestState, thread, posts, app} );
      }

    // スレッドが存在して、更新も必要ない場合
    }else{

      //console.log( threadStatus );
      // Multistreamボタンを押した場合
      if( !threadStatus.isToggleMultistream ){
        thread = await Logics.db.threads.saveOnWatchCnt( thread, +1 );
      }
      Logics.io.find( ioUser, {requestState, thread, posts, app} );
    }
  },

  changeThreadDetail:  async ( ioUser, requestState, setting ) => {
    const { connection } = requestState.thread;
    let {response: thread} = await Logics.db.threads.findOne( connection, {}, {}, true );
    await Logics.io.changeThreadDetail( ioUser, {requestState, thread } );
  },

  findMenuIndex: async ( ioUser, requestState, setting ) => {
    const menuIndex = await Logics.db.threads.findMenuIndex( requestState, setting );
    Logics.io.findMenuIndex( ioUser, {requestState, menuIndex} );
  },

  post: async ( ioUser, requestState, setting ) => {
    const { app } = requestState;
    const { connection } = requestState.thread;
    let thread = {connection};
    const isMultistream = Thread.getStatusIsMultistream( app );
    const post = await Logics.db.posts.save( requestState );
    const response = await Logics.db.threads.update( connection, {$inc: {postCnt: 1}, lastPost: post } );
    const postCntKey = isMultistream ? 'multiPostCnt' : 'postCnt';
    thread[postCntKey] = await Logics.db.posts.getCounts( requestState, {isMultistream} );
    await Logics.io.post( ioUser, {requestState, posts:[ post ] , thread } );
    return true;
  },

  updateThreadServerMetas: async ( ioUser, requestState, setting ) => {
    const { connection } = requestState.thread;
    const {response: baseThread} = await Logics.db.threads.findOne( connection );
    const serverMetas = await Logics.db.threads.updateServerMetas( connection, baseThread, requestState.thread );
    await Logics.io.updateThreadServerMetas( ioUser, {requestState, thread: {serverMetas}} );
    return true;
  },

  disconnect: async ( ioUser, requestState, setting ) => {
    const {response: user }  = await Logics.db.users.findOne( ioUser.conn.id );

    if( user && user.connection ){

      // ユーザーデータ削除
      await Logics.db.users.remove( ioUser.conn.id );

      // userコレクションからwatchCntの実数を取得(thread.watchCntは読み取り専用)
      const watchCnt = await Logics.db.users.getConnectionCnt( user.connection );
      const thread = await Logics.db.threads.saveOnWatchCnt(
        {connection: user.connection},
        watchCnt,
        true
      );

      // 配信
      Logics.io.saveOnWatchCnt(
        ioUser, {
          requestState: {type: 'disconnect'},
          thread
        }
      );
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
