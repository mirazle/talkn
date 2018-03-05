import Style from './index';
import Container from './Container';
import Thread from './Thread';

export default class Posts {
  constructor( params ){
    const { bootOption } = params;
    const self = Posts.getSelf( bootOption );
    const ol = Posts.getOl( bootOption );
    const more = Posts.getMore( bootOption );
    return {
      self,
      ol,
      more,
    }
  }

  static get headerHeight(){ return 35 };

  static getSelf( bootOption ){
    const layout = Style.getLayoutInlineBlock({
      width: '100%',
      WebkitOverflowScrolling: 'touch',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getOl( bootOption ){
    const layout = Style.getLayoutBlock({
      height: `calc( 100% - ${Thread.headerHeight}px )`,
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
      margin: '15px auto',
      zIndex: '10',
      background: Container.themeRGBA,
      borderRadius: '20px',

    });
    const content = Style.getContentBase({
      lineHeight: 2,
      color: 'rgb(255,255,255)',
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
