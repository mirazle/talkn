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
    await Logics.db.updateThread( connection, cnt );
    const response = await Logics.db.findOneThread( connection, cnt );
    await Logics.io.updateWatchCnt( response );
    return true;
  },

  initClientState: ( ioUser, requestState ) => {
    Logics.io.initClientState( ioUser, requestState );
    return true;
  },

  find: async ( ioUser, requestState ) => {
    const {title, metas, links, h1s} = await Logics.html.get( requestState );
    const faviconName = Logics.favicon.getName( requestState, links );
    const favicon = await Logics.favicon.request( requestState, faviconName );
    const writeResult = await Logics.fs.write( faviconName, favicon );
    const thread = {title, metas, links, h1s, faviconName};
    await Logics.db.saveThread( requestState, thread );
    await Logics.io.find( ioUser, {requestState, thread} );
    return true;
  },

  post: ( ioUser, state ) => {
    return true;
  },

  disconnect: ( ioUser, state ) => {
    //Actions.updateWatchCnt( state.connection, -1 );
  },
}
