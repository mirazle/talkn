import define from "../../common/define";
import Ui from "client/store/Ui";
import Style from "./index";
import Container from "./Container";
import PostsFooter from "./PostsFooter";

export default class Header {
  static get selfHeight() {
    return "100%";
  }
  static get headerHeight() {
    return 45;
  }
  static get notifHeight() {
    return 20;
  }
  static get notifOpenTranslate() {
    return 20;
  }
  static get widthRatio() {
    return 0.94;
  }

  self: Object;
  headTab: Object;
  rightIcon: Object;
  leftIcon: Object;
  userIcon: Object;
  userIconImg: Object;
  childAnalyzeWrap: Object;
  childAnalyzeType: Object;
  childAnalyzeCnt: Object;
  childTalknLogo: Object;
  constructor(params) {
    const self = Header.getSelf(params);
    const headTab = Header.getHeadTab(params);
    const rightIcon = Header.getRightIcon(params);
    const leftIcon = Header.getLeftIcon(params);
    const userIcon = Header.getUserIcon(params);
    const userIconImg = Header.getUserIconImg(params);
    const childAnalyzeWrap = Header.getChildAnalyzeWrap(params);
    const childAnalyzeType = Header.getChildAnalyzeType(params);
    const childAnalyzeCnt = Header.getChildAnalyzeCnt(params);
    const childTalknLogo = Header.getChildTalknLogo(params);

    return {
      self,
      headTab,
      rightIcon,
      leftIcon,
      userIcon,
      userIconImg,
      childAnalyzeWrap,
      childAnalyzeType,
      childAnalyzeCnt,
      childTalknLogo,
    };
  }

  static get notifOpenTranslateY() {
    return `translate3d( 0px, ${Header.headerHeight}px, 0px )`;
  }
  static get notifCloseTranslateY() {
    return `translate3d( 0px, 0px, 0px )`;
  }
  static getNotifTranslateY({ app, ui }) {
    return ui.isOpenNotif ? Header.notifOpenTranslateY : Header.notifCloseTranslateY;
  }

  static getMargin({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeExtBottomLabel) {
      return "0px 5% 0px 5%";
    } else {
      return "0 auto";
    }
  }

  static getChildAnalyzeRight({ app, ui }) {
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
        return "5%";
      case Ui.screenModeMiddleLabel:
        return "10%";
      case Ui.screenModeLargeLabel:
        return "15%";
    }
  }

  static getChildAnalyzePositions({ app, ui }) {
    const margin = ui.screenMode === Ui.screenModeSmallLabel ? "8px 0px 0px 0px" : "7px auto";
    if (ui.extensionMode === Ui.extensionModeExtBottomLabel || ui.extensionMode === Ui.extensionModeExtModalLabel) {
      return {
        position: "absolute",
        top: "0px",
        right: Header.getChildAnalyzeRight({ app, ui }),
        margin,
      };
    } else {
      return {
        position: "absolute",
        top: "0px",
        right: Header.getChildAnalyzeRight({ app, ui }),
        margin,
      };
    }
  }

  static getBorderRadius({ app, ui }, addUnit = false) {
    if (ui.extensionMode === Ui.extensionModeExtBottomLabel) {
      return ui.extensionWidth === "100%" ? "0px" : `${Container.radius} ${Container.radius} 0px 0px`;
    } else if (ui.extensionMode === Ui.extensionModeExtModalLabel) {
      return `${Container.radius} ${Container.radius} 0px 0px`;
    }
    return 0;
  }

  static getSelf({ app, ui }) {
    const width = ui.extensionMode === Ui.extensionModeExtBottomLabel ? "90%" : "100%";
    const borderTop = ui.extensionMode === "NONE" ? 0 : Container.border;
    const borderRadius = Header.getBorderRadius({ app, ui });
    const layout = Style.getLayoutFlex({
      position: "fixed",
      top: "0px",
      width,
      height: `${Header.headerHeight}px`,
      borderTop,
      borderRight: Container.border,
      borderBottom: Container.border,
      borderLeft: Container.border,
      borderRadius,
      background: Container.whiteRGB,
      margin: Header.getMargin({ app, ui }),
      zIndex: 1000,
    });
    const content = Style.getContentBase({
      textAlign: "center",
    });
    const animation = Style.getAnimationBase({
      transform: Header.getNotifTranslateY({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getUserIcon(params) {
    const layout = Style.getLayoutBlock({
      flexGrow: 2,
      height: "auto",
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUserIconImg(params) {
    const layout = Style.getLayoutInlineBlock({
      width: "30px",
      margin: "0px 10px 0px 0px",
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getHeadTab({ app, ui }) {
    const width = ui.screenMode === Ui.screenModeSmallLabel ? "60%" : "40%";
    const layout = Style.getLayoutFlex({
      justifyContent: "center",
      width,
      height: "100%",
    });
    const content = Style.getContentBase({
      fontSize: "17px",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getRightIcon({ app, ui }) {
    const width = ui.screenMode === Ui.screenModeSmallLabel ? "20%" : "30%";
    const layout = Style.getLayoutBlock({
      flexFlow: "column",
      alignItems: "center",
      justifyContent: "center",
      width,
      height: "100%",
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getLeftIcon({ app, ui }) {
    const width = ui.screenMode === Ui.screenModeSmallLabel ? "20%" : "30%";
    const layout = Style.getLayoutFlex({
      flexFlow: "column",
      alignItems: "center",
      justifyContent: "center",
      width,
      height: "100%",
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getChildAnalyzeWrap({ app, ui }) {
    const positions = Header.getChildAnalyzePositions({ app, ui });
    const layout = Style.getLayoutFlex({
      ...positions,
      flexDirection: "column",
      width: "40px",
      height: "28px",
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getChildAnalyzeType({ app, ui }) {
    const fontSize = ui.screenMode === Ui.screenModeSmallLabel ? "9px" : "14px";
    const layout = Style.getLayoutBlock({
      height: "14px",
      marginBottom: "4px",
    });
    const content = Style.getContentBase({
      fontSize,
      color: Container.themeRGBA,
      fontWeight: "bold",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getChildAnalyzeCnt({ app, ui }) {
    const fontSize = ui.screenMode === Ui.screenModeSmallLabel ? "9px" : "14px";
    const layout = Style.getLayoutBlock({
      height: "14px",
    });
    const content = Style.getContentBase({
      fontSize,
      color: Container.themeRGBA,
      fontWeight: "bold",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getChildTalknLogo(params) {
    const layout = Style.getLayoutInlineBlock({
      position: "absolute",
      width: "45px",
      height: `45px`,
    });
    const content = Style.getContentBase({
      color: Container.themeRGBA,
      fontWeight: "bold",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getNotif({ app, ui }) {
    const layout = Style.getLayoutBlock({
      position: "relative",
      top: `${PostsFooter.selfHeight}px`,
      width: "50%",
      height: Container.notifHeight,
      margin: "0 auto",
      zIndex: "10",
      background: "rgba(0, 0, 0, 0.4)",
      borderRadius: "20px",
    });
    const content = Style.getContentBase({
      color: "rgb(255,255,255)",
      textAlign: "center",
      fontSize: "12px",
      lineHeight: 2,
      cursor: "pointer",
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }
}
