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
      background: 'rgba(255, 255, 255, 0.96)',
      borderRadius: '12px 12px 0px 0px',
      border: '1px solid rgb(220, 220, 220)',
      boxShadow: 'rgb(230, 230, 230) 0px 0px 5px 0px',
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
      borderBottom: '1px solid rgb(230, 230, 230)',
      background: 'rgba(255,255,255,0.96)',
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
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
