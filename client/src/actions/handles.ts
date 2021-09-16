import define from 'common/define';

export default {
  updateStyle: ({ styleKey, eleType, tagName, style }) => {
    return {
      type: 'UPDATE_STYLE',
      styleKey,
      eleType,
      tagName,
      style,
    };
  },
  onClickTogglePosts: ({ app }) => {
    return {
      type: 'ON_CLICK_TOGGLE_POSTS',
      app,
    };
  },
  onClickToTimelineThread: ({ app, thread }) => {
    return {
      type: 'ON_CLICK_TO_TIMELINE_THREAD',
      app,
      thread: { ch: thread.ch },
    };
  },
  onClickToMultiThread: ({ app, thread }) => {
    return {
      type: 'ON_CLICK_TO_MULTI_THREAD',
      app,
      thread: { ch: thread.ch },
    };
  },
  onClickToSingleThread: ({ app, thread }) => {
    return {
      type: 'ON_CLICK_TO_SINGLE_THREAD',
      app,
      thread: { ch: thread.ch },
    };
  },
  onClickToChildThread: ({ app, thread }) => {
    return {
      type: 'ON_CLICK_TO_CHILD_THREAD',
      app,
      thread: { ch: thread.ch },
    };
  },
  onClickToLogsThread: ({ app, thread }) => {
    return {
      type: 'ON_CLICK_TO_LOGS_THREAD',
      app,
      thread: { ch: thread.ch },
    };
  },
  toggleDispSetChModal: ({ app, thread }) => {
    return {
      type: 'TOGGLE_DISP_SET_CH_MODAL',
    };
  },
  onChangeInputPost: (inputPost = '') => {
    inputPost = typeof inputPost === 'string' ? inputPost : '';
    return {
      type: 'ON_CHANGE_INPUT_POST',
      app: { inputPost },
    };
  },
  toggleDispMain: (app) => {
    return {
      type: 'TOGGLE_DISP_MAIN',
      app,
    };
  },
  toggleDispBoard: (app) => {
    return {
      type: 'TOGGLE_DISP_BOARD',
      app,
    };
  },
  onClickToggleMain: ({ app, ui }) => {
    return {
      type: 'ON_CLICK_TOGGLE_MAIN',
      app,
      ui,
    };
  },
  toggleBubblePost: () => {
    return {
      type: 'TOGGLE_BUBBLE_POST',
      ui: { isTransition: false },
    };
  },
  openLinks: () => {
    return {
      type: 'OPEN_LINKS',
      ui: { isOpenLinks: true },
    };
  },
  closeLinks: () => {
    return {
      type: 'CLOSE_LINKS',
      ui: { isOpenLinks: false },
    };
  },
  toggleLinks: (isOpenLinks) => {
    return {
      type: 'TOGGLE_LINKS',
    };
  },
  onClickMultistream: ({ app, postsMulti, postsSingle }) => {
    return {
      type: 'ON_CLICK_MULTISTREAM',
      app,
      postsMulti,
      postsSingle,
    };
  },
  onClickToggleDispMenu: () => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_MENU',
    };
  },
  onClickToggleDispDetail: ({ app, ui }) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_DETAIL',
      app,
      ui,
    };
  },
  onClickLike: (inputPost) => {
    return {
      type: 'ON_CLICK_LIKE',
      app: { inputPost },
    };
  },
  onClickMoney: (inputPost) => {
    return {
      type: 'ON_CLICK_MONEY',
      app: { inputPost },
    };
  },
  onClickShare: (inputPost) => {
    return {
      type: 'ON_CLICK_SHARE',
      app: { inputPost },
    };
  },
  onResizeStartWindow: (params = { app: {}, setting: {} }) => {
    return {
      type: 'RESIZE_START_WINDOW',
      ...params,
    };
  },
  onResizeEndWindow: ({ app, setting, bootOption }) => {
    return {
      type: 'RESIZE_END_WINDOW',
      app,
      setting,
      bootOption,
    };
  },
  onScrollUpdateTimeMarker: (uiTimeMarker) => {
    return {
      type: 'ON_SCROLL_UPDATE_TIME_MARKER',
      uiTimeMarker,
    };
  },
  onTransition: () => {
    return {
      type: 'ON_TRANSITION',
      ui: { isTransition: true },
    };
  },
  offTransition: () => {
    return {
      type: 'OFF_TRANSITION',
      ui: { isTransition: false },
    };
  },
  onTransitionEnd: () => {
    return {
      type: 'ON_TRANSITION_END',
    };
  },
  onClickMenu: (menuComponent) => {
    return {
      type: 'ON_CLICK_MENU',
      ui: { menuComponent },
    };
  },
  onClickSetting: (settingType, { setting }) => {
    return {
      type: 'ON_CLICK_SETTING',
      settingType,
      setting,
    };
  },
  openInnerNotif: (openInnerNotif = define.noInnerNotif) => {
    return {
      type: 'OPEN_INNER_NOTIF',
      ui: { openInnerNotif },
    };
  },
  closeInnerNotif: () => {
    return {
      type: 'CLOSE_INNER_NOTIF',
      ui: { openInnerNotif: '' },
    };
  },
  openNotif: () => {
    return {
      type: 'OPEN_NOTIF',
      ui: { isOpenNotif: true },
    };
  },
  closeNotif: () => {
    return {
      type: 'CLOSE_NOTIF',
      ui: { isOpenNotif: false },
    };
  },
  onClickOpenLockMenu: (openLockMenu) => {
    return {
      type: 'ON_CLICK_OPEN_LOCK_MENU',
      ui: { openLockMenu },
    };
  },
  openNewPost: () => {
    return {
      type: 'OPEN_NEW_POST',
      ui: { isOpenNewPost: true },
    };
  },
  closeNewPost: () => {
    return {
      type: 'CLOSE_NEW_POST',
      ui: { isOpenNewPost: false },
    };
  },
  openMenuTransitionEnd: (threadScrollY) => {
    return {
      type: 'OPEN_MENU_TRANSITION_END',
      ui: { threadScrollY },
    };
  },
  startDispPosts: () => {
    return {
      type: 'START_DISP_POSTS',
      ui: { isDispPosts: true },
    };
  },
  startUndispPosts: () => {
    return {
      type: 'START_UNDISP_POSTS',
      ui: { isDispPosts: false },
    };
  },
  componentDidMounts: (componentName) => {
    return {
      type: 'COMPONENT_DID_MOUNTS',
      componentDidMounts: componentName,
    };
  },
  bootExtension: (app) => {
    return {
      type: 'BOOT_EXTENSION',
      app,
    };
  },
  updateExtension: (app) => {
    return {
      type: 'UPDATE_EXTENSION',
      app,
    };
  },
  getClientMetas: (clientMetas) => {
    return {
      type: 'GET_CLIENT_METAS',
      clientMetas,
    };
  },
  toggleDispPostsSupporter: () => {
    return {
      type: 'TOGGLE_DISP_POSTS_SUPPORTER',
    };
  },
  closeDispPostsSupporter: () => {
    return {
      type: 'CLOSE_DISP_POSTS_SUPPORTER',
      ui: { isOpenPostsSupporter: false },
    };
  },
  nextPostsTimeline: (postsTimeline = []) => {
    return {
      type: 'NEXT_POSTS_TIMELINE',
      postsTimeline,
    };
  },
  unmountPostsTimeline: (mediaCurrentTime = 0) => {
    return {
      type: 'UNMOUNT_POSTS_TIMELINE',
      mediaCurrentTime,
    };
  },
  clearPostsTimeline: (mediaCurrentTime = 0) => {
    return {
      type: 'CLEAR_POSTS_TIMELINE',
      mediaCurrentTime,
    };
  },
  prevPostsTimeline: (postsTimeline = []) => {
    return {
      type: 'PREV_POSTS_TIMELINE',
      postsTimeline,
    };
  },
  delegatePost: ({ inputPost, inputCurrentTime, inputStampId }) => {
    return {
      type: 'DELEGATE_POST',
      app: { inputPost, inputCurrentTime, inputStampId },
    };
  },
  playVideo: () => {
    return {
      type: 'PLAY_VIDEO',
    };
  },
  stopVideo: () => {
    return {
      type: 'STOP_VIDEO',
    };
  },
  onChangeFindType: (e) => {
    return {
      type: 'ON_CHANGE_FIND_TYPE',
      app: { findType: e.target.value },
    };
  },
  startLinkMedia: () => {
    return {
      type: 'START_LINK_MEDIA',
    };
  },
  loadingEnd: () => {
    return {
      type: 'LOADING_END',
    };
  },
  scrollThread: () => {
    return { type: 'SCROLL_THREAD' };
  },
  endAnimateScrollTo: () => {
    return { type: 'END_ANIMATE_SCROLL_TO' };
  },
  createNotif: () => {
    return {
      type: 'CREATE_NOTIF',
    };
  },
  updatePostsHeight: (postsHeight) => {
    return {
      type: 'UPDATE_POSTS_HEIGHT',
      app: { postsHeight },
    };
  },
  debug: (app) => {
    return {
      type: 'DEBUG',
      app,
    };
  },
};
