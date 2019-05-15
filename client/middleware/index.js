import Container from 'client/style/Container';
import define from 'common/define';
import App from 'common/schemas/state/App';
import Posts from 'common/schemas/state/Posts';
import Threads from 'common/schemas/state/Threads';

export default {
  updateAction: store => next => action => {

    if( functions[ action.type ] ){
      const state = store.getState();
      action = functions[ action.type ]( state, action );
      if(!action.app) action.app = state.app;
      if(!action.app.actioned) action.app.actioned = state.app.actioned;
      action.app.actioned.unshift(action.type);
    }
    next(action);
  }
};

const functions = {
  'SERVER_TO_CLIENT[BROADCAST]:find': ( state, action ) => {
    action.app = state.app;
    return action;
  },
  'SERVER_TO_CLIENT[BROADCAST]:changeThread': ( state, action ) => {
    action.app = state.app;
    console.log(action);
    return action;
  },
  'SERVER_TO_CLIENT[BROADCAST]:disconnect': ( state, action ) => {
    action.app = state.app;
    return action;
  },
  "SERVER_TO_CLIENT[EMIT]:find": ( state, action ) => {
    action = resolve.caseNoExistResponsePost(state, action);
    action.app = {...state.app, ...action.app};
    action.app[`offset${action.app.dispThreadType}FindId`] = action.app.offsetFindId;
    action.app.detailConnection = action.thread.connection;
    action.app.desc = action.thread.serverMetas.title;
    action.app.isRootConnection = action.app.rootConnection === action.thread.connection;
    action = Posts.getAnyActionPosts(action);
    action.threads = Threads.getMergedThreads( state.threads, action.thread );
    action.threadDetail = action.thread;
    return action;
  },
  "CLIENT_TO_SERVER[EMIT]:changeThread": ( state, action ) => {
    action.app = {...state.app, ...action.app};
    action.app.offsetFindId = App.defaultOffsetFindId;
    action.app.offsetMultiFindId = App.defaultOffsetFindId;
    action.app.offsetSingleFindId = App.defaultOffsetFindId;
    action.app.offsetChildFindId = App.defaultOffsetFindId;
    action.app.offsetLogsFindId = App.defaultOffsetFindId;
    return action;
  },
  "SERVER_TO_CLIENT[BROADCAST]:post": ( state, action ) => {
    const app = state.app;
    action.app = app;
    if(define.APP_TYPES.EXTENSION === app.type && !app.isOpenPosts){
      action.app.isOpenNotif = true;
      const transition = ( Container.transitionNotif * 4 ) + Container.transitionNotifDisp;
      talknAPI.extension("openNotif", {transition});
    }
    action = Posts.getAnyActionPosts(action);
    return action;
  }, 
  "SERVER_TO_CLIENT[EMIT]:getMore": ( state, action ) => {
    action.app.offsetFindId = App.getOffsetFindId({posts: action.posts});
    action.app[`offset${action.app.dispThreadType}FindId`] = action.app.offsetFindId;
    action = Posts.getAnyActionPosts(action);
    return action;
  },
  "SERVER_TO_CLIENT[EMIT]:changeThreadDetail": ( state, action ) => {
    action.app = state.app;
    action.threads = Threads.getMergedThreads( state.threads, action.thread );
    action.threadDetail = action.thread;
    delete action.thread;
    return action;
  },
  "ON_CLICK_TO_MULTI_THREAD":  (state, action) => {
    return action;
  },
  "ON_CLICK_TO_SINGLE_THREAD":  (state, action) => {
    return action;
  },
  "ON_CLICK_TO_CHILD_THREAD":  (state, action) => {
    action.postsChild = [];
    action.app.offsetFindId = App.defaultOffsetFindId;
    action.app.offsetChildFindId = App.defaultOffsetFindId;
    return action;
  },
  "ON_CLICK_TO_LOGS_THREAD":  (state, action) => {
    action.app = state.app;
    action.postsLogs = state.postsLogs;
    return action;
  },
  "ON_CLICK_TOGGLE_MAIN": ( state, action ) => {
    action.app.isOpenPosts = action.app.isOpenPosts ?
      action.app.isOpenPosts : App.getIsOpenPosts( action.app );
    return action;
  },
  "ON_CLICK_MENU": ( state, action ) => {
    action.app.desc = action.app.menuComponent;
    return action;
  },
  "ON_CLICK_OPEN_LOCK_MENU": ( state, action ) => {
    action.app = {...state.app, ...action.app};
    return action;
  },
  "ON_CLICK_FOOTER_ICON": ( state, action ) => {
    action.app = {...state.app, ...action.app};
    action.app.height = App.getHeight();
    action.app.isOpenPosts = action.app.isOpenPosts ?
      action.app.isOpenPosts : App.getIsOpenPosts( action.app, action.type );
    return action;
  },
  "ON_TRANSITION": ( state, action ) => {
    action.app = {...state.app, ...action.app};
    return action;
  },
  "OFF_TRANSITION": ( state, action ) => {    
    action.app = {...state.app, ...action.app};
    action.app.height = App.getHeight();
    action.app.isOpenPosts = action.app.isOpenPosts ?
      action.app.isOpenPosts : App.getIsOpenPosts( action.app );
    return action;
  },
  "ON_TRANSITION_END": ( state, action ) => {
    action.app = {...state.app, ...action.app};
    action.app.height = App.getHeight();
    action.app.isOpenPosts = App.getIsOpenPosts( action.app );
    return action;
  },
  "ON_CLICK_TOGGLE_DISP_MENU": ( state, action ) => {
    action.app = {...action.app, ...state.app};
    action.app.isOpenMenu = action.app.isOpenMenu ? false : true;
    return action;
  },
  "ON_CLICK_TOGGLE_DISP_DETAIL": ( state, action ) => {
    action.app = {...action.app, ...state.app};
 //   action.app.isOpenDetail = action.app.isOpenDetail ? false : true;
    return action;
  },
}

const resolve = {
  caseNoExistResponsePost: (state, action) => {
    if(action.posts.length === 0){
      action.posts = state.posts;
      action.existResponsePostFlg = false;
    }else{
      action.existResponsePostFlg = true;
    }
    return action;
  }
}