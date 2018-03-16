import Style from './index';
import Footer from './Footer';

export default class Container{
  constructor( params ){
    const { thread, bootOption } = params;
    const self = Container.getSelf( bootOption );
    return {
      self,
    }
  }

  static get width(){ return 320 };
  static get openHeight(){ return 360 };
  static get closeHeight(){ return 360 };
  static get threadHeight(){ return 360 };
  static get maxZIndex(){ return 2147483647 };

  static get openBottom(){ return Container.footerHeight };
  static get closeBottom(){ return 0 };
  static get merginRatio(){ return 0.034 };
  static get notifOpenTranslate(){ return 25 };
  static get notifHeight(){ return 25 };

  static get borderRGB(){ return Style.mono220RGB };
  static get border(){ return `1px solid ${Container.borderRGB}` };
  static get shadow(){ return `${Style.mono230RGB} 0px 0px 5px 0px` };

  static get reliefRGB(){ return Style.mono180RGB };
  static get reliefRGBA(){ return Style.mono180RGBA };

  static get calmRGB(){ return Style.mono240RGB };
  static get calmRGBA(){ return Style.mono240RGBA };

  static get lightRGB(){ return Style.mono245RGB };
  static get lightRGBA(){ return Style.mono245RGBA };

  static get offWhiteRGB(){ return Style.mono250RGB };
  static get offWhiteRGBA(){ return Style.mono250RGBA };

  static get whiteRGB(){ return Style.mono255RGB };
  static get whiteRGBA(){ return Style.mono255RGBA };

  static get themeRGBA(){ return 'rgba(79, 174, 159, 0.8)' };

  static getWidthPx( bootOption ){
    return bootOption.width ?
      bootOption.width :
      Container.width + 'px';
  }

  static getRightPx( widthPx ){
    if( widthPx === '100%' ){
      return '0%';
    }else if( widthPx === '100vw' ){
      return '0vw';
    }else{
      return '10px';
    }
  }

  static getSelf( bootOption ){
    const widthPx = Container.getWidthPx( bootOption );
    const rightPx = Container.getRightPx( widthPx );
    const layout = Style.getLayoutFlex({
      overflow: 'visible',
      position: 'fixed',
      bottom: '0px',
      right: rightPx,
      width: widthPx,
      height: Footer.selfHeight,
      zIndex: Container.maxZIndex,
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
