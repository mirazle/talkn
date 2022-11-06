import Ui from 'common/clientState/store/Ui';

import Container from '../Container';
import Detail from '../Detail';
import Menu from '../Menu';
import Style from '../index';

export default class Video {
  static get marginBase() {
    return 5;
  }
  static get marginLeftMag() {
    return 0;
  }
  static get marginRightMag() {
    return 0;
  }
  static get marginLeft() {
    return Video.marginBase * Video.marginLeftMag;
  }
  static get marginRight() {
    return Video.marginBase * Video.marginRightMag;
  }
  static get height() {
    return 260;
  }

  self: Object;
  constructor(params) {
    const self = Video.getSelf(params);
    return {
      self,
    };
  }

  static getSelfWidth({ app, ui }) {
    let width = '0';
    const reduce = Video.marginLeftMag + Video.marginRightMag;
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        width = `${100 - reduce}%`;
        break;
      case Ui.screenSizeMiddleLabel:
        width = `calc( ${100 - reduce}% - ${Menu.getWidth({ app, ui }, true)}px )`;
        break;
      case Ui.screenSizeLargeLabel:
        width = `calc( ${100 - Detail.getWidth({ app, ui }, false) - reduce}% - ${Menu.getWidth({ app, ui }, true) + reduce}px )`;
        break;
    }
    return width;
  }

  static getSelfLeft({ app, ui }) {
    let left = '0px';
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        left = '0px';
        break;
      case Ui.screenSizeMiddleLabel:
      case Ui.screenSizeLargeLabel:
        left = Menu.getWidth({ app, ui }, true);
        break;
    }
    return left;
  }

  static getSelf({ app, ui }) {
    const display = app.isMediaCh ? 'block' : 'none';
    const width = Video.getSelfWidth({ app, ui });
    const left = Video.getSelfLeft({ app, ui });
    const layout = Style.getLayoutBlock({
      display,
      position: 'fixed',
      background: 'black',
      top: Container.getBlockSize({ app, ui }) + 'px',
      left,
      margin: `0px ${Video.marginRightMag}% 0px ${Video.marginLeftMag}%`,
      width,
      zIndex: 1,
      height: `${Video.height}px`,
      outline: 'none',
    });
    const content = {};
    const animation = {};
    return Style.get({ layout, content, animation });
  }
}
