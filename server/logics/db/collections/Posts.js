import mongoose from 'mongoose';
import PostSchema from '~/common/schemas/state/Post';
import Thread from '~/common/schemas/state/Thread'
import conf from '~/common/conf'

export default class Posts {

  constructor( collection ){
    this.collection = collection;
    return this;
  }

  async getCounts( requestState, threadStatus = {isMultistream: false, isMediaConnection: false} ){
    const { connection } = requestState.thread;
    const { isMultistream, isMediaConnection } = threadStatus;
    let condition = {}
    if( isMediaConnection ){
      condition = {connection, currentTime: 0};
    }else{
      condition = isMultistream ? {connections: connection} : {connection};
    }
    const {response: postCnt} = await this.collection.count( condition );
    return postCnt;
  }

  async count( requestState ){
    const { connection } = requestState.thread;
    const condition = {connection};
    return await this.collection.find( condition ).count();
  }

  async find( requestState, setting, status = {
    isMultistream: false,
    getMore: false,
    isMediaConnection: false
  }){
    const { isMultistream, getMore, isMediaConnection } = status;
    const { thread, app } = requestState;
    const { connection } = thread;
    const getDirection = getMore ? '$lt' : '$gt';
    const connectionPart = isMultistream ? {connections: connection} : {connection};
    const currentTimePart = isMediaConnection ? {} : {currentTime: 0};
    const condition = {
      ...currentTimePart,
      ...connectionPart,
      _id: { [ getDirection ]: mongoose.Types.ObjectId( app.offsetFindId ) },
    };

    const sort = isMediaConnection ? {currentTime: 1} : {_id: -1};
    const limit = isMediaConnection ? conf.findOneLimitCnt : conf.findOnePostCnt;
    const selector = {};
    const option = {limit, sort};
    const result = await this.collection.find( condition, selector, option );

    if( !isMediaConnection ){
      result.response.reverse();
    }

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
      title: thread.title,
      post: app.inputPost,
      currentTime: app.inputCurrentTime,
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
