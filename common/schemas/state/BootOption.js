import Schema from '~/common/schemas/Schema';
export default class BootOption extends Schema{
  constructor( bootOption = {} ){
    super();
    return this.create({...bootOption});
  }

  static rebuildAttributes( attributes ){
    let rebuildAttributesObj = {};
    Object.keys( attributes ).forEach( ( i ) => {
      rebuildAttributesObj[ attributes[ i ].name ] = attributes[ i ].value;
    });
    return rebuildAttributesObj
  }
}
