
import MongoDB from '~/db/MongoDB';

export default class Threads {
  constructor( con ){
    this.db = MongoDB.getCollection( con, Threads.name );
    this.save = this.save.bind(this);
    return this;
  }

  save( condition = {}, set = {}, option = {} ){
    return new Promise( resolve => {
      this.db.update( condition, set, option, (error, response) => {
        if(error) throw error;
        resolve(response);
      });
    });
  }

  findOne( condition = {}, selector = {}, option = {} ){
    return new Promise( resolve => {
      this.db.findOne( condition, selector, option, (error, response) => {
        if(error) throw error;
        resolve(response);
      });
    });
  }
}
