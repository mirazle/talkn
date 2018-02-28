import Style from './index';

export default class Main {
  constructor( params ){
    const { bootOption } = params;
    const self = Main.getSelf( bootOption );
    return {
      self,
    }
  }

  static getSelf( bootOption ){
    const layout = Style.getLayoutInlineBlock({
      width: '100%'
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
