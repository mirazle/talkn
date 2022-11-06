import Post from 'api/store/Post';
import PostsTimelineZeroAfter from 'api/store/PostsTimelineZeroAfter';

export default (state: Post[] = [], action) => {
  switch (action.type) {
    case 'SERVER_TO_API[BROADCAST]:post':
      return action.postsTimelineZeroAfter ? [...state, action.postsTimelineZeroAfter] : state;
    case 'CLEAR_POSTS_TIMELINE':
      return action.postsTimelineZeroAfter ? [...state, action.postsTimelineZeroAfter] : state;
    default:
      return action.postsTimelineZeroAfter ? new PostsTimelineZeroAfter(action.postsTimelineZeroAfter) : state;
  }
};
