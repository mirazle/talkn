import App from "../../common/schemas/state/App";
import Style from "./index";
import Container from "./Container";
import Menu from "./Menu";
import DetailRight from "./DetailRight";

export default class TimeMarker {
  self: Object;
  fixTimeMarker: Object;
  constructor(params) {
    const self = TimeMarker.getSelf(params);
    const fixTimeMarker = TimeMarker.getFixTimeMarker(params);
    return {
      self,
      fixTimeMarker
    };
  }

  static getSelfWidthRate() {
    return 33;
  }

  static getSelfMarginTop() {
    return 15;
  }

  static getSelfLeftRate() {
    return 50 - TimeMarker.getSelfWidthRate() / 2;
  }

  static getFixTimeMarkerStyles({ app }) {
    const fontSize = "0.1em";
    let widthRate = TimeMarker.getSelfWidthRate() / 100;
    let width = app.width * widthRate;
    let left = "25%";
    let menuWidthPx = 0;
    let detailWidthPx = 0;
    let postsWidthPx = 0;
    switch (app.screenMode) {
      case App.screenModeSmallLabel:
        postsWidthPx = app.width;
        width = postsWidthPx * widthRate;
        left = menuWidthPx + postsWidthPx * (TimeMarker.getSelfLeftRate() / 100) + "px";
        break;
      case App.screenModeMiddleLabel:
        menuWidthPx = Menu.getWidth(app, true);
        postsWidthPx = app.width - menuWidthPx;
        width = postsWidthPx * widthRate;
        left = menuWidthPx + postsWidthPx * (TimeMarker.getSelfLeftRate() / 100) + "px";
        break;
      case App.screenModeLargeLabel:
        menuWidthPx = Menu.getWidth(app, true);
        detailWidthPx = (app.width * Number(DetailRight.getWidth(app, true))) / 100;
        postsWidthPx = app.width - (menuWidthPx + detailWidthPx);
        width = postsWidthPx * widthRate;
        left = menuWidthPx + postsWidthPx * (TimeMarker.getSelfLeftRate() / 100) + "px";
        break;
    }
    return { width, left, fontSize };
  }

  static getSelf({ app }) {
    const layout = Style.getLayoutFlex({
      width: `${TimeMarker.getSelfWidthRate()}%`,
      height: "auto",
      margin: `${TimeMarker.getSelfMarginTop()}px auto 10px auto`,
      padding: "5px 10px",
      background: Container.darkLightRGBA,
      borderRadius: "20px"
    });
    const content = Style.getContentBase({
      color: Container.whiteRGB,
      letterSpacing: "2px",
      fontSize: "0.1em"
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getFixTimeMarker({ app }) {
    const timeMarker: object = TimeMarker.getSelf({ app });
    const { left, width, fontSize } = TimeMarker.getFixTimeMarkerStyles({ app });
    return {
      ...timeMarker,
      position: "fixed",
      width,
      top: "45px",
      left,
      fontSize
    };
  }
}
