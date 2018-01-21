import Thread from '~/../common/schemas/state/Thread';

export default class Posts {

  constructor( db ){
    this.db = db;
    return this;
  }

  async find( requestState ){
    const condition = {
      connection: requestState.thread.connection,
      createTime: {$gt: requestState.user.offsetPostCreateTime},
    };
    const selector = {};
    const option = {limit: 20};
    return await this.db.find( condition, selector, option );
  }

  async save( requestState ){
    const connections = Thread.getConnections( requestState.thread.connection );
    const set = {connections, ...requestState.thread, ...requestState.user };
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
