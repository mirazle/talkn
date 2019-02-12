import define from 'common/define';
import User from 'common/schemas/state/User';
import TalknSession from 'client/operations/TalknSession';

export default {
  "SERVER_TO_CLIENT[EMIT]:initClientState" : ( state, props ) => {
    const { storageKey } = define;
    const { rootConnection } = state.app;
//    TalknSession.setStorage( rootConnection, define.storageKey[ storageKey.postSingle ], [] );
//    TalknSession.setStorage( rootConnection, define.storageKey[ storageKey.postMulti ], [] );
    return {state, props};
  },
  "SERVER_TO_CLIENT[BROADCAST]:post": setStoragePosts,
  "SERVER_TO_CLIENT[EMIT]:getMore": setStoragePosts,
  "SERVER_TO_CLIENT[EMIT]:find": ( state, props ) => {
    setStoragePosts( state, props );
    return {state, props}
  },
  "SERVER_TO_CLIENT[EMIT]:changeThread": ( state, props ) => {
    const { app, user } = state;
    const { rootConnection } = app;
    const { storageKey } = define;
    const postKey = user.dispThreadType === User.dispThreadTypeMulti ? storageKey.postSingle : storageKey.postMulti ;
    TalknSession.setStorage( rootConnection, define.storageKey[ postKey ], [] );
    return {state, props};
  },
  "ON__CLICK_MULTISTREAM": setStoragePosts,
  "ON_CLICK_FOOTER_ICON": ( state, props ) => {
    const { rootConnection } = state.app;
    TalknSession.setStorage( rootConnection, define.storageKey.app, state.app.toJSON() );
    return {state, props};
  },
  "ON_CLICK_MENU": ( state, props ) => {
    const { rootConnection } = state.app;
    TalknSession.setStorage( rootConnection, define.storageKey.app, state.app );
    return {state, props};
  }
}

function setStoragePosts( state, props ){
  const { app, thread } = state;
  if( app.rootConnection === thread.connection ){
    const { postsMulti, postsSingle } = state;
    const { storageKey } = define;
    TalknSession.setStorage( app.rootConnection, storageKey.postsMulti, postsMulti );
    TalknSession.setStorage( app.rootConnection, storageKey.postsSingle, postsSingle );
  }
  return {state, props};
}
