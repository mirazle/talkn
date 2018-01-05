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

  // TODO POSTするタイミングのみにValidateしたい
  static validInputPost(value){
    if(value !== ''){
      if( /^\n+$/.test( value ) ){
        if( /^\r+$/.test( value ) ){
//console.log('入力不可能な文字');
          return true;
        }
      }
    }
//console.log('入力可能な文字 ');
    return false;
  }

  static validPost(value){
    if(value !== ''){
      if( /^\n+$/.test( value ) ){
        if( /^\r+$/.test( value ) ){
//console.log('投稿不可能な文字列の状態');
          return true;
        }
      }
    }
//console.log('投稿可能な文字列の状態');
    return false;
  }
}
