import Style from './index';
import Container from './Container';
import Main from './Main';

export default class Detail {
  constructor( params ){
    const { bootOption } = params;
    const self = Detail.getSelf( bootOption );
    const ol = Detail.getOl( bootOption );
    return {
      self,
      ol,
    }
  }

  static get padding(){ return 20 };
  static get closeTransform(){ return `translate3d(0%, calc( 100% + ${ Detail.padding * 2 }px ), 0px)` };
  static get openTransform(){ return `translate3d(0%, 0%, 0px)` };

  static getSelf( bootOption ){
    const width = ( Main.widthRatio * 100 );
    const margin = ( ( ( 1 - Main.widthRatio ) * 100 ) / 2 );
    const heightBase = 100 - ( margin * 2 );
    const layout = Style.getLayoutBlock({
      position: 'absolute',
      top: Main.headerHeight,
      right: 0,
      width: width + '%',
      height: `calc( ${heightBase}% - ${ Detail.padding * 2 }px )`,
      margin: `${margin}%`,
      padding: `${Main.headerHeight}px 5px ${Detail.padding}px 10px`,
      background: Container.lightRGBA,
      border: Container.border,
      borderRadius: '12px',
      WebkitOverflowScrolling: 'touch',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transform: Detail.closeTransform,
      transition: '600ms',
    });
    return Style.get({layout, content, animation});
  }

  static getOl( bootOption ){
    const layout = Style.getLayoutBlock({
      overflow: 'scroll',
      width: '100%',
      height: '100%',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
