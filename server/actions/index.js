import Actions from '~/actions';
import Logics from '~/logics';

export default {

  setUp: async () => {
    await Logics.db.resetWatchCnt();
    return await Logics.db.findOneSetting();
  },

  getIo: async () => {
    return await Logics.io.get();
  },

  updateWatchCnt: async ( connection, cnt ) => {
    await Logics.db.updateIndex( connection, cnt );
    const response = await Logics.db.findOneIndex( connection, cnt );
    await Logics.io.updateWatchCnt( response );
    return true;
  },

  initClientState: async ( ioUser, state ) => {
    await Logics.db.updateIndex( state.get('connection'), 1 );
    const response = await Logics.db.findOneIndex( state.get('connection') );
    Logics.io.initClientState( ioUser, state, response );
    Logics.io.updateWatchCnt( response );
    return true;
  },

  getIndexPost: (ioUser, state, request) => {
    return true;
  },

  find: () => {
    return true;
  },

  post: () => {
    return true;
  },

  disconnect: (ioUser, state) => {
    Actions.updateWatchCnt( state.get('connection'), -1 );
  },
}
