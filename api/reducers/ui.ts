import Ui from "api/store/App";

export default (state = new Ui(), action) => {
  return action.ui ? state.merge(action.ui) : state;
};
