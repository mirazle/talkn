import Ui from "common/schemas/state/App";

export default (state = new Ui(), action) => {
  return action.ui ? state.merge(action.ui) : state;
};
