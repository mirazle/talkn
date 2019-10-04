import Style from "./index";
import App from "../../common/schemas/state/App";
import Container from "./Container";
import Header from "./Header";
import Main from "./Main";

export default class LockMenu {
  static get headTabUpdate() {
    return {
      div: {
        position: "absolute",
        top: "13px",
        right: "10px",
        transform: "scale(0.5)"
      }
    };
  }

  static getCommonLayout(app) {
    const layout: any = {
      position: "fixed",
      width: "90%",
      height: "fit-content",
      minHeight: "fit-content",
      maxHeight: "fit-content",
      top: `calc( 100% + ${Header.headerHeight}px)`,
      left: "5%",
      flexFlow: "column",
      border: Container.border,
      borderRadius: "5px",
      background: Container.whiteRGB,
      zIndex: 0
    };
    switch (app.screenMode) {
      case App.screenModeSmallLabel:
        layout.width = `${100 * Container.widthRatio}`;
        layout.left = (100 - layout.width) / 2;
        layout.width = layout.width + "%";
        layout.left = layout.left + "%";
        layout.zIndex = 0;
        break;
      case App.screenModeMiddleLabel:
        layout.width = `${100 * Container.widthRatio}`;
        layout.left = (100 - layout.width) / 2;
        layout.width = layout.width + "%";
        layout.left = layout.left + "%";
        layout.zIndex = 0;
        break;
      case App.screenModeLargeLabel:
        layout.width = `33.3%`;
        layout.left = `33.3%`;
        layout.zIndex = 1;
        break;
    }
    return layout;
  }

  static getCommonTransform(app) {
    return app.openLockMenu === App.openLockMenuLabelNo
      ? "translate3d(0px, 0px, 0px)"
      : `translate3d(0px, -70vh, 0px)`;
  }

  static getPaddingLi(app) {
    switch (app.screenMode) {
      case App.screenModeSmallLabel:
        return "15px";
      case App.screenModeMiddleLabel:
      case App.screenModeLargeLabel:
        return "15px 15px 15px 20px";
    }
  }

  constructor(params) {
    const menuShare = LockMenu.getMenuShare(params);
    const header = LockMenu.getHeader(params);
    const ul = LockMenu.getUl(params);
    const liGoWeb = LockMenu.getLiGoWeb(params);
    const liTwitter = LockMenu.getLiTwitter(params);
    const liFacebook = LockMenu.getLiFacebook(params);
    const liEmbed = LockMenu.getLiEmbed(params);
    const liEmbedInput = LockMenu.getLiEmbedInput(params);
    const shareLabel = LockMenu.getShareLabel(params);
    return {
      menuShare,
      header,
      ul,
      liGoWeb,
      liTwitter,
      liFacebook,
      liEmbed,
      liEmbedInput,
      shareLabel
    };
  }

  static getMenuShare({ app }) {
    const commonLayout = LockMenu.getCommonLayout(app);
    const layout = Style.getLayoutFlex(commonLayout);
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transition: Container.getTransition(app),
      transform: LockMenu.getCommonTransform(app)
    });
    return Style.get({ layout, content, animation });
  }

  static getHeader({ app }) {
    const layout = Style.getLayoutFlex({
      width: "100%",
      height: Main.headerHeight,
      maxHeight: Main.headerHeight,
      borderBottom: Container.border,
      background: Container.whiteRGB,
      padding: "0px 20px"
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUl({ app }) {
    const layout = Style.getLayoutBlock({
      width: "100%"
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getLiGoWeb({ app }) {
    const layout = Style.getLayoutFlex({
      width: "100%",
      height: "45px",
      padding: LockMenu.getPaddingLi(app)
    });
    const content = Style.getContentBase({
      cursor: "pointer"
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getLiTwitter({ app }) {
    const layout = Style.getLayoutFlex({
      width: "100%",
      height: "45px",
      padding: LockMenu.getPaddingLi(app),
      borderBottom: Container.border
    });
    const content = Style.getContentBase({
      cursor: "pointer"
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getLiFacebook({ app }) {
    const layout = Style.getLayoutFlex({
      width: "100%",
      height: "45px",
      padding: LockMenu.getPaddingLi(app),
      borderBottom: Container.border
    });
    const content = Style.getContentBase({
      cursor: "pointer"
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getLiEmbed({ app }) {
    const layout = Style.getLayoutFlex({
      width: "100%",
      height: "45px",
      padding: LockMenu.getPaddingLi(app)
    });
    const content = Style.getContentBase({
      cursor: "pointer"
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getLiEmbedInput({ app }) {
    const layout = Style.getLayoutFlex({
      width: "98%",
      height: "25px",
      margin: "0px 0px 0px 20px",
      border: Container.border,
      borderRadius: "5px",
      padding: "5px"
    });
    const content = Style.getContentBase({
      fontSize: "12px",
      outline: 0,
      cursor: "pointer"
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getShareLabel({ app }) {
    const layout = Style.getLayoutFlex({
      flexGrow: "1"
    });
    const content = Style.getContentBase({
      color: "inherit",
      justifyContent: "flex-start",
      textIndent: "20px",
      textAlign: "left"
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}