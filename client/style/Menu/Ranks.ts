import conf from "common/conf";
import Ui from "client/store/Ui";
import Style from "../index";
import Container from "../Container";

export default class Rank {
  static get iconSize() {
    return "25px";
  }
  static get liHeight() {
    return 90;
  }

  // self: Object;
  header: Object;
  headerSearchIcon: Object;
  headerInput: Object;
  headerFindSelect: Object;
  headerUpdateIcon: Object;
  ol: Object;
  headerCh: Object;
  constructor(params: any) {
    // const self = Rank.getSelf(params);
    const header = Rank.getHeader(params);
    const headerSearchIcon = Rank.getHeaderSearchIcon(params);
    const headerInput = Rank.getHeaderInput(params);
    const headerFindSelect = Rank.getHeaderFindSelect(params);
    const headerUpdateIcon = Rank.getHeaderUpdateIcon(params);
    const ol = Rank.getOl(params);

    return {
      // self,
      header,
      headerSearchIcon,
      headerInput,
      headerFindSelect,
      headerUpdateIcon,
      ol,
      headerCh: {},
    };
  }

  static getSelf({ app, ui }) {
    const layout = Style.getLayoutBlock({
      width: "100%",
      height: `calc( 100% - ${Container.getBlockSize({ app, ui }) * 2}px )`,
      margin: "0 auto",
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase({});
    return Style.get({ layout, content, animation });
  }

  static getHeader({ app, ui }) {
    const borders =
      ui.screenSize === Ui.screenSizeSmallLabel
        ? { borderBottom: Container.border, borderLeft: 0 }
        : {
            borderBottom: Container.border,
            borderLeft: 0,
            borderRight: Container.border,
          };

    const layout = Style.getLayoutFlex({
      width: "100%",
      height: `${Container.getBlockSize({ app, ui })}px`,
      ...borders,
      background: Container.lightRGB,
    });
    const content = Style.getContentBase({
      textAlign: "left",
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getHeaderSearchIcon({ app, ui }) {
    const layout = Style.getLayoutFlex({
      justifyContent: "center",
      alignItems: "center",
      width: "72px",
      height: `${Container.getBlockSize({ app, ui })}px`,
    });
    const content = Style.getContentBase({
      color: Container.reliefRGBA,
      fontWeight: "bold",
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getHeaderInput({ app, ui }) {
    const fontSize = ui.screenSize === Ui.screenSizeSmallLabel ? "0.9em" : "1em";
    const lineHeight = ui.screenSize === Ui.screenSizeSmallLabel ? "0.8em" : "0.9em";
    const layout = Style.getLayoutInlineBlock({
      width: "calc( 100% - 120px )",
      height: "55%",
      padding: "6px",
      background: Container.whiteRGB,
      outline: "none",
      resize: "none",
      border: Container.border,
      borderRadius: "3px",
      WebkitAppearance: "none",
    });
    const content = Style.getContentBase({
      whiteSpace: "nowrap",
      fontSize,
      lineHeight,
      textAlign: "left",
      textIndent: "3%",
    });
    const animation = Style.getAnimationBase();

    return Style.get({ layout, content, animation });
  }

  static getHeaderUpdateIcon({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: "70px",
      height: "50px",
      alignItems: "center",
      justifyContent: "flex-start",
    });
    const content = Style.getContentBase({
      cursor: "pointer",
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getHeaderFindSelect({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: "100%",
      height: "50px",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
      WebkitAppearance: "none",
      padding: "10px",
    });
    const content = Style.getContentBase({
      outline: 0,
      cursor: "pointer",
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getOl({ app, ui, ranks }) {
    const blockSize = Container.getBlockSize({ app, ui });
    let gridTemplateRows = "1fr";
    const rankCnt = ranks && ranks.length ? ranks.length : 0;
    const menuCnt = rankCnt + (app.tuned === "" ? 0 : 1);
    for (let i = 0; i < menuCnt; i++) {
      gridTemplateRows = `${blockSize * 2}px ` + gridTemplateRows;
    }
    const layout = Style.getLayoutGrid({
      gridTemplateRows,
      gridTemplateColumns: "1fr",
      height: `calc( 100% - ${blockSize * 2}px )`,
      overflowX: "hidden",
      overflowY: "scroll",
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getLiActive() {
    const layout = Style.getLayoutBlock({
      position: "relative",
      width: "initial",
      height: `${Rank.liHeight}px`,
      padding: "10px",
      borderBottom: Container.border,
      zIndex: 3,
      borderRight: `1px solid ${Container.whiteRGB}`,
      background: Container.whiteRGB,
      //      boxShadow: '5px 5px 5px 5px rgb( 240, 240, 240)',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getLiUnactive() {
    const layout = Style.getLayoutBlock({
      position: "relative",
      width: "initial",
      height: `${Rank.liHeight}px`,
      padding: "10px",
      borderBottom: Container.border,
      background: Container.offWhiteRGB,
      borderRight: Container.border,
    });
    const content = Style.getContentBase();
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
      width: "20%",
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpperRight() {
    const layout = Style.getLayoutInlineBlock({
      width: "80%",
    });
    const content = Style.getContentBase({
      textAlign: "left",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottom() {
    const layout = Style.getLayoutBlock({
      width: "100%",
      height: "50px",
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottomIcon() {
    const layout = Style.getLayoutInlineBlock({
      width: "20%",
      height: "50px",
      backgroundImage: `url(${conf.protcol}:${conf.assetsPath}favicon.ico")`,
      backgroundPosition: "50% 15%",
      backgroundSize: "20px 20px",
      backgroundRepeat: "no-repeat",
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottomPost() {
    const layout = Style.getLayoutInlineBlock({
      width: "80%",
      flexGrow: 2,
    });
    const content = Style.getContentBase({
      lineHeight: 2,
      textAlign: "left",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
