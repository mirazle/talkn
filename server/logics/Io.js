import Sequence from '~/../common/Sequence'

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
    return this.io.emit( ioUser, responseEmitState.type, responseEmitState );
  }

  async find(ioUser, {requestState, thread, posts, user} ){
    const responseEmitState = Sequence.getResponseState( 'Emit', requestState, {thread, posts, user} );
    return this.io.emit( ioUser, responseEmitState.type, responseEmitState );
  }

  async post(ioUser, {requestState, posts} ){
    const responseBroadcastState = Sequence.getResponseState( 'Broadcast', requestState, {posts} );
    // TODO responseBroadcastState.typeはconnectionじゃなくて良いの？
    return this.io.broadcast( responseBroadcastState.type, responseBroadcastState );
  }

  async updateWatchCnt( ioUser, {requestState, thread} ){
    const responseBroadcastState = Sequence.getResponseState( 'Broadcast', requestState, {thread} );
    return this.io.broadcast( responseBroadcastState.type, responseBroadcastState );
  }
}
