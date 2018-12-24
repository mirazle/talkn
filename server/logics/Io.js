import Sequence from '~/common/Sequence'

export default class Io {

  constructor( socketIo ){
    this.io = socketIo;
    return this;
  }

  async get(){
    return this.io.get();
  }

  async initClientState( ioUser, requestState, setting ){
    const responseEmitState = Sequence.getResponseState( 'Emit', requestState, {user: {uid: ioUser.conn.id }, setting } );
    return this.io.emit( ioUser, Sequence.CATCH_ME_KEY, responseEmitState );
  }

  async find(ioUser, {requestState, thread, posts, user} ){
    const responseEmitState = Sequence.getResponseState( 'Emit', requestState, {thread, posts, user} );
    const responseBroadcastState = Sequence.getResponseState( 'Broadcast', requestState, {thread} );
    this.io.emit( ioUser, Sequence.CATCH_ME_KEY, responseEmitState );
    this.io.broadcast( responseBroadcastState.thread.connection, responseBroadcastState );
    return true;
  }

  async getMore(ioUser, {requestState, thread, posts, user} ){
    const responseEmitState = Sequence.getResponseState( 'Emit', requestState, {thread, posts, user} );
    this.io.emit( ioUser, Sequence.CATCH_ME_KEY, responseEmitState );
    return true;
  }

  async findMenuIndex(ioUser, {requestState, menuIndex} ){
    const responseEmitState = Sequence.getResponseState( 'Emit', requestState, {menuIndex} );
    this.io.emit( ioUser, Sequence.CATCH_ME_KEY, responseEmitState );
    return true;
  }

  async changeThread(ioUser, {requestState, thread, user} ){
    const responseEmitState = Sequence.getResponseState( 'Emit', requestState, {user} );
    const responseBroadcastState = Sequence.getResponseState( 'Broadcast', requestState, {thread} );
    this.io.emit( ioUser, Sequence.CATCH_ME_KEY, responseEmitState );
    this.io.broadcast( responseBroadcastState.thread.connection, responseBroadcastState );
    return true;
  }

  async post(ioUser, {requestState, posts, thread} ){
    const responseBroadcastState = Sequence.getResponseState( 'Broadcast', requestState, {posts, thread, menuIndex: posts } );
    let connections = posts[0].connections;
    let addConnections = [];

    connections.forEach( ( connection, i ) => {

      if( connection !== "/" ){ 
        // コネクションの最後の文字が/の場合
        if( ( connection.length - 1 ) === connection.lastIndexOf("/") ){
          // 最後の文字の/を取り除く
          const noSlashConnection = connection.slice( 0, -1 );
          if(!connections.includes(noSlashConnection)){
            addConnections.push( noSlashConnection ); 
          }
        }
      }
    });

    connections = [...connections, ...addConnections];
/*    
      .sort( (a,b) => b.length - a.length )
      .filter( (x, i, self) => self.indexOf(x) === i );
*/
    console.log(addConnections);
    console.log(connections);
    connections.forEach( ( connection ) => {
      responseBroadcastState.thread.connection = connection;
      this.io.broadcast( connection, responseBroadcastState );
    });

    return true;
  }

  async updateThreadServerMetas(ioUser, {requestState, thread} ){
    const responseEmitState = Sequence.getResponseState( 'Emit', requestState, {thread} );
    this.io.emit( ioUser, Sequence.CATCH_ME_KEY, responseEmitState );
    return true;
  }

  async saveOnWatchCnt( ioUser, {requestState, thread} ){
    const responseBroadcastState = Sequence.getResponseState( 'Broadcast', requestState, {thread} );
    return this.io.broadcast( responseBroadcastState.thread.connection, responseBroadcastState );
  }
}
