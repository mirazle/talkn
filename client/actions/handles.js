
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
  handleOnClickDispSetting: ( isOpenSetting ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_SETTING',
      user: {isOpenSetting},
    };
  },
}
