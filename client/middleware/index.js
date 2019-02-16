import Container from 'client/style/Container';
import define from 'common/define';
import App from 'common/schemas/state/App';
import User from 'common/schemas/state/User';
import Posts from 'common/schemas/state/Posts';
import Threads from 'common/schemas/state/Threads';

export default {
  updateAction: store => next => action => {

    if( functions[ action.type ] ){
      const state = store.getState();
      action = functions[ action.type ]( state, action );
    }
    next(action);
  }
};

const functions = {
  "CLIENT_TO_SERVER[EMIT]:changeThread": ( state, action ) => {
    action.user = state.user;
    action.user.offsetFindId = User.defaultOffsetFindId;
    action.user.offsetMultiFindId = User.defaultOffsetFindId;
    action.user.offsetSingleFindId = User.defaultOffsetFindId;
    action.user.offsetChildFindId = User.defaultOffsetFindId;
    action.user.offsetLogsFindId = User.defaultOffsetFindId;
    return action;
  },
  "SERVER_TO_CLIENT[EMIT]:find": ( state, action ) => {
    action = resolve.caseNoExistResponsePost(state, action);
    action.user[`offset${action.user.dispThreadType}FindId`] = action.user.offsetFindId;
    action.app = state.app;
    action.app.detailConnection = action.thread.connection;
    action.app.desc = action.thread.serverMetas.title;
    action = Posts.getAnyActionPosts(action);
    action.threads = Threads.getMergedThreads( state.threads, action.thread );
    action.threadDetail = action.thread;
    return action;
  },
  "SERVER_TO_CLIENT[BROADCAST]:post": ( state, action ) => {
    const app = state.app;
    if(define.APP_TYPES.EXTENSION === app.type && !app.isOpenMain){
      const transition = ( Container.transitionNotif * 4 ) + Container.transitionNotifDisp;
      talknAPI.extension("openNotif", {transition});
    }
    action.app = app;
    action.user = state.user;
    action = Posts.getAnyActionPosts(action);
    return action;
  }, 
  "SERVER_TO_CLIENT[EMIT]:getMore": ( state, action ) => {
    action.app = state.app;
    action.user = state.user;
    action.user.offsetFindId = User.getOffsetFindId({posts: action.posts});
    action.user[`offset${action.user.dispThreadType}FindId`] = action.user.offsetFindId;
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
    action.app = state.app;
    return action;
  },
  "ON_CLICK_TO_SINGLE_THREAD":  (state, action) => {
    action.app = state.app;
    return action;
  },
  "ON_CLICK_TO_CHILD_THREAD":  (state, action) => {
    action.app = state.app;
    action.user = state.user;
    action.postsChild = [];
    action.user.offsetFindId = User.defaultOffsetFindId;
    action.user.offsetChildFindId = User.defaultOffsetFindId;
    return action;
  },
  "ON_CLICK_TO_LOGS_THREAD":  (state, action) => {
    action.app = state.app;
    action.postsLogs = state.postsLogs;
    return action;
  },
  "ON_CLICK_MULTISTREAM": ( state, action ) => {
    return action;
  },  
  "ON_CLICK_MENU": ( state, action ) => {
    action.app.desc = action.app.menuComponent;
    return action;
  },
  "ON_TRANSITION": ( state, action ) => {
    action.app = {...state.app, ...action.app};
    action.user = state.user;
    return action;
  },
  "OFF_TRANSITION": ( state, action ) => {    
    action.app = {...state.app, ...action.app};
    return action;
  },
  "ON_TRANSITION_END": ( state, action ) => {
    action.app = {...state.app, ...action.app};
    action.app.height = App.getHeight();
    action.app.isOpenMain = App.getIsOpenMain( {}, action.app.type, action.app.height);
    return action;
  },
  "RESIZE_END_WINDOW": ( state, action ) => {
    action.user = state.user;
    return action;
  },
  "ON_CLICK_TOGGLE_DISP_MENU": ( state, action ) => {
    action.app = {...action.app, ...state.app};
    action.app.isOpenMenu = action.app.isOpenMenu ? false : true;
    return action;
  },
  "ON_CLICK_TOGGLE_DISP_DETAIL": ( state, action ) => {
    action.app = {...action.app, ...state.app};
    console.log(action);
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