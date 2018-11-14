import define from 'common/define';
import TalknSession from 'client/operations/TalknSession';

export default {
  updateDesc: store => next => action => {

    if( functions[ action.type ] ){
      action= functions[ action.type ]( store, action );
    }
    next(action);
  }
};


const functions = {
  "SERVER_TO_CLIENT[EMIT]:find": ( store, action ) => {

    if(action.posts.length === 0){
      // Update menuIndex
      action.posts = store.getState().posts;
      action.existResponsePost = false;
    }else{
      action.existResponsePost = true;
    }

    action.app = store.getState().app;
    action.app.desc = action.thread.serverMetas.title
    return action;
  },
  "SERVER_TO_CLIENT[BROADCAST]:post": ( store, action ) => {
    action.app = store.getState().app;
    action.user = store.getState().user;
    //action.posts = store.getState().posts;
    return action;
  }, 
  "ON_CLICK_MENU": ( store, action ) => {
    return {...action,
      app: {...action.app,
        desc: action.app.menuComponent
      }
    }
  },
  "ON_CLICK_TOGGLE_DISP_DETAIL": ( store, action ) => {
    return action;
  },
}
