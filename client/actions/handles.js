
export default {
  onChangeInputPost: ( inputPost ) => {
    return {
      type: 'ON_CHANGE_INPUT_POST',
      user: {inputPost},
    };
  },
  onClickToggleDispMain: ( isOpenMain ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_MAIN',
      user: {isOpenMain},
    };
  },
  onClickDispSetting: ( isOpenSetting ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_SETTING',
      user: {isOpenSetting},
    };
  },
  onClickChildrenThreadView: ( childrenThreadView ) => {
    return {
      type: 'ON_CLICK_TOGGLE_CHILDREN_THREAD_VIEW',
      user: {childrenThreadView},
    };
  },
  onClickToggleDispDetail: ( isOpenDetail ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_DETAIL',
      user: {isOpenDetail},
    };
  },
}
