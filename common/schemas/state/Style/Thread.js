import Style from './index';
import Container from './Container';
import util from './../../../util';

export default class Thread {

  static get selfHeight(){ return 360 };
  static get headerHeight(){ return 35 };
  static get notifHeight(){ return 20 };
  static get notifOpenTranslate(){ return 20 };
  static get notifHeight(){ return 20 };
  static get widthRatio(){ return 0.94 };

  constructor( params ){
    const { thread, bootOption } = params;
    const self = Thread.getSelf( bootOption );
    const header = Thread.getHeader( bootOption );
    const notif = Thread.getNotif( bootOption );
    return {
      self,
      header,
      notif,
    }
  }

  static getSelfWidthPx( bootOption ){
    let width = ( Math.floor( Container.width * Thread.widthRatio ) ) + 'px';
    if( bootOption.width ){
      width = util.trimPx( bootOption.width );
      width = ( Math.floor( width * Thread.widthRatio ) ) + 'px';
    }
    return width;
  }

  static getSelfHeightPx( bootOption ){
    let height = Container.threadHeight + 'px';
    if( bootOption.height ){
      height = bootOption.height + 'px';
    }
    return height;
  }

  static getSelfRight( widthPx ){
    return Math.floor( util.trimPx( widthPx ) * Container.merginRatio ) + 'px';
  }

  static getSelfTranslateY( heightPx ){
    return heightPx;
  }

  static getSelf( bootOption ){
    const widthPx = Thread.getSelfWidthPx( bootOption );
    const heightPx = Thread.getSelfHeightPx( bootOption );
    const right = Thread.getSelfRight( widthPx );
    const translateY = Thread.getSelfTranslateY( heightPx );
    const layout = Style.getLayoutBlock({
      position: 'absolute',
      width: widthPx,
      height: Thread.selfHeight,
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
    const layout = Style.getLayoutBlock({
      height: `${Thread.headerHeight}px`,
      borderBottom: Container.border,
      background: Container.lightRGB,
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
      lineHeight: 1.5,
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase({
      transition: '600ms',
    });
    return Style.get({layout, content, animation});
  }
}
