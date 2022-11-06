import Ui from 'common/clientState/store/Ui';

import Container from './Container';
import Style from './index';

export default class ExtScreen {
  self: Object;
  constructor(params) {
    const self = ExtScreen.getSelf(params);
    return {
      self,
    };
  }

  static getTop({ app, ui }) {
    return 0;
    //    return ui.extensionMode === Ui.extensionModeModal ? "0%" : "100%";
  }

  static getSelfTransform({ app, ui }, call = '') {
    if (ui.extensionMode === Ui.extensionModeBottom) {
      return ui.isDispPosts ? 'translate3d(0px, -100%, 0px)' : `translate3d(0px, 0%, 0px)`;
    } else {
      return 'translate3d(0px, 0px, 0px)';
    }
  }

  static getSelfTransition({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeBottom) {
      return ui.isDispPosts ? `${Container.transitionOn}ms` : `${Container.transitionOn}ms`;
    } else {
      return '0ms';
    }
  }

  static getSelf({ app, ui }) {
    const layout = Style.getLayoutFlex({
      position: 'fixed',
      top: ExtScreen.getTop({ app, ui }),
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      height: '100%',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transform: ExtScreen.getSelfTransform({ app, ui }),
      transition: ExtScreen.getSelfTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }
}
