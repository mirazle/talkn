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

  initClientState: async ( sequence, ioUser, state ) => {
    Logics.io.initClientState( sequence, ioUser, state );
    return true;
  },


  find: () => {
    return true;
  },

  post: () => {
    return true;
  },

  disconnect: ( sequence, ioUser, state ) => {
    Actions.updateWatchCnt( state.connection, -1 );
  },
}
