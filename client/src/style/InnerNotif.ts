import Container from './Container';
import Posts from './Posts';
import Style from './index';

export default class InnerNotif {
  self: Object;
  constructor(params) {
    const self = InnerNotif.getSelf(params);
    return {
      self,
    };
  }

  static getSelf({ app, ui }) {
    const width = Posts.getOlWidth({ app, ui }, true);
    const marginOne = (100 - width) / 2;
    const height = app.isOpenInnerNotif ? Container.getBlockSize({ app, ui }) : 0;
    const layout = Style.getLayoutFlex({
      position: 'fixed',
      top: Container.getBlockSize({ app, ui }) + 'px',
      alignItems: 'center',
      justifyContent: 'center',
      width: `calc( ${width}% - 2px )`,
      margin: `0px calc( ${marginOne}% + 1px ) 0px calc( ${marginOne}% + 1px )`,
      height,
      background: Container.themeRGBA,
      zIndex: 20,
    });
    const content = Style.getContentBase({
      color: Container.whiteRGB,
    });
    const animation = Style.getAnimationBase({
      transition: `${Container.transitionNotif}ms`,
    });
    return Style.get({ layout, content, animation });
  }
}
