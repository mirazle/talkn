import Style from './index';
import Container from './Container';
import util from './../../../util';

export default class Main {
  constructor( params ){
    const { thread, bootOption } = params;
    const self = Main.getSelf( bootOption );
    const header = Main.getHeader( bootOption );
    const body = Main.getBody( bootOption );
    return {
      self,
      header,
      body,
    }
  }

  static get headerHeight(){ return 35 };

  static getSelfWidthPx( bootOption ){
    let width = ( Math.floor( Container.width * Container.mainRatio ) ) + 'px';
    if( bootOption.width ){
      width = util.trimPx( bootOption.width );
      width = ( Math.floor( width * Container.mainRatio ) ) + 'px';
    }
    return width;
  }

  static getSelfTranslateX( widthPx ){
    return Math.floor( util.trimPx( widthPx ) * Container.merginRatio ) + 'px';
  }

  static getSelf( bootOption ){
    const widthPx = Main.getSelfWidthPx( bootOption );
    const translateX = Main.getSelfTranslateX( widthPx );
    const layout = Style.getLayoutBlock({
      position: 'absolute',
      width: widthPx,
      height: '0px',
      bottom: '0px',
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
      transform: `translate3d(${translateX}, 0px, 0px)`,
      transition: '600ms',
    });
    return Style.get({layout, content, animation});
  }

  static getHeader( bootOption ){
    const layout = Style.getLayoutBlock({
      height: `${Main.headerHeight}px`,
      borderBottom: Container.border,
      background: Container.lightRGB,
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBody( bootOption ){
    const layout = Style.getLayoutBlock({
      height: `calc( 100% - ${Main.headerHeight}px )`,
      padding: '10px',
      overflow: 'scroll',
      background: Container.lightRGBA,
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
