import define from "common/define";
import App from "common/schemas/state/App";
import TalknSession from "client/operations/TalknSession";

export default {
  "SERVER_TO_CLIENT[BROADCAST]:post": setStorageHtmlPosts,
  "SERVER_TO_CLIENT[EMIT]:getMore": setStorageHtmlPosts,
  "SERVER_TO_CLIENT[EMIT]:find": (state, props) => {
    //setStoragePosts( state, props );
    return { state, props };
  },
  "SERVER_TO_CLIENT[EMIT]:changeThread": (state, props) => {
    const { app } = state;
    const { rootConnection } = app;
    const { storageKey } = define;
    const postKey =
      app.dispThreadType === App.dispThreadTypeMulti
        ? storageKey.postSingle
        : storageKey.postMulti;
    TalknSession.setStorage(rootConnection, define.storageKey[postKey], []);
    return { state, props };
  },
  //  "ON__CLICK_MULTISTREAM": setStoragePosts,
  ON_CLICK_TOGGLE_DISP_MENU: (state, props) => {
    const { app } = state;
    if (app.screenMode === App.screenModeSmallLabel) {
      if (!app.isOpenMenu) {
        window.talknWindow.unlockWindow();
        window.scrollTo(0, app.threadScrollY);
      }
    }
    return { state, props };
  },
  ON_CLICK_MENU: (state, props) => {
    const { rootConnection } = state.app;
    TalknSession.setStorage(rootConnection, define.storageKey.app, state.app);
    return { state, props };
  },
  "SERVER_TO_CLIENT[EMIT]:initClientState ": (state, props) => {
    return { state, props };
  },
  RESIZE_END_WINDOW: (state, props) => {
    return { state, props };
  },
  setStoragePosts,
  setStorageHtmlPosts,
  setStoragePostsTimeline,
  getStoragePostsTimeline,
  getStoragePostsTimelineZero
};

function setStoragePosts(state, props) {
  const { app } = state;
  if (app.isMediaConnection) {
    state = setStoragePostsTimeline(state);
    return { state, props };
  } else {
    return setStorageHtmlPosts(state, props);
  }
}

function setStorageHtmlPosts(state, props) {
  const { app } = state;
  const { storageKey } = define;
  if (app.isRootConnection) {
    const { postsMulti, postsSingle } = state;
    TalknSession.setStorage(
      app.rootConnection,
      storageKey.postsMulti,
      postsMulti
    );
    TalknSession.setStorage(
      app.rootConnection,
      storageKey.postsSingle,
      postsSingle
    );
  }

  return { state, props };
}

function setStoragePostsTimeline(action) {
  const { app, thread, postsTimeline: postsTimelineAll } = action;
  const { storageKey } = define;
  if (app.isMediaConnection) {
    const postsTimelineAllLength =
      postsTimelineAll && postsTimelineAll.length ? postsTimelineAll.length : 0;
    let postsTimelineZero = [];
    let postsTimeline = [];

    for (let i = 0; i < postsTimelineAllLength; i++) {
      if (postsTimelineAll[i].currentTime === 0) {
        postsTimelineZero.push(postsTimelineAll[i]);
      } else {
        postsTimeline.push(postsTimelineAll[i]);
      }
    }

    action.postsTimeline = postsTimelineZero;
    TalknSession.setStorage(
      thread.connection,
      storageKey.postsTimelineZero,
      postsTimelineZero
    );
    TalknSession.setStorage(
      thread.connection,
      storageKey.postsTimeline,
      postsTimeline
    );
  }
  return action;
}
/*
function addStoragePostsTimeline(action) {
  const { app, postsTimeline } = action;

  const { storageKey } = define;
  if (app.isMediaConnection) {
    const addPostsTimeline = postsTimeline[0];
    let postsTimelineZero = [];
    let postsTimeline = [];
    let postsTimelineZeroLength = 0;
    let postsTimelineLength = 0;

    if (addPostsTimeline.currentTime === 0) {
      postsTimelineZero = getStoragePostsTimelineZero(app.rootConnection);
      postsTimelineZeroLength = postsTimelineZero.length;

      //      for(let i = 0; i < postsTimelineZeroLength; i++){
      //      }
      //      p.splice(4,0,p2);
    } else {
      postsTimeline = getStoragePostsTimeline(app.rootConnection);
      postsTimelineLength = postsTimeline.length;
      if (postsTimelineLength > 0) {
        for (let i = 0; i < postsTimelineLength; i++) {}
      }
    }
  }
}
*/
function getStoragePostsTimelineZero(rootConnection) {
  const { storageKey } = define;
  const response = TalknSession.getStorage(
    rootConnection,
    storageKey.postsTimelineZero
  );
  return response.constructor.name === "Array" ? response : [];
}

function getStoragePostsTimeline(rootConnection) {
  const { storageKey } = define;
  const response = TalknSession.getStorage(
    rootConnection,
    storageKey.postsTimeline
  );
  return response.constructor.name === "Array" ? response : [];
}
