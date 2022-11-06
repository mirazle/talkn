import define from 'common/define';

import App from 'api/store/App';

import TalknSession from '../operations/TalknSession';

export default {
  'API_TO_CLIENT[BROADCAST]:post': setStorageHtmlPosts,
  'API_TO_CLIENT[EMIT]:getMore': setStorageHtmlPosts,
  'API_TO_CLIENT[EMIT]:fetchPosts': (clientState, apiState, props) => {
    setStoragePosts(clientState, apiState, props);
    return { clientState, apiState, props };
  },
  'API_TO_CLIENT[EMIT]:changeThread': (clientState, apiState, props) => {
    const { app } = apiState;
    const { rootCh } = app;
    const { storageKey } = define;
    const postKey = app.dispThreadType === App.dispThreadTypeMulti ? storageKey.postSingle : storageKey.postMulti;
    TalknSession.setStorage(rootCh, define.storageKey[postKey], []);
    return { clientState, apiState, props };
  },
  'ON_CLICK_MENU': (clientState, apiState, props) => {
    const { rootCh } = apiState.app;
    TalknSession.setStorage(rootCh, define.storageKey.app, clientState.app);
    return { clientState, apiState, props };
  },
  'RESIZE_END_WINDOW': (clientState, apiState, props) => {
    return { clientState, apiState, props };
  },
  setStoragePosts,
  setStorageHtmlPosts,
  setStoragePostsTimeline,
  getStoragePostsTimeline,
  getStoragePostsTimelineZero,
};

function setStoragePosts(clientState, apiState, props) {
  const { app } = apiState;
  if (app.isMediaCh) {
    apiState = setStoragePostsTimeline(apiState);
    return { apiState, clientState, props };
  } else {
    return setStorageHtmlPosts(clientState, apiState, props);
  }
}

function setStorageHtmlPosts(clientState, apiState, props) {
  const { app } = apiState;
  const { storageKey } = define;
  if (app.isRootCh) {
    const { postsMulti, postsSingle } = apiState;
    TalknSession.setStorage(app.rootCh, storageKey.postsMulti, postsMulti);
    TalknSession.setStorage(app.rootCh, storageKey.postsSingle, postsSingle);
  }

  return { clientState, apiState, props };
}

function setStoragePostsTimeline(apiState) {
  const { app, thread, postsTimeline: postsTimelineAll } = apiState;
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
    apiState.postsTimeline = postsTimelineZeroSecond;
    TalknSession.setStorage(thread.ch, storageKey.postsTimelineZero, postsTimelineZeroSecond);
    TalknSession.setStorage(thread.ch, storageKey.postsTimeline, postsTimeline);
  }
  return apiState;
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
function getStoragePostsTimelineZero(rootCh) {
  const { storageKey } = define;
  const response = TalknSession.getStorage(rootCh, storageKey.postsTimelineZero);
  return response.constructor.name === 'Array' ? response : [];
}

function getStoragePostsTimeline(rootCh) {
  const { storageKey } = define;
  const response = TalknSession.getStorage(rootCh, storageKey.postsTimeline);
  return response.constructor.name === 'Array' ? response : [];
}
