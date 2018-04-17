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
  onClickToggleDispMain: ( app ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_MAIN',
      app,
    };
  },
  onClickDispMenu: ( app ) => {
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
  handleOnResizeStartWindow: ( app ) => {
    return {
      type: 'RESIZE_START_WINDOW',
      app,
    };
  },
  handleOnResizeEndWindow: ( app ) => {
    return {
      type: 'RESIZE_END_WINDOW',
      app,
    };
  },
}
