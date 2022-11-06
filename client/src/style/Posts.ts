import { CSSProperties } from 'react';

import Ui from 'common/clientState/store/Ui';

import App from 'api/store/App';

import Container from './Container';
import Detail from './Detail';
import Video from './Media/Video';
import Menu from './Menu';
import Style from './index';

export default class Posts {
  static getSelfDisplay({ app, ui }) {
    return ui.isOpenNotif ? 'none' : 'flex';
  }
  static getMinWidth({ app, ui }, addUnit = false) {
    let width = '200px';
    return addUnit ? Style.trimUnit(width) : width;
  }

  static getOlWidth({ app, ui }, addUnit = false): any {
    const width = ui.extensionMode === Ui.extensionModeBottom ? '90%' : '100%';
    return addUnit ? Style.trimUnit(width) : width;
  }

  static getWidth({ app, ui }, addUnit = false): any {
    let width = '100%';
    switch (ui.extensionMode) {
      case Ui.extensionModeBottom:
        width = '90%';
        break;
      case Ui.extensionModeLiveMedia:
        width = '100%';
        break;
      default:
        switch (ui.screenSize) {
          case Ui.screenSizeSmallLabel:
            return '100%';
          case Ui.screenSizeMiddleLabel:
            return `calc(100% - ${Menu.getWidth({ app, ui }, false)})`;
          case Ui.screenSizeLargeLabel:
            width = `calc( ${100 - Detail.getWidth({ app, ui }, false)}% - ${Menu.getWidth({ app, ui }, false)} )`;
            break;
        }
    }
    return addUnit ? Style.trimUnit(width) : width;
  }

  self: Object;
  ol: Object;
  more: Object;
  firstAction: Object;
  constructor(params) {
    const self = Posts.getSelf(params);
    const ol = Posts.getOl(params);
    const more = Posts.getMore(params);
    const firstAction = Posts.getFirstAction(params);
    return {
      self,
      ol,
      more,
      firstAction,
    };
  }

  static closeIndexTransform({ app, ui }) {
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        return `translate3d( -${ui.width}px, 0px, 0px)`;
      case Ui.screenSizeMiddleLabel:
        return `translate3d( -${Menu.getWidth({ app, ui })}px, 0px, 0px)`;
      case Ui.screenSizeLargeLabel:
        return `translate3d( -${Menu.getWidth({ app, ui })}px, 0px, 0px)`;
    }
  }

  static openIndexTransform(option) {
    return `translate3d( 0px, 0px, 0px)`;
  }

  static get headerHeight() {
    return 35;
  }

  static getBorders({ app, ui }) {
    let borders = { borderTop: '0', borderRight: '0', borderBottom: '0', borderLeft: '0' };
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        borders.borderRight = Container.border;
        borders.borderLeft = Container.border;
        break;
      case Ui.screenSizeMiddleLabel:
        borders.borderRight = Container.border;
        break;
      case Ui.screenSizeLargeLabel:
        break;
    }
    return borders;
  }

  static getMargin({ app, ui }, addUnit = false) {
    let margin = '0';
    if (ui.extensionMode === Ui.extensionModeLiveMedia) {
      margin = '0';
    } else {
      switch (ui.screenSize) {
        case Ui.screenSizeSmallLabel:
          margin = `0`;
          break;
        case Ui.screenSizeMiddleLabel:
        case Ui.screenSizeLargeLabel:
          margin = `0 0 0 ${Menu.getWidth({ app, ui })}`;
          break;
      }
    }
    return margin;
  }

  static getPadding({ app, ui }) {
    const blockSize = Container.getBlockSize({ app, ui });
    let padding = '0';
    if (app.isMediaCh) {
      padding = `${blockSize * 2.3}px 0 ${blockSize}px 0`;
    } else {
      switch (ui.extensionMode) {
        case Ui.extensionModeLiveMedia:
          padding = `0 0 ${Container.getLiveMediaBlockSize({ app, ui })}px 0`;
          break;
        default:
          switch (ui.screenSize) {
            case Ui.screenSizeSmallLabel:
              padding = `${blockSize}px 0 ${blockSize}px 0`;
              break;
            case Ui.screenSizeMiddleLabel:
              padding = `${blockSize}px 0 ${blockSize}px 0`;
              break;
            case Ui.screenSizeLargeLabel:
              padding = `${blockSize}px 0 ${blockSize}px 0`;
              break;
          }
          break;
      }
    }
    return padding;
  }

  static getSelfTransform({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeBottom) {
      return ui.isDispPosts
        ? 'translate3d(0px, 0px, 0px)'
        : `translate3d(0px, calc( 100% + ${Container.getBlockSize({ app, ui })}px ), 0px)`;
    } else {
      return 'translate3d(0px, 0px, 0px)';
    }
  }

  static getSelfHeight({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeLiveMedia) {
      return '100vh';
    } else {
      switch (ui.screenSize) {
        case Ui.screenSizeLargeLabel:
          if (app.chType === App.mediaTagTypeVideo) {
            return `calc( 100% - ${Container.getBlockSize({ app, ui }) + Container.getBlockSize({ app, ui }) + Video.height}px )`;
          } else {
            return `100vh`;
          }
        case Ui.screenSizeSmallLabel:
          return '100vh';
      }
    }
  }

  static getSelfMinHeight({ app, ui }) {
    if (ui.extensionMode !== Ui.extensionModeNone) {
      return `430px`;
    } else {
      if (ui.screenSize === Ui.screenSizeLargeLabel) {
        return `calc( 100% - ${Container.getBlockSize({ app, ui }) + Container.getBlockSize({ app, ui })}px )`;
      } else {
        return 'auto';
      }
    }
  }

  static getSelfTop({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeNone) {
      if (app.chType === App.mediaTagTypeVideo) {
        return `${Container.getBlockSize({ app, ui }) + Video.height}px`;
      }
    }
    return '0';
  }

  static getSelfLeft({ app, ui }) {
    return '0';
  }

  static getSelfBoxShadow({ app, ui }) {
    let boxShadow = '0px 0px 0px rgba(255,255,255)';
    if (ui.extensionMode === Ui.extensionModeNone) {
      return boxShadow;
    } else {
      switch (ui.screenSize) {
        case Ui.screenSizeSmallLabel:
          return Container.lineInsetShadow;
        case Ui.screenSizeMiddleLabel:
        case Ui.screenSizeLargeLabel:
          return boxShadow;
      }
    }
    return boxShadow;
  }

  static getSelf({ app, ui }) {
    let position = 'absolute';
    let overflowX = 'hidden';
    let overflowY = 'hidden';
    let borders = Posts.getBorders({ app, ui });
    let background = Container.whiteRGBA;
    const boxShadow = Posts.getSelfBoxShadow({ app, ui });
    // screen mode large is Posts scroll( no window scroll ).
    if (ui.screenSize === Ui.screenSizeLargeLabel) {
      position = 'fixed';
      overflowX = 'hidden';
      overflowY = 'scroll';
    } else if (ui.screenSize === Ui.screenSizeSmallLabel) {
      overflowX = 'hidden';
      overflowY = 'scroll';
    }

    const layout = Style.getLayoutBlock({
      position: 'absolute',
      top: Posts.getSelfTop({ app, ui }),
      left: Posts.getSelfLeft({ app, ui }),
      width: Posts.getWidth({ app, ui }),
      minWidth: Posts.getMinWidth({ app, ui }),
      height: Posts.getSelfHeight({ app, ui }),
      minHeight: Posts.getSelfHeight({ app, ui }),
      maxHeight: 'auto',
      margin: Posts.getMargin({ app, ui }),
      padding: Posts.getPadding({ app, ui }),
      background,
      overflowScrolling: 'touch',
      WebkitOverflowScrolling: 'touch',
      boxShadow,
      overflowX,
      overflowY,
      ...borders,
    });
    const content = {};
    const animation = Style.getAnimationBase({});
    return Style.get({ layout, content, animation });
  }

  static getOl({ app, ui }) {
    let width = '100%';
    let margin = '0';
    let borderRight = '0';
    let borderLeft = '0';

    if (ui.extensionMode === Ui.extensionModeBottom) {
      width = Posts.getOlWidth({ app, ui });
      margin = '0px 0px 0px 5%';
      borderRight = Container.border;
      borderLeft = Container.border;
    }

    const layout = Style.getLayoutBlock({
      width,
      margin,
      height: `100vh`,
      borderRight,
      borderLeft,
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getMore({ app, ui }) {
    const background = ui.isBubblePost ? Container.themeRGBA : Container.reliefRGBA;
    const margin = ui.isBubblePost ? '15px auto' : '10px auto';
    const layout = Style.getLayoutFlex({
      width: '50%',
      height: Container.notifHeight,
      margin,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '10',
      background,
      borderRadius: '20px',
    });
    const content = Style.getContentBase({
      color: Container.whiteRGB,
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getFirstAction({ app, ui }) {
    const layout = Style.getLayoutFlex({
      flexFlow: 'column wrap',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'calc(100% - 120px)',
      height: 'auto',
      padding: '20px',
      margin: '60px',
      background: Container.themeRGBA,
      borderRadius: '10px',
    });
    const content = Style.getContentBase({
      lineHeight: '2em',
      color: Container.whiteRGB,
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
