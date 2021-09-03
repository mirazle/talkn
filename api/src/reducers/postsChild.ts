import Post from 'api/store/Post';
import Posts from 'api/store/Posts';

export default (state: Post[] = [], action) => {
  switch (action.type) {
    case 'API_TO_SERVER[REQUEST]:changeThread':
      return new Posts();
    case 'SERVER_TO_API[EMIT]:fetchPosts':
    case 'SERVER_TO_API[BROADCAST]:post':
      if (action.postsChild && action.postsChild.length > 0) {
        if (action.thread.ch === action.postsChild[0].ch) {
          return [...state, ...action.postsChild];
        }
      }
      break;
    case 'SERVER_TO_API[EMIT]:getMore':
      if (action.postsChild && action.postsChild.length > 0) {
        return [...action.postsChild, ...state];
      }
      break;
  }
  return state;
};
