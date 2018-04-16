
export default class Users {

  constructor( db ){
    this.db = db;
    return this;
  }

  async count( requestState ){
    const condition = {
      connection: requestState.thread.connection,
    };
    return await this.db.find( condition ).count();
  }

  async find( requestState, setting ){
    const condition = {
      connections: requestState.thread.connection,
      _id: {$lt: requestState.user.offsetFindId},
    };
    const selector = {};
    const option = {limit: setting.server.findOnePostCnt, sort: {_id: -1}};
    const result = await this.db.find( condition, selector, option );
    result.response.reverse();
    return result;
  }

  async findOne( uid ){
    const condition = {uid};
    return await this.db.findOne( condition );
  }

  async save( requestState ){
    const set = {...requestState.thread, ...requestState.user };
    const option = {upsert:true};
    return this.db.save( set, option );
  }

  async update( uid, users ){
    const condition = {uid};
    const set = { ...users };
    const option = {upsert:true};
    return this.db.update( condition, set, option );
  }

  async remove( uid ){
    return this.db.remove( uid );
  }

  async removeAll(){
    return this.db.removeAll();
  }
}
