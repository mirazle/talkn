import Schema from '../Schema';

export default class User extends Schema{
  constructor( params = {} ){
    super();
    const id = params.id ? params.id : '';
    const type = params.type ? params.type : '';
    const inputPost = params.inputPost ? params.inputPost : '';
    const inputSearch = params.inputSearch ? params.inputSearch : '';
    return this.create({
      id,
      type,
      inputPost: {value: inputPost},
      inputSearch,
    });
  }

  static validInputPost(value){
    if( /\r\n|\n|\r$/.test( value ) ) return true;
    return false;
  }

  static validPost(value){
    if( value === '' ) return 'NO INPUT POST';
//    if( /^\r\n|\n|\r+$/.test( value ) ) return 'ONLY NEW LINE';
//    if( /^\r\n|\n|\r+\s+\r\n|\n|\r+$/.test( value ) ) return 'EMPTY INPUT A';
//    if( /^\r\n|\n|\r+　+\r\n|\n|\r+$/.test( value ) ) return 'EMPTY INPUT B';
    return false;
  }
}
