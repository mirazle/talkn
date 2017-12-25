export default class Schema {

  init(state){
    Object.keys(state).map((key) => {
      const value = state[ key ].value ? state[ key ].value : state[ key ];
      const type = state[ key ].type ? state[ key ].type : this.getType(value);
      const def = state[ key ].def ? state[ key ].def : '';
      const isNullBlank = state[ key ].isNullBlank ? state[ key ] : false ;
      this[key] = {value, type, def, isNullBlank};
    });
    return this;
  }

  getType(value){
    return value.constructor.name;
  }

  set(key, value){
    if(this[key] && !this.isValid(key, value)){
      this[key].value = value;
      return this;
    }
    throw `ERROR SCHEMA TYPE [${key} : ${value}] Please set ${this[key].type}.` ;
  }

  get(key){
    return this[key].value;
  }

  getJSON(){
    let json = {};
    Object.keys(this).map((key)=>{
      json[key] = this[key].value;
    });
    return json;
  }

  isValid(key, value){
    const validType = this[key].type;
    const type = this.getType(value);
    return !(validType === type);
  }
}
