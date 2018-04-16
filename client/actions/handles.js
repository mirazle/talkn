import App from 'common/schemas/state/App';

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
  onChangeInputPost: ( inputPost ) => {
    return {
      type: 'ON_CHANGE_INPUT_POST',
      app: {inputPost},
    };
  },
  onClickToggleDispMain: ( isOpenMain ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_MAIN',
      app: {isOpenMain},
    };
  },
  onClickDispMenu: ( app ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_MENU',
      app,
    };
  },
  onClickToggleDispDetail: ( isOpenDetail ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_DETAIL',
      app: {isOpenDetail},
    };
  },
  onClickChildrenThreadView: ( childrenThreadView ) => {
    return {
      type: 'ON_CLICK_TOGGLE_CHILDREN_THREAD_VIEW',
      app: {childrenThreadView},
    };
  },
  handleOnClickLike: ( inputPost ) => {
    return {
      type: 'ON_CLICK_LIKE',
      app: {inputPost},
    };
  },
  handleOnClickMoney: ( inputPost ) => {
    return {
      type: 'ON_CLICK_MONEY',
      app: {inputPost},
    };
  },
  handleOnClickShare: ( inputPost ) => {
    return {
      type: 'ON_CLICK_SHARE',
      app: {inputPost},
    };
  },
  handleOnResizeWindow: ( app ) => {
    return {
      type: 'RESIZE_WINDOW',
      app,
    };
  },
}
