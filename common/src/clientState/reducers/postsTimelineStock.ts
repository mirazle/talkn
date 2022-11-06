import Post from 'api/store/Post';
import PostsTimelineStock from 'api/store/PostsTimelineStock';

export default (state: Post[] = [], action) => {
  switch (action.type) {
    case 'SERVER_TO_API[BROADCAST]:post':
      return action.postsTimelineStock ? [...state, action.postsTimelineStock] : state;
    case 'CLEAR_POSTS_TIMELINE':
      return action.postsTimelineStock ? [...state, action.postsTimelineStock] : state;
    default:
      return action.postsTimelineStock ? new PostsTimelineStock(action.postsTimelineStock) : state;
  }
};
