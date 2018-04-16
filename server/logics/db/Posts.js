import Thread from '~/../common/schemas/state/Thread';

export default class Posts {

  constructor( db ){
    this.db = db;
    return this;
  }

  async getCounts( connection ){
    const condition = {connection};
    const multiCondition = {connections: connection};
    const {response: postCnt} = await this.db.count( condition );
    const {response: multiPostCnt} = await this.db.count( multiCondition );
    return {postCnt, multiPostCnt};
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

  async save( requestState ){
    const connections = Thread.getConnections( requestState.thread.connection );
    const post = requestState.app.inputPost;
    const set = {connections, ...requestState.thread, ...requestState.user, post };
    const option = {upsert:true};
    return this.db.save( set, option );
  }

  async update( requestState, posts ){
    const condition = {connection: requestState.connection};
    const set = { connection: requestState.connection, ...posts };
    const option = {upsert:true};
    return this.db.update( condition, set, option );
  }
}
