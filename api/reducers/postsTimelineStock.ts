import PostsTimelineStock from "api/store/PostsTimelineStock";

export default (state: any = new PostsTimelineStock(), action) => {
  switch (action.type) {
    case "SERVER_TO_API[BROADCAST]:post":
      return action.postsTimelineStock ? [...state, action.postsTimelineStock] : state;
    case "CLEAR_POSTS_TIMELINE":
      return action.postsTimelineStock ? [...state, action.postsTimelineStock] : state;
    default:
      return action.postsTimelineStock ? new PostsTimelineStock(action.postsTimelineStock) : state;
  }
};
