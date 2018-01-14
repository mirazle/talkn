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
  static get height(){ return 400 };
  static get mainRatio(){ return 0.94 };
  static get merginRatio(){ return 0.034 };

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
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
