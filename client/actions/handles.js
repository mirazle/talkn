
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
  onChangeInputPost: ( inputPost ) => {
    return {
      type: 'ON_CHANGE_INPUT_POST',
      control: {inputPost},
    };
  },
  onClickToggleDispMain: ( isOpenMain ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_MAIN',
      control: {isOpenMain},
    };
  },
  onClickDispSetting: ( isOpenSetting ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_SETTING',
      control: {isOpenSetting},
    };
  },
  onClickChildrenThreadView: ( childrenThreadView ) => {
    return {
      type: 'ON_CLICK_TOGGLE_CHILDREN_THREAD_VIEW',
      control: {childrenThreadView},
    };
  },
  onClickToggleDispDetail: ( isOpenDetail ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_DETAIL',
      control: {isOpenDetail},
    };
  },
  handleOnClickLike: ( inputPost ) => {
    return {
      type: 'ON_CLICK_LIKE',
      control: {inputPost},
    };
  },
  handleOnClickMoney: ( inputPost ) => {
    return {
      type: 'ON_CLICK_MONEY',
      control: {inputPost},
    };
  },
  handleOnClickShare: ( inputPost ) => {
    return {
      type: 'ON_CLICK_SHARE',
      control: {inputPost},
    };
  },
}
