import Post from 'api/store/Post';
import PostsTimeline from 'api/store/PostsTimeline';

export default (state: Post[] = [], action) => {
  switch (action.type) {
    case 'API_TO_SERVER[REQUEST]:changeThread':
      return new PostsTimeline();
    case 'UNMOUNT_POSTS_TIMELINE':
      return state.map((pt) => {
        pt.dispFlg = pt.currentTime <= action.mediaCurrentTime;
        return pt;
      });
    case 'CLEAR_POSTS_TIMELINE':
      return [...action.postsTimeline];
    case 'SERVER_TO_API[EMIT]:fetchPosts':
      if (action.postsTimeline && action.postsTimeline.length > 0) {
        return [...state, ...action.postsTimeline];
      }
      break;
    case 'NEXT_POSTS_TIMELINE':
      if (action.postsTimeline && action.postsTimeline.length > 0) {
        return [...state, ...action.postsTimeline];
      }
      break;
    case 'PREV_POSTS_TIMELINE':
      if (action.postsTimeline && action.postsTimeline.length > 0) {
        return [...action.postsTimeline];
      }
      break;
    case 'SERVER_TO_API[BROADCAST]:post':
      if (
        action.postsTimeline &&
        action.postsTimeline.length > 0 &&
        action.postsTimeline[0].uid === action.user.uid &&
        action.postsTimeline[0].ch === action.thread.ch
      ) {
        return [...state, ...action.postsTimeline];
      }
      break;
    case 'SERVER_TO_API[EMIT]:getMore':
      if (action.postsTimeline && action.postsTimeline.length > 0) {
        return [...action.postsTimeline, ...state];
      }
      break;
  }
  return state;
};
