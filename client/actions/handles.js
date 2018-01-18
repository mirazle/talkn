
export default {
  onChangeInputPost: ( inputPost ) => {
    return {
      type: 'ON_CHANGE_INPUT_POST',
      user: {inputPost},
    };
  },
  onClickToggleDispThread: ( isOpenThread ) => {
    return {
      type: 'ON_CLICK_TOGGLE_DISP_THREAD',
      user: {isOpenThread},
    };
  },
}
