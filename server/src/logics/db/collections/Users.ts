export default class Users {
  collection: any;
  constructor(collection) {
    this.collection = collection;
    return this;
  }

  async findOne(condition, isGetSchema = false) {
    const result = await this.collection.findOne(condition);
    if (isGetSchema && result.response === null) {
      result.response = this.collection.getSchema(condition);
    }
    return result;
  }

  async find(condition) {
    const result = await this.collection.find(condition);
    return result;
  }

  async update(condition, setValues) {
    const set = { $set: setValues };
    const option = { upsert: true };
    return this.collection.update(condition, set, option);
  }

  async findOneAndUpdate(condition, setValues, option = {}) {
    const set = { $set: setValues };
    return this.collection.findOneAndUpdate(condition, set, option);
  }

  async save(email, key, value) {
    const { response: resThread } = await this.collection.save({ email, key, value });
    return resThread;
  }
}
