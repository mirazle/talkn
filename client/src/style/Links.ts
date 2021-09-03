import Container from './Container';
import Style from './index';

export default class Links {
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

  self: Object;
  linksUl: Object;
  linksLi: Object;

  linksLiActive: Object;
  linksLiUnactive: Object;

  linkMenuUl: Object;
  linkMenuLi: Object;

  // LINK TAB LAYOUT
  linksTabActive: Object;
  linksTabUnactive: Object;
  linksTabLast: Object;
  constructor(params) {
    // LINKS LAYOUT
    const self = Links.getSelf(params);
    const linksUl = Links.getLinksUl(params);
    const linksLi = Links.getLinksLi(params);

    const linksLiActive = Links.getLinksLiActive(params);
    const linksLiUnactive = Links.getLinksLiUnactive(params);

    const linkMenuUl = Links.getLinkMenuUl(params);
    const linkMenuLi = Links.getLinkMenuLi(params);

    // LINK TAB LAYOUT
    const linksTabActive = Links.getLinksTabActive(params);
    const linksTabUnactive = Links.getLinksTabUnactive(params);
    const linksTabLast = Links.getLinksTabLast(params);
    return {
      self,
      linksUl,
      linksLi,

      linksLiActive,
      linksLiUnactive,

      linkMenuUl,
      linkMenuLi,

      // LINK TAB LAYOUT
      linksTabActive,
      linksTabUnactive,
      linksTabLast,
    };
  }

  static getSelfDisplay({ app, ui }) {
    return ui.isOpenLinks ? 'flex' : 'none';
  }

  static getLinksUlOevrflowY({ app, ui }) {
    return ui.isOpenLinks ? 'scroll' : 'hidden';
  }

  static getSelf({ app, ui }) {
    const display = Links.getSelfDisplay({ app, ui });
    const layout = Style.getLayoutFlex({
      display,
      width: '100%',
      height: `calc( 100% )`,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0px 3px 0px 0px',
    });
    const content = Style.getContentBase({});
    const animation = {};
    return Style.get({ layout, content, animation });
  }

  static getLinksUl({ app, ui }) {
    const overflowY = Links.getLinksUlOevrflowY({ app, ui });
    const layout = Style.getLayoutFlex({
      height: '100%',
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      flexDirection: 'column',
      overflowX: 'hidden',
      overflowY,
      overflowScrolling: 'touch',
      WebkitOverflowScrolling: 'touch',
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getLinksLi({ app, ui }) {
    const size = Links.size + 'px';
    const layout = Style.getLayoutFlex({
      alignItems: 'flex-start',
      flexDirection: 'column',
      width: '100%',
      height: size,
      minHeight: size,
      maxHeight: size,
      background: Container.whiteRGBA,
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

  static getLinksLiActive({ app, ui }) {
    const styles: any = Links.getLinksLi({ app, ui });
    styles.background = Container.whiteRGB;
    styles.color = Container.fontBaseRGB;
    return styles;
  }

  static getLinksLiUnactive({ app, ui }) {
    const styles: any = Links.getLinksLi({ app, ui });
    styles.background = Container.calmRGB;
    styles.color = Container.fontBaseRGB;
    return styles;
  }

  static getLinkMenuUl({ app, ui }) {
    const size = Links.size + 'px';
    const layout = Style.getLayoutFlex({
      minHeight: size,
      height: size,
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      flexDirection: 'row',
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getLinkMenuLi({ app, ui }) {
    const size = Links.size - 4 + 'px';
    const layout = Style.getLayoutFlex({
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      flexGrow: 1,
      margin: '5px 1% 0px 0px',
      height: size,
      minHeight: size,
      maxHeight: size,
      background: Container.reliefRGB,
      borderRadius: '5px',
    });
    const content = Style.getContentBase({
      cursor: 'pointer',
      color: Container.whiteRGB,
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getLinksTabActive({ app, ui }) {
    const styles: any = {};
    styles.background = Container.whiteRGBA;
    styles.color = Container.fontBaseRGB;
    return styles;
  }

  static getLinksTabUnactive({ app, ui }) {
    const styles = Links.getLinkMenuLi({ app, ui });
    return styles;
  }

  static getLinksTabLast({ app, ui }) {
    const styles: any = {};
    styles.margin = '5px 0px 0px 0px';
    return styles;
  }
}
