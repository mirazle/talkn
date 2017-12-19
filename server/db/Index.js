
import MongoDB from '~/db/MongoDB';

export default class Index {
  constructor( con ){
    this.db = MongoDB.getCollection( con, 'Index' );
    this.update = this.update.bind(this);
    return this;
  }

  findOne( condition = {}, selector = {}, option = {} ){
    return new Promise( resolve => {
      this.db.findOne( condition, selector, option, (error, response) => {
        if(error) throw error;
        resolve(response);
      });
    });
  }

  update( condition = {}, set = {}, option = {} ){
    return new Promise( resolve => {
      this.db.update( condition, set, option, (error, response) => {
        if(error) throw error;
        resolve(response);
      });
    });
  }
}
