import Schema from '~/common/schemas/Schema';
export default class Post extends Schema{
  
  static get defaultFindId(){ return '000000000000000000000000' };

  static isStamp( post ){
    return ( post.indexOf( '<div class="talknStamps"' ) === 0 );
  }

  constructor( params = {} ){
    super();
    return this.create({});
  }
}
