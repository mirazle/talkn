import Thread from "api/store/Thread";

export default (state = new Thread({}, {}, {}), action) => {
  return action.thread && action.thread.ch ? state.merge(action.thread) : state;
};
