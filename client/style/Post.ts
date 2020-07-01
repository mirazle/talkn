import Ui from "client/store/Ui";
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
  self: Object;
  upper: Object;
  upperChild: Object;
  upperTitle: Object;
  upperTimeago: Object;
  bottom: Object;
  bottomIcon: Object;
  bottomPost: Object;
  stampLabelWrap: Object;
  stampLabel: Object;
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
      stampLabel,
    };
  }

  static getStampTag(post, isBubble = true) {
    const style = Post.getStampStyle(isBubble);
    return `<div class="talknStamps" style="${style}">${post}</div>`;
  }

  static getStampStyle(isBubble = true) {
    const scale = isBubble ? Post.bubblestampScale : Post.stampScale;
    return (
      `display: flex;` +
      `justify-content: center;` +
      `align-items: center;` +
      `width: 100%;` +
      `height: 100%;` +
      `transform: scale(${scale});` +
      `line-height: 2em;` +
      `font-size: 3.2em;`
    );
  }

  static getSelf({ app, ui }) {
    const padding = ui.isBubblePost ? "5px 0" : "0";
    const margin = ui.isBubblePost ? "5px 0" : "0";
    const minHeight = ui.isBubblePost ? "40px" : "40px";
    const width = "calc( 100% - 0px )";
    const layout = Style.getLayoutBlock({
      width,
      minWidth: "calc( 100% - 20px )",
      maxWidth: width,
      height: "auto",
      minHeight,
      margin,
      padding,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getFixTimeMarker({ app, ui }) {
    const timeMarker = Post.getTimeMarker({ app, ui });
    const fixTimeMarker = { ...timeMarker, position: "fixed" };
    return fixTimeMarker;
  }

  static getTimeMarker({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: "18%",
      height: "auto",
      margin: "15px auto 10px auto",
      padding: "5px 10px",
      background: Container.darkLightRGBA,
      borderRadius: "20px",
    });
    const content = Style.getContentBase({
      color: Container.whiteRGB,
      letterSpacing: "2px",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpper({ app, ui }) {
    const display = ui.isBubblePost ? "flex" : "none";
    const layout = Style.getLayoutFlex({
      display,
      justifyContent: "space-between",
      height: "22px",
    });
    const content = Style.getContentBase({
      fontSize: "0.9em",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpperChild({ app, ui }) {
    const layout = Style.getLayoutFlex({
      alignItems: "flex-start",
      justifyContent: "center",
      flexGrow: 2,
      width: "20%",
      minWidth: "20%",
      maxWidth: "20%",
    });
    const content = Style.getContentBase({
      textAlign: "left",
      textIndent: "10px",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpperTitle({ app, ui }) {
    const layout = Style.getLayoutFlex({
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexGrow: 6,
      width: "60%",
      minWidth: "60%",
      maxWidth: "60%",
      margin: "0px 15px 0px 5px",
    });
    const content = Style.getContentBase({
      textAlign: "left",
      whiteSpace: "nowrap",
      wordBreak: "break-all",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpperTimeago({ app, ui }) {
    const layout = Style.getLayoutFlex({
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexGrow: 2,
      padding: "0px 20px 0px 0px",
      width: "20%",
      minWidth: "20%",
      maxWidth: "20%",
    });
    const content = Style.getContentBase({
      textAlign: "right",
      fontSize: "0.75em",
      letterSpacing: "0.5px",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottom({ app, ui }) {
    const layout = Style.getLayoutFlex({
      padding: "0px 10px 0px 0px",
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottomIcon({ app, ui }) {
    const layout = Style.getLayoutBlock({
      flexGrow: 2,
      width: "20%",
      minWidth: "20%",
      maxWidth: "20%",
      height: `${Container.getFaviconSize({ app, ui })}px`,
      backgroundImage: `url(${conf.protcol}:${conf.assetsPath}favicon.ico")`,
      backgroundPosition: "50% 50%",
      backgroundSize: `${Container.getFaviconSize({ app, ui })}px`,
      backgroundRepeat: "no-repeat",
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottomPost({ app, ui }) {
    const width = "75%";
    const marginRight = "5%";
    const background = ui.isBubblePost ? Container.themeRGBA : "none";
    const color = ui.isBubblePost ? Container.whiteRGBA : "rgba(160, 160, 160)";
    const padding = ui.isBubblePost ? "20px 20px 20px 30px" : "0px";
    const layout = Style.getLayoutBlock({
      flexGrow: 8,
      width,
      minWidth: width,
      maxWidth: width,
      background,
      padding,
      margin: `0px ${marginRight} 0px 0px`,
      borderRadius: "10px",
    });
    const content = Style.getContentBase({
      color,
      textAlign: "left",
      cursor: "pointer",
      wordWrap: "break-word",
      overflowWrap: "break-word",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getStampLabelWrap({ app, ui }) {
    const right = Ui.screenModeSmallLabel === ui.screenMode ? "12%" : "10%";
    const layout = Style.getLayoutFlex({
      position: "absolute",
      bottom: "6px",
      right,
      width: "100%",
      height: "20px",
      justifyContent: "flex-end",
      alignItems: "center",
      zIndex: 10,
    });
    const content = Style.getContentBase({
      lineHeight: "2em",
      textAlign: "right",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getStampLabel({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: "100px",
      height: "inherit",
      padding: "5px",
      background: "rgba(80, 80 ,80, 0.2)",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "5px 5px 0px 0px",
    });
    const content = Style.getContentBase({
      fontSize: "0.7em",
      color: Container.whiteRGB,
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
