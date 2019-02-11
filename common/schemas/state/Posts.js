import Schema from '~/common/schemas/Schema';
import User from '~/common/schemas/state/User';

export default class Posts {
  constructor(){
    return [];
  }

  static getAnyActionPosts(action){
    const {user, posts} = action;
    const existPosts = posts && posts.length > 0;
    switch(user.dispThreadType){
    case User.dispThreadTypeMulti:
      action.postsMulti = existPosts ? posts : [];
      break;
    case User.dispThreadTypeSingle:
      action.postsSingle = existPosts ? posts : [];
      break;
    case User.dispThreadTypeChild:
      action.postsChild = existPosts ? posts : [];
      break;
    case User.dispThreadTypeLogs:
      action.postsLogs = existPosts ? posts : [];
      break;
    }
    return action;
  }
}
