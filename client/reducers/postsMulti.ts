import Posts from "common/schemas/state/Posts";

export default (state: any = new Posts(), action) => {
  switch (action.type) {
    case "ON_CLICK_MULTISTREAM":
      return action.postsMulti;
    case "CLIENT_TO_SERVER[EMIT]:changeThread":
      return new Posts();
    case "SERVER_TO_CLIENT[EMIT]:find":
      if (action.postsMulti && action.postsMulti.length > 0) {
        if (action.app.isRootCh) {
          return [...state, ...action.postsMulti];
        }
      }
      break;
    case "SERVER_TO_CLIENT[BROADCAST]:post":
      if (action.postsMulti && action.postsMulti.length > 0) {
        if (action.app.rootCh === action.thread.ch) {
          return [...state, ...action.postsMulti];
        }
      }
      break;
    case "SERVER_TO_CLIENT[EMIT]:getMore":
      if (action.postsMulti && action.postsMulti.length > 0) {
        return [...action.postsMulti, ...state];
      }
      break;
  }
  return state;
};
