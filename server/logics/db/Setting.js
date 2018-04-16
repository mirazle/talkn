export default class Setting {
  constructor( db ){
    this.db = db;
    return this;
  }
  
  async findOne(){
    return await this.db.findOne();
  }
}
