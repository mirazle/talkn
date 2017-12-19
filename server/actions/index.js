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

  initClientState: ( ioUser, requestState ) => {
    Logics.io.initClientState( ioUser, requestState );
    return true;
  },

  find: async ( ioUser, requestState ) => {
    Logics.request.get( requestState );
    await Logics.db.find( ioUser, state );
    await Logics.io.find( ioUser, state );
    return true;
  },

  post: ( ioUser, state ) => {
    return true;
  },

  disconnect: ( ioUser, state ) => {
    Actions.updateWatchCnt( state.connection, -1 );
  },
}
