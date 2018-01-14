import Sequence from '~/../common/Sequence'

export default class Io {

  constructor( socketIo ){
    this.io = socketIo;
    return this;
  }

  async get(){
    return this.io.get();
  }

  async initClientState( ioUser, requestState ){
    const responseEmitState = Sequence.getResponseState( 'Emit', requestState, {user: {uid: ioUser.conn.id } } );
    return this.io.emit( ioUser, responseEmitState.type, responseEmitState );
  }

  async find(ioUser, {requestState, thread, posts} ){
    const responseEmitState = Sequence.getResponseState( 'Emit', requestState, {thread, posts} );
    return this.io.emit( ioUser, responseEmitState.type, responseEmitState );
  }

  async post(ioUser, {requestState, posts} ){
    const responseBroadcastState = Sequence.getResponseState( 'Broadcast', requestState, {posts} );
    return this.io.broadcast( responseBroadcastState.type, responseBroadcastState.posts );
  }

  async updateWatchCnt( response ){
    const key = response.connection;
    const state = {thread: {analyze: {watchCnt: response.watchCnt}}};
    return this.io.broadcast( key, state );
  }
}
