import Container from 'client/style/Container';
import define from 'common/define';
import App from 'common/schemas/state/App';
import User from 'common/schemas/state/User';
import Posts from 'common/schemas/state/Posts';
import Threads from 'common/schemas/state/Threads';

export default {
  updateAction: store => next => action => {

    if( functions[ action.type ] ){
      action = functions[ action.type ]( store, action );
    }
    next(action);
  }
};

const functions = {
  "CLIENT_TO_SERVER[EMIT]:changeThread": ( store, action ) => {
    action.user = store.getState().user;
    action.user.offsetFindId = User.defaultOffsetFindId;
    action.user.offsetMultiFindId = User.defaultOffsetFindId;
    action.user.offsetSingleFindId = User.defaultOffsetFindId;
    action.user.offsetChildFindId = User.defaultOffsetFindId;
    action.user.offsetLogsFindId = User.defaultOffsetFindId;
    return action;
  },
  "SERVER_TO_CLIENT[EMIT]:find": ( store, action ) => {
    action = resolve.caseNoExistResponsePost(store, action);
    action.user[`offset${action.user.dispThreadType}FindId`] = action.user.offsetFindId;
    action.app = store.getState().app;
    action.app.detailConnection = action.thread.connection;
    action.app.desc = action.thread.serverMetas.title;
    action = Posts.getAnyActionPosts(action);
    action.threads = Threads.getMergedThreads( store.getState().threads, action.thread );
    return action;
  },
  "SERVER_TO_CLIENT[BROADCAST]:post": ( store, action ) => {
    const app = store.getState().app;
    if(define.APP_TYPES.EXTENSION === app.type && !app.isOpenMain){
      const transition = ( Container.transitionNotif * 4 ) + Container.transitionNotifDisp;
      talknAPI.extension("openNotif", {transition});
    }
    action.app = app;
    action.user = store.getState().user;
    action = Posts.getAnyActionPosts(action);
    return action;
  }, 
  "SERVER_TO_CLIENT[EMIT]:getMore": ( store, action ) => {
    action.app = store.getState().app;
    action.user = store.getState().user;
    action.user.offsetFindId = User.getOffsetFindId({posts: action.posts});
    action.user[`offset${action.user.dispThreadType}FindId`] = action.user.offsetFindId;
    action = Posts.getAnyActionPosts(action);
    return action;
  },
  "SERVER_TO_CLIENT[EMIT]:changeThreadDetail": ( store, action ) => {
    action.app = store.getState().app;
    action.app.detailConnection = action.threads.connection;
    action.threads = Threads.getMergedThreads( store.getState().threads, action.threads );
    return action;
  },
  "ON_CLICK_TO_MULTI_THREAD":  (store, action) => {
    action.app = store.getState().app;
    return action;
  },
  "ON_CLICK_TO_SINGLE_THREAD":  (store, action) => {
    action.app = store.getState().app;
    return action;
  },
  "ON_CLICK_TO_CHILD_THREAD":  (store, action) => {
    action.app = store.getState().app;
    action.user = store.getState().user;
    action.postsChild = [];
    action.user.offsetFindId = User.defaultOffsetFindId;
    action.user.offsetChildFindId = User.defaultOffsetFindId;
    return action;
  },
  "ON_CLICK_TO_LOGS_THREAD":  (store, action) => {
    action.app = store.getState().app;
    action.postsLogs = store.getState().postsLogs;
    return action;
  },
  "ON_CLICK_MULTISTREAM": ( store, action ) => {
    return action;
  },  
  "ON_CLICK_MENU": ( store, action ) => {
    action.app.desc = action.app.menuComponent;
    return action;
  },
  "ON_TRANSITION": ( store, action ) => {
    action.app = {...store.getState().app, ...action.app};
    action.user = store.getState().user;
    return action;
  },
  "OFF_TRANSITION": ( store, action ) => {    
    action.app = {...store.getState().app, ...action.app};
    return action;
  },
  "ON_TRANSITION_END": ( store, action ) => {
    action.app = {...store.getState().app, ...action.app};
    action.app.height = App.getHeight();
    action.app.isOpenMain = App.getIsOpenMain( {}, action.app.type, action.app.height);
    return action;
  },
  "RESIZE_END_WINDOW": ( store, action ) => {
    action.user = store.getState().user;
    return action;
  },
  "ON_CLICK_TOGGLE_DISP_MENU": ( store, action ) => {
    action.app = {...action.app, ...store.getState().app};
    action.app.isOpenMenu = action.app.isOpenMenu ? false : true;
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