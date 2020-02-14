import App from "api/store/App";

export default (state = new App(), action) => {
  return action.app ? state.merge(action.app) : state;
};
