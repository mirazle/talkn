import App from "api/store/App";
import PostMulti from "api/store/PostMulti";
import PostTimeline from "api/store/PostTimeline";
import PostSingle from "api/store/PostSingle";

export default class Posts {
  constructor() {
    return [];
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

  static getAnyActionPosts(action) {
    const { app, posts } = action;
    const existPosts = posts && posts.length > 0;
    action.postsMulti = new PostMulti();
    action.postsTimeline = new PostTimeline();
    action.postsSingle = new PostSingle();
    action.postsChild = [];
    action.postsLogs = [];
    switch (app.dispThreadType) {
      case App.dispThreadTypeTimeline:
        action.postsTimeline = existPosts ? posts : [];
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
}
