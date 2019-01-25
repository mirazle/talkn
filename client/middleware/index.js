import Container from 'client/style/Container';
import define from 'common/define';
import App from 'common/schemas/state/App';
import User from 'common/schemas/state/User';

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
    action.user[`offset${action.user.dispThreadType}FindId`] = action.user.offsetFindId;
    action.app = store.getState().app;
    action.app.desc = action.thread.serverMetas.title
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
    return action;
  }, 
  "ON_CLICK_OTHER_THREAD":  (store, action) => {
    action.app = store.getState().app;
    return action;
  },
  "ON_CLICK_MENU": ( store, action ) => {
    action.app.desc = action.app.menuComponent;
    return action;
  },
  "ON_CLICK_MULTISTREAM": ( store, action ) => {
    action.app = store.getState().app;
    action.user = store.getState().user;
    action.user.dispThreadType = action.user.dispThreadType === User.dispThreadTypeMulti ?
      User.dispThreadTypeSingle : User.dispThreadTypeMulti ;
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