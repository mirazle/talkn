import Style from './index';

export default class Loading {
  self: Object;
  constructor(params) {
    const self = Loading.getSelf();
    return {
      self,
    };
  }

  static getSelf() {
    const layout = Style.getLayoutFlex({
      margin: '0 auto',
      height: '100vh',
      width: '10%',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
