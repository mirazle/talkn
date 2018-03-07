export default class Schema {
  constructor(option = {}){
    const errorThrow = option.errorThrow ? option.errorThrow : true;
    Object.defineProperty( this, 'errorThrow', {value: errorThrow});
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

  create(state){

    const className = this.constructor.name;
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
              return value
            },
            set: (_value) => {
              const {pointer, validValue, validType, paramsValue, paramsType, error} = validFunc( value );
              if( error === null ){
                value = _value;
                return {...this, [ key ]: value };
              }else{
                if(this.errorThrow){
                  console.warn("##########################");
                  console.warn("#" + pointer );
                  console.warn("##########################");
                  console.warn("### validType");
                  console.warn( validType );
                  console.warn("### validValue");
                  console.warn( validValue );
                  console.warn("### paramsType");
                  console.warn( paramsType );
                  console.warn("### paramsValue");
                  console.warn( paramsValue );
                  console.warn("##########################");
                  throw error;
                }else{
                  return {pointer, validValue, validType, paramsValue, paramsType, error};
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
    try{
      if( Object.keys( obj ).length > 0 ){
        let mergedObj = this;
        Object.keys( obj ).forEach( ( key ) => {
          if( this[ key ] !== obj[ key ]){
            if(this.canSet( key, obj[ key ] )){
              mergedObj[ key ] = obj[ key ];
            }
          }
        });
        return mergedObj;
      }else{
        return obj;
      }
    }catch( e ){
      if(this.errorThrow){
        console.warn( obj );
        console.warn( e );
        throw `BAD MERGE: ${Schema.getType(obj)} ${e}`;
      }else{
        console.warn( obj );
        console.warn( e );
        console.warn(`BAD MERGE: ${Schema.getType(obj)} ${e}`);
        return obj;
      }
    }
  }

  _toJSON(){
    console.log(this);
    if(this){
      return JSON.stringify(this);
    }else{
      throw 'BAD SCHEMAS toJSON()';
    }
  }
}
