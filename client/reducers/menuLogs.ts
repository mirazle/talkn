import MenuLogs from "common/schemas/state/MenuLogs";

export default (state = new MenuLogs(), action) => {
  switch (action.type) {
    case "SERVER_TO_CLIENT[EMIT]:find":
      const isFind = state.find(s => s.ch === action.thread.lastPost.ch);
      return isFind ? state : state.unshift(action.thread.lastPost);
    default:
      return action.menuLogs ? state.merge(action.menuLogs) : state;
  }
};
