import MongoDB from '~/db/MongoDB';

export default class Posts {
  constructor( con ){
    this.db = MongoDB.getCollection( con, Posts.name );
    this.find = this.find.bind(this);
    this.save = this.save.bind(this);
    return this;
  }

  find(condition, selector, option){
    return new Promise( resolve => {
      this.db.find( condition, selector, option, (error, response) => {
        if(error) console.warn( error );
        resolve({error, response});
      });
    });
  }

  save(){
    return new Promise( resolve => {
      this.db.save( condition, selector, option, (error, response) => {
        if(error) console.warn( error );
        resolve({error, response});
      });
    });
  }
}
