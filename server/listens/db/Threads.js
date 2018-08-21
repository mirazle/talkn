import MongoDB from '~/server/listens/db/MongoDB';
import Thread from '~/common/schemas/state/Thread';

export default class Threads {
  constructor( dbConnection ){
    this.collection = MongoDB.getCollection( dbConnection, Threads.name );
    return this;
  }

  getSchema( params = {} ){
    return new this.collection( params );
  }

  save( thread ){
    return new Promise( resolve => {
      thread.save(( error, response) => {
        if(error) console.warn( error );
        resolve({response, error});
      });
    });
  }

  update( condition = {}, set = {}, option = {} ){
    return new Promise( resolve => {
      this.collection.update( condition, set, option, ( error, response ) => {
        if(error) console.warn( error );
        resolve({response, error});
      });
    });
  }

  findOne( condition = {}, selector = {}, option = {} ){
    return new Promise( resolve => {
      this.collection.findOne( condition, selector, option, (error, response) => {
        if(error) console.warn( error );
        resolve({error, response});
      });
    });
  }

  find( condition = {}, selector = {}, option = {} ){
    return new Promise( resolve => {
      this.collection.find( condition, selector, option, (error, response) => {
        if(error) console.warn( error );
        resolve({error, response});
      });
    });
  }
}
