import App from "../../common/schemas/state/App";
import conf from "../../common/conf";
import Style from "./index";
import Container from "./Container";

export default class Post {
  static get bubblestampScale() {
    return 2;
  }
  static get stampScale() {
    return 1;
  }
  static get fontSize() {
    return 14;
  }
  static get iconSize() {
    return "25px";
  }

  constructor(params) {
    const self = Post.getSelf(params);
    const upper = Post.getUpper(params);
    const upperChild = Post.getUpperChild(params);
    const upperTitle = Post.getUpperTitle(params);
    const upperTimeago = Post.getUpperTimeago(params);
    const bottom = Post.getBottom(params);
    const bottomIcon = Post.getBottomIcon(params);
    const bottomPost = Post.getBottomPost(params);
    const stampLabelWrap = Post.getStampLabelWrap(params);
    const stampLabel = Post.getStampLabel(params);
    return {
      self,
      upper,
      upperChild,
      upperTitle,
      upperTimeago,
      bottom,
      bottomIcon,
      bottomPost,
      stampLabelWrap,
      stampLabel
    };
  }

  static getStampTag(post, isBubble = true) {
    const style = Post.getStampStyle(isBubble);
    return `<div class="talknStamps" style="${style}">${post}</div>`;
  }

  static getStampStyle(isBubble = true) {
    const scale = isBubble ? Post.bubblestampScale : Post.stampScale;
    return `display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;transform: scale(${scale});font-size: 50px;`;
  }

  static getSelf({ app }) {
    const padding = app.isBubblePost ? "10px 0px 10px 0px" : "0px 0px 0px 0px";
    const minHeight = app.isBubblePost ? "75px" : "40px";
    const width = "calc( 100% - 0px )";
    const layout = Style.getLayoutBlock({
      width,
      minWidth: "calc( 100% - 20px )",
      maxWidth: width,
      height: "auto",
      minHeight,
      padding
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpper({ app }) {
    const display = app.isBubblePost ? "flex" : "none";
    const layout = Style.getLayoutFlex({
      display,
      justifyContent: "space-between",
      height: "20px"
    });
    const content = Style.getContentBase({
      fontSize: "13px"
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpperChild({ app }) {
    const layout = Style.getLayoutFlex({
      alignItems: "flex-start",
      justifyContent: "center",
      flexGrow: 2,
      width: "20%",
      minWidth: "20%",
      maxWidth: "20%"
    });
    const content = Style.getContentBase({
      textAlign: "left",
      textIndent: "10px"
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpperTitle({ app }) {
    const layout = Style.getLayoutFlex({
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexGrow: 6,
      width: "60%",
      minWidth: "60%",
      maxWidth: "60%",
      margin: "0px 10px 0px 5px"
    });
    const content = Style.getContentBase({
      textAlign: "left",
      whiteSpace: "nowrap",
      wordBreak: "break-all"
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpperTimeago({ app }) {
    const layout = Style.getLayoutFlex({
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexGrow: 2,
      padding: "0px 20px 0px 0px",
      width: "20%",
      minWidth: "20%",
      maxWidth: "20%"
    });
    const content = Style.getContentBase({
      textAlign: "right",
      letterSpacing: "0.5px"
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottom({ app }) {
    const layout = Style.getLayoutFlex({
      padding: "0px 10px 0px 0px"
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottomIcon({ app }) {
    const layout = Style.getLayoutBlock({
      flexGrow: 2,
      width: "20%",
      minWidth: "20%",
      maxWidth: "20%",
      height: Post.iconSize,
      backgroundImage: `url(${conf.protcol}:${conf.assetsPath}favicon.ico")`,
      backgroundPosition: "50% 50%",
      backgroundSize: "24px 24px",
      backgroundRepeat: "no-repeat"
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottomPost({ app }) {
    const background = app.isBubblePost ? Container.themeRGBA : "none";
    const color = app.isBubblePost ? Container.whiteRGBA : "rgba(160, 160, 160)";
    const padding = app.isBubblePost ? "15px 15px 15px 25px" : "0px";
    const layout = Style.getLayoutBlock({
      flexGrow: 8,
      width: "79%",
      minWidth: "79%",
      maxWidth: "79%",
      background,
      padding,
      margin: "0px 1% 0px 0px",
      borderRadius: "10px"
    });
    const content = Style.getContentBase({
      color,
      lineHeight: 1.7,
      fontSize: `${Post.fontSize}px`,
      textAlign: "left",
      cursor: "pointer",
      wordWrap: "break-word",
      overflowWrap: "break-word"
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getStampLabelWrap({ app }) {
    const right = App.screenModeSmallLabel === app.screenMode ? "9%" : "7%";
    const layout = Style.getLayoutFlex({
      position: "absolute",
      bottom: "10px",
      right,
      width: "100%",
      height: "20px",
      justifyContent: "flex-end",
      alignItems: "center",
      zIndex: 10
    });
    const content = Style.getContentBase({
      textAlign: "right"
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getStampLabel({ app }) {
    const layout = Style.getLayoutFlex({
      width: "100px",
      height: "inherit",
      padding: "5px",
      background: "rgba(80, 80 ,80, 0.2)",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "5px 5px 0px 0px"
    });
    const content = Style.getContentBase({
      fontSize: "10px",
      color: Container.whiteRGB
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
