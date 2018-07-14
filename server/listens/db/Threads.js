import MongoDB from '~/server/listens/db/MongoDB';
import Thread from '~/common/schemas/state/Thread';

export default class Threads {
  constructor( con ){
    this.db = MongoDB.getCollection( con, Threads.name );
    this.findOne = this.findOne.bind(this);
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    return this;
  }

  save( set = {}, option = {} ){
    return new Promise( resolve => {
      const thread = new this.db( set );
      thread.save(( error, response) => {
        if(error) console.warn( error );
        resolve({response, error});
      });
    });
  }

  update( condition = {}, set = {}, option = {} ){
    return new Promise( resolve => {
      this.db.update( condition, set, option, ( error, response ) => {
        if(error) console.warn( error );
        resolve({response, error});
      });
    });
  }

  findOne( condition = {}, selector = {}, option = {} ){
    return new Promise( resolve => {
      this.db.findOne( condition, selector, option, (error, response) => {
        if(error) console.warn( error );
        resolve({error, response});
      });
    });
  }

  find( condition = {}, selector = {}, option = {} ){
    return new Promise( resolve => {
      this.db.find( condition, selector, option, (error, response) => {
        if(error) console.warn( error );
        resolve({error, response});
      });
    });
  }
}
