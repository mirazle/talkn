import Schema from '~/common/schemas/Schema';
export default class BootOption extends Schema{
  constructor( attributes = {} ){
    super();
    let bootOption = {};
    Object.keys( attributes ).forEach( ( i ) => {
      bootOption[ attributes[ i ].name ] = attributes[ i ].value;
    });

    // Initialize.
    return this.create({...bootOption});
  }
}
