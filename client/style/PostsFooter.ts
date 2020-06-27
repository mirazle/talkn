import Ui from "client/store/Ui";
import Style from "./index";
import Container from "./Container";
import Posts from "./Posts";
import Menu from "./Menu";

export default class PostsFooter {
  static getWidth({ app, ui }, addUnit = false) {
    let width = "0";
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
        width = "100%";
        break;
      case Ui.screenModeMiddleLabel:
        width = Posts.getWidth({ app, ui });
        break;
      case Ui.screenModeLargeLabel:
        width = Posts.getWidth({ app, ui });
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
        left = `${Menu.getWidth({ app, ui })}`;
        break;
      case Ui.screenModeLargeLabel:
        left = Menu.getWidth({ app, ui });
        break;
    }
    return addUnit ? Style.trimUnit(left) : left;
  }

  static getBorder({ app, ui }, addUnit = false) {
    switch (ui.extensionMode) {
      case Ui.extensionModeExtBottomLabel:
        return {
          borderTop: Container.border,
          borderRight: Container.border,
          borderLeft: Container.border,
        };
      case Ui.extensionModeExtModalLabel:
        switch (ui.screenMode) {
          case Ui.screenModeSmallLabel:
            return { border: Container.border };
          case Ui.screenModeMiddleLabel:
            return {
              borderTop: Container.border,
              borderBottom: Container.border,
            };
          case Ui.screenModeLargeLabel:
            return {
              borderTop: Container.border,
              borderBottom: Container.border,
            };
        }
      default:
        return {
          borderTop: Container.border,
          borderBottom: Container.border,
        };
    }
  }

  static getBorderRadius({ app, ui }: any, addUnit = false) {
    if (ui.extensionMode === Ui.extensionModeExtBottomLabel) {
      return ui.extensionWidth === "100%" ? "0px 0px 0px 0px" : `${Container.radius} ${Container.radius} 0px 0px`;
    } else if (ui.extensionMode === Ui.extensionModeExtModalLabel) {
      switch (ui.screenMode) {
        case Ui.screenModeSmallLabel:
          return `0px 0px ${Container.radius} ${Container.radius}`;
        case Ui.screenModeMiddleLabel:
          return `0px 0px ${Container.radius} 0px`;
        case Ui.screenModeLargeLabel:
          return 0;
      }
    }
    return 0;
  }

  static getTransform({ app, ui }) {
    let transform = "translate3d( 0px, 0px, 0px )";
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
        transform = ui.isOpenMenu ? "translate3d( 0%, 0px, 0px )" : "translate3d( 0px, 0px, 0px )";
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

  self: Object;
  icon: Object;
  textarea: Object;
  modalTextarea: Object;
  button: Object;
  upper: Object;
  bottom: Object;
  constructor(params) {
    const self = PostsFooter.getSelf(params);
    const icon = PostsFooter.getIcon(params);
    const textarea = PostsFooter.getTextarea(params);
    const modalTextarea = PostsFooter.getModalTextarea(params);
    const button = PostsFooter.getButton(params);
    const upper = PostsFooter.getUpper(params);
    const bottom = PostsFooter.getBottom(params);
    return {
      self,
      icon,
      textarea,
      modalTextarea,
      button,
      upper,
      bottom,
    };
  }

  static getSelf({ app, ui }) {
    //const display = ui.extensionMode === Ui.extensionModeExtModalLabel ? "none": "flex";
    const borders = PostsFooter.getBorder({ app, ui });
    const borderRadius = PostsFooter.getBorderRadius({ app, ui });
    const layout = Style.getLayoutFlex({
      //display,
      position: "fixed",
      bottom: 0,
      left: PostsFooter.getLeft({ app, ui }),
      flexGrow: 1,
      height: Container.getBlockSize({ app, ui }),
      width: PostsFooter.getWidth({ app, ui }),
      maxWidth: PostsFooter.getWidth({ app, ui }),
      background: Container.offWhiteRGBA,
      justifyContent: "flex-start",
      borderRadius,
      ...borders,
      zIndex: 10,
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transform: PostsFooter.getTransform({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getIcon({ app, ui }) {
    const layout = Style.getLayoutInlineBlock({
      width: "20%",
      maxWidth: "20%",
      height: "70%",
      backgroundImage: `url()`,
      backgroundPosition: "center center",
      backgroundSize: `${Container.getFaviconSize({ app, ui })}px`,
      backgroundRepeat: "no-repeat",
      zIndex: 9999,
    });
    const content = Style.getContentBase({
      cursor: "pointer",
    });
    const animation = {};
    return Style.get({ layout, content, animation });
  }

  static getTextarea({ app, ui }) {
    const width = ui.extensionMode === Ui.extensionModeExtModalLabel ? "60%" : "54%";
    const fontSize = ui.screenMode === Ui.screenModeSmallLabel ? "0.9em" : "1em";
    const lineHeight = ui.screenMode === Ui.screenModeSmallLabel ? "0.8em" : "0.9em";
    const layout = Style.getLayoutInlineBlock({
      width,
      maxWidth: width,
      height: "55%",
      background: Container.whiteRGB,
      padding: "6px",
      margin: "0 3% 0 0",
      outline: "none",
      resize: "none",
      border: Container.border,
      borderRadius: "3px",
      WebkitAppearance: "none",
    });
    const content = Style.getContentBase({
      fontSize,
      lineHeight,
      textAlign: "left",
      textIndent: "3%",
    });
    const animation = Style.getAnimationBase();

    return Style.get({ layout, content, animation });
  }

  static getModalTextarea({ app, ui }) {
    const layout = Style.getLayoutInlineBlock({
      width: "60%",
      maxWidth: "60%",
      height: "80%",
      background: Container.whiteRGB,
      padding: "6px",
      margin: "0",
      outline: "none",
      resize: "none",
      border: Container.border,
      borderRadius: "3px",
      WebkitAppearance: "none",
    });
    const content = Style.getContentBase({
      textAlign: "left",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getButton({ app, ui }) {
    const layout = Style.getLayoutInlineBlock({
      outline: "none",
      width: "20%",
      maxWidth: "20%",
      height: "56%",
      margin: "0px 3% 0px 0%",
      background: "rgb(245, 245, 245)",
      border: Container.border,
      borderRadius: "3px",
    });
    const content = Style.getContentBase({
      color: Container.downreliefRGB,
      cursor: "pointer",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpper({ app, ui }) {
    const layout = Style.getLayoutFlex({
      alignItems: "center",
      justifyContent: "flex-start",
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottom({ app, ui }) {
    const layout = Style.getLayoutFlex({
      alignItems: "center",
      justifyContent: "center",
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
