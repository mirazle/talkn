import Thread from '~/common/schemas/state/Thread';

export default class Posts {

  constructor( collection ){
    this.collection = collection;
    return this;
  }

  async getCounts( connection ){
    const condition = {connection};
    const multiCondition = {connections: connection};
    const {response: postCnt} = await this.collection.count( condition );
    const {response: multiPostCnt} = await this.collection.count( multiCondition );
    return {postCnt, multiPostCnt};
  }

  async count( requestState ){
    const condition = {
      connection: requestState.thread.connection,
    };
    return await this.collection.find( condition ).count();
  }

  async find( requestState, setting ){
    const condition = {
      connection: requestState.thread.connection,
      _id: {$lt: requestState.user.offsetFindId},
    };
    const selector = {};
    const option = {limit: setting.server.findOnePostCnt, sort: {_id: -1}};
    const result = await this.collection.find( condition, selector, option );
    result.response.reverse();
    return result;
  }

  async save( requestState ){
    const connections = Thread.getConnections( requestState.thread.connection );
    const post = requestState.app.inputPost;
    const set = {connections, ...requestState.thread, ...requestState.user, post };
    const option = {upsert:true};
    return this.collection.save( set, option );
  }

  async update( requestState, posts ){
    const condition = {connection: requestState.connection};
    const set = { connection: requestState.connection, ...posts };
    const option = {upsert:true};
    return this.collection.update( condition, set, option );
  }
}
