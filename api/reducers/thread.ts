import Thread from "api/store/Thread";

export default (state = new Thread({}, {}, {}), action) => {
  switch (action.type) {
    case "API_TO_SERVER[REQUEST]:tuned":
      return new Thread(action.thread, {}, {});
    case "SERVER_TO_API[BROADCAST]:find":
    case "SERVER_TO_API[BROADCAST]:changeThread":
    case "SERVER_TO_API[BROADCAST]:disconnect":
    case "SERVER_TO_API[BROADCAST]:post":
      // サーバー側でch毎にBroardcastしているのでこの判定でOK
      if (state.ch === action.thread.ch) {
        return action.thread ? state.merge(action.thread) : state;
      }
      break;
    default:
      return action.thread ? state.merge(action.thread) : state;
  }
  return state;
};
