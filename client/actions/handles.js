
export default {
  onChangeInputPost: ( inputPost ) => {
    return {
      type: 'ON_CHANGE_INPUT_POST',
      user: {inputPost},
    };
  },
  onClickOpenMainBoard: ( isDisp ) => {
    return {
      type: 'ON_CLICK_OPEN_THREAD',
      user: {isDisp},
    };
  },
}
