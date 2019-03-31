import define from 'common/define';
import App from 'common/schemas/state/App';
import TalknSession from 'client/operations/TalknSession';

export default {
  "SERVER_TO_CLIENT[BROADCAST]:post": setStoragePosts,
  "SERVER_TO_CLIENT[EMIT]:getMore": setStoragePosts,
  "SERVER_TO_CLIENT[EMIT]:find": ( state, props ) => {
    setStoragePosts( state, props );
    return {state, props}
  },
  "SERVER_TO_CLIENT[EMIT]:changeThread": ( state, props ) => {
    const { app } = state;
    const { rootConnection } = app;
    const { storageKey } = define;
    const postKey = app.dispThreadType === App.dispThreadTypeMulti ? storageKey.postSingle : storageKey.postMulti ;
    TalknSession.setStorage( rootConnection, define.storageKey[ postKey ], [] );
    return {state, props};
  },
  "ON__CLICK_MULTISTREAM": setStoragePosts,
  "ON_CLICK_FOOTER_ICON": ( state, props ) => {
    const { rootConnection } = state.app;
    TalknSession.setStorage( rootConnection, define.storageKey.app, state.app.toJSON() );
    return {state, props};
  },
  "ON_CLICK_TOGGLE_DISP_MENU": ( state, props ) => {
    const { app } = state; 
    if( app.screenMode === App.screenModeSmallLabel ){
      if( !app.isOpenMenu ){
        talknWindow.unlockWindow();
        window.scrollTo(0, app.threadScrollY);
      }
    }
    return {state, props};
  },
  "ON_CLICK_TOGGLE_MAIN": ( state, props ) => {
    const { app } = state; 
    console.log("A");

    if( app.type === define.APP_TYPES.EXTENSION ){
      if( app.isOpenMain ){
        console.log("UNLOCK");
        talknWindow.unlockWindow();
      }else{
        console.log("LOCK");
        talknWindow.lockWindow();
      }
    }
    return {state, props};
  },
  "ON_CLICK_MENU": ( state, props ) => {
    const { rootConnection } = state.app;
    TalknSession.setStorage( rootConnection, define.storageKey.app, state.app );
    return {state, props};
  },
  "RESIZE_END_WINDOW": ( state, props ) => {
    return {state, props}
  }
}

function setStoragePosts( state, props ){
  const { app } = state;
  if( app.isRootConnection ){
    const { postsMulti, postsSingle } = state;
    const { storageKey } = define;
    TalknSession.setStorage( app.rootConnection, storageKey.postsMulti, postsMulti );
    TalknSession.setStorage( app.rootConnection, storageKey.postsSingle, postsSingle );
  }
  return {state, props};
}
