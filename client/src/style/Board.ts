import Ui from 'common/clientState/store/Ui';

import App from 'api/store/App';

import Container from './Container';
import Detail from './Detail';
import Menu from './Menu';
import Style from './index';

export default class Board {
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
    return 1;
  }
  static get activeColor() {
    return Container.themeRGB;
  }
  static get unactiveColor() {
    return Container.fontBaseRGB;
  }
  static get typesMain() {
    return 'MAIN';
  }
  static get typesLink() {
    return 'LINK';
  }
  static get typesSub() {
    return 'SUB';
  }

  static getType({ app, ui }) {
    switch (app.dispThreadType) {
      case App.dispThreadTypeMulti:
      case App.dispThreadTypeSingle:
        return Board.typesMain;
      default:
        if (app.isLinkCh) {
          return Board.typesLink;
        } else {
          return Board.typesSub;
        }
    }
  }

  self: Object;
  menu: Object;
  menuUl: Object;
  menuLi: Object;
  menuLiChild: Object;
  menuLiBubble: Object;
  menuLiLinks: Object;
  menuToggle: Object;
  links: Object;
  linksUl: Object;
  linksLi: Object;
  linksLiActive: Object;
  linksLiUnactive: Object;
  linksTuneLi: Object;
  linkMenuUl: Object;
  linkMenuLi: Object;
  linksTabActive: Object;
  linksTabUnactive: Object;
  linksTabLast: Object;
  constructor(params) {
    // BOARD DEFAULT LAYOUT
    const self = Board.getSelf(params);
    const menu = Board.getMenu(params);
    const menuUl = Board.getMenuUl(params);
    const menuLi = Board.getMenuLi(params);
    const menuLiChild = Board.getMenuLiChild(params);
    const menuLiBubble = Board.getMenuLiBubble(params);
    const menuLiLinks = Board.getMenuLiLinks(params);
    const menuToggle = Board.getMenuToggle(params);

    // LINKS LAYOUT
    const links = Board.getLinks(params);
    const linksUl = Board.getLinksUl(params);
    const linksLi = Board.getLinksLi(params);

    const linksLiActive = Board.getLinksLiActive(params);
    const linksLiUnactive = Board.getLinksLiUnactive(params);

    const linksTuneLi = Board.getLinksTuneLi(params);
    const linkMenuUl = Board.getLinkMenuUl(params);
    const linkMenuLi = Board.getLinkMenuLi(params);

    // LINK TAB LAYOUT
    const linksTabActive = Board.getLinksTabActive(params);
    const linksTabUnactive = Board.getLinksTabUnactive(params);
    const linksTabLast = Board.getLinksTabLast(params);
    return {
      // BOARD DEFAULT LAYOUT
      self,
      menu,
      menuUl,
      menuLi,
      menuLiChild,
      menuLiBubble,
      menuLiLinks,
      menuToggle,

      links,
      linksUl,
      linksLi,

      linksLiActive,
      linksLiUnactive,

      linksTuneLi,
      linkMenuUl,
      linkMenuLi,

      // LINK TAB LAYOUT
      linksTabActive,
      linksTabUnactive,
      linksTabLast,
    };
  }

  static getTotalWidth({ app, ui }) {
    return Board.size + Board.padding * 2 + Board.right;
  }

  static getSelfTop({ app, ui }) {
    return Container.getBlockSize({ app, ui }) + 5;
  }

  static getSelfWidth({ app, ui }, addUnit = false) {
    let width = '93%';
    if (ui.isOpenLinks) {
      if (ui.extensionMode === Ui.extensionModeBottom) {
        width = '93%';
      } else {
        switch (ui.screenSize) {
          case Ui.screenSizeSmallLabel:
            return '93%';
          case Ui.screenSizeMiddleLabel:
            return `calc(97% - ${Menu.getWidth({ app, ui }, false)})`;
          case Ui.screenSizeLargeLabel:
            width = `calc( ${97 - Detail.getWidth({ app, ui }, false)}% - ${Menu.getWidth({ app, ui }, false)} )`;
            break;
        }
      }
    } else {
      width = Board.getTotalWidth({ app, ui }) + 'px';
    }
    return addUnit ? Style.trimUnit(width) : width;
  }

  static getSelfHeight({ app, ui }) {
    if (ui.isOpenBoard) {
      const type = Board.getType({ app, ui });
      switch (type) {
        case Board.typesMain:
          return '237px';
        case Board.typesLink:
          return '178px';
        case Board.typesSub:
          return '118px';
        default:
          return '0px';
      }
    } else {
      return '60px';
    }
  }

  static getSelfBorderRadius({ app, ui }) {
    return '10px 0px 0px 10px';
  }

  static getSelfBackground({ app, ui }) {
    return ui.isOpenBoard ? Container.lightRGBA : Container.whiteRGBA;
  }

  static getSelfRight({ app, ui }, addUnit = false): any {
    const right =
      ui.screenSize === Ui.screenSizeLargeLabel ? `calc( ${Detail.getWidth({ app, ui }, true)} + ${Board.right}px )` : `${Board.right}px`;
    return addUnit ? right : Style.trimUnit(right);
  }

  static getSelfBoxShadow({ app, ui }, addUnit = false) {
    return ui.isOpenLinks ? 'rgb(210, 210, 210) 0px 0px 2px' : 'rgb(210, 210, 210) 0px 0px 2px';
  }

  static getLinksDisplay({ app, ui }) {
    return ui.isOpenLinks ? 'flex' : 'none';
  }

  static getSelf({ app, ui }) {
    const width = Board.getSelfWidth({ app, ui });
    const height = Board.getSelfHeight({ app, ui });
    const borderRadius = Board.getSelfBorderRadius({ app, ui });
    const background = Board.getSelfBackground({ app, ui });
    const right = Board.getSelfRight({ app, ui }, true);
    const boxShadow = Board.getSelfBoxShadow({ app, ui });
    const layout = Style.getLayoutFlex({
      position: 'fixed',
      top: Board.getSelfTop({ app, ui }),
      overflow: 'hide',
      right,
      height,
      width,
      padding: '5px',
      background,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      boxShadow,
      borderRadius,
      zIndex: 3,
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransitionFirstOn({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getMenu({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: Board.getTotalWidth({ app, ui }) + 'px',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'flex-end',
    });
    const content = {};
    const animation = {};
    return Style.get({ layout, content, animation });
  }

  static getMenuUl({ app, ui }) {
    const layout = Style.getLayoutFlex({
      height: '100%',
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      flexDirection: 'column',
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getMenuLi({ app, ui }) {
    const size = Board.size + 'px';
    const layout = Style.getLayoutFlex({
      flexDirection: 'column',
      width: size,
      height: size,
      minWidth: size,
      minHeight: size,
      maxWidth: size,
      maxHeight: size,
      background: Container.whiteRGBA,
      borderRadius: '5px',
      marginBottom: '5px',
    });
    const content = Style.getContentBase({
      fontSize: '0.7em',
      letterSpacing: '1px',
      lineHeight: '17px',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getMenuLiChild({ app, ui }) {
    const color = Ui.isActiveMultistream({ app, ui }, 'getLiChild') ? Board.activeColor : Board.unactiveColor;
    const layout = {};
    const content = Style.getContentBase({
      color,
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getMenuLiBubble({ app, ui }) {
    const color = ui.isBubblePost ? Board.activeColor : Board.unactiveColor;
    const layout = {};
    const content = Style.getContentBase({
      color,
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getMenuLiLinks({ app, ui }) {
    const bgColor = Container.themeRGB;
    const layout = {};
    const content = Style.getContentBase({
      color: bgColor,
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getMenuToggle({ app, ui }) {
    const size = Board.size - 4 + 'px';
    const layout = Style.getLayoutFlex({
      width: size,
      height: size,
      minHeight: size,
      maxHeight: size,
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getLinks({ app, ui }) {
    const display = Board.getLinksDisplay({ app, ui });
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
    const layout = Style.getLayoutFlex({
      height: '100%',
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      flexDirection: 'column',
      overflow: 'scroll',
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
    const size = Board.size + 'px';
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
      lineHeight: '17px',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getLinksLiActive({ app, ui }) {
    const styles: any = Board.getLinksLi({ app, ui });
    styles.background = Container.whiteRGB;
    styles.color = Container.fontBaseRGB;
    return styles;
  }

  static getLinksLiUnactive({ app, ui }) {
    const styles: any = Board.getLinksLi({ app, ui });
    styles.background = Container.calmRGB;
    styles.color = Container.fontBaseRGB;
    return styles;
  }

  static getLinksTuneLi({ app, ui }) {
    const styles: any = Board.getLinksLi({ app, ui });
    styles.alignItems = 'center';
    return styles;
  }

  static getLinkMenuUl({ app, ui }) {
    const size = Board.size + 'px';
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
    const size = Board.size - 4 + 'px';
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
    const styles = Board.getLinkMenuLi({ app, ui });
    return styles;
  }

  static getLinksTabLast({ app, ui }) {
    const styles: any = {};
    styles.margin = '5px 0px 0px 0px';
    return styles;
  }
}
