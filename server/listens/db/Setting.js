import MongoDB from '~/server/listens/db/MongoDB';

export default class Setting {
  constructor( dbConnection ){
    this.collection = MongoDB.getCollection( dbConnection, Setting.name );
    return this;
  }

  getSchema( params = {} ){
    return new this.collection( params );
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
