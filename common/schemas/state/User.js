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
      inputPost,
      inputSearch,
    });
  }
}
