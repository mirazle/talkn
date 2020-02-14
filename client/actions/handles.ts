import define from "common/define";

export default {
  updateStyle: ({ styleKey, eleType, tagName, style }) => {
    return {
      type: "UPDATE_STYLE",
      styleKey,
      eleType,
      tagName,
      style
    };
  },
  onClickToggleMain: ({ app }) => {
    return {
      type: "ON_CLICK_TOGGLE_MAIN",
      app
    };
  },
  onClickToTimelineThread: (ch, { app, thread }) => {
    return {
      type: "ON_CLICK_TO_TIMELINE_THREAD",
      app,
      thread: { ch }
    };
  },
  onClickToMultiThread: (ch, { app, thread }) => {
    return {
      type: "ON_CLICK_TO_MULTI_THREAD",
      app,
      thread: { ch }
    };
  },
  onClickToSingleThread: (ch, { app, thread }) => {
    return {
      type: "ON_CLICK_TO_SINGLE_THREAD",
      app,
      thread: { ch }
    };
  },
  onClickToChildThread: (ch, { app, thread }) => {
    return {
      type: "ON_CLICK_TO_CHILD_THREAD",
      app,
      thread: { ch }
    };
  },
  onClickToLogsThread: (ch, { app, thread }) => {
    return {
      type: "ON_CLICK_TO_LOGS_THREAD",
      app,
      thread: { ch }
    };
  },
  onChangeInputPost: (inputPost = "") => {
    inputPost = typeof inputPost === "string" ? inputPost : "";
    return {
      type: "ON_CHANGE_INPUT_POST",
      app: { inputPost }
    };
  },
  toggleDispBoard: app => {
    return {
      type: "TOGGLE_DISP_BOARD",
      app
    };
  },
  toggleBubblePost: () => {
    return {
      type: "TOGGLE_BUBBLE_POST",
      app: { isTransition: false }
    };
  },
  openLinks: () => {
    return {
      type: "OPEN_LINKS",
      app: { isOpenLinks: true }
    };
  },
  closeLinks: () => {
    return {
      type: "CLOSE_LINKS",
      app: { isOpenLinks: false }
    };
  },
  toggleLinks: isOpenLinks => {
    return {
      type: "TOGGLE_LINKS"
    };
  },
  onClickMultistream: ({ app, postsMulti, postsSingle }) => {
    return {
      type: "ON_CLICK_MULTISTREAM",
      app,
      postsMulti,
      postsSingle
    };
  },
  onClickToggleDispMenu: () => {
    return {
      type: "ON_CLICK_TOGGLE_DISP_MENU"
    };
  },
  onClickToggleDispDetail: ({ threadDetail, app }) => {
    return {
      type: "ON_CLICK_TOGGLE_DISP_DETAIL",
      threadDetail,
      app
    };
  },
  onResizeStartWindow: (params = { app: {}, setting: {} }) => {
    return {
      type: "RESIZE_START_WINDOW",
      ...params
    };
  },
  onResizeEndWindow: ({ app, setting, bootOption }) => {
    return {
      type: "RESIZE_END_WINDOW",
      app,
      setting,
      bootOption
    };
  },
  onScrollUpdateTimeMarker: uiTimeMarker => {
    return {
      type: "ON_SCROLL_UPDATE_TIME_MARKER",
      uiTimeMarker
    };
  },
  onTransition: () => {
    return {
      type: "ON_TRANSITION",
      app: { isTransition: true }
    };
  },
  offTransition: () => {
    return {
      type: "OFF_TRANSITION",
      app: { isTransition: false }
    };
  },
  onTransitionEnd: () => {
    return {
      type: "ON_TRANSITION_END"
    };
  },
  openInnerNotif: (openInnerNotif = define.noInnerNotif) => {
    return {
      type: "OPEN_INNER_NOTIF",
      app: { openInnerNotif }
    };
  },
  closeInnerNotif: () => {
    return {
      type: "CLOSE_INNER_NOTIF",
      app: { openInnerNotif: "" }
    };
  },
  onClickOpenLockMenu: openLockMenu => {
    return {
      type: "ON_CLICK_OPEN_LOCK_MENU",
      app: { openLockMenu }
    };
  },
  openNewPost: () => {
    return {
      type: "OPEN_NEW_POST",
      app: { isOpenNewPost: true }
    };
  },
  closeNewPost: () => {
    return {
      type: "CLOSE_NEW_POST",
      app: { isOpenNewPost: false }
    };
  },
  openMenuTransitionEnd: threadScrollY => {
    return {
      type: "OPEN_MENU_TRANSITION_END",
      app: { threadScrollY }
    };
  },
  componentDidMounts: componentName => {
    return {
      type: "COMPONENT_DID_MOUNTS",
      componentDidMounts: componentName
    };
  },
  bootExtension: app => {
    return {
      type: "BOOT_EXTENSION",
      app
    };
  },
  updateExtension: app => {
    return {
      type: "UPDATE_EXTENSION",
      app
    };
  },
  getClientMetas: clientMetas => {
    return {
      type: "GET_CLIENT_METAS",
      clientMetas
    };
  },
  toggleDispPostsSupporter: () => {
    return {
      type: "TOGGLE_DISP_POSTS_SUPPORTER"
    };
  },
  closeDispPostsSupporter: () => {
    return {
      type: "CLOSE_DISP_POSTS_SUPPORTER",
      app: { isOpenPostsSupporter: false }
    };
  },
  nextPostsTimeline: (postsTimeline = []) => {
    return {
      type: "NEXT_POSTS_TIMELINE",
      postsTimeline
    };
  },
  clearPostsTimeline: (mediaCurrentTime = 0) => {
    return {
      type: "CLEAR_POSTS_TIMELINE",
      mediaCurrentTime
    };
  },
  delegatePost: ({ inputPost, inputCurrentTime, inputStampId }) => {
    return {
      type: "DELEGATE_POST",
      app: { inputPost, inputCurrentTime, inputStampId }
    };
  },
  playVideo: () => {
    return {
      type: "PLAY_VIDEO"
    };
  },
  stopVideo: () => {
    return {
      type: "STOP_VIDEO"
    };
  },
  onChangeFindType: e => {
    return {
      type: "ON_CHANGE_FIND_TYPE",
      app: { findType: e.target.value }
    };
  },
  startLinkMedia: () => {
    return {
      type: "START_LINK_MEDIA"
    };
  }
};
