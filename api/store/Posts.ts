import App from "api/store/App";
import PostMulti from "api/store/PostMulti";
import PostsTimeline from "api/store/PostsTimeline";
import PostsTimelineZero from "api/store/PostsTimelineZero";
import PostsTimelineZeroAfter from "api/store/PostsTimelineZeroAfter";
import PostsTimelineStock from "api/store/PostsTimelineStock";
import PostsSingle from "api/store/PostsSingle";

export default class Posts {
  constructor(params = []) {
    return params;
  }

  static getDispPosts(state) {
    const { app, postsTimeline, postsMulti, postsSingle, postsChild, postsLogs } = state;
    switch (app.dispThreadType) {
      case App.dispThreadTypeTimeline:
        return postsTimeline;
      case App.dispThreadTypeMulti:
        return postsMulti;
      case App.dispThreadTypeSingle:
        return postsSingle;
      case App.dispThreadTypeChild:
        return postsChild;
      case App.dispThreadTypeLogs:
        return postsLogs;
    }
  }

  static getAnyActionPosts(action, state) {
    const { app, posts } = action;
    const existPosts = posts && posts.length > 0;
    action.postsMulti = new PostMulti();
    action.postsSingle = new PostsSingle();
    action.postsChild = [];
    action.postsLogs = [];
    switch (app.dispThreadType) {
      case App.dispThreadTypeTimeline:
        action = Posts.getAnyActionPostsTimeline(action, posts, state, existPosts);
        break;
      case App.dispThreadTypeMulti:
        action.postsMulti = existPosts ? posts : [];
        break;
      case App.dispThreadTypeSingle:
        action.postsSingle = existPosts ? posts : [];
        break;
      case App.dispThreadTypeChild:
        action.postsChild = existPosts ? posts : [];
        break;
      case App.dispThreadTypeLogs:
        action.postsLogs = existPosts ? posts : [];
        break;
    }
    return action;
  }
  static getAnyActionPostsTimeline(action, posts, state, existPosts) {
    if (action.type === "SERVER_TO_API[BROADCAST]:post") {
      action.postsTimeline = new PostsTimeline();
      action.postsTimeline.push(action.posts[0]);
      // find, getMore.
    } else if (action.type === "SERVER_TO_API[EMIT]:find") {
      action.postsTimeline = new PostsTimeline();
      action.postsTimelineStock = new PostsTimelineStock();

      if (existPosts) {
        const postsLength = posts.length;
        for (let i = 0; i < postsLength; i++) {
          if (posts[i].currentTime === 0) {
            action.postsTimeline.push(posts[i]);
          } else {
            action.postsTimelineStock.push(posts[i]);
          }
        }
      }
    }
    return action;
  }
}
