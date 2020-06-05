export default class Users {
  collection: any;
  constructor(collection) {
    this.collection = collection;
    return this;
  }

  async getUserCnt(ch) {
    const condition = { ch };
    const { response: user } = await this.collection.find(condition, { _id: 1 });
    return user.length;
  }

  async find(requestState, setting) {
    const condition = {
      chs: requestState.thread.ch,
      _id: { $lt: requestState.user.offsetFindId },
    };
    const selector = {};
    const option = { limit: setting.server.findOnePostCnt, sort: { _id: -1 } };
    const result = await this.collection.find(condition, selector, option);
    result.response.reverse();
    return result;
  }

  async findOne(uid) {
    const condition = { uid };
    return await this.collection.findOne(condition);
  }

  async liveCnt(ch) {
    const condition = { ch };
    console.log(this.collection);
    const { response: liveCnt } = await this.collection.count(condition);
    return liveCnt;
  }

  async save(requestState) {
    const set = { ...requestState.thread, ...requestState.user };
    const option = { upsert: true };
    return this.collection.save(set, option);
  }

  async update(uid, ch) {
    const condition = { uid };
    const set = { $set: { ch } };
    const option = { upsert: true };
    return this.collection.update(condition, set, option);
  }

  async remove(uid) {
    return this.collection.remove(uid);
  }

  async removeAll() {
    return this.collection.removeAll();
  }
}
