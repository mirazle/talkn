import Thread from '~/../common/schemas/state/Thread';

export default class Posts {

  constructor( db ){
    this.db = db;
    return this;
  }

  async find( connection, selector = {}, option = {} ){
    const condition = {connection};
    return await this.db.find( condition, selector, option );
  }

  async save( requestState ){
    const connections = Thread.getConnections( requestState.connection );
    const set = {connections, ...requestState};
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
