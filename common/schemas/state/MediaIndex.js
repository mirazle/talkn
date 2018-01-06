import Schema from '../Schema';
export default class MediaIndex extends Schema{
  constructor( params = {} ){
    super();

    // Initialize.
    return this.create({...params});
  }
}
