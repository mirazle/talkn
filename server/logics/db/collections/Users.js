import User from '~/common/schemas/state/User';
import Logics from '~/server/logics';

export default class Users {

  constructor( collection ){
    this.collection = collection;
    return this;
  }

  async getConnectionCnt( connection ){
    const condition = {connection}
    const {response: user} = await this.collection.find( condition );
    return user.length;
  }

  async find( requestState, setting ){
    const condition = {
      connections: requestState.thread.connection,
      _id: {$lt: requestState.user.offsetFindId},
    };
    const selector = {};
    const option = {limit: setting.server.findOnePostCnt, sort: {_id: -1}};
    const result = await this.collection.find( condition, selector, option );
    result.response.reverse();
    return result;
  }

  async findOne( uid ){
    const condition = {uid};
    return await this.collection.findOne( condition );
  }

  async save( requestState ){
    const set = {...requestState.thread, ...requestState.user };
    const option = {upsert:true};
    return this.collection.save( set, option );
  }

  async update( uid, connection ){
    const condition = {uid};
    const set = { $set:{ connection } };
    const option = {upsert:true};
    return this.collection.update( condition, set, option );
  }

  async remove( uid ){
    return this.collection.remove( uid );
  }

  async removeAll(){
    return this.collection.removeAll();
  }

  static getNewUser(type, app, thread, posts, user){

    const connectioned  = thread.connection;
    let dispThreadType = User.dispThreadTypeSingle;

    switch(type){
    case 'find':
      dispThreadType = user.dispThreadType;
      break;
    case 'changeThread':
      dispThreadType = user.isRootConnection ? user.dispThreadType : User.dispThreadTypeChild;
      break;
    case 'getMore':
      dispThreadType = user.dispThreadType;
      break;
    default:
      dispThreadType = user.isRootConnection ? User.dispThreadTypeMulti : User.dispThreadTypeSingle;
      break;
    }

    const offsetFindId = Logics.db.posts.getOffsetFindId( posts, user );
    const multistreamed = dispThreadType === User.dispThreadTypeMulti;
    return {...user,
      connectioned,
      offsetFindId,
      dispThreadType,
      multistreamed
    };
  }
}
