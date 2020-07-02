import Ui from "client/store/Ui";
import conf from "common/conf";
import Style from "../index";
import Container from "../Container";

export default class MenuIndexList {
  static get tuneRGB() {
    return Container.themeRGB;
  }
  static get rank1RGB() {
    return "rgb(255, 10, 78)";
  }
  static get rank2RGB() {
    return "rgb(255, 127, 0)";
  }
  static get rank3RGB() {
    return "rgb(0, 142, 255)";
  }
  static get rankOtherRGB() {
    return Container.downreliefRGB;
  }
  static get oneDigitWidth() {
    return "17%";
  }
  static get twoDigitWidth() {
    return "18%";
  }
  static get thirdDigitWidth() {
    return "19%";
  }
  static get iconSize() {
    return 24;
  }
  static get activeLiSelfLabel() {
    return "activeLiSelf";
  }
  static get unactiveLiSelfLabel() {
    return "unactiveLiSelf";
  }

  static get activeLiSelfBackground() {
    return Container.whiteRGBA;
  }
  static get activeLiSelfMouseOverBackground() {
    return Container.whiteRGBA;
  }
  static get activeLiSelfMouseDownBackground() {
    return Container.whiteRGBA;
  }
  static get unactiveLiSelfBackground() {
    return Container.calmRGBA;
  }
  static get unactiveLiSelfMouseOverBackground() {
    return Container.whiteRGBA;
  }
  static get unactiveLiSelfMouseDownBackground() {
    return Container.whiteRGBA;
  }

  static get activeLiSelfBorderRightColor() {
    return `1px solid ${Container.whiteRGB}`;
  }
  static get unactiveLiSelfBorderRightColor() {
    return Container.border;
  }

  static getUnactiveLiBorder({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeExtBottomLabel) {
      return {
        borderTop: 0,
        borderRight: 0,
        borderBottom: Container.border,
        borderLeft: 0,
      };
    } else {
      return ui.screenMode === Ui.screenModeSmallLabel
        ? {
            borderTop: 0,
            borderRight: 0,
            borderBottom: Container.border,
            borderLeft: 0,
          }
        : {
            borderTop: 0,
            borderRight: Container.border,
            borderBottom: Container.border,
            borderLeft: 0,
          };
    }
  }

  static getDispRankBackground(rank) {
    switch (rank) {
      case 0:
        return MenuIndexList.tuneRGB;
      case 1:
        return MenuIndexList.rank1RGB;
      case 2:
        return MenuIndexList.rank2RGB;
      case 3:
        return MenuIndexList.rank3RGB;
      default:
        return MenuIndexList.rankOtherRGB;
    }
  }

  static getDispRankWidth(rank) {
    switch (String(rank).length) {
      case 0:
        return MenuIndexList.oneDigitWidth;
      case 1:
        return MenuIndexList.oneDigitWidth;
      case 2:
        return MenuIndexList.twoDigitWidth;
      case 3:
        return MenuIndexList.thirdDigitWidth;
      default:
        return MenuIndexList.thirdDigitWidth;
    }
  }

  activeLiSelf: Object;
  unactiveLiSelf: Object;
  space: Object;
  upper: Object;
  upperSpace: Object;
  upperRankWrap: Object;
  upperRank: Object;
  upperRight: Object;
  bottom: Object;
  bottomIcon: Object;
  bottomPost: Object;
  ext: Object;
  extMusic: Object;
  extVideo: Object;
  constructor(params) {
    const activeLiSelf = MenuIndexList.getActiveLiSelf(params);
    const unactiveLiSelf = MenuIndexList.getUnactiveLiSelf(params);
    const space = MenuIndexList.getSpace(params);
    const upper = MenuIndexList.getUpper();
    const upperSpace = MenuIndexList.getUpperSpace();
    const upperRankWrap = MenuIndexList.getUpperRankWrap();
    const upperRank = MenuIndexList.getUpperRank();
    const upperRight = MenuIndexList.getUpperRight();
    const bottom = MenuIndexList.getBottom(params);
    const bottomIcon = MenuIndexList.getBottomIcon(params);
    const bottomPost = MenuIndexList.getBottomPost();
    const ext = MenuIndexList.getExt();
    const extMusic = MenuIndexList.getExtMusic();
    const extVideo = MenuIndexList.getExtVideo();
    return {
      activeLiSelf,
      unactiveLiSelf,
      space,
      upper,
      upperSpace,
      upperRankWrap,
      upperRank,
      upperRight,
      bottom,
      bottomIcon,
      bottomPost,
      ext,
      extMusic,
      extVideo,
    };
  }

  static getActiveLiSelf({ app, ui }) {
    const height = Container.getBlockSize({ app, ui }) * 2;
    const layout = Style.getLayoutBlock({
      width: "initial",
      height: `${height}px`,
      minHeight: `${height}px`,
      padding: "5px",
      borderTop: 0,
      borderRight: `1px solid ${Container.whiteRGB}`,
      borderBottom: Container.border,
      borderLeft: 0,
      background: MenuIndexList.activeLiSelfBackground,
      cursor: "pointer",
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transition: `${Container.transitionFirstOn}ms`,
    });
    return Style.get({ layout, content, animation });
  }

  static getUnactiveLiSelf({ app, ui }) {
    const borders = MenuIndexList.getUnactiveLiBorder({ app, ui });
    const height = Container.getBlockSize({ app, ui }) * 2;
    const layout = Style.getLayoutBlock({
      boxShadow: `${Container.lineShadow}`,
      width: "initial",
      height: `${height}px`,
      minHeight: `${height}px`,
      padding: "5px",
      ...borders,
      background: MenuIndexList.unactiveLiSelfBackground,
      cursor: "pointer",
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transition: `${Container.transitionFirstOn}ms`,
    });

    return Style.get({ layout, content, animation });
  }

  static getSpace({ app, ui }) {
    const layout = Style.getLayoutBlock({
      height: "100%",
      background: Container.silverRGBA,
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpper() {
    const layout = Style.getLayoutBlock({
      width: "100%",
      height: "20px",
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpperSpace() {
    const layout = Style.getLayoutInlineBlock({
      width: "18%",
      margin: "0px 2% 0px 0px",
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpperRankWrap() {
    const layout = Style.getLayoutInlineFlex({
      position: "absolute",
      left: "5px",
      top: "7px",
      width: MenuIndexList.thirdDigitWidth,
      height: "20px",
      background: MenuIndexList.rankOtherRGB,
      borderRadius: "10px",
      margin: "0",
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpperRank() {
    const layout = Style.getLayoutFlex({
      width: "100%",
    });
    const content = Style.getContentBase({
      fontSize: "0.7em",
      fontWeight: "bold",
      color: Container.whiteRGB,
      lineHeight: "1.5",
    });
    const animation = Style.getAnimationBase({
      transform: "scale(0.8)",
    });
    return Style.get({ layout, content, animation });
  }

  static getUpperRight() {
    const layout = Style.getLayoutInlineBlock({
      width: "80%",
    });
    const content = Style.getContentBase({
      lineHeight: "1.5",
      textIndent: "4px",
      textAlign: "left",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottom({ app, ui }) {
    const layout = Style.getLayoutFlex({
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "60%",
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottomIcon({ app, ui }) {
    const layout = Style.getLayoutInlineBlock({
      width: "20%",
      height: "100%",
      backgroundImage: `url("${conf.assetsURL}/favicon.ico")`,
      backgroundPosition: "30% 50%",
      backgroundSize: `${Container.getFaviconSize({ app, ui })}px`,
      backgroundRepeat: "no-repeat",
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottomPost() {
    const layout = Style.getLayoutInlineFlex({
      width: "60%",
      height: "100%",
      justifyContent: "flex-start",
    });
    const content = Style.getContentBase({
      textIndent: "3%",
      textAlign: "left",
      whiteSpace: "nowrap",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getExt() {
    const layout = Style.getLayoutFlex({
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      bottom: "0px",
      right: "10px",
      width: "50px",
      height: "15px",
      background: Container.lightGrayRGBA,
      borderRadius: "3px 3px 0px 0px",
    });
    const content = Style.getContentBase({
      textIndent: "3px",
      textAlign: "center",
      color: Container.whiteRGB,
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getExtMusic() {
    let ext: any = MenuIndexList.getExt();
    //    ext.background = "rgba(143,198,143, 1)";
    ext.background = "rgba(143,198,143, 1)";
    return ext;
  }

  static getExtVideo() {
    let ext: any = MenuIndexList.getExt();
    ext.background = "rgba(105, 70, 255, 1)";
    return ext;
  }
}
