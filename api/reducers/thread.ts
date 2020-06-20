import Thread from "api/store/Thread";

export default (state = new Thread({}, {}, {}), action) => {
  console.log(state);
  return action.thread ? state.merge(action.thread) : state;
};
