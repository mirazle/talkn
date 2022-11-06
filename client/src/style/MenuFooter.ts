import Ui from 'common/clientState/store/Ui';

import Container from './Container';
import Menu from './Menu';
import Style from './index';

export default class MenuFooter {
  static getBorderRadius({ app, ui }) {
    switch (ui.extensionMode) {
      case Ui.extensionModeBottom:
        return Container.radiuses;
      case Ui.extensionModeModal:
        switch (ui.screenSize) {
          case Ui.screenSizeSmallLabel:
            return `0 0 0 ${Container.radius}`;
          case Ui.screenSizeMiddleLabel:
          case Ui.screenSizeLargeLabel:
            return `0px 0px 0px ${Container.radius}`;
        }
      default:
        return '0';
    }
  }

  static getWidth({ app, ui }, addUnit = false) {
    let width = '0';
    if (ui.extensionMode === Ui.extensionModeBottom) {
      width = '50%';
    } else {
      switch (ui.screenSize) {
        case Ui.screenSizeSmallLabel:
          width = '100%';
          break;
        case Ui.screenSizeMiddleLabel:
          width = Menu.baseWidth;
          break;
        case Ui.screenSizeLargeLabel:
          width = Menu.baseWidth;
          break;
      }
    }
    return addUnit ? Style.trimUnit(width) : width;
  }

  self: Object;
  child: Object;
  childIndex: Object;
  constructor(params) {
    const self = MenuFooter.getSelf(params);
    const child = MenuFooter.getChild(params);
    const childIndex = MenuFooter.getChildIndex(params);
    return {
      self,
      child,
      childIndex,
    };
  }

  static getSelf({ app, ui }) {
    const borders = ui.screenSize === Ui.screenSizeSmallLabel ? { border: Container.border } : { border: Container.border };
    const borderRadius = MenuFooter.getBorderRadius({ app, ui });
    const layout = Style.getLayoutFlex({
      width: MenuFooter.getWidth({ app, ui }),
      minWidth: MenuFooter.getWidth({ app, ui }),
      height: `${Container.getBlockSize({ app, ui })}px`,
      background: Container.lightRGBA,
      boxShadow: Container.lineShadow,
      borderRadius,
      ...borders,
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getChild({ app, ui }) {
    const layout = Style.getLayoutFlex({
      flexFlow: 'column wrap',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
      height: '100%',
    });
    const content = Style.getContentBase({
      fontSize: '0.7em',
      color: 'rgba(172, 172, 172, 1)',
      lineHeight: '1.5em',
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getChildIndex({ app, ui }) {
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: '100%',
    });
    const content = Style.getContentBase({
      fontSize: '0.7em',
      fontWeight: '600',
      lineHeight: '1.5em',
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
