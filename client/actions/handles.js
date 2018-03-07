
export default {
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
}
