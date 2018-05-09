import Schema from '../Schema';

export default class MenuIndex extends Schema{
  constructor( params = [] ){
    super();
    return this.create( params );
  }
}
