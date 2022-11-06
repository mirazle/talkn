import App from 'api/store/App';
import Post from 'api/store/Post';
import PostMulti from 'api/store/PostMulti';
import PostsSingle from 'api/store/PostsSingle';
import PostsTimeline from 'api/store/PostsTimeline';
import PostsTimelineStock from 'api/store/PostsTimelineStock';

export default class Posts {
  constructor(params: Post[] = []) {
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
    if (action.type === 'SERVER_TO_API[BROADCAST]:post') {
      action.postsTimeline = new PostsTimeline();
      action.postsTimeline.push(action.posts[0]);
    } else if (action.type === 'SERVER_TO_API[EMIT]:fetchPosts') {
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
