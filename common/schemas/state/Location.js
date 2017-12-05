export default class Location{
  constructor( location ){
    return Location.getStringValueFromObj( location );
  }

  static getStringValueFromObj( obj ){
    let returnObj = {};
    Object.keys( obj ).forEach( ( key ) => {
      if( obj[ key ].constructor.name === 'String' ){
        returnObj[ key ] = obj[ key];
      }
    });
    return returnObj;
  }
}
