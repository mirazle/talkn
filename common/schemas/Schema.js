export default class Schema {
  constructor(option = {}){
    const errorThrow = option.errorThrow ? option.errorThrow : true;
//    const immutable = option.immutable ? option.immutable : true;
    Object.defineProperty( this, 'errorThrow', {value: errorThrow});
//    Object.defineProperty( this, 'immutable',{value: immutable});
  }

  static getType(value){
    return value.constructor.name;
  }

  create(state){

    const className = this.constructor.name;
    let validMethods = {};
    Object.keys(state).forEach((key) => {

      // Properties .
      let values;
      let def = '';
      let type;
      let isAcceptNull = false;
      let isAcceptBlank = false;
      let valid = () => {};
      let value = null;

      // Assign Properties .
      if( Schema.getType( state[ key ] ) === 'Object' ){
        values = state[ key ];
        def = values.def ? values.def: def;
        isAcceptNull = values.isAcceptNull ? values.isAcceptNull : isAcceptNull;
        isAcceptBlank = values.isAcceptBlank ? values.isAcceptBlank : isAcceptBlank;
        value = values.value ? values.value : value;
        value = value ? value : def;
        type = value.constructor.name;
        valid = values.valid ? values.valid : valid;
      }else{
        value = state[ key ];
        def = value;
        isAcceptNull = isAcceptNull;
        isAcceptBlank = isAcceptBlank;
        type = value.constructor.name;
        valid = valid;
      }

      // Validate Functions .
      const validFunc = (_value) => {
        let error = null;
        const pointer = `${className}.${key}=${_value}`;
        if( Schema.getType(_value) !== type ){
          error = `SCHEMA_ERROR_TYPE : ${pointer}[${type}]`;
        }
        if(isAcceptNull && _value === null ){
          error = `SCHEMA_ERROR_IS_ACCEPT_NULL :  ${pointer}`;
        }
        if(isAcceptBlank && _value === '' ){
          error = `SCHEMA_ERROR_IS_ACCEPT_BLANK :  ${pointer}`;
        }
        if(Schema.getType(valid) === 'Function' ){
          if(valid(_value)){
            error = `SCHEMA_ERROR_YOUR_VALID_METHOD :  ${pointer}`;
          }
        }
        return error;
      }

      const error = validFunc( value );

      if( error === null ){
        Object.defineProperty( this, key,
          {
            get: () => {
              return value
            },
            set: (_value) => {
              const error = validFunc( value );
              if( error === null ){
                value = _value;
                return {...this, [ key ]: value };
              }else{
                if(this.errorThrow){
                  throw error;
                }else{
                  return {error};
                }
              }
            },
            enumerable: true,
            configurable: true,
          }
        );
      }else{
        if(this.errorThrow){
          throw error;
        }else{
          console.warn( error );
        }
      }
    });

    return this;
  }

  canSet( key, validValue ){
    const currentValue = this[key];
    const { error } = this[ key ] = validValue;
    if(error){
      return false;
    }else{
      this[ key ] = currentValue;
      return true;
    }
  }

  merge( obj = {} ){
    if( Object.keys( obj ).length > 0 ){
      let merged = this.constructor({...this});
      Object.keys( obj ).forEach( ( key ) => {
        if( this[ key ] !== obj[ key ]){
          if(this.canSet( key, obj[ key ] )){
            merged = merged[ key ] = obj[ key ];
          }
        }
      });
      return merged;
    }
    return false;
  }

  toJSON(){
    return JSON.stringify(this);
  }
}
