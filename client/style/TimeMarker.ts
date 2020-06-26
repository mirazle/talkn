import Ui from "client/store/Ui";
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
      fixTimeMarker,
    };
  }

  static getSelfWidthRate() {
    return 33;
  }

  static getSelfHeightPx() {
    return 22;
  }

  static getSelfMarginTop() {
    return 15;
  }

  static getSelfLeftRate() {
    return 50 - TimeMarker.getSelfWidthRate() / 2;
  }

  static getFixTimeMarkerStyles({ app, ui }) {
    const fontSize = "0.8em";
    let widthRate = TimeMarker.getSelfWidthRate() / 100;
    let width = ui.width * widthRate;
    let height = `${TimeMarker.getSelfHeightPx()}px`;
    let left = "25%";
    let menuWidthPx = 0;
    let detailWidthPx = 0;
    let postsWidthPx = 0;
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
        postsWidthPx = ui.width;
        width = postsWidthPx * widthRate;
        left = menuWidthPx + postsWidthPx * (TimeMarker.getSelfLeftRate() / 100) + "px";
        break;
      case Ui.screenModeMiddleLabel:
        menuWidthPx = Menu.getWidth({ app, ui }, true);
        postsWidthPx = ui.width - menuWidthPx;
        width = postsWidthPx * widthRate;
        left = menuWidthPx + postsWidthPx * (TimeMarker.getSelfLeftRate() / 100) + "px";
        break;
      case Ui.screenModeLargeLabel:
        menuWidthPx = Menu.getWidth({ app, ui }, true);
        detailWidthPx = (ui.width * Number(DetailRight.getWidth({ app, ui }, true))) / 100;
        postsWidthPx = ui.width - (menuWidthPx + detailWidthPx);
        width = postsWidthPx * widthRate;
        left = menuWidthPx + postsWidthPx * (TimeMarker.getSelfLeftRate() / 100) + "px";
        break;
    }
    return { width, height, left, fontSize };
  }

  static getSelf({ app, ui }) {
    const display = app.isMediaCh ? "none" : "flex";
    const layout = Style.getLayoutFlex({
      width: `${TimeMarker.getSelfWidthRate()}%`,
      height: `${TimeMarker.getSelfHeightPx()}px`,
      margin: `${TimeMarker.getSelfMarginTop()}px auto 10px auto`,
      padding: "5px 10px",
      background: Container.darkLightRGBA,
      borderRadius: "20px",
      display,
    });
    const content = Style.getContentBase({
      color: Container.whiteRGB,
      letterSpacing: "2px",
      fontSize: "0.8em",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getFixTimeMarker({ app, ui }) {
    const timeMarker: object = TimeMarker.getSelf({ app, ui });
    const { left, width, height, fontSize } = TimeMarker.getFixTimeMarkerStyles({ app, ui });
    return {
      ...timeMarker,
      position: "fixed",
      width,
      height,
      top: `${Container.getBlockSize({ app, ui })}px`,
      left,
      fontSize,
    };
  }
}
