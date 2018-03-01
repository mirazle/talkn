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

  static get openBottom(){ return Container.footerHeight };
  static get closeBottom(){ return 0 };
  static get merginRatio(){ return 0.034 };
  static get notifOpenTranslate(){ return 25 };
  static get notifHeight(){ return 25 };

  static get border(){ return '1px solid rgb(220, 220, 220)' };
  static get shadow(){ return 'rgb(230, 230, 230) 0px 0px 5px 0px' };
  static get lightRGBA(){ return 'rgba(255, 255, 255, 0.96)' };
  static get calmRGBA(){ return 'rgba(250, 250, 250, 0.96)' };
  static get lightRGB(){ return 'rgb(255, 255, 255)' };
  static get calmRGB(){ return 'rgb(240, 240, 240)' };
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
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
