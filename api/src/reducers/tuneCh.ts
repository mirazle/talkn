import Post from 'api/store/Post';

export default (state: Post = new Post(), action) => {
  switch (action.type) {
    case 'SERVER_TO_API[EMIT]:tune':
      return new Post(action.thread.lastPost);
    case 'SERVER_TO_API[BROADCAST]:tune':
    case 'SERVER_TO_API[BROADCAST]:changeThread':
    case 'SERVER_TO_API[BROADCAST]:disconnect':
      const { thread } = action;
      if (thread.ch === state.ch) {
        return { ...state, liveCnt: thread.liveCnt };
      }
      break;
    case 'SERVER_TO_API[BROADCAST]:post':
      const post = action.posts[0];
      if (post.ch === state.ch) {
        return {
          ...state,
          title: post.title,
          stampId: post.stampId,
          favicon: post.favicon,
          post: post.post,
        };
      }
  }
  return state;
};
