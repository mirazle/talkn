import Posts from "api/store/Posts";
import conf from "common/conf";

export default (state: any = new Posts(), action) => {
  switch (action.type) {
    case "ON_CLICK_MULTISTREAM":
      return action.postsMulti;
    case "CLIENT_TO_SERVER[EMIT]:changeThread":
      return new Posts();
    case "SERVER_TO_API[EMIT]:fetchPosts":
      if (action.postsMulti && action.postsMulti.length > 0) {
        if (action.app.isRootCh) {
          return [...action.postsMulti];
        }
      }
      break;
    case "SERVER_TO_API[BROADCAST]:post":
      if (action.postsMulti && action.postsMulti.length > 0) {
        if (action.app.rootCh === action.thread.ch) {
          return [...state, ...action.postsMulti];
        }
      }
      break;
    case "SERVER_TO_API[EMIT]:getMore":
      if (action.postsMulti && action.postsMulti.length > 0) {
        let morePostMulit = [];

        if (state.length + action.postsMulti.length > conf.findOneLimitCnt) {
          morePostMulit = [...action.postsMulti, ...state];
          return morePostMulit.slice(0, conf.findOneLimitCnt);
        } else {
          return [...action.postsMulti, ...state];
        }
      }
      break;
  }
  return state;
};
