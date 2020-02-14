export default {
  endAnimateScrollTo: () => {
    return { type: "END_ANIMATE_SCROLL_TO" };
  },
  updatePostsHeight: postsHeight => {
    return {
      type: "UPDATE_POSTS_HEIGHT",
      app: { postsHeight }
    };
  }
};
