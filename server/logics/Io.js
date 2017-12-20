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
    const responseEmitState = Sequence.getResponseState( 'Emit', requestState, ioUser.conn.id );
    return this.io.emit( ioUser, responseEmitState.type, responseEmitState );
  }

  async find(ioUser, {requestState, thread} ){
    const responseEmitState = Sequence.getResponseState( 'Emit', requestState, thread );
    return this.io.emit( ioUser, responseEmitState.type, responseEmitState );
  }

  async updateWatchCnt( response ){
    const key = response.connection;
    const state = {thread: {analyze: {watchCnt: response.watchCnt}}};
    return this.io.broadcast( key, state );
  }
}
