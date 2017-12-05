import Schema from './../../schemas/Schema';

export default class BootOption{
  constructor( attributes = {} ){
    let bootOption = {};
    Object.keys( attributes ).forEach( ( i ) => {
      bootOption[ attributes[ i ].name ] = attributes[ i ].value;
    });

    // Initialize.
    return bootOption;
  }
}
