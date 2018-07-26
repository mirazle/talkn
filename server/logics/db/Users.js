
export default class Users {

  constructor( collection ){
    this.collection = collection;
    return this;
  }

  async count( requestState ){
    const condition = {
      connection: requestState.thread.connection,
    };
    return await this.collection.find( condition ).count();
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

  async update( uid, users ){
    const condition = {uid};
    const set = { ...users };
    const option = {upsert:true};
    return this.collection.update( condition, set, option );
  }

  async remove( uid ){
    return this.collection.remove( uid );
  }

  async removeAll(){
    return this.collection.removeAll();
  }
}
