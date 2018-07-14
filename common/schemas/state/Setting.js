import Schema from '~/common/schemas/Schema';
export default class Setting extends Schema{
  constructor( params = {} ){
    super();
    return this.create({});
  }
}
