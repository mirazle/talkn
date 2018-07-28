import App from 'common/schemas/state/App';
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
  updateApp: ( app ) => {
    return {
      type: 'UPDATE_APP',
      app,
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
  onClickToggleDispMain: ( app ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_MAIN',
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
  onResizeStartWindow: ( app ) => {
    return {
      type: 'RESIZE_START_WINDOW',
      app,
    };
  },
  onResizeEndWindow: ( app ) => {
    return {
      type: 'RESIZE_END_WINDOW',
      app,
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
}
