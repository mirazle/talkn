import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Footer from './Footer';
import Menu from './Menu';
import DetailRight from './DetailRight';

export default class Main {

  static get selfHeight(){ return '100%' };
  static get headerHeight(){ return 45 };
  static get notifHeight(){ return 20 };
  static get notifOpenTranslate(){ return 20 };
  static get notifHeight(){ return 20 };
  static get widthRatio(){ return 0.94 };

  constructor( params ){
    const self = Main.getSelf( params );
    const header = Main.getHeader( params );
    const headerHeadTab = Main.getHeaderHeadTab( params );
    const headerDetailIcon = Main.getHeaderDetailIcon( params );
    const headerMenuIcon = Main.getHeaderMenuIcon( params );
    const headerUserIcon = Main.getHeaderUserIcon( params );
    const headerUserIconImg = Main.getHeaderUserIconImg( params );
    const headerChildWatchCnt = Main.getHeaderChildWatchCnt( params );
    const headerChildTalknLogo = Main.getHeaderChildTalknLogo( params );
    const notif = Main.getNotif( params );
    return {
      self,
      header,
      headerHeadTab,
      headerDetailIcon,
      headerMenuIcon,
      headerUserIcon,
      headerUserIconImg,
      headerChildWatchCnt,
      headerChildTalknLogo,
      notif,
    }
  }

  static get notifOpenTranslateY(){ return `translate3d( 0px, ${-( Footer.selfHeight * 2 )}px, 0px )`; }
  static get notifCloseTranslateY(){ return `translate3d( 0px, 0px, 0px )`; }
  static getNotifTranslateY( app ){
    return app.isOpenNotif ? Main.notifOpenTranslateY : Main.notifCloseTranslateY;
  }

  static getWidth( app, addUnit = false ){
    const width = '100%';
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getSelfHeightPx(){
    const height = Main.selfHeight;
    return `calc( 100vh - ${Footer.selfHeight}px )`;
  }

  static getSelfRight( {bootOption, app}, widthPx, addUnit = false ){
    let right = '0px';
    switch( app.type ){
    case 'portal':

      break;
    default :
      const width = bootOption ? bootOption.width : app.width ;
      if( width === '100%' ){
        right =  ( ( ( 1 - Main.widthRatio ) / 2 ) * 100 ) + '%';
      }else if( width === '100vw' ){
        right = ( ( ( 1 - Main.widthRatio ) / 2 ) * 100 ) + 'vw';
      }else{
        right = Math.floor( Style.trimUnit( widthPx ) * Container.merginRatio ) + 'px';
      }
      break;
    }
    return addUnit ? Style.trimUnit( right ) : right ;
  }

  static getSelfTranslateY( isOpenMain ){
    return isOpenMain ? Main.getSelfOpenTranslateY() : Main.getSelfCloseTranslateY();
  }

  static getSelfOpenTranslateY(){
    return ( -Footer.selfHeight ) + 'px';
  }

  static getSelfCloseTranslateY(){
    return Main.getSelfHeightPx();
  }

  static getSelf( params ){
    const {app, bootOption} = params;
    const widthPx = Main.getWidth( app );
    const heightPx = Main.getSelfHeightPx( params );
    const right = Main.getSelfRight( params, widthPx );
    const translateY = Main.getSelfTranslateY( params.app.isOpenMain );
    const layout = Style.getLayoutBlock({
      position: 'absolute',
      width: widthPx,
      height: heightPx,
      right: right,
      bottom: 0,
      overflow: 'visible',
      borderBottom: 'none',
      boxShadow: Container.shadow,
      margin: '0 auto',
      zIndex: Container.maxZIndex,
    });
    const content = Style.getContentBase({
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase({
      transform: `translate3d(0px, ${translateY}, 0px)`,
      transition: Container.getTransitionOn( app ),
    });
    return Style.get({layout, content, animation});
  }

  static getHeader( params ){
    const layout = Style.getLayoutFlex({
      width: '100%',
      height: `${Main.headerHeight}px`,
      border: Container.border,
      background: Container.whiteRGB,
    });
    const content = Style.getContentBase({
      textAlign: 'center',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getHeaderUserIcon( params ){
    const layout = Style.getLayoutBlock({
      flexGrow: 2,
      height: 'auto',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getHeaderUserIconImg( params ){
    const layout = Style.getLayoutInlineBlock({
      width: '30px',
      margin: '0px 10px 0px 0px',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getHeaderHeadTab( params ){
    const layout = Style.getLayoutBlock({
      flexGrow: 2,
      height: 'auto',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getHeaderDetailIcon( params ){
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: 'auto',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getHeaderMenuIcon( params ){
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: '100%',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getHeaderChildWatchCnt( params ){
    const layout = Style.getLayoutInlineBlock({
      position: 'absolute',
      right: '20%',
      top: '7px',
      width: 'initial',
    });
    const content = Style.getContentBase({
      color: Container.themeRGBA,
      fontWeight: 'bold',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getHeaderChildTalknLogo( params ){
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
      lineHeight: 2,
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransitionOn( app ),
    });
    return Style.get({layout, content, animation});
  }
}
