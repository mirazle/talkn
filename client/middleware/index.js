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
    action.app = {desc: action.thread.serverMetas.title};
    return action;
  },
  "SERVER_TO_CLIENT[BROADCAST]:post": ( store, action ) => {
    action.app = store.getState().app;
    action.setting = store.getState().setting;
    action.user = store.getState().user;
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
