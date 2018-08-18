import Thread from '~/common/schemas/state/Thread';
import Logics from '~/server/logics';

export default class Posts {

  constructor( collection ){
    this.collection = collection;
    return this;
  }

  async getCounts( requestState ){
    const { connection } = requestState.thread;
    const condition = {connection};
    const multiCondition = {connections: connection};
    const {response: postCnt} = await this.collection.count( condition );
    return postCnt;
  }

  async count( requestState ){
    const { connection } = requestState.thread;
    const condition = {connection};
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
    const { app, user, thread } = requestState;
    const post = this.collection.getSchema({
      protocol: thread.protocol,
      connection: thread.connection,
      connections: thread.connections,
      uid: user.uid,
      utype: user.utype,
      favicon: thread.favicon,
      post: app.inputPost,
      data: '',
      updateTime: new Date(),
    });
    return post.save();
  }

  async update( requestState, posts ){
    const condition = {connection: requestState.connection};
    const set = { connection: requestState.connection, ...posts };
    const option = {upsert:true};
    return this.collection.update( condition, set, option );
  }

  async getSchema( params = {} ){
    return this.collection.getSchema( params );
  }
}
