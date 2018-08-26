import MongoDB from '~/server/listens/db/MongoDB';

export default class Posts {
  constructor( dbConnection ){
    this.collection = MongoDB.getCollection( dbConnection, Posts.name );
    return this;
  }

  getSchema( params = {} ){
    return new this.collection( params );
  }

  count(condition){
    return new Promise( resolve => {
      this.collection.countDocuments( condition, (error, response) => {
        if(error) console.warn( error );
        resolve({error, response});
      });
    });
  }

  find(condition, selector, option){
    console.log("@@@@@@@ Posts");
    console.log( condition );
    console.log( selector );
    console.log( option );
    return new Promise( resolve => {
      this.collection.find( condition, (error, response) => {
//      this.collection.find( condition, selector, option, (error, response) => {
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
      this.collection.updateMany( condition, set, option, ( error, response ) => {
        if(error) console.warn( error );
        resolve({response, error});
      });
    });
  }
}
