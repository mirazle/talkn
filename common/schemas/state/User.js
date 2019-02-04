import Schema from '~/common/schemas/Schema';
import Post from '~/common/schemas/state/Post';

export default class User extends Schema{

  static get defaultOffsetFindId(){ return Post.defaultFindId }
  static get dispThreadTypeSingle(){ return 'Single' }
  static get dispThreadTypeMulti(){ return 'Multi' }
  static get dispThreadTypeChild(){ return 'Child' }
  static get dispThreadTypeLogs(){ return 'Logs' }

  constructor( params = {} ){
    super();
    const uid = params && params.uid ? params.uid : '';
    const utype = params && params.utype ? params.utype : '';
    const href = User.getHref( params );
    const dispThreadType = params && params.dispThreadType ? params.dispThreadType : User.dispThreadTypeSingle;
    const connectioned = params && params.connectioned ? params.connectioned : '';
    const multistreamed = params && params.multistreamed ? params.multistreamed : false;
    const actioned = params && params.actioned ? params.actioned : "";
    const offsetFindId = params && params.offsetFindId ? params.offsetFindId : User.defaultOffsetFindId ;
    const offsetSingleFindId = params && params.offsetSingleFindId ? params.offsetSingleFindId : User.defaultOffsetFindId ;
    const offsetMultiFindId = params && params.offsetMultiFindId ? params.offsetMultiFindId : User.defaultOffsetFindId ;
    const offsetChildFindId = params && params.offsetChildFindId ? params.offsetChildFindId : User.defaultOffsetFindId ;
    const offsetLogsFindId = params && params.offsetLogsFindId ? params.offsetLogsFindId : User.defaultOffsetFindId ;
    const friends = [];
    return this.create({
      uid,
      utype,
      href,
      dispThreadType,
      connectioned,
      multistreamed,
      actioned,
      offsetFindId,
      offsetSingleFindId,
      offsetMultiFindId,
      offsetChildFindId,
      offsetLogsFindId,
      friends,
    });
  }

  static getStepToDispThreadType( {app, user}, toConnection ){
    const beforeDispThreadType = user.dispThreadType;
    user = User.getStepDispThreadType({app, user}, toConnection);
    const afterDispThreadType = user.dispThreadType;
    return {user, stepTo: `${beforeDispThreadType} to ${afterDispThreadType}`};
  }

  static getStepDispThreadType( {app, user}, toConnection ){
    if(app.rootConnection === toConnection){
      if(app.multistream){
        user.dispThreadType = User.dispThreadTypeMulti;
        user.offsetFindId = user.offsetMultiFindId;
      }else{
        user.dispThreadType = User.dispThreadTypeSingle;
        user.offsetFindId = user.offsetSingleFindId;
      }
    }else{
      user.dispThreadType = User.dispThreadTypeChild;
      user.offsetFindId = user.offsetChildFindId;
    }
    return user;
  }

  static getOffsetFindId({posts}){
    if( posts && posts[ 0 ] && posts[ 0 ]._id ){
      return posts[ 0 ]._id;
    }
    return Post.defaultFindId;
  }

  static getHref( params = {} ){
    if( typeof window !== 'undefined' && window.location && window.location.href ){
      return window.location.href;
    }

    if( params && params.href ){
      return params.href;
    }
    return '/';
  }
}
