import MongoDB from '~/db/MongoDB';

export default class Posts {
  constructor( con ){
    this.db = MongoDB.getCollection( con, Posts.name );
  }

  findOne(){
    return new Promise( resolve => {
      MongoDB[ 'Setting' ].findOne( (error, Setting) => {
        resolve(Setting);
      });
    });
  }
}
