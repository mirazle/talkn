import define from '~/common/define';
import Style from './index';
import Container from './Container';
import Footer from './Footer';

export default class Main {


  static get selfHeight(){ return '100%' };
  static get closeHeight(){ return 45 };
  static getOpenHeight(app, called){
    if( app.type === define.APP_TYPES.EXTENSION ){
      if( app.extensionMode === "SCRIPT"){
        console.log("A " + called);
        return window.innerHeight;
      }else{
        console.log("B " + called);
        return 450;
      }
    } else {
      return window.innerHeight;
    }

  };
  static get headerHeight(){ return 45 };
  static get notifHeight(){ return 20 };
  static get notifOpenTranslate(){ return 20 };
  static get notifHeight(){ return 20 };
  static get widthRatio(){ return 0.94 };

  constructor( params ){
    const self = Main.getSelf( params );
    const notif = {};
    return {
      self,
      notif,
    }
  }

  static getWidth( app, addUnit = false ){
    const width = '100%';
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getSelfHeightPx(){
    return `calc( 100vh - ${Footer.selfHeight}px )`;
  }

  static getSelfRight( {bootOption, app}, widthPx, addUnit = false ){
    let right = '0px';
    return addUnit ? Style.trimUnit( right ) : right ;
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
    const translateY =  Main.getSelfOpenTranslateY();
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
      transition: Container.getTransition( app ),
    });
    return Style.get({layout, content, animation});
  }
}
