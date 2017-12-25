export default class Posts {

  constructor( db ){
    this.db = db;
    return this;
  }

  async find( connection, selector = {}, option = {} ){
    const condition = {connection};
    return await this.db.find( condition, selector, option );
  }
}
