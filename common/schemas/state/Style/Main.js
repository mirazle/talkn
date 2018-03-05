import Style from './index';
import Container from './Container';
import Footer from './Footer';
import util from './../../../util';

export default class Main {

  static get selfHeight(){ return 360 };
  static get headerHeight(){ return 45 };
  static get notifHeight(){ return 20 };
  static get notifOpenTranslate(){ return 20 };
  static get notifHeight(){ return 20 };
  static get widthRatio(){ return 0.94 };

  constructor( params ){
    const { thread, bootOption } = params;
    const self = Main.getSelf( bootOption );
    const screen = Main.getScreen( bootOption );
    const header = Main.getHeader( bootOption );
    const headerChild = Main.getHeaderChild( bootOption );
    const headerChildLeft = Main.getHeaderChildLeft( bootOption );
    const headerChildUserIcon = Main.getHeaderChildUserIcon( bootOption );
    const headerChildWatchCnt = Main.getHeaderChildWatchCnt( bootOption );
    const notif = Main.getNotif( bootOption );
    return {
      self,
      header,
      headerChild,
      headerChildLeft,
      headerChildUserIcon,
      headerChildWatchCnt,
      notif,
      screen,
    }
  }

  static getSelfWidthPx( bootOption ){
    let width = ( Math.floor( Container.width * Main.widthRatio ) ) + 'px';
    if( bootOption.width ){
      if(bootOption.width === '100%'){
        width = ( Main.widthRatio * 100 ) + '%';
      }else if( bootOption.width === '100vw' ){
        width = ( Main.widthRatio * 100 ) + 'vw';
      }else{
        width = util.trimPx( bootOption.width );
        width = ( Math.floor( width * Main.widthRatio ) ) + 'px';
      }
    }
    return width;
  }

  static getSelfHeightPx( bootOption ){
    let height = Main.selfHeight;
    if( bootOption && bootOption.height ){
      height = bootOption.height + 'px';
    }else{
      const reduceHeight = Footer.selfHeight + Math.floor( Footer.selfHeight / 2 );
      height = `calc( 100vh - ${reduceHeight}px )`;
    }
    return height;
  }

  static getSelfRight( widthPx, bootOption ){
    if( bootOption.width === '100%' ){
      return ( ( ( 1 - Main.widthRatio ) / 2 ) * 100 ) + '%';
    }else if( bootOption.width === '100vw' ){
      return ( ( ( 1 - Main.widthRatio ) / 2 ) * 100 ) + 'vw';
    }else{
      return Math.floor( util.trimPx( widthPx ) * Container.merginRatio ) + 'px';
    }
  }

  static getSelfTranslateY( heightPx ){
    return heightPx;
  }


  static getScreen( bootOption ){
    const layout = Style.getLayoutInlineBlock({
      width: '100%',
      WebkitOverflowScrolling: 'touch',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getSelf( bootOption ){
    const widthPx = Main.getSelfWidthPx( bootOption );
    const heightPx = Main.getSelfHeightPx( bootOption );
    const right = Main.getSelfRight( widthPx, bootOption );
    const translateY = Main.getSelfTranslateY( heightPx );
    const layout = Style.getLayoutBlock({
      position: 'absolute',
      width: widthPx,
      height: heightPx,
      right: right,
      bottom: 0,
      borderRadius: '12px 12px 0px 0px',
      borderTop: Container.border,
      borderRight: Container.border,
      borderLeft: Container.border,
      borderBottom: 'none',
      boxShadow: Container.shadow,
      margin: '0 auto',
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transform: `translate3d(0px, ${translateY}, 0px)`,
      transition: '600ms',
    });
    return Style.get({layout, content, animation});
  }

  static getHeader( bootOption ){
    const layout = Style.getLayoutFlex({
      width: '100%',
      height: `${Main.headerHeight}px`,
      borderBottom: Container.border,
      background: Container.lightRGB,
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getHeaderChild( bootOption ){
    const layout = Style.getLayoutBlock({
      height: 'auto',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getHeaderChildLeft( bootOption ){
    const layout = Style.getLayoutBlock({
      height: 'auto',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getHeaderChildUserIcon( bootOption ){
    const layout = Style.getLayoutInlineBlock({
      width: '30px',
      margin: '0px 10px 0px 0px',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getHeaderChildWatchCnt( bootOption ){
    const layout = Style.getLayoutInlineBlock({
      width: 'initial',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getNotif( bootOption ){
    const layout = Style.getLayoutBlock({
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
      transition: '600ms',
    });
    return Style.get({layout, content, animation});
  }

  static getScreen( bootOption ){
    const layout = Style.getLayoutBlock({
      width: 'auto',
      height: 'inherit',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
