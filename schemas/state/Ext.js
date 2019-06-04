import Schema from '~/common/schemas/Schema';
export default class Ext extends Schema{
  constructor( params = {} ){
    super();
    const mode = params && params.mode ? params.mode : "NONE";
    const openHeight = params && params.openHeight ? params.openHeight : 0;
    const closeHeight = params && params.closeHeight ? params.closeHeight : 0;
    return this.create({
      mode,
      openHeight,
      closeHeight,
    });
  }
}
