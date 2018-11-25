export default {
  updateAction: store => next => action => {

    if( functions[ action.type ] ){
      action = functions[ action.type ]( store, action );
    }
    next(action);
  }
};

const functions = {
  "SERVER_TO_CLIENT[EMIT]:find": ( store, action ) => {
    action = resolve.caseNoExistResponsePost(store, action);
    action.app = store.getState().app;
    action.user.isRootConnection = action.app.rootConnection === action.thread.connection;
    action.app.desc = action.thread.serverMetas.title
    return action;
  },
  "SERVER_TO_CLIENT[BROADCAST]:post": ( store, action ) => {
    action.app = store.getState().app;
    action.user = store.getState().user;
    return action;
  }, 
  "ON_CLICK_OTHER_THREAD":  (store, action) => {
    action.app = store.getState().app;
    action.user.isRootConnection = action.app.rootConnection === action.thread.connection;
    return action;
  },
  "ON_CLICK_MENU": ( store, action ) => {
    action.app.desc = action.app.menuComponent;
    return action;
  },
  "ON_CLICK_MULTISTREAM": ( store, action ) => {

    return action;
  },
  "ON_TRANSITION": ( store, action ) => {
    action.app = {...store.getState().app, ...action.app};
    return action;
  },
  "OFF_TRANSITION": ( store, action ) => {    
    action.app = {...store.getState().app, ...action.app};
    return action;
  },
  "ON_CLICK_TOGGLE_DISP_DETAIL": ( store, action ) => {
    action.app = {...action.app, ...store.getState().app};
    return action;
  },
}

const resolve = {
  caseNoExistResponsePost: (store, action) => {
    if(action.posts.length === 0){
      action.posts = store.getState().posts;
      action.existResponsePostFlg = false;
    }else{
      action.existResponsePostFlg = true;
    }
    return action;
  }
}