import Schema from '../Schema';
export default class Post extends Schema{
  constructor( params = {} ){
    super();
    return this.create({});
  }
}
