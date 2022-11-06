import Ui from 'common/clientState/store/Ui';

import Container from './Container';
import Detail from './Detail';
import Menu from './Menu';
import Style from './index';

export default class Footer {
  static getWidth({ app, ui }, addUnit = false) {
    let width = '0';
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        width = '200%';
        break;
      case Ui.screenSizeMiddleLabel:
        width = app.isOpenDetail ? `calc( 100% + ${Menu.getWidth({ app, ui })} )` : `calc( 100% + ${Detail.getWidth({ app, ui })} )`;
        break;
      case Ui.screenSizeLargeLabel:
        width = `100%`;
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
        left = '0px';
        break;
      case Ui.screenSizeLargeLabel:
        left = '0px';
        break;
    }
    return addUnit ? Style.trimUnit(left) : left;
  }

  static getTransform({ app, ui }) {
    let transform = 'translate3d( 0px, 0px, 0px )';

    if (ui.extensionMode === Ui.extensionModeBottom) {
      transform = ui.isOpenMenu ? 'translate3d( 0%, 0px, 0px )' : 'translate3d( -50%, 0px, 0px )';
    } else {
      switch (ui.screenSize) {
        case Ui.screenSizeSmallLabel:
          transform = ui.isOpenMenu ? 'translate3d( 100%, 0px, 0px )' : 'translate3d( 0px, 0px, 0px )';
          break;
        case Ui.screenSizeMiddleLabel:
          transform = ui.isOpenDetail ? `translate3d( -${Menu.baseWidth}, 0px, 0px )` : 'translate3d( 0px ,0px, 0px )';
          break;
        case Ui.screenSizeLargeLabel:
          transform = 'translate3d( 0px ,0px, 0px )';
          break;
      }
    }
    return transform;
  }

  static getBorders({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeBottom) {
      return { border: 0 };
    } else {
      return ui.screenSize === Ui.screenSizeSmallLabel
        ? { border: Container.border }
        : { borderTop: Container.border, borderBottom: Container.border };
    }
  }

  self: Object;
  constructor(params) {
    const self = Footer.getSelf(params);
    return {
      self,
    };
  }

  static getSelf({ app, ui }) {
    const borders = Footer.getBorders({ app, ui });

    const borderRadius = ui.extensionMode === Ui.extensionModeBottom ? Container.radiuses : '0px';

    const layout = Style.getLayoutFlex({
      position: 'fixed',
      bottom: '0px',
      left: Footer.getLeft({ app, ui }),
      height: Container.getBlockSize({ app, ui }),
      width: Footer.getWidth({ app, ui }),
      //      background: Container.offWhiteRGBA,
      zIndex: Container.maxZIndex,
      borderRadius,
      justifyContent: 'flex-start',
      ...borders,
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transform: Footer.getTransform({ app, ui }),
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }
}
