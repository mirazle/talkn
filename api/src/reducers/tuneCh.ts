import Post from 'api/store/Post';

export default (state: Post = new Post(), action) => {
  // console.log(action.type, action);
  switch (action.type) {
    case 'SERVER_TO_API[EMIT]:tune':
      if (action.thread.lastPost.ch === '') {
        return new Post({
          ch: action.thread.ch,
          chs: action.thread.chs,
          title: action.thread.title,
          favicon: action.thread.favicon,
        } as Post);
      } else {
        return new Post(action.thread.lastPost);
      }
    case 'SERVER_TO_API[BROADCAST]:tune':
    case 'SERVER_TO_API[BROADCAST]:changeThread':
    case 'SERVER_TO_API[BROADCAST]:disconnect':
      const { thread } = action;
      if (thread.ch === state.ch) {
        const post = { ...state, liveCnt: thread.liveCnt } as Post;
        return new Post(post);
      }
      break;
    case 'SERVER_TO_API[BROADCAST]:post':
      const post = action.posts[0];
      if (post.ch === state.ch) {
        return new Post({
          ...state,
          title: post.title,
          stampId: post.stampId,
          favicon: post.favicon,
          post: post.post,
        } as Post);
      }
  }
  return state;
};
