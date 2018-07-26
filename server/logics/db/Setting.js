export default class Setting {
  constructor( collection ){
    this.collection = collection;
    return this;
  }

  async findOne(){
    return await this.collection.findOne();
  }
}
