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
    const post = params.post ? params.post : '';
    const childrenThreadView = params.childrenThreadView ? params.childrenThreadView : false;
    const inputSearch = params.inputSearch ? params.inputSearch : '';
    const isOpenMain = params.isOpen ? params.isOpen : false;
    const isOpenSetting = params.isOpenSetting ? params.isOpenSetting : false;
    const isOpenDetail = params.isOpenDetail ? params.isOpenDetail : false;
    const isOpenNotif = params.isOpenNotif ? params.isOpenNotif : false;
    return this.create({
      uid,
      utype,
      connectioned,
      offsetFindId,
      post: {value: post},
      childrenThreadView,
      inputSearch,
      isOpenMain,
      isOpenSetting,
      isOpenDetail,
      isOpenNotif,
    });
  }

  static validInputPost(value){
    if( /\r\n$|\n$|\r$/mgi.test( value ) ) return 'LAST TYPE BREAK LINE.';
    return false;
  }

  static validPost(value){
    if( value === '' ) return 'NO INPUT POST';
    if( /^\r\n+$|\n+$|\r+$/g.test( value ) ) return 'ONLY NEW LINE';
    if( /^\s+$/g.test( value ) ) return 'only space';
    if( /^\r\n+(\s|\S)+$|^\n+(\s|\S)+$|^\r+(\s|\S)+$/.test( value ) ) return 'EMPTY POST';
    return false;
  }
}
