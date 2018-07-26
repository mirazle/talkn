import MongoDB from '~/server/listens/db/MongoDB';

export default class Setting {
  constructor( dbConnection ){
    this.collection = MongoDB.getCollection( dbConnection, Setting.name );
//    this.findOne = this.findOne.bind(this);
    return this;
  }

  findOne( condition = {}, selector = {}, option = {}){
    return new Promise( resolve => {
      this.collection.findOne( (error, response) => {
        if(error) throw error;
        resolve(response);
      });
    });
  }
}
