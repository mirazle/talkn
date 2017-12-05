import {c} from '~/utils';

export default class Io {

  constructor( socketIo ){
    this.io = socketIo;
    return this;
  }

  async get(){
    return this.io.get();
  }

  async initClientState( sequence, ioUser, state ){
    state.user.id = ioUser.conn.id;
    return this.io.emit( ioUser, 'catchResponse', state );
  }

  async updateWatchCnt( response ){
    const key = response.connection;
    const state = {thread: {analyze: {watchCnt: response.watchCnt}}};
    return this.io.broadcast( key, state );
  }
}
