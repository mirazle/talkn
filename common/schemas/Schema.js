export default class Schema {
  constructor(option = {}){
/*
    Object.defineProperty(
      this,
      '_SET_COLUMNS',
      {
        value: [],
        writable: true,
        enumerable: false,
        configurable: false
      }
    );
*/
  }

  static getType(value){
    if( value === null ){
      return 'Null';
    }
    if( value === undefined ){
      return 'Undefined';
    }
    return value.constructor.name;
  }

  static isSet( val ){
    return Schema.getType( val ) === 'Undefined' ? false : true ;
  }

  create(state){

    const className = this.constructor.name;
    const stateType = Schema.getType( state );
    let validMethods = {};

    Object.keys(state).forEach((key) => {

      // Properties .
      let values;
      let def = null;
      let type;
      let isAcceptNull = false;
      let isAcceptBlank = false;
      let valid = () => {};
      let value = null;

      // Assign Properties .
      if( Schema.getType( state[ key ] ) === 'Object' ){

        values = state[ key ];
        let isEmptyObject = Object.keys( values ).length === 0 ;
        isAcceptNull = values.isAcceptNull ? values.isAcceptNull : isAcceptNull;
        isAcceptBlank = values.isAcceptBlank ? values.isAcceptBlank : isAcceptBlank;
        def = !isEmptyObject && values.def ? values.def: def;
        value = !isEmptyObject && ( values.value || values.value === '' ) ? values.value : values;
        value = isEmptyObject && def ? def : value;
        type = Schema.getType( value );
        valid = values.valid ? values.valid : valid;

      }else{
        value = state[ key ];
        def = value;
        isAcceptNull = isAcceptNull;
        isAcceptBlank = isAcceptBlank;
        type = Schema.getType( value);
        valid = valid;
      }

      // Validate Functions .
      const validFunc = (_value) => {
        let error = null;
        const pointer = `${className}.${key}`;
        const validValue = value;
        const validType = type;
        const paramsValue = _value;
        const paramsType = Schema.getType(_value);
        if( paramsType !== type ){
          error = `SCHEMA_TYPE : ${pointer} [validType: ${type}][paramsType: ${paramsType}]`;
        }
        if(isAcceptNull && _value === null ){
          error = `SCHEMA_IS_ACCEPT_NULL :  ${pointer}`;
        }
        if(isAcceptBlank && _value === '' ){
          error = `SCHEMA_IS_ACCEPT_BLANK :  ${pointer}`;
        }
        if(Schema.getType(valid) === 'Function' ){
          if(valid(_value)){
            error = `SCHEMA_YOUR_VALID_METHOD :  ${pointer}`;
          }
        }
        return {pointer, validValue, validType, paramsValue, paramsType, error};
      }

      const {pointer, validValue, validType, paramsValue, paramsType, error} = validFunc( value );

      if( error === null ){
        Object.defineProperty( this, key,
          {
            get: () => {
              return value;
            },
            set: (_value) => {
              // pointer, validValue, validType, paramsValue, paramsType, error
              const validResult = validFunc( value );
              if( error === null ){
                value = _value;
                return {...this, [ key ]: value };
              }else{
                this.validWarn( validResult );
                throw error;
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

  merge( params = {}, immutable = true ){
    try{
      const paramsType = Schema.getType( params );
      const objKeys = Object.keys( params );

      if( objKeys.length > 0 ){
        let mergedObj = {...this};
        objKeys.forEach( ( key ) => {
          if( this[ key ] !== params[ key ]){
            if(this.canSet( key, params[ key ] )){
              mergedObj[ key ] = params[ key ];
            }
          }
        });

        if( paramsType === 'Array' ){
          mergedObj = Object.values( mergedObj );
          return immutable ? this.constructor( mergedObj ) : mergedObj;
        }else{
          return immutable ? this.constructor( mergedObj ) : mergedObj;
        }

      }else{
        return params;
      }
    }catch( e ){
      if(this.errorThrow){
        console.warn( params );
        console.warn( e );
        throw `BAD MERGE: ${Schema.getType(params)} ${e}`;
      }else{
        console.warn( params );
        console.warn( e );
        console.warn(`BAD MERGE: ${Schema.getType(params)} ${e}`);
        return params;
      }
    }
  }

  toJSON(obj = this){
    let jsonObj = {};
    Object.keys( obj ).forEach( ( key ) => {
      let values = obj[ key ];
      if( values.constructor.name === "Object" ){
        if( !values.type && !values.default ){
          values = this.toJSON( values );
        }
      }

      if( values.default || values.default === '' || values.default === 0 ){
        jsonObj[ key ] = values.default;
      }else{
        jsonObj[ key ] = values;
      }
    });
    return jsonObj;
  }

  forEach( func ){
    return Object.values( this ).forEach( func );
  }

  map( func ){
    return this.returnImmutable( Object.values( this ).map( func ), func );
  }

  filter( func ){
    return this.returnImmutable( Object.values( this ).filter( func ), func );
  }

  reduce( func ){
    return this.returnImmutable( Object.values( this ).reduce( func ), func );
  }

  find( func ){
    return Object.values( this ).find( func );
  }

  unshift( value ){
    const result = Object.values( this );
    result.push( value );
    return this.returnImmutable( result );
  }

  unshift( value ){
    const result = Object.values( this );
    result.unshift( value );
    return this.returnImmutable( result );
  }

  returnImmutable( result, func = ()=>{}){
    if( typeof result === 'undefined' ){
      return new this.constructor({});
    }else if( result.length === 0 && Object.keys( this ).length === 0){
      if( String(func).indexOf( "createElement" ) > 0 ){
        return [];
      }else{
        return new this.constructor( result );
      }
    }else if(
      result[0] &&
      result[0]["$$typeof"] &&
      result[0]["$$typeof"].constructor.name === "Symbol"
    ){
      return result;
    }else{
      return new this.constructor( result );
    }
  }

  validWarn( validResult ){
    console.warn("##########################");
    console.warn("#" + validResult.pointer );
    console.warn("##########################");
    console.warn("### initializedValidType");
    console.warn( validResult.validType );
    console.warn("### initializedValidValue");
    console.warn( validResult.validValue );
    console.warn("### paramsType");
    console.warn( validResult.paramsType );
    console.warn("### paramsValue");
    console.warn( validResult.paramsValue );
    console.warn("##########################");
  }
}
