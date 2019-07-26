import Schema from '~/common/schemas/Schema';
import App from '~/common/schemas/state/App';

export default class Posts {
  constructor(){
    return [];
  }

  static getDispPosts(state){
    const {app, postsTimeline, postsMulti, postsSingle, postsChild, postsLogs} = state;
    switch(app.dispThreadType){
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

  static getAnyActionPosts(action){
    const {app, posts} = action;
    const existPosts = posts && posts.length > 0;
    switch(app.dispThreadType){
    case App.dispThreadTypeTimeline:
      console.log("@ TIMELINE");
      action.postsTimeline = existPosts ? posts : [];
      break;
    case App.dispThreadTypeMulti:
        console.log("@ MULTI");
      action.postsMulti = existPosts ? posts : [];
      break;
    case App.dispThreadTypeSingle:
        console.log("@ SINGLE");
      action.postsSingle = existPosts ? posts : [];
      break;
    case App.dispThreadTypeChild:
        console.log("@ CHILD");
      action.postsChild = existPosts ? posts : [];
      break;
    case App.dispThreadTypeLogs:
        console.log("@ LOGS");
      action.postsLogs = existPosts ? posts : [];
      break;
    }
    return action;
  }
}
