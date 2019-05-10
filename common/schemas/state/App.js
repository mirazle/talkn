import define from '~/common/define';
import Schema from '~/common/schemas/Schema';
import PostsFooter from '~/client/style/PostsFooter';
import Post from '~/common/schemas/state/Post';

export default class App extends Schema{
  static get openLockMenuLabelNo(){ return 'No' };
  static get openLockMenuLabelLike(){ return 'Like' };
  static get openLockMenuLabelShare(){ return 'Share' };
  static get openLockMenuLabelAbout(){ return 'About' };

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

  static get defaultOffsetFindId(){ return Post.defaultFindId }
  static get dispThreadTypeSingle(){ return 'Single' }
  static get dispThreadTypeMulti(){ return 'Multi' }
  static get dispThreadTypeChild(){ return 'Child' }
  static get dispThreadTypeLogs(){ return 'Logs' }

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
    if( typeof window === 'object' &&  window.innerHeight ) return window.innerHeight;
    return 0;
  }

  constructor( params = {}, call ){
    super();

    // 準備
    const connection = params.connection ? params.connection : '/';

    // 全体
    const name = params.name ? params.name : 'talkn';
    const talknIndex = params.talknIndex ? params.talknIndex : 0;

    // 基本表示関連
    const type = params.type ? params.type : '';
    const width = App.getWidth( params );
    const height = App.getHeight( params );
    const postsHeight = params.postsHeight ? params.postsHeight : 0;
    const screenMode = App.getScreenMode( width );
    const screenModePointer = params.screenModePointer ? params.screenModePointer : App.getScreenModeDefaultPointer( screenMode );
    const screenContents = App.getScreenContentsMap( screenMode, screenModePointer );
    const iframe = Schema.isSet( params.iframe ) ? JSON.parse( params.iframe ) : false ;

    // iframeの拡張機能表示の場合
    const extensionMode = params.extensionMode ? params.extensionMode : "NONE";
    const extensionOpenHeight = params.extensionOpenHeight ? params.extensionOpenHeight : 0;
    const extensionCloseHeight = params.extensionCloseHeight ? params.extensionCloseHeight : 0;

    // Index情報
    const menuComponent = params.menuComponent ? params.menuComponent : App.getDefaultMenuComponent( params );

    // スレッド基本関連
    const isRootConnection = params.isRootConnection ? params.isRootConnection : false;
    const rootConnection = params.rootConnection ? params.rootConnection : connection;
    const connectioned = params && params.connectioned ? params.connectioned : '';
    const dispThreadType = params && params.dispThreadType ? params.dispThreadType : App.dispThreadTypeMulti;
    const multistream = Schema.isSet( params.multistream ) ? params.multistream : true;
    const multistreamed = params && params.multistreamed ? params.multistreamed : false;
    const threadScrollY = params && params.threadScrollY ? params.threadScrollY : 0;

    // 投稿情報
    const offsetFindId = params && params.offsetFindId ? params.offsetFindId : App.defaultOffsetFindId ;
    const offsetSingleFindId = params && params.offsetSingleFindId ? params.offsetSingleFindId : App.defaultOffsetFindId ;
    const offsetMultiFindId = params && params.offsetMultiFindId ? params.offsetMultiFindId : App.defaultOffsetFindId ;
    const offsetChildFindId = params && params.offsetChildFindId ? params.offsetChildFindId : App.defaultOffsetFindId ;
    const offsetLogsFindId = params && params.offsetLogsFindId ? params.offsetLogsFindId : App.defaultOffsetFindId ;

    // detail情報
    const detailConnection = params.detailConnection ? params.detailConnection : connection;

    // 入力状態
    const inputPost = params.inputPost ? params.inputPost : '';
    const inputSearch = params.inputSearch ? params.inputSearch : '';

    // 各パーツの状態(フラグ制御)
    const isOpenMainPossible = params.isOpenMainPossible ? params.isOpenMainPossible : false;
    const isOpenMain =  App.getIsOpenMain({type, height, extensionMode});
    console.log("@@@ = " + isOpenMain );
    const isOpenSetting = params.isOpenSetting ? params.isOpenSetting : false;
    const isOpenMenu = params.isOpenMenu ? params.isOpenMenu : false;
    const isOpenDetail = params.isOpenDetail ? params.isOpenDetail : false;
    const isOpenNewPost = params.isOpenNewPost ? params.isOpenNewPost : false;
    const isOpenNotif = params.isOpenNotif ? params.isOpenNotif : false;
    const isDispMain = params.isDispMain ? params.isDispMain : 
      params.type === define.APP_TYPES.EXTENSION ?
        false : true;

    // 各パーツの状態(文字列制御)
    const openInnerNotif = params.openInnerNotif ? params.openInnerNotif : '';
    const openLockMenu = params.openLockMenu ? params.openLockMenu : App.openLockMenuLabelNo;

    // その他
    const actioned = params && params.actioned ? params.actioned : [];
    const isTransition = Schema.isSet( params.isTransition ) ? params.isTransition : false ;

    return this.create({

      // 全体
      name,
      talknIndex,

      // 基本表示関連
      type,
      width,
      height,
      postsHeight,
      screenMode,
      screenModePointer,
      screenContents,
      iframe,
      extensionMode,

      // Index情報
      menuComponent,

      // スレッド基本関連
      isRootConnection,
      rootConnection,
      connectioned,
      dispThreadType,
      multistream,
      multistreamed,
      threadScrollY,

      // 投稿情報
      offsetFindId,
      offsetSingleFindId,
      offsetMultiFindId,
      offsetChildFindId,
      offsetLogsFindId,

      // detail情報
      detailConnection,

      // 入力状態
      inputPost,
      inputSearch,

      // 各パーツの状態
      isOpenMainPossible,
      isOpenMain,
      isOpenSetting,
      isOpenMenu,
      isOpenDetail,
      isOpenNewPost,
      isOpenNotif,
      isDispMain,

      // 各パーツの状態(文字列制御)
      openInnerNotif,
      openLockMenu, 

      // その他
      actioned,
      isTransition
    });
  }

  static getScreenMode( widthPx ){
    if( window && window.innerWidth ){
      widthPx = window.innerWidth;
    }

    if( App.screenModeSmallWidthPx >= widthPx ){
     return App.screenModeSmallLabel;
    }
    if( App.screenModeSmallWidthPx < widthPx &&　App.screenModeMiddleWidthPx >= widthPx ){
      return App.screenModeMiddleLabel;
    }
    return App.screenModeLargeLabel;
  }

  static getIsOpenMain(app, called){
    const {type, height, extensionMode} = app;
    if( type === define.APP_TYPES.EXTENSION ){

      if( PostsFooter.selfHeight === height || height === 0 ){
        return false;
      }else{
console.log("B " + window.innerHeight + " === " + height);
        return ( window.innerHeight === height );
      }

    } else {

      return true;
    }
  }

  static getOffsetFindId({posts}){
    if( posts && posts[ 0 ] && posts[ 0 ]._id ){
      return posts[ 0 ]._id;
    }
    return Post.defaultFindId;
  }

  static getStepToDispThreadType( {app}, toConnection ){
    const beforeDispThreadType = app.dispThreadType;
    app = App.getStepDispThreadType({app}, toConnection);
    const afterDispThreadType = app.dispThreadType;
    return {app, stepTo: `${beforeDispThreadType} to ${afterDispThreadType}`};
  }

  static getStepDispThreadType( {app}, toConnection ){
    if(app.rootConnection === toConnection){
      if(app.multistream){
        app.dispThreadType = App.dispThreadTypeMulti;
        app.offsetFindId = app.offsetMultiFindId ? app.offsetMultiFindId : App.defaultOffsetFindId;
      }else{
        app.dispThreadType = App.dispThreadTypeSingle;
        app.offsetFindId = app.offsetSingleFindId ? app.offsetSingleFindId : App.defaultOffsetFindId;
      }
    }else{
      app.dispThreadType = App.dispThreadTypeChild;
      app.offsetFindId = app.offsetChildFindId ? app.offsetChildFindId : App.defaultOffsetFindId;
    }
    return app;
  }

  static getAppUpdatedOpenFlgs({app}, call){
    switch( call ){
    case 'headerDetailIcon':
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
        app.isOpenDetail = !app.isOpenDetail;
        break;
      case App.screenModeMiddleLabel :
        if( app.isOpenDetail ){
          if( app.detailConnection === app.rootConnection ){
            app.isOpenDetail = false;
            app.isOpenMenu = true;
          }else{
            app.isOpenMenu = false;
            app.isOpenDetail = false;
          }
        }else{
          app.isOpenMenu = false;
          app.isOpenDetail = true;
        }
        break;
      }
      break;
    case 'headerMenuIcon':
      switch( app.screenMode ){
      case App.screenModeMiddleLabel :
        if( app.isOpenDetail ){
          app.isOpenMenu = true;
          app.isOpenDetail = false;
        }else{
          app.isOpenMenu = true;
          app.isOpenDetail = false;
        }
        break;
      }
      break;
    case 'changeThreadDetail':
    case 'post':
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
        app.isOpenDetail = !app.isOpenDetail;
        break;
      case App.screenModeMiddleLabel :
        app.isOpenMenu = false;
        app.isOpenDetail = true;
        break;
      }
      break;
    }
    return app;
  }

  updateScreenModePointer( calcScreenModePointer ){
    const screenModePointer = this.screenModePointer + calcScreenModePointer;
    const screenContents = App.getScreenContentsMap( this.screenMode, screenModePointer );
    return screenContents ? new App( {screenModePointer} ) : this.screenModePointer ;
  }
}
