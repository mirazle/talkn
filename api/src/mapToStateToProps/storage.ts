import define from 'common/define';

import App from 'api/store/App';

//import TalknSession from "client/operations/TalknSession";

export default {
  'SERVER_TO_API[BROADCAST]:post': setStorageHtmlPosts,
  'SERVER_TO_API[EMIT]:getMore': setStorageHtmlPosts,
  'SERVER_TO_API[EMIT]:fetchPosts': (state, props) => {
    //setStoragePosts( state, props );
    return { state, props };
  },
  'SERVER_TO_API[EMIT]:changeThread': (state, props) => {
    const { app } = state;
    const { rootCh } = app;
    const { storageKey } = define;
    const postKey = app.dispThreadType === App.dispThreadTypeMulti ? storageKey.postSingle : storageKey.postMulti;
    //TalknSession.setStorage(rootCh, define.storageKey[postKey], []);
    return { state, props };
  },
  //  "ON__CLICK_MULTISTREAM": setStoragePosts,
  'ON_CLICK_MENU': (state, props) => {
    const { rootCh } = state.app;
    //    TalknSession.setStorage(rootCh, define.storageKey.app, state.app);
    return { state, props };
  },
  'RESIZE_END_WINDOW': (state, props) => {
    return { state, props };
  },
  setStoragePosts,
  setStorageHtmlPosts,
  setStoragePostsTimeline,
  //  getStoragePostsTimeline,
  //  getStoragePostsTimelineZero,
};

function setStoragePosts(state, props) {
  const { app } = state;
  if (app.isMediaCh) {
    state = setStoragePostsTimeline(state);
    return { state, props };
  } else {
    return setStorageHtmlPosts(state, props);
  }
}

function setStorageHtmlPosts(state, props) {
  const { app } = state;
  const { storageKey } = define;
  if (app.isRootCh) {
    const { postsMulti, postsSingle } = state;
    //    TalknSession.setStorage(app.rootCh, storageKey.postsMulti, postsMulti);
    //    TalknSession.setStorage(app.rootCh, storageKey.postsSingle, postsSingle);
  }

  return { state, props };
}

function setStoragePostsTimeline(action) {
  const { app, thread, postsTimeline: postsTimelineAll } = action;
  const { storageKey } = define;

  if (app.isMediaCh) {
    const postsTimelineAllLength = postsTimelineAll && postsTimelineAll.length ? postsTimelineAll.length : 0;
    let postsTimelineZeroSecond = [];
    let postsTimeline = [];

    for (let i = 0; i < postsTimelineAllLength; i++) {
      if (postsTimelineAll[i].currentTime === 0) {
        postsTimelineZeroSecond.push(postsTimelineAll[i]);
      } else {
        postsTimeline.push(postsTimelineAll[i]);
      }
    }

    action.postsTimeline = postsTimelineZeroSecond;
    //    TalknSession.setStorage(thread.ch, storageKey.postsTimelineZero, postsTimelineZeroSecond);
    //    TalknSession.setStorage(thread.ch, storageKey.postsTimeline, postsTimeline);
  }
  return action;
}
/*
function addStoragePostsTimeline(action) {
  const { app, postsTimeline } = action;

  const { storageKey } = define;
  if (app.isMediaCh) {
    const addPostsTimeline = postsTimeline[0];
    let postsTimelineZero = [];
    let postsTimeline = [];
    let postsTimelineZeroLength = 0;
    let postsTimelineLength = 0;

    if (addPostsTimeline.currentTime === 0) {
      postsTimelineZero = getStoragePostsTimelineZero(app.rootCh);
      postsTimelineZeroLength = postsTimelineZero.length;

      //      for(let i = 0; i < postsTimelineZeroLength; i++){
      //      }
      //      p.splice(4,0,p2);
    } else {
      postsTimeline = getStoragePostsTimeline(app.rootCh);
      postsTimelineLength = postsTimeline.length;
      if (postsTimelineLength > 0) {
        for (let i = 0; i < postsTimelineLength; i++) {}
      }
    }
  }
}
*/
/*
function getStoragePostsTimelineZero(rootCh) {
  const { storageKey } = define;
  const response = TalknSession.getStorage(rootCh, storageKey.postsTimelineZero);
  return response.constructor.name === "Array" ? response : [];
}

function getStoragePostsTimeline(rootCh) {
  const { storageKey } = define;
  const response = TalknSession.getStorage(rootCh, storageKey.postsTimeline);
  return response.constructor.name === "Array" ? response : [];
}
*/
