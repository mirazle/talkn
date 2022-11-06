import Mongoose from 'mongoose';

import conf from 'common/conf';

import Post from 'api/store/Post';
import Thread from 'api/store/Thread';

export default class Posts {
  collection: any;
  constructor(collection) {
    this.collection = collection;
    return this;
  }

  async getCounts(requestState, threadStatus = { isMultistream: false, isMediaCh: false }) {
    const { ch } = requestState.thread;
    const { isMultistream, isMediaCh } = threadStatus;
    let condition: any = {};
    condition.currentTime = 0;
    if (isMediaCh) {
      condition.ch = ch;
    } else {
      if (isMultistream) {
        condition.chs = ch;
      } else {
        condition.ch = ch;
      }
    }
    const { response: postCnt } = await this.collection.count(condition);
    return postCnt;
  }

  async count(requestState) {
    const { ch } = requestState.thread;
    const condition = { ch };
    return await this.collection.find(condition).count();
  }

  async find(
    requestState,
    setting,
    status = {
      dispType: '',
      isCreate: false,
      isRequireUpsert: false,
      isMultistream: false,
      isMediaCh: false,
      isToggleMultistream: false,
      getMore: false,
    }
  ) {
    const { isMultistream, getMore, isMediaCh } = status;
    const { thread, app } = requestState;
    let { ch } = thread;
    const offsetFindId = app && app.offsetFindId ? app.offsetFindId : Post.defaultFindId;
    const getDirection = getMore ? '$lt' : '$gt';
    const chPart = isMultistream ? { chs: ch } : { ch };
    const currentTimePart = isMediaCh ? {} : {};
    const condition = {
      ...currentTimePart,
      ...chPart,
      _id: { [getDirection]: new Mongoose.Types.ObjectId(offsetFindId) },
    };

    const sort = isMediaCh ? { currentTime: 1 } : { createTime: -1, _id: -1 };
    const limit = isMediaCh ? conf.findOneLimitCnt : conf.findOnePostCnt;
    const selector = {};
    const option = { limit, sort };
    const result = await this.collection.find(condition, selector, option);

    if (!isMediaCh) {
      result.response.reverse();
    }
    return result;
  }

  async save(requestState) {
    const { app, user, thread } = requestState;
    const post = this.collection.getSchema({
      protocol: thread.protocol,
      ch: thread.ch,
      chs: thread.chs,
      layer: Thread.getLayer(thread.ch),
      uid: user.uid,
      utype: user.utype,
      favicon: thread.favicon,
      title: thread.title,
      post: app.inputPost,
      stampId: app.inputStampId ? app.inputStampId : 0,
      findType: thread.findType,
      currentTime: app.inputCurrentTime,
      data: '',
      updateTime: new Date(),
    });
    return post.save();
  }

  async update(requestState, posts) {
    const condition = { ch: requestState.ch };
    const set = { ch: requestState.ch, ...posts };
    const option = { upsert: true };
    return this.collection.update(condition, set, option);
  }

  async getSchema(params = {}) {
    return this.collection.getSchema(params);
  }
}
