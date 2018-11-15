import Schema from '~/common/schemas/Schema';
export default class App extends Schema{

  static get screenModeSmallLabel(){ return 'SMALL' };
  static get screenModeMiddleLabel(){ return 'MIDDLE' };
  static get screenModeLargeLabel(){ return 'LARGE' };
  static getScreenModeDefaultPointer( screenMode ){
    const screenModeDefaultPointers = {
      [ App.screenModeSmallLabel ]: 2,
      [ App.screenModeMiddleLabel ]: 1,
      [ App.screenModeLargeLabel ]: 1
    }
    return screenModeDefaultPointers[ screenMode ];
  };
  static getScreenContentsMap( screenMode, screenModePointer ){
    const screenContentsMap = {
      [ App.screenModeSmallLabel ]: {
        // screenModePointer
        1: [ App.screenModeIndexLabel ],
        2: [ App.screenModeThreadLabel ],
        3: [ App.screenModeDetailLabel ]
      },
      [ App.screenModeMiddleLabel ]: {
        1: [ App.screenModeIndexLabel, App.screenModeThreadLabel ],
        2: [ App.screenModeThreadLabel, App.screenModeDetailLabel ]
      },
      [ App.screenModeLargeLabel ]: {
        1: [ App.screenModeIndexLabel, App.screenModeThreadLabel, App.screenModeDetailLabel ]
      },
    }

    if( screenContentsMap[ screenMode ][ screenModePointer ] ){
      return screenContentsMap[ screenMode ][ screenModePointer ];
    }else{
      return false;
    }
  }

  static get menuComponentUsersLabel(){ return 'Users' };
  static get menuComponentIndexLabel(){ return 'Index' };
  static get menuComponentLogsLabel(){ return 'Logs' };
  static get menuComponentSettingLabel(){ return 'Setting' };
  static getDefaultMenuComponent(){ return App.menuComponentIndexLabel };

  static get screenModeIndexLabel(){ return 'MENU' };
  static get screenModeThreadLabel(){ return 'THREAD' };
  static get screenModeDetailLabel(){ return 'DETAIL' };
  static get screenModeSmallWidthPx(){ return 640 };
  static get screenModeMiddleWidthPx(){ return 960 };

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

  static getWidth( params ){
    if( params.width ) return params.width;
    if( typeof window === 'object' && window.innerWidth ) return window.innerWidth;
    return 0;
  }

  static getHeight( params ){
    if( params.height ) return params.height;
    if( typeof window === 'object' &&  window.innerHeight ) return window.innerHeight;
    return 0;
  }

  constructor( params = {}, call ){
    super();
    const name = params.name ? params.name : 'talkn';
    const type = params.type ? params.type : '';
    const talknIndex = params.talknIndex ? params.talknIndex : 0;
    const connection = params.connection ? params.connection : '/';
    const rootConnection = params.rootConnection ? params.rootConnection : connection;
    const desc = params.desc ? params.desc : 'Hello, talkn.';
    const width = App.getWidth( params );
    const height = App.getHeight( params );
    const screenMode = App.getScreenMode( width );
    const screenModePointer = params.screenModePointer ?
      params.screenModePointer : App.getScreenModeDefaultPointer( screenMode );
    const screenContents = App.getScreenContentsMap( screenMode, screenModePointer );
    const requestLoginType = params.requestLoginType ? params.requestLoginType : '';
    const inputPost = params.inputPost ? params.inputPost : '';
    const inputSearch = params.inputSearch ? params.inputSearch : '';
    const isOpenMainPossible = params.isOpenMainPossible ? params.isOpenMainPossible : false;
    const isOpenMain = params.isOpen ? params.isOpen : true;
    const isOpenSetting = params.isOpenSetting ? params.isOpenSetting : false;
    const isOpenMenu = params.isOpenMenu ? params.isOpenMenu : false;
    const isOpenDetail = params.isOpenDetail ? params.isOpenDetail : false;
    const isOpenNotif = params.isOpenNotif ? params.isOpenNotif : false;
    const isTransition = Schema.isSet( params.isTransition ) ? params.isTransition : true ;
    const menuComponent = params.menuComponent ? params.menuComponent : App.getDefaultMenuComponent( params );
    const multistream = params && params.multistream ? params.multistream : false;
    return this.create({
      name,
      type,
      talknIndex,
      rootConnection,
      desc,
      screenModePointer,
      screenContents,
      screenMode,
      width,
      height,
      requestLoginType,
      inputPost: {value: inputPost, valid: App.validInputPost},
      inputSearch,
      isOpenMainPossible,
      isOpenMain,
      isOpenMenu,
      isOpenSetting,
      isOpenDetail,
      isOpenNotif,
      isTransition,
      menuComponent,
      multistream
    });
  }

  static getScreenMode( widthPx ){
    if( App.screenModeSmallWidthPx >= widthPx ) return App.screenModeSmallLabel;
    if( App.screenModeSmallWidthPx < widthPx &&　App.screenModeMiddleWidthPx >= widthPx ) return App.screenModeMiddleLabel;
    return App.screenModeLargeLabel;
  }

  updateScreenModePointer( calcScreenModePointer ){
    const screenModePointer = this.screenModePointer + calcScreenModePointer;
    const screenContents = App.getScreenContentsMap( this.screenMode, screenModePointer );
    return screenContents ? new App( {screenModePointer} ) : this.screenModePointer ;
  }
}
