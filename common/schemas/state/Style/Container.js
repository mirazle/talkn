import Style from './index';

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
  static get notifHeight(){ return 20 };
  static get notifOpenTranslate(){ return 20 };
  static get notifHeight(){ return 20 };

  static get border(){ return '1px solid rgb(220, 220, 220)' };
  static get shadow(){ return 'rgb(230, 230, 230) 0px 0px 5px 0px' };
  static get lightRGBA(){ return 'rgba(255, 255, 255, 0.96)' };
  static get calmRGBA(){ return 'rgba(250, 250, 250, 0.96)' };
  static get lightRGB(){ return 'rgb(255, 255, 255)' };
  static get calmRGB(){ return 'rgb(250, 250, 250)' };
  static get themeRGBA(){ return 'rgba(79, 174, 159, 0.7)' };

  static getWidthPx( bootOption ){
    return bootOption.width ?
      bootOption.width :
      Container.width + 'px';
  }

  static getSelf( bootOption ){
    const widthPx = Container.getWidthPx( bootOption );
    const layout = Style.getLayoutBlock({
      overflow: 'visible',
      position: 'fixed',
      bottom: '0px',
      right: '10px',
      width: widthPx,
      height: '35px',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
