import Schema from '~/common/schemas/Schema';
import App from '~/common/schemas/state/User';

export default class Posts {
  constructor(){
    return [];
  }

  static getAnyActionPosts(action){
    const {app, posts} = action;
    const existPosts = posts && posts.length > 0;
    switch(app.dispThreadType){
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
