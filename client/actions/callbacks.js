
export default {
  scrollThread: () => {
    return {type: 'SCROLL_THREAD'};
  },
  endAnimateScrollTo: () => {
    return {type: 'END_ANIMATE_SCROLL_TO'};
  },
  createNotif: () => {
    return {
      type: 'CREATE_NOTIF'
    };
  },
  updatePostsHeight: (postsHeight) => {
    return {
      type: 'UPDATE_POSTS_HEIGHT',
      app: {postsHeight}
    };
  }
}
