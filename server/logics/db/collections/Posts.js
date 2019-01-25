import mongoose from 'mongoose';
import PostSchema from '~/common/schemas/state/Post';
import Thread from '~/common/schemas/state/Thread'

export default class Posts {

  constructor( collection ){
    this.collection = collection;
    return this;
  }

  async getCounts( requestState, isMultistream = false ){
    const { connection } = requestState.thread;
    const condition = isMultistream ? {connections: connection} : {connection};
    const {response: postCnt} = await this.collection.count( condition );
    return postCnt;
  }

  async count( requestState ){
    const { connection } = requestState.thread;
    const condition = {connection};
    return await this.collection.find( condition ).count();
  }

  async find( requestState, setting, isMultistream = false, getMore = false ){
    const { thread, user } = requestState;
    const { connection } = thread;

    const getDirection = getMore ? '$lt' : '$gt';
    const condition_part = isMultistream ? {connections: connection} : {connection};
    const condition = {
      ...condition_part,
      _id: { [ getDirection ]: mongoose.Types.ObjectId( user.offsetFindId ) },
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
      layer: Thread.getLayer( thread.connection ),
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

  getOffsetFindId( posts, user ){

    if( posts[ 0 ] && posts[ 0 ]._id ){
      return posts[ 0 ]._id;
    }
/*
    if( user && user.offsetFindId ){
      return user.offsetFindId;
    }
*/
    return PostSchema.defaultFindId;
  }
}
