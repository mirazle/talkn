import Style from "client/style/index";
import Container from "client/style/Container";

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
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: "26px",
        height: "26px",
        background: `rgba(${Container.themeRGBString}, 0.85)`,
        borderRadius: "26px",
        boxShadow: LiveCnt.selfBoxShadowOffHighlight,
      }),
      content: Style.getContentBase({
        fontSize: "0.7em",
        textAlign: "center",
      }),
      animation: Style.getAnimationBase({
        transition: Container.transitionOn,
      }),
    });

    const circle = Style.get({
      layout: Style.getLayoutInlineFlex({
        width: "100%",
        height: "100%",
      }),
      content: Style.getContentBase({
        textAlign: "center",
        color: Container.whiteRGB,
      }),
      animation: Style.getAnimationBase(),
    });
    return { div, circle };
  }
}
