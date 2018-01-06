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
      inputPost: {value: inputPost, valid: User.validInputPost},
      inputSearch,
    });
  }

  static validInputPost(value){
    return false;
  }

  static validPost(value){
    if( value === '' ) return true;
    if( /^\r\n|\n|\r+$/.test( value ) ) return true;
    if( /^\r\n|\n|\r+\s+\r\n|\n|\r+$/.test( value ) ) return true;
    if( /^\r\n|\n|\r+　+\r\n|\n|\r+$/.test( value ) ) return true;
    return false;
  }
}
