export default {
  onChangeInputPost: ( inputPost ) => {
    return {
      type: 'ONCHANGE_INPUT_POST',
      user: {inputPost},
    };
  },
}
