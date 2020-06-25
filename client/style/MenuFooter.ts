import define from "../../common/define";
import Ui from "client/store/Ui";
import Style from "./index";
import Container from "./Container";
import Main from "./Main";

import Menu from "./Menu";

export default class MenuFooter {
  static getBorderRadius({ app, ui }) {
    switch (ui.extensionMode) {
      case Ui.extensionModeExtBottomLabel:
        return Container.radiuses;
      case Ui.extensionModeExtModalLabel:
        switch (ui.screenMode) {
          case Ui.screenModeSmallLabel:
            return `0 0 0 ${Container.radius}`;
          case Ui.screenModeMiddleLabel:
          case Ui.screenModeLargeLabel:
            return `0px 0px 0px ${Container.radius}`;
        }
      default:
        return "0";
    }
  }

  static getWidth({ app, ui }, addUnit = false) {
    let width = "0";
    if (ui.extensionMode === Ui.extensionModeExtBottomLabel) {
      width = "50%";
    } else {
      switch (ui.screenMode) {
        case Ui.screenModeSmallLabel:
          width = "100%";
          break;
        case Ui.screenModeMiddleLabel:
          width = Menu.baseWidth;
          break;
        case Ui.screenModeLargeLabel:
          width = Menu.baseWidth;
          break;
      }
    }
    return addUnit ? Style.trimUnit(width) : width;
  }

  self: Object;
  child: Object;
  childIndex: Object;
  constructor(params) {
    const self = MenuFooter.getSelf(params);
    const child = MenuFooter.getChild(params);
    const childIndex = MenuFooter.getChildIndex(params);
    return {
      self,
      child,
      childIndex,
    };
  }

  static getSelf({ app, ui }) {
    const borders =
      ui.screenMode === Ui.screenModeSmallLabel ? { border: Container.border } : { border: Container.border };
    const borderRadius = MenuFooter.getBorderRadius({ app, ui });
    const layout = Style.getLayoutFlex({
      width: MenuFooter.getWidth({ app, ui }),
      minWidth: MenuFooter.getWidth({ app, ui }),
      height: `${Container.getBlockSize({ app, ui })}px`,
      background: Container.offWhiteRGB,
      borderRadius,
      ...borders,
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getChild({ app, ui }) {
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: "100%",
    });
    const content = Style.getContentBase({
      fontSize: "0.5em",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getChildIndex({ app, ui }) {
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: "100%",
    });
    const content = Style.getContentBase({
      fontSize: "0.5em",
      fontWeight: "bold",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
