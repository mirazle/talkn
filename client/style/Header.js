import define from '../../common/define';
import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Footer from './Footer';

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
    const detailIcon = Header.getDetailIcon( params );
    const menuIcon = Header.getMenuIcon( params );
    const userIcon = Header.getUserIcon( params );
    const userIconImg = Header.getUserIconImg( params );
    const childAnalyze = Header.getChildAnalyze( params );
    const childAnalyzeType = Header.getChildAnalyzeType( params );
    const childAnalyzeCnt = Header.getChildAnalyzeCnt( params );
    const childTalknLogo = Header.getChildTalknLogo( params );

    return {
      self,
      headTab,
      detailIcon,
      menuIcon,
      userIcon,
      userIconImg,
      childAnalyze,
      childAnalyzeType,
      childAnalyzeCnt,
      childTalknLogo,
    }
  }

  static get notifOpenTranslateY(){ return `translate3d( 0px, ${-( Footer.selfHeight * 2 )}px, 0px )`; }
  static get notifCloseTranslateY(){ return `translate3d( 0px, 0px, 0px )`; }
  static getNotifTranslateY( app ){
    return app.isOpenNotif ? Header.notifOpenTranslateY : Header.notifCloseTranslateY;
  }

  static getSelf( {app} ){
    
    const width = app.type === define.APP_TYPES.EXTENSION ?    
      '90%' : '100%';

    const layout = Style.getLayoutFlex({
      width,
      height: `${Header.headerHeight}px`,
      border: Container.border,
      background: Container.whiteRGB,
      margin: "0 auto",
    });
    const content = Style.getContentBase({
      textAlign: 'center',
    });
    const animation = Style.getAnimationBase();
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
    const layout = Style.getLayoutBlock({
      flexGrow: 2,
      height: 'auto',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getDetailIcon( params ){
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: 'auto',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getMenuIcon( params ){
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: '100%',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getChildAnalyze( {app} ){

    const right = app.screenMode === App.screenModeSmallLabel ?
      {right: '0%'} :
      {right: '15%'} ;

    const layout = Style.getLayoutInlineBlock({
      position: 'absolute',
      top: '7px',
      ...right,
      width: 'initial',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getChildAnalyzeType( {app} ){

    const fontDatas = app.screenMode === App.screenModeSmallLabel ?
      {fontSize: '10px', color: Container.themeRGBA, fontWeight: 'bold' } :
      {fontSize: '12px'} ;

    const layout = Style.getLayoutBlock({
      marginBottom: "6px",
    });
    const content = Style.getContentBase(fontDatas);
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getChildAnalyzeCnt( {app} ){
    const fontDatas = app.screenMode === App.screenModeSmallLabel ?
      {fontSize: '10px', color: Container.themeRGBA } :
      {fontSize: '12px'} ;

    const layout = Style.getLayoutBlock({});
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
      top: `${Footer.selfHeight}px`,
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
      transition: Container.getTransitionOn( app ),
    });
    return Style.get({layout, content, animation});
  }
}
