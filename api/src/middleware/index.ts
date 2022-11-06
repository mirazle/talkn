import Schema from 'common/Schema';

import storage from 'api/mapToStateToProps/storage';
import App from 'api/store/App';
import Posts from 'api/store/Posts';
import Thread from 'api/store/Thread';
import Threads from 'api/store/Threads';

export default {
  updateAction: (store) => (next) => (action) => {
    const state = store.getState();
    if (action) {
      action.app = action.app ? { ...state.app, ...action.app } : state.app;
      action.app.actioned = action.type;
    }

    if (functions[action.type]) {
      action = functions[action.type](state, action);
    }
    if (action) {
      next(action);
    }
  },
};

const functions = {
  'SERVER_TO_API[EMIT]:tune': (state, action) => {
    action.app[`offset${action.app.dispThreadType}FindId`] = action.app.offsetFindId;
    action.app.rootCh = action.thread.ch;
    action.app.tunedCh = action.thread.ch; // changeThreadの際の接続していた古いスレッドのCH(liveCntをデクリメントする用途)として保持
    action.app.detailCh = action.thread.ch;
    action.app.isTune = true;
    action.app.isRootCh = action.app.rootCh === action.thread.ch;
    action.app.isMediaCh = App.getIsMediaCh(action.thread.ch);
    action.app.dispThreadType = action.app.isMediaCh ? App.dispThreadTypeTimeline : App.dispThreadTypeMulti;
    action.app.isToggleMultistream = false;
    action.thread.title = action.thread.serverMetas['title'];
    action.thread.hasSlash = Schema.getBool(action.thread.hasSlash);
    action.threads = Threads.getMergedThreads(state.threads, action.thread);
    action.threadDetail = { ...action.thread };
    if (action.app.isRootCh) {
      action.app.rootTitle = action.thread.title;
    }
    if (action.app.isMediaCh) {
      const src = App.getMediaSrc(action.thread.protocol, action.thread.ch);
      action.app.chType = App.getMediaTypeFromSrc(src);
    } else {
      action.app.chType = App.mediaTagTypeNo;
    }

    return action;
  },
  'SERVER_TO_API[EMIT]:fetchPosts': (state, action) => {
    action.app.dispThreadType = action.app.isMediaCh ? App.dispThreadTypeTimeline : App.dispThreadTypeMulti;
    action.app.offsetFindId = App.getOffsetFindId({ posts: action.posts });
    action.app[`offset${action.app.dispThreadType}FindId`] = action.app.offsetFindId;
    action = { ...Posts.getAnyActionPosts(action, state) };
    if (action.app.isMediaCh) {
      action = storage.setStoragePostsTimeline(action);
    }
    return action;
  },
  'API_TO_SERVER[REQUEST]:changeThread': (state, action) => {
    action.app = action.app ? { ...state.app, ...action.app } : state.app;
    action.app.isMediaCh = App.getIsMediaCh(action.thread.ch);
    action.app.offsetFindId = App.defaultOffsetFindId;
    action.app.offsetTimelineFindId = App.defaultOffsetFindId;
    action.app.offsetMultiFindId = App.defaultOffsetFindId;
    action.app.offsetSingleFindId = App.defaultOffsetFindId;
    action.app.offsetChildFindId = App.defaultOffsetFindId;
    action.app.offsetLogsFindId = App.defaultOffsetFindId;
    action.thread = action.thread ? { ...state.thread, ...action.thread } : state.thread;
    action.posts = new Posts();
    action.postsMulti = new Posts();
    action.postsChild = new Posts();
    action.postsTimeline = new Posts();
    action.postsSingle = new Posts();
    return action;
  },
  'SERVER_TO_API[EMIT]:changeThread': (state, action) => {
    action.app.isRootCh = action.app.rootCh === action.thread.ch;
    action.app.tunedCh = action.thread.ch;
    action.thread.title = action.thread.serverMetas['title'];
    action.threads = Threads.getMergedThreads(state.threads, action.thread);
    action.threadDetail = { ...action.thread };
    return action;
  },
  'SERVER_TO_API[EMIT]:updateThread': (state, action) => {
    action.threads = Threads.getMergedThreads(state.threads, action.thread);
    action.threadDetail = { ...action.thread };
    return action;
  },
  'SERVER_TO_API[EMIT]:updateThreadServerMetas': (state, action) => {
    action.threads = Threads.getMergedThreads(state.threads, action.thread);
    action.threadDetail = { ...action.thread };
    return action;
  },
  'SERVER_TO_API[REQUEST]:post': (state, action) => {
    action.app.inputStampId = 0;
    return action;
  },
  'SERVER_TO_API[BROADCAST]:post': (state, action) => {
    // ユーザーが今現在、閲覧しているthreadの場合
    if (state.thread.ch === action.thread.ch) {
      if (action.thread.emotions) {
        const emotionKeys = Object.keys(action.thread.emotions);
        if (emotionKeys.length > 0) {
          const actionEmotions = { ...action.thread.emotions };
          action.thread.emotions = { ...state.thread.emotions };

          Object.keys(actionEmotions).forEach((emotionModelKey) => {
            Object.keys(actionEmotions[emotionModelKey]).forEach((emotionKey) => {
              action.thread.emotions[emotionModelKey][emotionKey] =
                action.thread.emotions[emotionModelKey][emotionKey] + actionEmotions[emotionModelKey][emotionKey];
            });
          });
          action.threadDetail = { ...action.thread };
        }
      }
    }

    action.thread.ch = state.thread.ch;
    action = Posts.getAnyActionPosts(action, state);
    return action;
  },
  'SERVER_TO_API[EMIT]:getMore': (state, action) => {
    action.app.offsetFindId = App.getOffsetFindId({ posts: action.posts });
    action.app[`offset${action.app.dispThreadType}FindId`] = action.app.offsetFindId;
    action = Posts.getAnyActionPosts(action, state);
    return action;
  },
  'API_TO_SERVER[REQUEST]:changeThreadDetail': (state, action) => {
    delete action.thread;
    return action;
  },
  'SERVER_TO_API[EMIT]:changeThreadDetail': (state, action) => {
    action.app.detailCh = action.thread.ch;
    action.threads = Threads.getMergedThreads(state.threads, action.thread);
    action.threadDetail = { ...action.thread };
    action.threadDetail.title = action.thread.serverMetas.title;
    action.threadDetail.emotions = { ...state.threads[action.app.detailCh].emotions };

    // TODO 古い仕様だとhasSlashが格納されていないcollectionが存在する
    // hasSlashはlocationが参照できないCLIENTだと正しい値を取得出来ないため、
    // 拡張機能ではGET_CLIENT_METASを実行して正しい値をサーバーに渡して更新してやる必要がある。
    action.threadDetail.hasSlash = action.threadDetail.hasSlash === null ? true : Schema.getBool(action.threadDetail.hasSlash);
    delete action.thread;
    action.thread = action;
    return action;
  },
  'CLOSE_LINKS': (state, action) => {
    action.app = action.app ? { ...state.app, ...action.app } : state.app;
    action.thread = action.thread ? { ...state.thread, ...action.thread } : state.thread;
    return action;
  },
  'ON_CLICK_TO_MULTI_THREAD': (state, action) => {
    action.app.isLinkCh = false;
    action.app.isRootCh = action.thread.ch === state.app.rootCh;

    if (state.threads[action.thread.ch]) {
      action.thread = state.threads[action.thread.ch];
    } else {
      action.thread = { ...state.thread, ...action.thread };
    }

    return action;
  },
  'ON_CLICK_TO_TIMELINE_THREAD': (state, action) => {
    const ch = action.thread.ch;
    action.thread = { ...state.thread, ...action.thread };
    action.thread.ch = ch;
    const src = App.getMediaSrc(action.thread.protocol, action.thread.ch);
    action.thread.findType = Thread.getFindTypeFromSrc(src);
    action.postsTimeline = [];
    action.app.isMediaCh = true;
    action.app.offsetFindId = App.defaultOffsetFindId;
    action.app.offsetChildFindId = App.defaultOffsetFindId;
    return action;
  },
  'ON_CLICK_TO_SINGLE_THREAD': (state, action) => {
    action.thread = { ...state.thread, ...action.thread };
    action.app = state.app;
    action.app.isLinkCh = false;
    return action;
  },
  'ON_CLICK_TO_CHILD_THREAD': (state, action) => {
    action.thread = { ...state.thread, ...action.thread };
    action.postsChild = [];
    action.app.offsetFindId = App.defaultOffsetFindId;
    action.app.offsetChildFindId = App.defaultOffsetFindId;
    return action;
  },
  'ON_CLICK_MENU': (state, action) => {
    action.app.desc = action.ui.menuComponent;
    return action;
  },
  'RESIZE_END_WINDOW': (state, action) => {
    action.thread = state.thread;
    return action;
  },
  'ON_CLICK_TOGGLE_DISP_DETAIL': (state, action) => {
    // TODO 古い仕様だとhasSlashが格納されていないcollectionが存在する
    // hasSlashはlocationが参照できないCLIENTだと正しい値を取得出来ないため、
    // 拡張機能ではGET_CLIENT_METASを実行して正しい値をサーバーに渡して更新してやる必要がある。
    action.threadDetail.hasSlash = action.threadDetail.hasSlash === null ? true : Schema.getBool(action.threadDetail.hasSlash);
    return action;
  },
  'TOGGLE_BUBBLE_POST': (state, action) => {
    action.thread = state.thread;
    return action;
  },
  'START_LINK_MEDIA': (state, action) => {
    action.app.isLinkCh = true;
    return action;
  },
  'GET_CLIENT_METAS': (state, action) => {
    let updateFlg = false;
    let { clientMetas } = action;
    let { serverMetas } = state.thread;
    action.thread = {};

    // Metas
    Object.keys(clientMetas).forEach((key, i) => {
      if (clientMetas[key] && clientMetas[key] !== '' && serverMetas[key] !== clientMetas[key]) {
        if (!action.thread.serverMetas) {
          action.thread.serverMetas = {};
        }
        updateFlg = true;
        action.thread.serverMetas[key] = clientMetas[key];
      }
    });

    if (updateFlg) {
      action.threadDetail = { ...state.threadDetail };
      action.threadDetail.serverMetas = {
        ...action.threadDetail.serverMetas,
        ...action.thread.serverMetas,
      };
      return action;
    }
  },
};
