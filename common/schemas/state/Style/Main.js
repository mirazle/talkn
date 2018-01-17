import Style from './index';
import Container from './Container';
import util from './../../../util';

export default class Main {
  constructor( params ){
    const { bootOption } = params;
    const self = Main.getSelf( bootOption );
    return {
      self,
    }
  }

  static getSelf( bootOption ){
    const layout = Style.getLayoutInlineBlock();
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
