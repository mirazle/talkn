import User from 'common/schemas/state/User';

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
  onClickFooterIcon: ({app}) => {
    return {
      type: 'ON_CLICK_FOOTER_ICON',
      app,
    };
  },
  onClickOtherThread: ( user, connection ) => {
    return {
      type: 'ON_CLICK_OTHER_THREAD',
      user,
      thread: { connection },
    };
  },
  onClickToMultiThread: ( user, connection ) => {
    return {
      type: 'ON_CLICK_TO_MULTI_THREAD',
      user,
      thread: { connection },
    };
  },
  onClickToSingleThread: ( user, connection ) => {
    return {
      type: 'ON_CLICK_TO_SINGLE_THREAD',
      user,
      thread: { connection },
    };
  },
  onClickToChildThread: ( user, connection ) => {
    return {
      type: 'ON_CLICK_TO_CHILD_THREAD',
      user,
      thread: { connection },
    };
  },
  onClickToLogsThread: ( user, connection ) => {
    return {
      type: 'ON_CLICK_TO_LOGS_THREAD',
      user,
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
  onClickMultistream: () => {
    return {
      type: 'ON_CLICK_MULTISTREAM'
    };
  },
  onClickToggleDispMenu: () => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_MENU'
    };
  },
  onClickToggleDispDetail: ( app ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_DETAIL',
      app,
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
  onResizeEndWindow: ( {app, setting} ) => {
    return {
      type: 'RESIZE_END_WINDOW',
      app, setting,
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
  onClickSetting: ( settingType, {setting, user} ) => {
    return {
      type: 'ON_CLICK_SETTING',
      settingType,
      setting,
      user
    };
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
  } 
}
