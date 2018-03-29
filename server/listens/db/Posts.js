import MongoDB from './MongoDB';

export default class Posts {
  constructor( con ){
    this.db = MongoDB.getCollection( con, Posts.name );
    this.find = this.find.bind(this);
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    return this;
  }

  count(condition){
    return new Promise( resolve => {
      this.db.count( condition, (error, response) => {
        if(error) console.warn( error );
        resolve({error, response});
      });
    });
  }

  find(condition, selector, option){
    return new Promise( resolve => {
      this.db.find( condition, selector, option, (error, response) => {
        if(error) console.warn( error );
        resolve({error, response});
      });
    });
  }

  save( set = {}, option = {} ){
    return new Promise( resolve => {
      const post = new this.db( set );
      post.save(( error, response) => {
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
}
