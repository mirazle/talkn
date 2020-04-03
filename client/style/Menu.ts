import Style from "./index";
import Container from "./Container";
import Header from "./Header";
import Ui from "client/store/Ui";
import Main from "./Main";

export default class Menu {
  static get baseWidth() {
    return "300px";
  }
  static getWidth({ app, ui }, addUnit = false): any {
    let width = "0";
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
        width = "100.0%";
        break;
      case Ui.screenModeMiddleLabel:
        width = Menu.baseWidth;
        break;
      case Ui.screenModeLargeLabel:
        width = Menu.baseWidth;
        break;
    }

    return addUnit ? Style.trimUnit(width) : width;
  }

  static getTransform({ app, ui }) {
    let transform = "translate3d( 0px, 0px, 0px )";
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
        transform = ui.isOpenMenu ? "translate3d( 0%, 0%, 0px )" : "translate3d( -100% , 0%, 0px )";
        break;
      case Ui.screenModeMiddleLabel:
        transform = ui.isOpenDetail ? `translate3d( 0px ,0px, 0px )` : "translate3d( 0px ,0px, 0px )";
        break;
      case Ui.screenModeLargeLabel:
        transform = "translate3d( 0px ,0px, 0px )";
        break;
    }
    return transform;
  }
  self: any;
  wrapComponent: any;
  footer: any;
  footerChild: any;
  footerChildMoney: any;
  constructor(params) {
    const self = Menu.getSelf(params);
    const wrapComponent = Menu.getWrapComponent(params);
    const footer = Menu.getFooter(params);
    const footerChild = Menu.getFooterChild(params);
    const footerChildMoney = Menu.getFooterChildMoney(params);
    return {
      self,
      wrapComponent,
      footer,
      footerChild,
      footerChildMoney
    };
  }

  static getSelf({ app, ui }) {
    const display = "block";
    const background = ui.extensionMode === Ui.extensionModeExtBottomLabel ? "none" : Container.reliefRGB;
    const layout = Style.getLayoutBlock({
      display,
      position: "fixed",
      top: "0px",
      left: "0px",
      width: Menu.getWidth({ app, ui }),
      minWidth: Menu.getWidth({ app, ui }),
      height: "100%",
      minHeight: "auto",
      maHeight: "auto",
      margin: `${Header.headerHeight}px 0px 0px 0px`,
      background,
      WebkitOverflowScrolling: "touch",
      overflow: "hidden",
      zIndex: 10
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
      transform: Menu.getTransform({ app, ui })
    });
    return Style.get({ layout, content, animation });
  }

  static getWrapComponent({ app, ui }) {
    const width = ui.extensionMode === Ui.extensionModeExtBottomLabel ? "90%" : "100%";

    const borders = {};
    /*
      app.screenMode === App.screenModeSmallLabel
        ? { borderRight: Container.border, borderLeft: Container.border }
        : { borderLeft: Container.border };
*/
    const layout = Style.getLayoutBlock({
      width,
      minWidth: "inherit",
      maxWidth: "inherit",
      height: `calc( 100% - ${Main.headerHeight * 2}px )`,
      margin: "0 auto",
      ...borders
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getWrap({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: "initial",
      height: "60px",
      minWidth: "initial",
      minHeight: "initial",
      borderRight: Container.border
    });
    const content = Style.getContentBase({
      textAlign: "left"
    });
    const animation = Style.getAnimationBase({});
    return Style.get({ layout, content, animation });
  }

  static getFooter({ app, ui }) {
    const borders =
      ui.screenMode === Ui.screenModeSmallLabel ? { border: Container.border } : { border: Container.border };

    const layout = Style.getLayoutFlex({
      width: "100%",
      background: Container.offWhiteRGB,
      height: `${Main.headerHeight}px`,
      ...borders
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getFooterChild({ app, ui }) {
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: "100%"
    });
    const content = Style.getContentBase({
      fontSize: "0.5em"
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getFooterChildMoney({ app, ui }) {
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: "100%"
    });
    const content = Style.getContentBase({
      fontSize: "0.5em"
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
