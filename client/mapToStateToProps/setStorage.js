import define from 'common/define';
import TalknSession from 'client/operations/TalknSession';

export default {
  "SERVER_TO_CLIENT[EMIT]:initClientState" : ( state, props ) => {
    const { storageKey } = define;
    const { rootConnection } = state.app;
    TalknSession.setStorage( rootConnection, define.storageKey.app, state.app.toJSON() );
    TalknSession.setStorage( rootConnection, define.storageKey[ storageKey.postSingle ], [] );
    TalknSession.setStorage( rootConnection, define.storageKey[ storageKey.postMulti ], [] );
    return {state, props};
  },
  "SERVER_TO_CLIENT[EMIT]:getMore": setStorages,
  "SERVER_TO_CLIENT[EMIT]:find": setStorages,
  "SERVER_TO_CLIENT[EMIT]:changeThread": ( state, props ) => {
    const { app } = state;
    const { rootConnection } = app;
    const { storageKey } = define;
    const removePostKey = app.multistream ? storageKey.postSingle : storageKey.postMulti ;
    TalknSession.setStorage( rootConnection, define.storageKey[ removePostKey ], [] );
    return {state, props};
  },
  "UPDATE_APP": ( state, props ) => {
    const { rootConnection } = state.app;
    TalknSession.setStorage( rootConnection, define.storageKey.app, state.app.toJSON() );
    return {state, props};
  },
  "ON_CLICK_MENU": ( state, props ) => {
    const { rootConnection } = state.app;
    TalknSession.setStorage( rootConnection, define.storageKey.app, state.app );
    return {state, props};
  },
}

function setStorages( state, props ){
  const { app } = state;
  const { rootConnection } = app;
  const { storageKey } = define;
  const getPostKey = app.multistream ? storageKey.postMulti : storageKey.postSingle ;

  TalknSession.setStorage( rootConnection, define.storageKey.menuLogs, state.menuLogs.toJSON() );
  TalknSession.setStorage( rootConnection, define.storageKey[ getPostKey ], state.posts );
  return {state, props};
}