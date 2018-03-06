import Style from './index';
import Container from './Container';
import Main from './Main';

export default class Detail {
  constructor( params ){
    const { bootOption } = params;
    const self = Detail.getSelf( bootOption );
    const header = Detail.getHeader( bootOption );
    const ol = Detail.getOl( bootOption );
    const footer = Detail.getFooter( bootOption );
    const footerChild = Detail.getFooterChild( bootOption );
    return {
      self,
      header,
      ol,
      footer,
      footerChild,
    }
  }

  static get padding(){ return 20 };
  static get closeTransform(){ return `translate3d(0%, calc( 100% + ${ Detail.padding * 2 }px ), 0px)` };
  static get openTransform(){ return `translate3d(0%, 0%, 0px)` };

  static getSelf( bootOption ){
    const width = ( Main.widthRatio * 100 );
    const margin = ( ( ( 1 - Main.widthRatio ) * 100 ) / 2 );
    const heightBase = 100 - margin;
    const layout = Style.getLayoutBlock({
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: width + '%',
      height: `calc( ${heightBase}% - ${ Main.headerHeight * 1 }px )`,
      margin: `0% ${margin}% 0% ${margin}%`,
      background: Container.lightRGBA,
      border: Container.border,
      borderBottom: 0,
      borderRadius: '12px 12px 0px 0px',
      WebkitOverflowScrolling: 'touch',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transform: Detail.closeTransform,
      transition: '600ms',
    });
    return Style.get({layout, content, animation});
  }

  static getHeader( bootOption ){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: Main.headerHeight,
      borderBottom: Container.border,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getOl( bootOption ){
    const layout = Style.getLayoutBlock({
      overflow: 'scroll',
      width: '100%',
      height: `calc( 100% - ${ Main.headerHeight * 2 }px )`,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getFooter( bootOption ){
    const layout = Style.getLayoutFlex({
      width: '100%',
      height: Main.headerHeight,
      borderTop: Container.border,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getFooterChild( bootOption ){
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: 'auto',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
