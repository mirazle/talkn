import Style from './index';
import Container from './Container';
import Thread from './Thread';

export default class Posts {
  constructor( params ){
    const { bootOption } = params;
    const self = Posts.getSelf( bootOption );
    const more = Posts.getMore( bootOption );
    return {
      self,
      more,
    }
  }

  static get headerHeight(){ return 35 };

  static getSelf( bootOption ){
    const layout = Style.getLayoutBlock({
      height: `calc( 100% - ${Thread.headerHeight}px )`,
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

  static getMore( bootOption ){
    const layout = Style.getLayoutBlock({
      width: '50%',
      height: Container.notifHeight,
      margin: '0 auto',
      zIndex: '10',
      background: Container.themeRGBA,
      borderRadius: '20px',

    });
    const content = Style.getContentBase({
      lineHeight: 1.5,
      color: 'rgb(255,255,255)',
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
