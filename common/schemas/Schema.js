export default class Schema {
  constructor(option = {}){
    const isThrow = option.isThrow ? option.isThrow : true;
    const isImmutable = option.isImmutable ? option.isImmutable : true;
    Object.defineProperty( this, 'isThrow', {value: isThrow});
    Object.defineProperty( this, 'isImmutable',{value: isImmutable});
  }

  create(state){

    Object.keys(state).forEach((key) => {

      // Define Properties .
      let value = state[ key ].value ? state[ key ].value : state[ key ];
      const def = state[ key ].default ? state[ key ].default : state[ key ];
      value = value ? value : def ;

      const getType = ( value ) => value.constructor.name;
      const type = state[ key ].type ? state[ key ].type : getType(value);
      const isAcceptNull = state[ key ].acceptNull ? state[ key ].acceptNull : false ;
      const isAcceptBlank = state[ key ].acceptBlank ? state[ key ].acceptBlank : false ;
      const valid = state[ key ].validFunc ? state[ key ].valid : false;

      // Define Valid Func .
      const validFuncs = (_value) => {
        let error = null;
        if( _value.constructor.name !== type ){
          error = `SCHEMA_ERROR_TYPE : ${_value} ${type}`;
        }
        if(isAcceptNull && _value === null ){
          error = `SCHEMA_ERROR_IS_ACCEPT_NULL : ${_value}`;
        }
        if(isAcceptBlank && _value === '' ){
          error = `SCHEMA_ERROR_IS_ACCEPT_BLANK : ${_value}`;
        }
        if(getType(valid) === 'Function' ){
          if(valid(_value)){
            error = `SCHEMA_ERROR_IS_VALID : ${_value}`;
          }
        }
        if( error ){
          if(this.isThrow){
            throw error;
          }else{
            console.warn( error );
            return false;
          }
        }
        return true;
      }

      if( validFuncs(value) ){
        Object.defineProperty( this, key,
          {
            get: () => {
              return value
            },
            set: (_value) => {
              if( validFuncs(_value) ){
                if(this.isImmutable){
                  value = _value;
                  return {...this, [ key ]: value };
                }else{
                  value = _value;
                  return true;
                }
              }
            },
            enumerable: true,
            configurable: true,
          }
        );
      }
    });
    return this;
  }


  get(key){
    return this[ key ];
  }

  set(key, value){
    if(this.isImmutable){
      this[ key ] = value;
      return {...this, [ key ]: value };
    }else{
      return this[ key ] = value;
    }
  }

  toJSON(){
    return JSON.stringify(this);
  }
}
