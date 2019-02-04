import Schema from '~/common/schemas/Schema';
import User from '~/common/schemas/state/User';

export default class Posts {
  constructor(){
    return [];
  }

  static getAnyActionPosts(action){
    const {user, posts} = action;
    switch(user.dispThreadType){
    case User.dispThreadTypeMulti:
      action.postsMulti = posts;
      break;
    case User.dispThreadTypeSingle:
      action.postsSingle = posts;
      break;
    case User.dispThreadTypeChild:
      action.postsChild = posts;
      break;
    case User.dispThreadTypeLogs:
      action.postsLogs = posts;
      break;
    }
    return action;
  }
}
