import MongoDB from '~/db/MongoDB';

export default class Setting {
  constructor( con ){
    this.db = MongoDB.getCollection( con, 'Setting' );
    this.findOne = this.findOne.bind(this);
    return this;
  }

  findOne( condition = {}, selector = {}, option = {}){
    return new Promise( resolve => {
      this.db.findOne( (error, response) => {
        if(error) throw error;
        resolve(response);
      });
    });
  }
}
