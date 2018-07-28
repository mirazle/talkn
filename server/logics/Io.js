import conf from '~/common/conf';
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

  async findMenuIndex(ioUser, {requestState, menuIndex} ){
    const responseEmitState = Sequence.getResponseState( 'Emit', requestState, {menuIndex} );
    this.io.emit( ioUser, Sequence.CATCH_ME_KEY, responseEmitState );
    return true;
  }

  async changeThread(ioUser, {requestState, thread} ){
    const responseBroadcastState = Sequence.getResponseState( 'Broadcast', requestState, {thread} );
    this.io.broadcast( responseBroadcastState.thread.connection, responseBroadcastState );
    return true;
  }

  async post(ioUser, {requestState, posts, thread} ){
    const responseBroadcastState = Sequence.getResponseState( 'Broadcast', requestState, {posts, thread, menuIndex: posts } );
    requestState.thread.connections.forEach( ( connection ) => {
      this.io.broadcast( connection, responseBroadcastState );
    });
    return true;
  }

  async updateThreadServerMetas(ioUser, {requestState, thread} ){
    const responseEmitState = Sequence.getResponseState( 'Emit', requestState, {thread} );
    this.io.emit( ioUser, Sequence.CATCH_ME_KEY, responseEmitState );
    return true;
  }

  async updateWatchCnt( ioUser, {requestState, thread} ){
    const responseBroadcastState = Sequence.getResponseState( 'Broadcast', requestState, {thread} );
    return this.io.broadcast( responseBroadcastState.thread.connection, responseBroadcastState );
  }
}
