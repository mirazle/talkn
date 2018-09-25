import Schema from '~/common/schemas/Schema';
import Post from '~/common/schemas/state/Post';

export default class User extends Schema{

  static get defaultOffsetFindId(){ return Post.defaultFindId }

  constructor( params = {} ){
    super();
    const uid = params && params.uid ? params.uid : '';
    const utype = params && params.utype ? params.utype : '';
    const href = User.getHref( params );
    const connectioned = params && params.connectioned ? params.connectioned : '';
    const multistream = params && params.multistream ? params.multistream : false;
    const multistreamed = params && params.multistreamed ? params.multistreamed : multistream;
    const offsetFindId = params && params.offsetFindId ? params.offsetFindId : User.defaultOffsetFindId ;
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
