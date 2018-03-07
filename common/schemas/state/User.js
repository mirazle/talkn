import Schema from '../Schema';

export default class User extends Schema{

  static get defaultOffsetFindId(){
    return 'ffffffffffffffffffffffff';
  }

  constructor( params = {} ){
    super();
    const uid = params.uid ? params.uid : '';
    const utype = params.utype ? params.utype : '';
    const connectioned = params.connectioned ? params.connectioned : '';
    const offsetFindId = params.offsetFindId ? params.offsetFindId : User.defaultOffsetFindId ;
    return this.create({
      uid,
      utype,
      connectioned,
      offsetFindId,
    });
  }
}
