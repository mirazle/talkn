import MongoDB from '~/server/listens/db/MongoDB';
import Thread from '~/common/schemas/state/Thread';

export default class Threads {
  constructor( dbConnection ){
    this.collection = MongoDB.getCollection( dbConnection, Threads.name );
//    this.findOne = this.findOne.bind(this);
//    this.save = this.save.bind(this);
//    this.update = this.update.bind(this);
    return this;
  }

  getSchema( params = {} ){
    return new this.collection( params );
  }

  save( set = {}, option = {} ){
    return new Promise( resolve => {
      const thread = new this.collection( set );
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
