import Schema from '~/common/schemas/Schema';
export default class Setting extends Schema{
  constructor( params = {} ){
    super();
    const client = params.client ? params.client : {};
    const common = params.common ? params.common : {};
    const server = params.server ? params.server : {};
    const multistream = params.multistream ? params.multistream : false;
    return this.create({
      client,
      common,
      server,
      multistream,
    });
  }
}
