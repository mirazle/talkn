import Schema from '../Schema';

export default class Control extends Schema{

  constructor( params = {} ){
    super();
    const childrenThreadView = params.childrenThreadView ? params.childrenThreadView : false;
    const requestLoginType = params.requestLoginType ? params.requestLoginType : '';
    const inputPost = params.inputPost ? params.inputPost : '';
    const inputSearch = params.inputSearch ? params.inputSearch : '';
    const isOpenMainPossible = params.isOpenMainPossible ? params.isOpenMainPossible : false;
    const isOpenMain = params.isOpen ? params.isOpen : true;
    const isOpenSetting = params.isOpenSetting ? params.isOpenSetting : false;
    const isOpenDetail = params.isOpenDetail ? params.isOpenDetail : false;
    const isOpenNotif = params.isOpenNotif ? params.isOpenNotif : false;
    return this.create({
      childrenThreadView,
      requestLoginType,
      inputPost: {value: inputPost, valid: Control.validInputPost},
      inputSearch,
      isOpenMainPossible,
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
