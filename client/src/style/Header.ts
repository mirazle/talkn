import Ui from 'common/clientState/store/Ui';

import Container from './Container';
import Style from './index';

export default class Header {
  static get selfHeight() {
    return '100%';
  }
  static get notifHeight() {
    return 20;
  }
  static get notifOpenTranslate() {
    return 20;
  }
  static get widthRatio() {
    return 0.94;
  }

  self: Object;
  headTab: Object;
  rightIcon: Object;
  leftIcon: Object;
  userIcon: Object;
  userIconImg: Object;
  liveCntWrap: Object;
  childAnalyzeWrap: Object;
  childAnalyzeType: Object;
  childAnalyzeCnt: Object;
  childTalknLogo: Object;
  constructor(params) {
    const self = Header.getSelf(params);
    const headTab = Header.getHeadTab(params);
    const rightIcon = Header.getRightIcon(params);
    const leftIcon = Header.getLeftIcon(params);
    const userIcon = Header.getUserIcon(params);
    const userIconImg = Header.getUserIconImg(params);
    const liveCntWrap = Header.getLiveCntWrap(params);
    const childAnalyzeWrap = Header.getChildAnalyzeWrap(params);
    const childAnalyzeType = Header.getChildAnalyzeType(params);
    const childAnalyzeCnt = Header.getChildAnalyzeCnt(params);
    const childTalknLogo = Header.getChildTalknLogo(params);

    return {
      self,
      headTab,
      rightIcon,
      leftIcon,
      userIcon,
      userIconImg,
      liveCntWrap,
      childAnalyzeWrap,
      childAnalyzeType,
      childAnalyzeCnt,
      childTalknLogo,
    };
  }

  static getNotifOpenTranslateY({ app, ui }) {
    return `translate3d( 0px, ${Container.getBlockSize({ app, ui })}px, 0px )`;
  }
  static get notifCloseTranslateY() {
    return `translate3d( 0px, 0px, 0px )`;
  }
  static getNotifTranslateY({ app, ui }) {
    return ui.isOpenNotif ? Header.getNotifOpenTranslateY({ app, ui }) : Header.notifCloseTranslateY;
  }

  static getMargin({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeBottom) {
      return '0px 5% 0px 5%';
    } else {
      return '0 auto';
    }
  }

  static getChildAnalyzeRight({ app, ui }) {
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        return '5%';
      case Ui.screenSizeMiddleLabel:
        return '10%';
      case Ui.screenSizeLargeLabel:
        return '15%';
    }
  }

  static getChildAnalyzePositions({ app, ui }) {
    const margin = ui.screenSize === Ui.screenSizeSmallLabel ? '8px 0px 0px 0px' : '7px auto';
    if (ui.extensionMode === Ui.extensionModeBottom || ui.extensionMode === Ui.extensionModeModal) {
      return {
        position: 'absolute',
        top: '0px',
        right: Header.getChildAnalyzeRight({ app, ui }),
        margin,
      };
    } else {
      return {
        position: 'absolute',
        top: '0px',
        right: Header.getChildAnalyzeRight({ app, ui }),
        margin,
      };
    }
  }

  static getBorderRadius({ app, ui }, addUnit = false) {
    if (ui.extensionMode === Ui.extensionModeBottom) {
      return ui.extensionWidth === '100%' ? '0px' : `${Container.radius} ${Container.radius} 0px 0px`;
    } else if (ui.extensionMode === Ui.extensionModeModal) {
      return `${Container.radius} ${Container.radius} 0px 0px`;
    }
    return 0;
  }

  static getSelf({ app, ui }) {
    const width = ui.extensionMode === Ui.extensionModeBottom ? '90%' : '100%';
    const borderTop = ui.extensionMode === Ui.extensionModeNone ? 0 : Container.border;
    const borderRadius = Header.getBorderRadius({ app, ui });
    const boxShadow = ui.extensionMode === Ui.extensionModeNone ? Container.lineShadow : Container.lineInsetShadow;
    const layout = Style.getLayoutFlex({
      position: 'fixed',
      top: 0,
      left: 0,
      width,
      height: `${Container.getBlockSize({ app, ui })}px`,
      borderTop,
      borderRight: Container.border,
      borderBottom: Container.border,
      borderLeft: Container.border,
      borderRadius,
      background: Container.whiteRGB,
      margin: Header.getMargin({ app, ui }),
      zIndex: 1000,
      boxShadow,
    });
    const content = Style.getContentBase({
      textAlign: 'center',
    });
    const animation = Style.getAnimationBase({
      transform: Header.getNotifTranslateY({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getUserIcon(params) {
    const layout = Style.getLayoutBlock({
      flexGrow: 2,
      height: 'auto',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUserIconImg(params) {
    const layout = Style.getLayoutInlineBlock({
      width: '30px',
      margin: '0px 10px 0px 0px',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getLiveCntWrap(params) {
    const layout = Style.getLayoutInlineBlock({
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '3px',
      left: '20%',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getHeadTab({ app, ui }) {
    const width = ui.screenSize === Ui.screenSizeSmallLabel ? '60%' : '40%';
    const layout = Style.getLayoutFlex({
      justifyContent: 'center',
      width,
      height: '100%',
    });
    const content = Style.getContentBase({
      fontSize: '1.2em',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getRightIcon({ app, ui }) {
    const width = ui.screenSize === Ui.screenSizeSmallLabel ? '20%' : '30%';
    const layout = Style.getLayoutFlex({
      flexFlow: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width,
      height: '100%',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getLeftIcon({ app, ui }) {
    const width = ui.screenSize === Ui.screenSizeSmallLabel ? '20%' : '30%';
    const layout = Style.getLayoutFlex({
      flexFlow: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width,
      height: '100%',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getChildAnalyzeWrap({ app, ui }) {
    const positions = Header.getChildAnalyzePositions({ app, ui });
    const layout = Style.getLayoutFlex({
      ...positions,
      flexDirection: 'column',
      width: '40px',
      height: '28px',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getChildAnalyzeType({ app, ui }) {
    const layout = Style.getLayoutBlock({
      height: '14px',
      marginBottom: '4px',
    });
    const content = Style.getContentBase({
      color: Container.themeRGBA,
      fontWeight: 'bold',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getChildAnalyzeCnt({ app, ui }) {
    const layout = Style.getLayoutBlock({
      height: '14px',
    });
    const content = Style.getContentBase({
      color: Container.themeRGBA,
      fontWeight: 'bold',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getChildTalknLogo({ app, ui }) {
    const layout = Style.getLayoutInlineBlock({
      position: 'absolute',
      width: `${Container.getBlockSize({ app, ui })}px`,
      height: `${Container.getBlockSize({ app, ui })}px`,
    });
    const content = Style.getContentBase({
      color: Container.themeRGBA,
      fontWeight: 'bold',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getNotif({ app, ui }) {
    const layout = Style.getLayoutBlock({
      position: 'relative',
      top: `${Container.getBlockSize({ app, ui })}px`,
      width: '50%',
      height: Container.notifHeight,
      margin: '0 auto',
      zIndex: '10',
      background: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '20px',
    });
    const content = Style.getContentBase({
      color: 'rgb(255,255,255)',
      textAlign: 'center',
      lineHeight: 2,
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }
}
