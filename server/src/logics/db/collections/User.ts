export default class User {
  collection: any;
  constructor(collection) {
    this.collection = collection;
    return this;
  }

  async findOne(email, isGetSchema = false) {
    const condition = { email };
    const result = await this.collection.findOne(condition);
    if (isGetSchema && result.response === null) {
      result.response = this.collection.getSchema({ email });
    }
    return result;
  }

  async update(email, setValues) {
    const condition = { email };
    const set = { $set: setValues };
    const option = { upsert: true };
    return this.collection.update(condition, set, option);
  }

  async save(email, key, value) {
    const { response: resThread } = await this.collection.save({ email, key, value });
    return resThread;
  }
}
