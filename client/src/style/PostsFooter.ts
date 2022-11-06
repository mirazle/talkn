import Ui from 'common/clientState/store/Ui';

import conf from 'client/conf';

import Container from './Container';
import Menu from './Menu';
import Posts from './Posts';
import Style from './index';

import airplane from 'assets/png/airplane.png';

export default class PostsFooter {
  static getWidth({ app, ui }, addUnit = false) {
    let width = '0';
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        width = '100%';
        break;
      case Ui.screenSizeMiddleLabel:
        width = Posts.getWidth({ app, ui });
        break;
      case Ui.screenSizeLargeLabel:
        width = Posts.getWidth({ app, ui });
        break;
    }
    return addUnit ? Style.trimUnit(width) : width;
  }

  static getLeft({ app, ui }, addUnit = false) {
    let left = '0';
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        left = '0px';
        break;
      case Ui.screenSizeMiddleLabel:
        left = `${Menu.getWidth({ app, ui })}`;
        break;
      case Ui.screenSizeLargeLabel:
        left = Menu.getWidth({ app, ui });
        break;
    }
    return addUnit ? Style.trimUnit(left) : left;
  }

  static getBorder({ app, ui }, addUnit = false) {
    switch (ui.extensionMode) {
      case Ui.extensionModeBottom:
        return {
          borderTop: Container.border,
          borderRight: Container.border,
          borderLeft: Container.border,
        };
      case Ui.extensionModeModal:
        switch (ui.screenSize) {
          case Ui.screenSizeSmallLabel:
            return { border: Container.border };
          case Ui.screenSizeMiddleLabel:
            return {
              borderTop: Container.border,
              borderBottom: Container.border,
            };
          case Ui.screenSizeLargeLabel:
            return {
              borderTop: Container.border,
              borderBottom: Container.border,
            };
        }
      default:
        return {
          borderTop: Container.border,
          borderBottom: Container.border,
        };
    }
  }

  static getBorderRadius({ app, ui }: any, addUnit = false) {
    if (ui.extensionMode === Ui.extensionModeBottom) {
      return ui.extensionWidth === '100%' ? '0px 0px 0px 0px' : `${Container.radius} ${Container.radius} 0px 0px`;
    } else if (ui.extensionMode === Ui.extensionModeModal) {
      switch (ui.screenSize) {
        case Ui.screenSizeSmallLabel:
          return `0px 0px ${Container.radius} ${Container.radius}`;
        case Ui.screenSizeMiddleLabel:
          return `0px 0px ${Container.radius} 0px`;
        case Ui.screenSizeLargeLabel:
          return 0;
      }
    }
    return 0;
  }

  static getTransform({ app, ui }) {
    let transform = 'translate3d( 0px, 0px, 0px )';
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        transform = ui.isOpenMenu ? 'translate3d( 0%, 0px, 0px )' : 'translate3d( 0px, 0px, 0px )';
        break;
      case Ui.screenSizeMiddleLabel:
        transform = ui.isOpenDetail ? `translate3d( 0px ,0px, 0px )` : 'translate3d( 0px ,0px, 0px )';
        break;
      case Ui.screenSizeLargeLabel:
        transform = 'translate3d( 0px ,0px, 0px )';
        break;
    }
    return transform;
  }

  self: Object;
  icon: Object;
  textarea: Object;
  modalTextarea: Object;
  button: Object;
  upper: Object;
  bottom: Object;
  constructor(params) {
    const self = PostsFooter.getSelf(params);
    const icon = PostsFooter.getIcon(params);
    const textarea = PostsFooter.getTextarea(params);
    const modalTextarea = PostsFooter.getModalTextarea(params);
    const button = PostsFooter.getButton(params);
    const upper = PostsFooter.getUpper(params);
    const bottom = PostsFooter.getBottom(params);
    return {
      self,
      icon,
      textarea,
      modalTextarea,
      button,
      upper,
      bottom,
    };
  }

  static getSelf({ app, ui }) {
    //const display = ui.extensionMode === Ui.extensionModeModal ? "none": "flex";
    const borders = PostsFooter.getBorder({ app, ui });
    const borderRadius = PostsFooter.getBorderRadius({ app, ui });
    const layout = Style.getLayoutFlex({
      //display,
      position: 'fixed',
      bottom: 0,
      left: PostsFooter.getLeft({ app, ui }),
      flexGrow: 1,
      height: Container.getBlockSize({ app, ui }),
      width: PostsFooter.getWidth({ app, ui }),
      maxWidth: PostsFooter.getWidth({ app, ui }),
      background: Container.lightRGBA,
      justifyContent: 'flex-start',
      boxShadow: `-1px 0px 1px ${Container.lineShadowColor}`,
      borderRadius,
      ...borders,
      zIndex: 10,
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transform: PostsFooter.getTransform({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getIcon({ app, ui }) {
    const layout = Style.getLayoutInlineBlock({
      width: '20%',
      maxWidth: '20%',
      height: '70%',
      backgroundImage: `url()`,
      backgroundPosition: 'center center',
      backgroundSize: `${Container.getFaviconSize({ app, ui })}px`,
      backgroundRepeat: 'no-repeat',
      zIndex: 9999,
    });
    const content = Style.getContentBase({
      cursor: 'pointer',
    });
    const animation = {};
    return Style.get({ layout, content, animation });
  }

  static getTextarea({ app, ui }) {
    const width = ui.extensionMode === Ui.extensionModeModal ? '60%' : '54%';
    const fontSize = ui.screenSize === Ui.screenSizeSmallLabel ? '1em' : '1em';
    const lineHeight = ui.screenSize === Ui.screenSizeSmallLabel ? '0.8em' : '1.4em';
    const layout = Style.getLayoutInlineBlock({
      width,
      maxWidth: width,
      height: '55%',
      background: Container.whiteRGB,
      padding: '6px',
      margin: '0 3% 0 0',
      outline: 'none',
      resize: 'none',
      border: Container.border,
      borderRadius: '3px',
      WebkitAppearance: 'none',
    });
    const content = Style.getContentBase({
      fontSize,
      lineHeight,
      textAlign: 'left',
      textIndent: '3%',
    });
    const animation = Style.getAnimationBase();

    return Style.get({ layout, content, animation });
  }

  static getModalTextarea({ app, ui }) {
    const layout = Style.getLayoutInlineBlock({
      width: '60%',
      maxWidth: '60%',
      height: '80%',
      background: Container.whiteRGB,
      padding: '6px',
      margin: '0',
      outline: 'none',
      resize: 'none',
      border: Container.border,
      borderRadius: '3px',
      WebkitAppearance: 'none',
    });
    const content = Style.getContentBase({
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getButton({ app, ui }) {
    const iconSize = ui.screenSize === Ui.screenSizeSmallLabel ? 30 : 38;
    const layout = Style.getLayoutInlineBlock({
      outline: 'none',
      width: '20%',
      maxWidth: '20%',
      height: '56%',
      margin: '0px 3% 0px 0%',
      background: `url(${airplane}) 50% 35% / ${iconSize}px no-repeat ${Container.whiteRGBA}`,
      border: Container.border,
      borderRadius: '3px',
    });
    const content = Style.getContentBase({
      color: Container.downreliefRGB,
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpper({ app, ui }) {
    const layout = Style.getLayoutFlex({
      alignItems: 'center',
      justifyContent: 'flex-start',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottom({ app, ui }) {
    const layout = Style.getLayoutFlex({
      alignItems: 'center',
      justifyContent: 'center',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
