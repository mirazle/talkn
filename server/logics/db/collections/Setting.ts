export default class Setting {
  collection: any;
  constructor(collection) {
    this.collection = collection;
    return this;
  }

  async findOne(buildinSchema = true) {
    let responses = await this.collection.findOne();
    if (buildinSchema) {
      if (!responses || !responses.response) {
        responses = await this.collection.getSchema();
      }
    }
    return responses;
  }
}
