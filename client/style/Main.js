import Style from './index';
import Container from './Container';
import Footer from './Footer';

export default class Main {

  static get selfHeight(){ return '100%' };
  static get headerHeight(){ return 45 };
  static get notifHeight(){ return 20 };
  static get notifOpenTranslate(){ return 20 };
  static get notifHeight(){ return 20 };
  static get widthRatio(){ return 0.94 };

  constructor( params ){
    const self = Main.getSelf( params );
    const notif = Main.getNotif( params );
    return {
      self,
      notif,
    }
  }

  static get notifOpenTranslateY(){
    console.log(Footer.selfHeight);
    return `translate3d( 0px, ${-( Footer.selfHeight * 2 )}px, 0px )`;
  }
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
//      boxShadow: Container.shadow,
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
