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
  updateApp: ( updateColumn, app ) => {
    return {
      type: 'UPDATE_APP',
      updateColumn,
      app,
    };
  },
  updateUser: ( updateColumn, user ) => {
    return {
      type: 'UPDATE_USER',
      updateColumn,
      user,
    };
  },
  updateSetting: ( updateColumn, setting ) => {
    return {
      type: 'UPDATE_SETTING',
      updateColumn,
      setting,
    };
  },
  updatePosts: ( posts ) => {
    return {
      type: 'UPDATE_POSTS',
      posts,
    };
  },
  onClickOtherThread: ( connection ) => {
    return {
      type: 'ON_CLICK_OTHER_THREAD',
      user: { offsetFindId: User.defaultOffsetFindId},
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
  onClickToggleDispMenu: ( app ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_MENU',
      app,
    };
  },
  onClickToggleDispDetail: ( app ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_DETAIL',
      app,
    };
  },
  onClickChildrenThreadView: ( childrenThreadView ) => {
    return {
      type: 'ON_CLICK_TOGGLE_CHILDREN_THREAD_VIEW',
      app: {childrenThreadView},
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
}
