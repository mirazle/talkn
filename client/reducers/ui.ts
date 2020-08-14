import Ui from "client/store/Ui";

export default (state = new Ui(), action) => {
  if (action.ui) {
    console.log(action.type);
    console.log(action.ui.isLoading);
  }
  return action.ui ? state.merge(action.ui) : state;
};
