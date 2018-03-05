import Style from './index';
import Container from './Container';
import Thread from './Thread';

export default class Setting {
  constructor( params ){
    const { bootOption } = params;
    const self = Setting.getSelf( bootOption );
    return {
      self,
    }
  }

  static getSelf( bootOption ){
    const layout = Style.getLayoutInlineBlock({
      width: '100%',
      WebkitOverflowScrolling: 'touch',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
