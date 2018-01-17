import Style from './index';
import Container from './Container';
import util from './../../../util';

export default class Posts {
  constructor( params ){
    const { bootOption } = params;
    const self = Posts.getSelf( bootOption );
    return {
      self,
    }
  }

  static get headerHeight(){ return 35 };

  static getSelf( bootOption ){
    const layout = Style.getLayoutBlock({
      height: `calc( 100% - ${Container.headerHeight}px )`,
      padding: '10px 10px 10px 20px',
      overflow: 'scroll',
      background: Container.lightRGBA,
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: '600ms',
    });
    return Style.get({layout, content, animation});
  }
}
