import Style from './index';
import Container from './Container';
import util from './../../../util';

export default class Post {
  constructor( params ){
    return {
    }
  }

  static getSelf( bootOption ){
    const layout = Style.getLayoutBlock();
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
