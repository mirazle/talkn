import Container from './Container';
import Style from './index';

export default class Link {
  static get tuneSize() {
    return 50;
  }
  static get size() {
    return 54;
  }
  static get padding() {
    return 5;
  }
  static get right() {
    return 0;
  }
  static get activeColor() {
    return Container.themeRGB;
  }
  static get unactiveColor() {
    return Container.fontBaseRGB;
  }
  static get activeBgColor() {
    return Container.whiteRGBA;
  }
  static get unactiveBgColor() {
    return 'rgba( 235, 235, 235, 0.96 )';
  }

  self: Object;
  tuneLi: Object;
  activeLi: Object;
  unactiveLi: Object;
  constructor(params) {
    const self = Link.getSelf(params);
    const tuneLi = Link.getTuneLi(params);
    const activeLi = Link.getActiveLi(params);
    const unactiveLi = Link.getUnactiveLi(params);

    return {
      self,
      tuneLi,
      activeLi,
      unactiveLi,
    };
  }

  static getSelf({ app, ui }) {
    const size = Link.size + 'px';
    const layout = Style.getLayoutFlex({
      alignItems: 'flex-start',
      flexDirection: 'column',
      width: '100%',
      height: size,
      minHeight: size,
      maxHeight: size,
      background: Link.activeBgColor,
      borderRadius: '5px',
      padding: '0px 0px 0px 10px',
      marginBottom: '5px',
    });
    const content = Style.getContentBase({
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getTuneLi({ app, ui }) {
    const styles: any = Link.getActiveLi({ app, ui });
    styles.alignItems = 'center';
    return styles;
  }

  static getActiveLi({ app, ui }) {
    const styles: any = Link.getSelf({ app, ui });
    styles.background = Link.activeBgColor;
    styles.color = Container.fontBaseRGB;
    return styles;
  }

  static getUnactiveLi({ app, ui }) {
    const styles: any = Link.getSelf({ app, ui });
    styles.background = Link.unactiveBgColor;
    styles.color = Container.fontBaseRGB;
    return styles;
  }
}
