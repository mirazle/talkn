import Ui from "client/store/Ui";
import Style from "./index";
import Container from "./Container";
import Detail from "./Detail";
import Menu from "./Menu";

export default class Footer {
  static get selfHeight() {
    return 45;
  }
  static getWidth({ app, ui }, addUnit = false) {
    let width = "0";
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
        width = "200%";
        break;
      case Ui.screenModeMiddleLabel:
        width = app.isOpenDetail
          ? `calc( 100% + ${Menu.getWidth({ app, ui })} )`
          : `calc( 100% + ${Detail.getWidth({ app, ui })} )`;
        break;
      case Ui.screenModeLargeLabel:
        width = `100%`;
        break;
    }
    return addUnit ? Style.trimUnit(width) : width;
  }

  static getLeft({ app, ui }, addUnit = false) {
    let left = "0";
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
        left = "0px";
        break;
      case Ui.screenModeMiddleLabel:
        left = "0px";
        break;
      case Ui.screenModeLargeLabel:
        left = "0px";
        break;
    }
    return addUnit ? Style.trimUnit(left) : left;
  }

  static getTransform({ app, ui }) {
    let transform = "translate3d( 0px, 0px, 0px )";

    if (ui.extensionMode === Ui.extensionModeExtBottomLabel) {
      transform = ui.isOpenMenu ? "translate3d( 0%, 0px, 0px )" : "translate3d( -50%, 0px, 0px )";
    } else {
      switch (ui.screenMode) {
        case Ui.screenModeSmallLabel:
          transform = ui.isOpenMenu ? "translate3d( 100%, 0px, 0px )" : "translate3d( 0px, 0px, 0px )";
          break;
        case Ui.screenModeMiddleLabel:
          transform = ui.isOpenDetail ? `translate3d( -${Menu.baseWidth}, 0px, 0px )` : "translate3d( 0px ,0px, 0px )";
          break;
        case Ui.screenModeLargeLabel:
          transform = "translate3d( 0px ,0px, 0px )";
          break;
      }
    }
    return transform;
  }

  static getBorders({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeExtBottomLabel) {
      return { border: 0 };
    } else {
      return ui.screenMode === Ui.screenModeSmallLabel
        ? { border: Container.border }
        : { borderTop: Container.border, borderBottom: Container.border };
    }
  }

  self: Object;
  constructor(params) {
    const self = Footer.getSelf(params);
    return {
      self
    };
  }

  static getSelf({ app, ui }) {
    const borders = Footer.getBorders({ app, ui });

    const borderRadius = ui.extensionMode === Ui.extensionModeExtBottomLabel ? Container.radiuses : "0px";

    const layout = Style.getLayoutFlex({
      position: "fixed",
      bottom: "0px",
      left: Footer.getLeft({ app, ui }),
      height: Footer.selfHeight,
      width: Footer.getWidth({ app, ui }),
      //      background: Container.offWhiteRGBA,
      zIndex: Container.maxZIndex,
      borderRadius,
      justifyContent: "flex-start",
      ...borders
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transform: Footer.getTransform({ app, ui }),
      transition: Container.getTransition({ app, ui })
    });
    return Style.get({ layout, content, animation });
  }
}
