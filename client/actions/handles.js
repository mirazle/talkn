import State from 'common/schemas/state/';
const state = new State();

export default {
  onChangeInputPost: ( inputPost ) => {
    return {
      type: 'ONCHANGE_INPUT_POST',
      user: new state.user.constructor( {inputPost} ),
    };
  },
}
