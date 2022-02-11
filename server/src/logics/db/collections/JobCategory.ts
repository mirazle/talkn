export default class JobCategory {
  collection: any;
  constructor(collection) {
    this.collection = collection;
    return this;
  }

  async find(id?: string) {
    const condition = id ? { id } : {};
    const selector = {};
    const option = {};
    return await this.collection.find(condition, selector, option);
  }
  async insertMany(data) {
    return await this.collection.insertMany(data);
  }
  async removeAll() {
    return this.collection.removeAll();
  }
}
