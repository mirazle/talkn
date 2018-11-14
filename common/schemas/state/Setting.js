import Schema from '~/common/schemas/Schema';
export default class Setting extends Schema{
  constructor( params = {} ){
    super();
    const client = params && params.client ? params.client : {};
    const common = params && params.common ? params.common : {};
    const server = params && params.server ? params.server : {};
    return this.create({
      client,
      common,
      server,
    });
  }
}
