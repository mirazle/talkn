import define from '../../common/define';
import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import PostsFooter from './PostsFooter';

export default class Header {

  static get selfHeight(){ return '100%' };
  static get headerHeight(){ return 45 };
  static get notifHeight(){ return 20 };
  static get notifOpenTranslate(){ return 20 };
  static get notifHeight(){ return 20 };
  static get widthRatio(){ return 0.94 };

  constructor( params ){
    const self = Header.getSelf( params );
    const headTab = Header.getHeadTab( params );
    const rightIcon = Header.getRightIcon( params );
    const leftIcon = Header.getLeftIcon( params );
    const userIcon = Header.getUserIcon( params );
    const userIconImg = Header.getUserIconImg( params );
    const childAnalyzeWrap = Header.getChildAnalyzeWrap( params );
    const childAnalyzeType = Header.getChildAnalyzeType( params );
    const childAnalyzeCnt = Header.getChildAnalyzeCnt( params );
    const childTalknLogo = Header.getChildTalknLogo( params );

    return {
      self,
      headTab,
      rightIcon,
      leftIcon,
      userIcon,
      userIconImg,
      childAnalyzeWrap,
      childAnalyzeType,
      childAnalyzeCnt,
      childTalknLogo,
    }
  }

  static get notifOpenTranslateY(){ return `translate3d( 0px, ${Header.headerHeight}px, 0px )`; }
  static get notifCloseTranslateY(){ return `translate3d( 0px, 0px, 0px )`; }
  static getNotifTranslateY( app ){
    return app.isOpenNotif ? Header.notifOpenTranslateY : Header.notifCloseTranslateY;
  }

  static getMargin(app){
    if( app.type === define.APP_TYPES.EXTENSION ){
      return "0px 5% 0px 5%";
    }else{
      return "0 auto";
    }
  }

  static getChildAnalyzeRight(app){
    switch( app.screenMode ){
    case App.screenModeSmallLabel:
      return '5%';
    case App.screenModeMiddleLabel:
      return '10%';
    case App.screenModeLargeLabel:
      return '15%';
    }
  }

  static getChildAnalyzePositions(app){
    if( app.iframe || app.type === define.APP_TYPES.EXTENSION ){
      return {
        margin: "8px"
      }
    }else{
      return {
        position: "absolute",
        top: "0px",
        right: Header.getChildAnalyzeRight(app),
        margin: "8px"
      }
    }
  }

  static getSelf( {app} ){
    let borderRadius = 0;
    const width = app.type === define.APP_TYPES.EXTENSION ?    
      '90%' : '100%';

    if( app.type === define.APP_TYPES.EXTENSION || app.iframe ){
      borderRadius = Container.radiuses;
    }

    const layout = Style.getLayoutFlex({
      position: "fixed",
      top: "0px",
      width,
      height: `${Header.headerHeight}px`,
      border: Container.border,
      borderRadius,
      background: Container.whiteRGB,
      margin: Header.getMargin(app)
    });
    const content = Style.getContentBase({
      textAlign: 'center',
    });
    const animation = Style.getAnimationBase({
      transition: "0ms",
      transform: Header.getNotifTranslateY(app)
    });
    return Style.get({layout, content, animation});
  }

  static getUserIcon( params ){
    const layout = Style.getLayoutBlock({
      flexGrow: 2,
      height: 'auto',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUserIconImg( params ){
    const layout = Style.getLayoutInlineBlock({
      width: '30px',
      margin: '0px 10px 0px 0px',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getHeadTab( params ){
    const layout = Style.getLayoutFlex({
      justifyContent: "center",
      flexGrow: 2,
      height: 'auto',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getRightIcon( params ){
    const layout = Style.getLayoutBlock({
      flexFlow: "column",
      alignItems: "center",
      justifyContent: "center",
      flexGrow: 1,
      height: '100%',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getLeftIcon( params ){
    const layout = Style.getLayoutFlex({
      flexFlow: "column",
      alignItems: "center",
      justifyContent: "center",
      flexGrow: 1,
      height: '100%',
    });
    const content = Style.getContentBase({
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getChildAnalyzeWrap( {app} ){
    const positions = Header.getChildAnalyzePositions(app);
    const layout = Style.getLayoutInlineBlock({
      ...positions,
      width: '40px',
      height: '40px'
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getChildAnalyzeType( {app} ){
    const fontSize = app.screenMode === App.screenModeSmallLabel ? '10px' : '12px';
    const layout = Style.getLayoutBlock({
      height: "10px",
      marginBottom: "6px",
    });
    const content = Style.getContentBase({
      fontSize,
      color: Container.themeRGBA,
      fontWeight: 'bold'
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getChildAnalyzeCnt( {app} ){
    const fontDatas = app.screenMode === App.screenModeSmallLabel ?
      {fontSize: '10px', color: Container.themeRGBA } :
      {fontSize: '12px'} ;

    const layout = Style.getLayoutBlock({
      height: "10px"
    });
    const content = Style.getContentBase({
      ...fontDatas,
      color: Container.themeRGBA,
      fontWeight: 'bold',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getChildTalknLogo( params ){
    const layout = Style.getLayoutInlineBlock({
      position: 'absolute',
      width: '45px',
      height: `45px`,
    });
    const content = Style.getContentBase({
      color: Container.themeRGBA,
      fontWeight: 'bold',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getNotif( {app} ){
    const layout = Style.getLayoutBlock({
      position: 'relative',
      top: `${PostsFooter.selfHeight}px`,
      width: '50%',
      height: Container.notifHeight,
      margin: '0 auto',
      zIndex: '10',
      background: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '20px',
    });
    const content = Style.getContentBase({
      color: 'rgb(255,255,255)',
      textAlign: 'center',
      fontSize: "12px",
      lineHeight: 2,
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app ),
    });
    return Style.get({layout, content, animation});
  }
}
