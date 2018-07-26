import MongoDB from '~/server/listens/db/MongoDB';

export default class Users {
  constructor( dbConnection ){
    this.collection = MongoDB.getCollection( dbConnection, Users.name );
//    this.find = this.find.bind(this);
//    this.findOne = this.findOne.bind(this);
//    this.save = this.save.bind(this);
//    this.update = this.update.bind(this);
//    this.remove = this.remove.bind(this);
//    this.removeAll = this.removeAll.bind(this);
    return this;
  }

  find(condition, selector, option){
    return new Promise( resolve => {
      this.collection.find( condition, selector, option, (error, response) => {
        if(error) console.warn( error );
        resolve({error, response});
      });
    });
  }

  findOne( condition = {} ){
    return new Promise( resolve => {
      this.collection.findOne( condition, (error, response) => {
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

  remove( uid ){
    return new Promise( resolve => {
      this.collection.remove( {uid}, ( error, response ) => {
        if(error) console.warn( error );
        resolve({response, error});
      });
    });
  }

  removeAll(){
    return new Promise( resolve => {
      this.collection.remove({}, ( error, response ) => {
        if(error) console.warn( error );
        resolve({response, error});
      });
    });
  }
}
