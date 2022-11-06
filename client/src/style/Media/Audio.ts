import Ui from 'common/clientState/store/Ui';

import Board from '../Board';
import Container from '../Container';
import Detail from '../Detail';
import Menu from '../Menu';
import Style from '../index';

export default class Audio {
  static get marginBase() {
    return 5;
  }
  static get marginLeftMag() {
    return 5;
  }
  static get marginRightMag() {
    return 1;
  }
  static get marginLeft() {
    return Math.floor(window.innerWidth * 0.05);
  }
  static get marginRight() {
    return Audio.marginBase * Audio.marginRightMag;
  }
  static get height() {
    return 50;
  }
  self: Object;
  constructor(params: any) {
    const self = Audio.getSelf(params);
    return {
      self,
    };
  }

  static getSelfWidth({ app, ui }) {
    let width = '0';
    const reduceMargin = Audio.marginLeft + Audio.marginRight;
    const reduceWidth = Board.getTotalWidth({ app, ui });
    const reduce = reduceMargin + reduceWidth;
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        width = `calc( 100% - ${reduce}px )`;
        break;
      case Ui.screenSizeMiddleLabel:
        width = `calc( 100% - ${Menu.getWidth({ app, ui }, true) + reduce}px )`;
        break;
      case Ui.screenSizeLargeLabel:
        width = `calc( ${100 - Detail.getWidth({ app, ui }, false)}% - ${Menu.getWidth({ app, ui }, true) + reduce}px )`;
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
    const width = Audio.getSelfWidth({ app, ui });
    const left = Audio.getSelfLeft({ app, ui });
    const layout = Style.getLayoutBlock({
      display,
      position: 'fixed',
      top: Container.getBlockSize({ app, ui }) + 15 + 'px',
      left,
      margin: `0px ${Audio.marginRight}px 0px ${Audio.marginLeft}px`,
      width,
      height: `${Audio.height}px`,
    });
    const content = {};
    const animation = {};
    return Style.get({ layout, content, animation });
  }
}
