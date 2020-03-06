import Posts from "api/store/Posts";

export default (state: any = new Posts(), action) => {
  switch (action.type) {
    case "API_TO_SERVER[REQUEST]:changeThread":
      return new Posts();
    case "UNMOUNT_POSTS_TIMELINE":
      return state.map(pt => {
        pt.dispFlg = pt.currentTime <= action.mediaCurrentTime;
        return pt;
      });
    case "CLEAR_POSTS_TIMELINE":
      return state.filter(pt => pt.currentTime <= action.mediaCurrentTime);
    case "SERVER_TO_API[EMIT]:find":
      if (action.postsTimeline && action.postsTimeline.length > 0) {
        return [...state, ...action.postsTimeline];
      }
      break;
    case "NEXT_POSTS_TIMELINE":
      if (action.postsTimeline && action.postsTimeline.length > 0) {
        return [...state, ...action.postsTimeline];
      }
      break;
    case "PREV_POSTS_TIMELINE":
      if (action.postsTimeline && action.postsTimeline.length > 0) {
        return [...action.postsTimeline];
      }
      break;
    case "SERVER_TO_API[BROADCAST]:post":
      if (
        action.postsTimeline &&
        action.postsTimeline.length > 0 &&
        action.postsTimeline[0].uid === action.user.uid &&
        action.postsTimeline[0].ch === action.thread.ch
      ) {
        if (action.postsTimeline && action.postsTimeline.length > 0) {
          return [...state, ...action.postsTimeline];
        }
      }
      break;
    case "SERVER_TO_API[EMIT]:getMore":
      if (action.postsTimeline && action.postsTimeline.length > 0) {
        return [...action.postsTimeline, ...state];
      }
      break;
  }
  return state;
};
