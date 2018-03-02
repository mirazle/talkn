import MongoDB from '~/db/MongoDB';

export default class Users {
  constructor( con ){
    this.db = MongoDB.getCollection( con, Users.name );
    this.find = this.find.bind(this);
    this.findOne = this.findOne.bind(this);
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.removeAll = this.removeAll.bind(this);
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

  findOne( condition = {} ){
    return new Promise( resolve => {
      this.db.findOne( condition, (error, response) => {
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

  remove( uid ){
    return new Promise( resolve => {
      this.db.remove( {uid}, ( error, response ) => {
        if(error) console.warn( error );
        resolve({response, error});
      });
    });
  }

  removeAll(){
    return new Promise( resolve => {
      this.db.remove({}, ( error, response ) => {
        if(error) console.warn( error );
        resolve({response, error});
      });
    });
  }
}
