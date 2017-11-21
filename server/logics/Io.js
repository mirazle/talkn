import {c} from '~/utils';

export default class Io {

  constructor( socketIo ){
    this.io = socketIo;
    return this;
  }

  async get(){
    return this.io.get();
  }

  async initClientState( ioUser, state, response ){
    const key = response.connection;
    state.get('thread').get('analyze').set('watchCnt',response.watchCnt);
    return this.io.emit( ioUser, key, state );
  }

  async updateWatchCnt( response ){
    const key = response.connection;
    const state = {thread: {analyze: {watchCnt: response.watchCnt}}};
    return this.io.broadcast( key, state );
  }
}
