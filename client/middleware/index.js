import Container from 'client/style/Container';
import storage from 'client/mapToStateToProps/storage';
import Schema from 'common/schemas/Schema';
import Sequence from 'common/Sequence';
import conf from 'common/conf';
import util from 'common/util';
import App from 'common/schemas/state/App';
import Posts from 'common/schemas/state/Posts';
import Thread from 'common/schemas/state/Thread';
import Threads from 'common/schemas/state/Threads';
import TalknAPI from '../operations/TalknAPI';

export default {
  updateAction: store => next => action => {
    
    const state = store.getState();

    if( functions[ action.type ] ){
      action = functions[ action.type ]( state, action );
    }

    if( action ){
      if(!action.app) action.app = state.app;
      action.app.actioned = action.type;
    }

    if(action){
      next(action);
    }
  }
};

const functions = {
  'SERVER_TO_CLIENT[BROADCAST]:find': ( state, action ) => {
    action.app = state.app;
    return action;
  },
  'SERVER_TO_CLIENT[BROADCAST]:changeThread': ( state, action ) => {
    action.app = state.app;
    return action;
  },
  'SERVER_TO_CLIENT[BROADCAST]:disconnect': ( state, action ) => {
    action.app = state.app;
    return action;
  },
  "SERVER_TO_CLIENT[EMIT]:updateThread": ( state, action ) => {
    action.threads = Threads.getMergedThreads( state.threads, action.thread );
    action.threadDetail = {...action.thread};
    return action;
  },
  "SERVER_TO_CLIENT[EMIT]:find": ( state, action ) => {
    action = resolve.caseNoExistResponsePost(state, action);
    action.app = {...state.app, ...action.app};
    action.app[`offset${action.app.dispThreadType}FindId`] = action.app.offsetFindId;
    action.app.detailConnection = action.thread.connection;
    action.app.desc = action.thread.serverMetas.title;
    action.app.isRootConnection = action.app.rootConnection === action.thread.connection;
    action.app.isMediaConnection = App.getIsMediaConnection( action.thread.connection );

    action = Posts.getAnyActionPosts(action);
    action.thread.title = action.thread.serverMetas.title;
    action.thread.hasSlash = Schema.getBool( action.thread.hasSlash );
    action.threads = Threads.getMergedThreads( state.threads, action.thread );
    action.threadDetail = {...action.thread};
    //.action.threadDetail.serverMetas = {...action.thread};

    if( action.app.isRootConnection ) action.app.rootTitle = action.thread.title;

    if( !action.app.isLinkConnection ){
      switch(action.app.extensionMode){
      case App.extensionModeExtBottomLabel:
        if( !action.app.isOpenPosts && !action.app.isDispPosts ){
          const transition = ( Container.transitionNotif * 4 ) + Container.transitionNotifDisp;
          talknWindow.parentTo("openNotif", {transition});
        }
        break;
      case App.extensionModeExtModalLabel:
        if( action.posts.length > 0 ){
          const id = action.posts[ action.posts.length - 1 ]['_id'];
          const post = action.posts[ action.posts.length - 1 ]['post'];
          const stampId = action.posts[ action.posts.length - 1 ]['stampId'];
          let favicon = action.posts[ action.posts.length - 1 ]['favicon'];
          favicon = Sequence.HTTPS_PROTOCOL + "//" + conf.assetsIconPath + util.getSaveFaviconName( favicon );
          talknWindow.parentTo("openNotif", {id, post, stampId, favicon, addUnreadCnt: action.posts.length });
        }
        break;
      }
    }

    if( action.app.isMediaConnection ){
      const src = App.getMediaSrc( action.thread.protocol, action.thread.connection );
      action.app.connectionType = App.getMediaTypeFromSrc( src );
      action = Posts.getAnyActionPosts(action);
      action = storage.setStoragePostsTimeline( action );
    }else{
      action.app.connectionType = App.mediaTagTypeNo;
    }

    return action;
  },
  "CLIENT_TO_SERVER[EMIT]:changeThread": ( state, action ) => {
    action.app = action.app ? {...state.app, ...action.app} : state.app;
    action.app.offsetFindId = App.defaultOffsetFindId;
    action.app.offsetTimelineFindId = App.defaultOffsetFindId;
    action.app.offsetMultiFindId = App.defaultOffsetFindId;
    action.app.offsetSingleFindId = App.defaultOffsetFindId;
    action.app.offsetChildFindId = App.defaultOffsetFindId;
    action.app.offsetLogsFindId = App.defaultOffsetFindId;
    action.thread = action.thread ? {...state.thread, ...action.thread} : state.thread;
    return action;
  },
  "CLOSE_LINKS": ( state, action ) => {
    action.app = action.app ? {...state.app, ...action.app} : state.app;
    action.thread = action.thread ? {...state.thread, ...action.thread} : state.thread;
    return action;
  },
  "SERVER_TO_CLIENT[BROADCAST]:post": ( state, action ) => {
    const { app, user } = state;
    const postLength = action.posts.length - 1;
    action.app = app;
    action.app.inputStampId = 0;
    action.user = user;

    const emotionKeys = Object.keys( action.thread.emotions );

    if( action.thread.connection === action.posts[ postLength ].connection && emotionKeys.length > 0 ){

      const actionEmotions = { ...action.thread.emotions };
      action.thread.emotions = {...state.thread.emotions};

      Object.keys( actionEmotions ).forEach( ( emotionModelKey ) => {
        Object.keys( actionEmotions[ emotionModelKey ] ).forEach( ( emotionKey ) => {
          action.thread.emotions[ emotionModelKey ][ emotionKey ] = 
            action.thread.emotions[ emotionModelKey ][ emotionKey ] + actionEmotions[ emotionModelKey ][ emotionKey ];
        });
      });

    }else{
      action.thread.emotions = state.thread.emotions;
    }

    switch(action.app.extensionMode){
    case App.extensionModeExtBottomLabel:
      if( !action.app.isOpenPosts && !action.app.isDispPosts ){
        const transition = ( Container.transitionNotif * 4 ) + Container.transitionNotifDisp;
        talknWindow.parentTo("openNotif", {transition});
      }
      break;
    case App.extensionModeExtModalLabel:
      if( action.posts.length > 0 ){
        const id = action.posts[ postLength ]['_id'];
        const post = action.posts[ postLength ]['post'];
        const stampId = action.posts[ postLength ]['stampId'];
        let favicon = action.posts[ postLength ]['favicon'];
        favicon = Sequence.HTTPS_PROTOCOL + "//" + conf.assetsIconPath + util.getSaveFaviconName( favicon );
        talknWindow.parentTo("openNotif", {id, post, stampId, favicon, addUnreadCnt: action.posts.length });
      }
      break;
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
    action.app.detailConnection = action.thread.connection;
    action.threads = Threads.getMergedThreads( state.threads, action.thread );
    action.threadDetail = {...action.thread};

    // TODO 古い仕様だとhasSlashが格納されていないcollectionが存在する
    // hasSlashはlocationが参照できないPORTALだと正しい値を取得出来ないため、
    // 拡張機能ではGET_CLIENT_METASを実行して正しい値をサーバーに渡して更新してやる必要がある。
    action.threadDetail.hasSlash = action.threadDetail.hasSlash === null ?
      true : action.threadDetail.hasSlash;
    return action;
  },
  "NEXT_POSTS_TIMELINE": ( state, action ) => {
    const { app } = state;
    switch(app.extensionMode){
    case App.extensionModeExtBottomLabel:
      if( !app.isOpenPosts && !app.isDispPosts ){
        const transition = ( Container.transitionNotif * 4 ) + Container.transitionNotifDisp;
        talknWindow.parentTo("openNotif", {transition});
      }
      break;
    case App.extensionModeExtModalLabel:
      const postsTimelineLength = action.postsTimeline.length;
      if( postsTimelineLength > 0 ){
        const id = action.postsTimeline[ postsTimelineLength - 1 ]['_id'];
        const post = action.postsTimeline[ postsTimelineLength - 1 ]['post'];
        const stampId = action.postsTimeline[ postsTimelineLength - 1 ]['stampId'];
        let favicon = action.postsTimeline[ postsTimelineLength - 1 ]['favicon'];
        favicon = Sequence.HTTPS_PROTOCOL + "//" + conf.assetsIconPath + util.getSaveFaviconName( favicon );
        talknWindow.parentTo("openNotif", {id, post, stampId, favicon, addUnreadCnt: postsTimelineLength });
      }
      break;
    }
    
    return action;
  },
  "ON_CLICK_TO_MULTI_THREAD":  (state, action) => {
    action.app = state.app;
    action.app.isLinkConnection = false;
    action.app.isRootConnection = action.thread.connection === state.app.rootConnection;

    if( state.threads[ action.thread.connection ] ){
      action.thread = state.threads[ action.thread.connection ];
    }else{
      action.thread = {...state.thread, ...action.thread};
    }

    return action;
  },
  "ON_CLICK_TO_TIMELINE_THREAD":  (state, action) => {
    const connection = action.thread.connection;
    action.thread = {...state.thread, ...action.thread};
    action.thread.connection = connection;    
    const src = App.getMediaSrc( action.thread.protocol, action.thread.connection );
    action.thread.findType = Thread.getFindTypeFromSrc( src );
    action.postsTimeline = [];
    action.app.isMediaConnection = true;
    action.app.offsetFindId = App.defaultOffsetFindId;
    action.app.offsetChildFindId = App.defaultOffsetFindId;
    return action;
  },
  "ON_CLICK_TO_SINGLE_THREAD":  (state, action) => {
    action.thread = {...state.thread, ...action.thread};
    action.app = state.app;
    action.app.isLinkConnection = false;
    return action;
  },
  "ON_CLICK_TO_CHILD_THREAD":  (state, action) => {
    action.thread = {...state.thread, ...action.thread};
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
  "TOGGLE_DISP_POSTS_SUPPORTER": ( state, action ) => {
    state.app.isOpenPostsSupporter = !state.app.isOpenPostsSupporter;
    return action;
  },
  "TOGGLE_LINKS": ( state, action ) => {
    state.app.isOpenLinks = !state.app.isOpenLinks;
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
  "ON_CLICK_TOGGLE_MAIN": ( state, action ) => {
    action.app.isOpenPosts = action.app.isOpenPosts ?
      action.app.isOpenPosts : App.getIsOpenPosts( action.app );
    return action;
  },
  "OFF_TRANSITION": ( state, action ) => {    
    action.app = {...state.app, ...action.app};
    action.app.height = App.getHeight();
    action.app.isOpenPosts = action.app.isOpenPosts ?
      action.app.isOpenPosts : App.getIsOpenPosts( action.app );
    return action;
  },
  "ON_TRANSITION": ( state, action ) => {
    action.app = {...state.app, ...action.app};
    return action;
  },

  "ON_TRANSITION_END": ( state, action ) => {
    action.app = {...state.app, ...action.app};
    action.app.height = App.getHeight();
    action.app.isOpenPosts = App.getIsOpenPosts( action.app );
    return action;
  },
  "RESIZE_END_WINDOW": ( state, action ) => {
    action.thread = state.thread;
    action.app = {...state.app, ...action.app};
    action.app.isOpenPosts = App.getIsOpenPosts( action.app );
    return action;
  },
  "ON_CLICK_TOGGLE_DISP_MENU": ( state, action ) => {
    action.app = {...action.app, ...state.app};
    action.app.isOpenMenu = !action.app.isOpenMenu;
    return action;
  },
  "ON_CLICK_TOGGLE_DISP_DETAIL": ( state, action ) => {
    action.app = state.app;
    action.app.detailConnection = action.thread.connection;
    action.threads = Threads.getMergedThreads( state.threads, action.thread );
    action.threadDetail = {...action.thread};

    // TODO 古い仕様だとhasSlashが格納されていないcollectionが存在する
    // hasSlashはlocationが参照できないPORTALだと正しい値を取得出来ないため、
    // 拡張機能ではGET_CLIENT_METASを実行して正しい値をサーバーに渡して更新してやる必要がある。
    action.threadDetail.hasSlash = action.threadDetail.hasSlash === null ?
      true : action.threadDetail.hasSlash;
    return action;
  },
  "TOGGLE_DISP_BOARD": ( state, action ) => {
    action.app = {...action.app, ...state.app};
    action.app.isOpenBoard = !state.app.isOpenBoard;
    return action;
  },
  "TOGGLE_BUBBLE_POST": ( state, action ) => {
    action.app = {...action.app, ...state.app};
    action.app.isBubblePost = !state.app.isBubblePost;
    action.thread = state.thread;
    return action;
  },
  "OPEN_NOTIF": ( state, action ) => {
    action.app = {...state.app, ...action.app};
    return action;
  },
  "CLOSE_NOTIF": ( state, action ) => {
    action.app = {...state.app, ...action.app};
    return action;
  },
  "START_DISP_POSTS": ( state, action ) => {
    action.app = {...state.app, ...action.app};
    return action;
  },
  "START_UNDISP_POSTS": ( state, action ) => {
    action.app = {...state.app, ...action.app};
    return action;
  },
  "START_LINK_MEDIA": ( state, action ) => {
    action.app = {...state.app};
    action.app.isLinkConnection = true;
    return action;
  },
  "GET_CLIENT_METAS": ( state, action ) => {
    let updateFlg = false;
    let { clientMetas } = action; 
    let { serverMetas } = state.thread;
    action.thread = {};

    // Metas
    Object.keys( clientMetas ).forEach( ( key, i ) => {

      if( 
        clientMetas[ key ] &&
        clientMetas[ key ] !== "" &&
        serverMetas[ key ] !== clientMetas[key] 
      ){
        if( !action.thread.serverMetas ){
          action.thread.serverMetas = {};
        }
        updateFlg = true;
        action.thread.serverMetas[ key ] = clientMetas[ key ];
      }
    } );

    if( updateFlg ){
      action.threadDetail = {...state.threadDetail};
      action.threadDetail.serverMetas = {...action.threadDetail.serverMetas, ...action.thread.serverMetas};
      return action;
    }
  }
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
