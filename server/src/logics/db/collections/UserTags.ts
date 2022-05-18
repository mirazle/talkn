export default class UserTags {
  collection: any;
  constructor(collection) {
    this.collection = collection;
    return this;
  }

  async update(condition, setValues) {
    const set = { $set: setValues };
    const option = { upsert: true, new: true };
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
