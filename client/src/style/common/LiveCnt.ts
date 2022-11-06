import Ui from 'common/clientState/store/Ui';

import Container from 'client/style/Container';
import Style from 'client/style/index';

export default class LiveCnt {
  self: Object;
  constructor(params) {
    const self = LiveCnt.getSelf(params);
    return {
      self,
    };
  }

  static get selfBoxShadowOnHighlight() {
    return `0px 0px 10px rgba(${Container.themeRGBString},1)`;
  }

  static get selfBoxShadowOffHighlight() {
    return `0px 0px 0px rgba(${Container.themeRGBString},1)`;
  }

  static getSelf({ app, ui }) {
    const size = ui.screenSize === Ui.screenSizeSmallLabel ? '26px' : '30px';
    const div = Style.get({
      layout: Style.getLayoutInlineFlex({
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        background: `rgba(${Container.themeRGBString}, 0.85)`,
        borderRadius: size,
        boxShadow: LiveCnt.selfBoxShadowOffHighlight,
      }),
      content: Style.getContentBase({
        fontSize: '0.8em',
        textAlign: 'center',
      }),
      animation: Style.getAnimationBase({
        transition: `${Container.transitionOn}ms`,
      }),
    });

    const circle = Style.get({
      layout: Style.getLayoutInlineFlex({
        width: '100%',
        height: '100%',
      }),
      content: Style.getContentBase({
        textAlign: 'center',
        color: Container.whiteRGB,
      }),
      animation: Style.getAnimationBase(),
    });
    return { div, circle };
  }
}
