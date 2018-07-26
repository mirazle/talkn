import MongoDB from '~/server/listens/db/MongoDB';

export default class Posts {
  constructor( dbConnection ){
    this.collection = MongoDB.getCollection( dbConnection, Posts.name );
//    this.find = this.find.bind(this);
//    this.save = this.save.bind(this);
//    this.update = this.update.bind(this);
    return this;
  }

  count(condition){
    return new Promise( resolve => {
      this.collection.count( condition, (error, response) => {
        if(error) console.warn( error );
        resolve({error, response});
      });
    });
  }

  find(condition, selector, option){
    return new Promise( resolve => {
      this.collection.find( condition, selector, option, (error, response) => {
        if(error) console.warn( error );
        resolve({error, response});
      });
    });
  }

  save( set = {}, option = {} ){
    return new Promise( resolve => {
      const post = new this.collection( set );
      post.save(( error, response) => {
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
}
