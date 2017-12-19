import MongoDB from '~/db/MongoDB';

export default class Post {
  constructor( con ){
    this.db = MongoDB.getCollection( con, 'Post' );
  }

  findOne(){
    return new Promise( resolve => {
      MongoDB[ 'Setting' ].findOne( (error, Setting) => {
        resolve(Setting);
      });
    });
  }
}
