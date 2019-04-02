import define from 'common/define';

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
  onClickToMultiThread: ( connection, {app} ) => {
    return {
      type: 'ON_CLICK_TO_MULTI_THREAD',
      app,
      thread: { connection },
    };
  },
  onClickToSingleThread: ( connection, {app} ) => {
    return {
      type: 'ON_CLICK_TO_SINGLE_THREAD',
      app,
      thread: { connection },
    };
  },
  onClickToChildThread: ( connection, {app} ) => {
    return {
      type: 'ON_CLICK_TO_CHILD_THREAD',
      app,
      thread: { connection },
    };
  },
  onClickToLogsThread: ( connection, {app} ) => {
    return {
      type: 'ON_CLICK_TO_LOGS_THREAD',
      app,
      thread: { connection },
    };
  },
  onChangeInputPost: ( inputPost ) => {
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
  onResizeStartWindow: ( {app, setting} ) => {
    return {
      type: 'RESIZE_START_WINDOW',
      app,
      setting
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
  dispMain: () => {
    return {
      type: 'DISP_MAIN',
      app: {isDispMain: true}
    };
  },
  undispMain: () => {
    return {
      type: 'DISP_MAIN',
      app: {isDispMain: false}
    };
  }
}
