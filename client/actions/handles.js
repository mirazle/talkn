import define from 'common/define';
//import MongoDB from 'server/listens/db/MongoDB';
import HtmlSchema from 'server/schemas/logics/Html';

export default {
  updateStyle: ( {styleKey, eleType, tagName, style} ) => {
    return {
      type: 'UPDATE_STYLE',
      styleKey,
      eleType,
      tagName,
      style,
    };
  },
  onClickToggleMain: ({app}) => {
    return {
      type: 'ON_CLICK_TOGGLE_MAIN',
      app,
    };
  },
  onClickToTimelineThread: ( connection, {app, thread} ) => {
    return {
      type: 'ON_CLICK_TO_TIMELINE_THREAD',
      app,
      thread: { connection },
    };
  },
  onClickToMultiThread: ( connection, {app, thread} ) => {
    return {
      type: 'ON_CLICK_TO_MULTI_THREAD',
      app,
      thread: { connection },
    };
  },
  onClickToSingleThread: ( connection, {app, thread} ) => {
    return {
      type: 'ON_CLICK_TO_SINGLE_THREAD',
      app,
      thread: { connection },
    };
  },
  onClickToChildThread: ( connection, {app, thread} ) => {
    return {
      type: 'ON_CLICK_TO_CHILD_THREAD',
      app,
      thread: { connection },
    };
  },
  onClickToLogsThread: ( connection, {app, thread} ) => {
    return {
      type: 'ON_CLICK_TO_LOGS_THREAD',
      app,
      thread: { connection },
    };
  },
  onChangeInputPost: ( inputPost = "") => {
    inputPost = typeof inputPost === "string" ? inputPost : "";
    return {
      type: 'ON_CHANGE_INPUT_POST',
      app: {inputPost},
    };
  },
  toggleDispMain: ( app ) => {
    return {
      type: 'TOGGLE_DISP_MAIN',
      app,
    };
  },
  toggleDispBoard: ( app ) => {
    return {
      type: 'TOGGLE_DISP_BOARD',
      app,
    };
  },
  toggleBubblePost: () => {
    return {
      type: 'TOGGLE_BUBBLE_POST'
    };
  },
  openLinks: () => {
    return {
      type: 'OPEN_LINKS',
      app: {isOpenLinks: true}
    };
  },
  closeLinks: () => {
    return {
      type: 'CLOSE_LINKS',
      app: {isOpenLinks: false}
    };
  },
  toggleLinks: (isOpenLinks) => {
    return {
      type: 'TOGGLE_LINKS'
    };
  },
  onClickMultistream: ({app, postsMulti, postsSingle}) => {
    return {
      type: 'ON_CLICK_MULTISTREAM',
      app,
      postsMulti,
      postsSingle
    };
  },
  onClickToggleDispMenu: () => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_MENU'
    };
  },
  onClickToggleDispDetail: ( {threadDetail, app} ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_DETAIL',
      threadDetail,
      app
    };
  },
  onClickLike: ( inputPost ) => {
    return {
      type: 'ON_CLICK_LIKE',
      app: {inputPost},
    };
  },
  onClickMoney: ( inputPost ) => {
    return {
      type: 'ON_CLICK_MONEY',
      app: {inputPost},
    };
  },
  onClickShare: ( inputPost ) => {
    return {
      type: 'ON_CLICK_SHARE',
      app: {inputPost},
    };
  },
  onResizeStartWindow: ( params = {app: {}, setting: {}} ) => {
    return {
      type: 'RESIZE_START_WINDOW',
      ...params
    };
  },
  onResizeEndWindow: ( {app, setting, bootOption} ) => {
    return {
      type: 'RESIZE_END_WINDOW',
      app,
      setting,
      bootOption
    };
  },
  onTransition: () => {
    return {
      type: 'ON_TRANSITION',
      app: {isTransition: true},
    };
  },
  offTransition: () => {
    return {
      type: 'OFF_TRANSITION',
      app: {isTransition: false},
    };
  },
  onTransitionEnd: () => {
    return {
      type: 'ON_TRANSITION_END'
    };
  },
  onClickMenu: ( menuComponent ) => {
    return {
      type: 'ON_CLICK_MENU',
      app: {menuComponent},
    };
  },
  onClickSetting: ( settingType, {setting} ) => {
    return {
      type: 'ON_CLICK_SETTING',
      settingType,
      setting
    };
  },
  openInnerNotif: (openInnerNotif = define.noInnerNotif) => {
    return {
      type: 'OPEN_INNER_NOTIF',
      app: {openInnerNotif}
    }
  },
  closeInnerNotif: () => {
    return {
      type: 'CLOSE_INNER_NOTIF',
      app: {openInnerNotif: ''}
    }
  },
  openNotif: () => {
    return {
      type: 'OPEN_NOTIF',
      app: {isOpenNotif: true}
    }
  },
  closeNotif: () => {
    return {
      type: 'CLOSE_NOTIF',
      app: {isOpenNotif: false}
    }
  },
  onClickOpenLockMenu: ( openLockMenu ) => {
    return {
      type: 'ON_CLICK_OPEN_LOCK_MENU',
      app: {openLockMenu},
    };
  },
  openNewPost: () => {
    return {
      type: 'OPEN_NEW_POST',
      app: {isOpenNewPost: true}
    };
  },
  closeNewPost: () => {
    return {
      type: 'CLOSE_NEW_POST',
      app: {isOpenNewPost: false}
    };
  },
  openMenuTransitionEnd: (threadScrollY) => {
    return {
      type: 'OPEN_MENU_TRANSITION_END',
      app: {threadScrollY}
    };
  },
  startDispPosts: () => {
    return {
      type: 'START_DISP_POSTS',
      app: {isDispPosts: true}
    };
  },
  startUndispPosts: () => {
    return {
      type: 'START_UNDISP_POSTS',
      app: {isDispPosts: false}
    };
  },
  componentDidMounts: ( componentName ) => {
    return {
      type: 'COMPONENT_DID_MOUNTS',
      componentDidMounts: componentName
    };
  },
  bootExtension: (app) => {
    return {
      type: 'BOOT_EXTENSION'
    };
  },
  updateExtension: (app) => {
    return {
      type: 'UPDATE_EXTENSION',
      app
    };
  },
  getClientMetas: ( clientMetas ) => {
    return {
      type: 'GET_CLIENT_METAS',
      clientMetas
    };
  },
  toggleDispPostsSupporter: () => {
    return {
      type: 'TOGGLE_DISP_POSTS_SUPPORTER'
    };
  },
  closeDispPostsSupporter: () => {
    return {
      type: 'CLOSE_DISP_POSTS_SUPPORTER',
      app: { isOpenPostsSupporter: false }
    };
  },
  nextPostsTimeline: ( postsTimeline = [] ) => {
    return {
      type: 'NEXT_POSTS_TIMELINE',
      postsTimeline
    };
  },
  unmountPostsTimeline: ( mediaCurrentTime = 0 ) => {
    return {
      type: 'UNMOUNT_POSTS_TIMELINE',
      mediaCurrentTime
    };
  },
  clearPostsTimeline: ( mediaCurrentTime = 0 ) => {
    return {
      type: 'CLEAR_POSTS_TIMELINE',
      mediaCurrentTime
    };
  },
  prevPostsTimeline: ( postsTimeline = [] ) => {
    return {
      type: 'PREV_POSTS_TIMELINE',
      postsTimeline
    };
  },
  delegatePost: ( {inputPost, inputCurrentTime} ) => {
    return {
      type: 'DELEGATE_POST',
      app: {inputPost, inputCurrentTime}
    };
  },
  playVideo: () => {
    return {
      type: 'PLAY_VIDEO'
    };
  },
  stopVideo: () => {
    return {
      type: 'STOP_VIDEO'
    };
  },
  onChangeFindType: ( e ) => {
    return {
      type: 'ON_CHANGE_FIND_TYPE',
      app: {findType: e.target.value}
    };
  },
  startLinkMedia: () => {
    return {
      type: 'START_LINK_MEDIA'
    };
  },
  debug: ( app ) => {
    return {
      type: 'DEBUG',
      app
    };
  }
}
