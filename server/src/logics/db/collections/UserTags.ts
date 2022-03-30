import Mongoose from 'mongoose';

export default class UserTags {
  collection: any;
  constructor(collection) {
    this.collection = collection;
    return this;
  }

  async update(setValues) {
    //    const _id = setValues._id ? setValues._id : new Mongoose.Types.ObjectId();
    const _id = new Mongoose.Types.ObjectId();
    const condition = { _id };
    const set = { $set: setValues };
    const option = { upsert: true };
    return this.collection.update(condition, set, option);
  }

  async findOne(condition) {
    return await this.collection.findOne(condition);
  }

  async find(condition, select = {}, option = {}) {
    return await this.collection.find(condition, select, option);
  }

  async remove(condition) {
    return await this.collection.remove(condition);
  }

  async save(setValues) {
    return await this.collection.save(setValues);
  }
}
