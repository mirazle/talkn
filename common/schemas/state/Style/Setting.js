import Style from './index';

export default class Setting {

  static get width(){ return 300 };

  constructor( params ){
    const { bootOption } = params;
    const self = Setting.getSelf( bootOption );
    return {
      self,
    }
  }

  static getSelf( bootOption ){
    const layout = Style.getLayoutBlock({
      width: '100%',
      WebkitOverflowScrolling: 'touch',
      background: 'rgba(250, 250, 250, 1)',
      overflow: 'scroll',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
