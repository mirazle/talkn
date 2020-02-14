import Posts from "api/store/Posts";

export default (state: any = new Posts(), action) => {
  switch (action.type) {
    case "CLIENT_TO_SERVER[EMIT]:changeThread":
      return new Posts();
    case "SERVER_TO_CLIENT[EMIT]:find":
    case "SERVER_TO_CLIENT[BROADCAST]:post":
      if (action.postsChild && action.postsChild.length > 0) {
        if (action.thread.ch === action.posts[0].ch) {
          return [...state, ...action.postsChild];
        }
      }
      break;
    case "SERVER_TO_CLIENT[EMIT]:getMore":
      if (action.postsChild && action.postsChild.length > 0) {
        return [...action.postsChild, ...state];
      }
      break;
  }
  return state;
};
