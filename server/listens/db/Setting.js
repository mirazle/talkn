import MongoDB from '~/server/listens/db/MongoDB';

export default class Setting {
  constructor( con ){
    this.db = MongoDB.getCollection( con, Setting.name );
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
