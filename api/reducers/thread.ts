import Thread from "api/store/Thread";

export default (state = new Thread({}, {}, {}), action) => {
  console.log('Reducer ch : ' + state.ch);
  return action.thread ? state.merge(action.thread) : state;
};
