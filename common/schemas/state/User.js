import Schema from '~/common/schemas/Schema';

export default class User extends Schema{

  static get defaultOffsetFindId(){
    return 'ffffffffffffffffffffffff';
  }

  constructor( params = {} ){
    super();
    const uid = params.uid ? params.uid : '';
    const utype = params.utype ? params.utype : '';
    const href = User.getHref( params );
    const connectioned = params.connectioned ? params.connectioned : '';
    const multistreamed = params.multistreamed ? params.multistreamed : false;
    const offsetFindId = params.offsetFindId ? params.offsetFindId : User.defaultOffsetFindId ;
    const offsetFindIdSingle = params.offsetFindIdSingle ? params.offsetFindIdSingle : User.defaultOffsetFindId ;
    const offsetFindIdMulti = params.offsetFindIdMulti ? params.offsetFindIdMulti : User.defaultOffsetFindId ;
    const friends = [];
    return this.create({
      uid,
      utype,
      href,
      connectioned,
      multistreamed,
      offsetFindId,
      friends,
    });
  }

  static getHref( params = {} ){
    if( typeof window !== 'undefined' && window.location && window.location.href ){
      return window.location.href;
    }

    if( params && params.href ){
      return params.href;
    }
    return '/';
  }
}
