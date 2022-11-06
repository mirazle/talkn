import { CSSProperties } from 'react';

import Ui from 'common/clientState/store/Ui';

import DetailRight from './DetailRight';
import Menu from './Menu';
import TimeMarker from './TimeMarker';
import Style from './index';

export default class Container {
  self: CSSProperties;
  multistreamIconWrap: CSSProperties;
  newPost: CSSProperties;
  hideScreenBottom: CSSProperties;
  linkLabel: CSSProperties;
  constructor(params) {
    const self = Container.getSelf(params);
    const multistreamIconWrap = Container.getMultistreamIconWrap(params);
    const newPost = Container.getNewPost(params);
    const hideScreenBottom = Container.getHideScreenBottom(params);
    const linkLabel = Container.getLinkLabel(params);
    return {
      self,
      multistreamIconWrap,
      newPost,
      hideScreenBottom,
      linkLabel,
    };
  }

  static get width() {
    return '100%';
  }
  static get widthRatio() {
    return 0.94;
  }
  static get radius() {
    return '10px';
  }
  static get radiuses() {
    return `${Container.radius} ${Container.radius} 0px 0px`;
  }
  static get openHeight() {
    return 360;
  }
  static get closeHeight() {
    return 360;
  }
  static get threadHeight() {
    return 360;
  }
  static get maxZIndex() {
    return 2147483647;
  }
  static get closeBottom() {
    return 0;
  }
  static get merginRatio() {
    return 0.034;
  }
  static get borderRGB() {
    return Style.mono240RGB;
  }
  static get border() {
    return `0px solid ${Container.borderRGB}`;
  }
  static get lineShadow() {
    return `0px 0px 1px ${Container.lineShadowColor}`;
  }
  static get lineInsetShadow() {
    return `0px 0px 1px ${Container.lineShadowColor} inset`;
  }
  static get lineShadowColor() {
    return Container.downreliefRGB;
  }
  static get shadow() {
    return `${Style.mono230RGB} 0px 0px 5px 0px`;
  }
  static get darkLightRGB() {
    return Style.darkLightRGB;
  }
  static get darkLightRGBA() {
    return Style.darkLightRGBA;
  }

  static get darkRGB() {
    return Style.darkRGB;
  }

  static get darkRGBA() {
    return Style.darkRGBA;
  }

  static get downreliefRGB() {
    return Style.mono160RGB;
  }
  static get reliefRGB() {
    return Style.mono180RGB;
  }
  static get reliefRGBA() {
    return Style.mono180RGBA;
  }
  static get silverRGB() {
    return Style.mono192RGB;
  }
  static get silverRGBA() {
    return Style.mono192RGBA;
  }
  static get lightGrayRGB() {
    return Style.mono211RGB;
  }
  static get lightGrayRGBA() {
    return Style.mono211RGBA;
  }
  static get chromeOffTabRGB() {
    return Style.mono225RGB;
  }
  static get chromeOffTabRGBA() {
    return Style.mono225RGBA;
  }
  static get softCalmRGB() {
    return Style.mono230RGB;
  }
  static get softCalmRGBA() {
    return Style.mono230RGBA;
  }
  static get middleCalmRGBA() {
    return Style.mono235RGBA;
  }
  static get calmRGB() {
    return Style.mono240RGB;
  }
  static get calmRGBA() {
    return Style.mono240RGBA;
  }
  static get lightRGB() {
    return Style.mono245RGB;
  }
  static get lightRGBA() {
    return Style.mono245RGBA;
  }
  static get offWhiteRGB() {
    return Style.mono250RGB;
  }
  static get offWhiteRGBA() {
    return Style.mono250RGBA;
  }
  static get offWhitePlusRGB() {
    return Style.mono252RGB;
  }
  static get offWhitePlusRGBA() {
    return Style.mono252RGBA;
  }
  static get whiteRGB() {
    return Style.mono255RGB;
  }
  static get whiteRGBA() {
    return Style.mono255RGBA;
  }

  static get fontBaseRGB() {
    return Style.fontBaseRGB;
  }
  static get themeRGBString() {
    return '79, 174, 159';
  }
  static get themeLightRGBString() {
    return '89, 184, 169';
  }
  static get themeSuperLightRGBString() {
    return '200, 255, 220';
  }
  static get themeRGB() {
    return `rgb(${Container.themeRGBString})`;
  }
  static get themeRGBA() {
    return `rgba(${Container.themeRGBString}, 0.96)`;
  }
  static get themeRGBAA() {
    return `rgba(${Container.themeRGBString}, 0.8)`;
  }
  static getBlockSize({ app, ui }) {
    return ui.screenSize === Ui.screenSizeSmallLabel ? 45 : 60;
  }
  static getLiveMediaBlockSize({ app, ui }) {
    return 60;
  }

  static getFaviconSize({ app, ui }) {
    return ui.screenSize === Ui.screenSizeSmallLabel ? 24 : 30;
  }

  static getLightThemeRGBA(alpha = 0.8) {
    return `rgba(${Container.themeLightRGBString}, ${alpha})`;
  }
  static getThemeRGBA(alpha = 0.8) {
    return `rgba(${Container.themeRGBString}, ${alpha})`;
  }

  static getTransitionOn({ app, ui }: any = {}, removeUnit = false) {
    let transition = String(Container.transitionOn);
    if (app) {
      transition = ui.isTransition ? `${Container.transitionOn}ms` : `${Container.transitionOff}ms`;
    } else {
      transition = `${Container.transitionOn}ms`;
    }

    return removeUnit ? Style.trimUnit(transition) : transition;
  }
  static getTransition({ app, ui }: any = {}, addUnit = false) {
    const transition = ui.isTransition ? `${Container.transitionOn}ms` : `${Container.transitionOff}ms`;
    return addUnit ? Style.trimUnit(transition) : transition;
  }
  static getTransitionFirstOn({ app, ui }, addUnit = false) {
    const transition = ui.isTransition ? `${Container.transitionFirstOn}ms` : `${Container.transitionOff}ms`;
    return addUnit ? Style.trimUnit(transition) : transition;
  }
  static get transitionOn() {
    return 600;
  }
  static get transitionNotif() {
    return 300;
  }
  static get transitionNotifDisp() {
    return 3000;
  }
  static get transitionFirstOn() {
    return 300;
  }
  static get transitionOff() {
    return 0;
  }

  static get notifHeight() {
    return 20;
  }
  static get notifOpenTranslate() {
    return 20;
  }
  static get notifOpenLiveMediaTranslateY() {
    return `translate3d( 0px, -125px, 0px )`;
  }
  static get notifCloseTranslateY() {
    return `translate3d( 0px, 0px, 0px )`;
  }
  static getNotifOpenTranslateY({ app, ui }) {
    const blockSize = Container.getBlockSize({ app, ui });
    return `translate3d( 0px, -${blockSize * 2}px, 0px )`;
  }
  static getNotifTranslateY({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeLiveMedia) {
      return ui.isOpenNewPost ? Container.notifOpenLiveMediaTranslateY : Container.notifCloseTranslateY;
    } else {
      return ui.isOpenNewPost ? Container.getNotifOpenTranslateY({ app, ui }) : Container.notifCloseTranslateY;
    }
  }

  static getNewPostDisplay({ app, ui }) {
    return ui.isOpenNotif ? 'none' : 'flex';
  }

  static getWidthPx({ bootOption, app, ui }) {
    if (bootOption) {
      return bootOption.width ? bootOption.width : Container.width;
    } else {
      return ui.width;
    }
  }

  static getRightPx({ app }, widthPx) {
    return '0%';
  }

  static get multistreamWrapDefaultTop() {
    return 5;
  }

  static getFontSize({ app, ui }) {
    return ui.screenSize === Ui.screenSizeSmallLabel ? 14 : 15;
  }

  static getLetterSpacing({ app, ui }) {
    return ui.screenSize === Ui.screenSizeSmallLabel ? 1.5 : 2;
  }

  static getSelf({ app, ui, bootOption, type }): Object {
    let borderRadius = '0px';
    if (ui.extensionMode === Ui.extensionModeModal) {
      borderRadius = '3px';
    }

    const layout = Style.getLayoutBlock({
      display: 'initial', // build to fixed components.
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius,
      opacity: 1,
    });
    const content = Style.getContentBase({
      fontSize: `${Container.getFontSize({ app, ui })}px`,
      lineHeight: `${Container.getFontSize({ app, ui })}px`,
      letterSpacing: `${Container.getLetterSpacing({ app, ui })}px`,
    });
    const animation = Style.getAnimationBase({
      transition: `${Container.transitionFirstOn}ms`,
    });
    return Style.get({ layout, content, animation });
  }

  static getMultistreamIconWrapTop({ app, ui }): Object {
    if (ui.extensionMode === Ui.extensionModeBottom) {
      return Container.getBlockSize({ app, ui }) + Container.multistreamWrapDefaultTop + 'px';
    } else if (ui.extensionMode === Ui.extensionModeModal) {
      return Container.getBlockSize({ app, ui }) + Container.multistreamWrapDefaultTop + 'px';
    } else {
      return Container.getBlockSize({ app, ui }) + Container.multistreamWrapDefaultTop + 'px';
    }
  }

  static getMultistreamIconWrapRight({ app, ui }): Object {
    switch (ui.screenSize) {
      default:
      case Ui.screenSizeSmallLabel:
        return '5%';
      case Ui.screenSizeMiddleLabel:
        return '20px';
      case Ui.screenSizeLargeLabel:
        return `calc( ${DetailRight.getWidth({ app, ui })} + 20px)`;
    }
  }

  static getMultistreamIconWrap({ app, ui }): Object {
    const layout = Style.getLayoutBlock({
      width: '30px',
      height: '30px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.8)',
    });

    const content = Style.getContentBase({
      color: 'rgb(255,255,255)',
      textAlign: 'center',
      lineHeight: 2,
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase({
      transition: Container.transitionOff,
    });
    return Style.get({ layout, content, animation });
  }

  static getNewPost({ app, ui }): Object {
    let display = Container.getNewPostDisplay({ app, ui });
    const styles = TimeMarker.getFixTimeMarker({ app, ui });
    delete styles.top;
    return {
      ...styles,
      display,
      zIndex: '1',
      margin: '0px auto',
      fontSize: '0.7em',
      bottom: `-${Container.notifHeight * 2}px`,
      transition: Container.getTransition({ app, ui }),
    };
  }

  static getHideScreenBottom({ app, ui }): Object {
    const layout = Style.getLayoutFlex({
      position: 'fixed',
      top: `100vh`,
      width: '100vw',
      height: '100vh',
      background: Container.reliefRGB,
      zIndex: Container.maxZIndex,
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase({});
    return Style.get({ layout, content, animation });
  }

  static getLinkLabel({ app, ui }): Object {
    const top = Container.getBlockSize({ app, ui }) + 'px';
    const left = ui.screenSize === Ui.screenSizeSmallLabel ? '0px' : `${Menu.getWidth({ app, ui })}`;
    const layout = Style.getLayoutFlex({
      maxWidth: '180px',
      position: 'fixed',
      top,
      left,
      height: '20px',
      padding: '5px 10px',
      alignItems: 'center',
      justifyContent: 'flex-start',
      background: 'rgba(0, 0, 0, 0.4)',
      zIndex: '1',
      borderRadius: '0px 0px 2px 0px',
    });
    const content = Style.getContentBase({
      fontSize: '0.7em',
      lineHeight: 2,
      whiteSpace: 'nowrap',
      color: Container.whiteRGB,
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
