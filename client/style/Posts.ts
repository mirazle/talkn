import App from "api/store/App";
import Ui from "client/store/Ui";
import Style from "./index";
import Container from "./Container";
import Header from "./Header";
import PostsFooter from "./PostsFooter";
import Main from "./Main";
import Menu from "./Menu";
import Detail from "./Detail";
import Video from "./Media/Video";

export default class Posts {
  static getSelfDisplay({ app, ui }) {
    return ui.isOpenNotif ? "none" : "flex";
  }
  static getMinWidth({ app, ui }, addUnit = false) {
    let width = "200px";
    return addUnit ? Style.trimUnit(width) : width;
  }

  static getOlWidth({ app, ui }, addUnit = false): any {
    const width = ui.extensionMode === Ui.extensionModeExtBottomLabel ? "90%" : "100%";
    return addUnit ? Style.trimUnit(width) : width;
  }

  static getWidth({ app, ui }, addUnit = false): any {
    let width = "100%";
    if (ui.extensionMode === Ui.extensionModeExtBottomLabel) {
      width = "90%";
    } else {
      switch (ui.screenMode) {
        case Ui.screenModeSmallLabel:
          return "100%";
        case Ui.screenModeMiddleLabel:
          return `calc(100% - ${Menu.getWidth({ app, ui }, false)})`;
        case Ui.screenModeLargeLabel:
          width = `calc( ${100 - Detail.getWidth({ app, ui }, false)}% - ${Menu.getWidth({ app, ui }, false)} )`;
          break;
      }
    }
    return addUnit ? Style.trimUnit(width) : width;
  }

  self: Object;
  ol: Object;
  more: Object;
  constructor(params) {
    const self = Posts.getSelf(params);
    const ol = Posts.getOl(params);
    const more = Posts.getMore(params);
    return {
      self,
      ol,
      more
    };
  }

  static closeIndexTransform({ app, ui }) {
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
        return `translate3d( -${ui.width}px, 0px, 0px)`;
      case Ui.screenModeMiddleLabel:
        return `translate3d( -${Menu.getWidth({ app, ui })}px, 0px, 0px)`;
      case Ui.screenModeLargeLabel:
        return `translate3d( -${Menu.getWidth({ app, ui })}px, 0px, 0px)`;
    }
  }

  static openIndexTransform(option) {
    return `translate3d( 0px, 0px, 0px)`;
  }

  static get headerHeight() {
    return 35;
  }

  static getBorders({ app, ui }) {
    /*
    if (ui.includeIframeTag) {
      return { borderRight: Container.border, borderLeft: Container.border };
    } else {
*/
    return ui.extensionMode === Ui.screenModeSmallLabel
      ? { borderRight: Container.border, borderLeft: Container.border }
      : {};
    //    }
  }

  static getMargin({ app, ui }, addUnit = false) {
    let margin = "0";
    let marginTop = "0";
    let marginBottom = "0";

    margin = `${Header.headerHeight}px 0px 0px 0px`;
    marginTop = app.isMediaCh ? `0px` : "0px";
    marginBottom = app.isMediaCh ? `0px` : "0px";

    if (ui.extensionMode === Ui.extensionModeExtBottomLabel) {
      margin = `${marginTop} 5% ${Header.headerHeight}px 5%`;
    } else if (ui.extensionMode === Ui.extensionModeExtModalLabel) {
      margin = `${marginTop} 0px ${PostsFooter.selfHeight}px 0px`;
    } else {
      switch (ui.screenMode) {
        case Ui.screenModeSmallLabel:
          margin = `${marginTop} 0px ${marginBottom} 0px`;
          break;
        case Ui.screenModeMiddleLabel:
          margin = `${marginTop} 0px ${marginBottom} ${Menu.getWidth({ app, ui })}`;
          break;
        case Ui.screenModeLargeLabel:
          margin = `${marginTop} 0px ${marginBottom} ${Menu.getWidth({ app, ui })}`;
          break;
      }
    }
    return margin;
  }

  static getPadding({ app, ui }, addUnit = false) {
    let padding = "0";
    let paddingTop = "0";
    let paddingBottom = "0";

    if (ui.extensionMode === Ui.extensionModeExtBottomLabel) {
      padding = "0px";
    } else if (ui.extensionMode === Ui.extensionModeExtModalLabel) {
      padding = "0px";
    } else {
      if (app.isMediaCh) {
        switch (app.chType) {
          case App.mediaTagTypeAudio:
            paddingBottom = `${PostsFooter.selfHeight}px`;
          case App.mediaTagTypeVideo:
            paddingBottom = `${PostsFooter.selfHeight}px`;
        }
      }

      switch (ui.screenMode) {
        case Ui.screenModeSmallLabel:
          padding = `0px 0px ${PostsFooter.selfHeight}px 0px`;
          break;
        case Ui.screenModeMiddleLabel:
          padding = `0px 0px ${PostsFooter.selfHeight}px 0px`;
          break;
        case Ui.screenModeLargeLabel:
          padding = `0px 0px 0px 0px`;
          break;
      }
    }
    return padding;
  }

  static getSelfTransform({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeExtBottomLabel) {
      return ui.isDispPosts
        ? "translate3d(0px, 0px, 0px)"
        : `translate3d(0px, calc( 100% + ${PostsFooter.selfHeight}px ), 0px)`;
    } else {
      return "translate3d(0px, 0px, 0px)";
    }
  }

  static getSelfHeight({ app, ui }) {
    switch (ui.extensionMode) {
      case Ui.extensionModeExtBottomLabel:
      case Ui.extensionModeExtModalLabel:
        return `calc( 100% - ${Main.headerHeight + PostsFooter.selfHeight}px )`;
      case Ui.extensionModeExtIncludeLabel:
        return `100%`;
      default:
        if (ui.screenMode === Ui.screenModeLargeLabel) {
          if (app.chType === App.mediaTagTypeVideo) {
            return `calc( 100% - ${Main.headerHeight + PostsFooter.selfHeight + Video.height}px )`;
          } else {
            return `calc( 100% - ${Main.headerHeight + PostsFooter.selfHeight}px )`;
          }
        } else {
          return "auto";
        }
    }
  }

  static getSelfMinHeight({ app, ui }) {
    if (app.chType === App.mediaTagTypeVideo) {
      return `calc( 100% - ${Video.height + PostsFooter.selfHeight + Header.headerHeight}px)`;
    } else {
      if (ui.extensionMode === Ui.extensionModeExtBottomLabel || ui.extensionMode === Ui.extensionModeExtModalLabel) {
        return `calc( 100% - ${Main.headerHeight + PostsFooter.selfHeight}px )`;
      } else {
        if (ui.screenMode === Ui.screenModeLargeLabel) {
          return `calc( 100% - ${Main.headerHeight + PostsFooter.selfHeight}px )`;
        } else {
          return "auto";
        }
      }
    }
  }

  static getSelfTop({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeExtNoneLabel) {
      if (app.chType === App.mediaTagTypeVideo) {
        return `${Header.headerHeight + Video.height}px`;
      }
    }
    return `${Header.headerHeight}px`;
  }

  static getSelf({ app, ui }) {
    let position = "absolute";
    let overflowX = "hidden";
    let overflowY = "hidden";
    let borders: any = { borderRight: 0, borderLeft: 0 };
    let background = Container.whiteRGBA;
    let zIndex = 1;
    let opacity = ui.isLoading ? 0 : 1;

    if (ui.extensionMode === Ui.extensionModeExtBottomLabel || ui.extensionMode === Ui.extensionModeExtModalLabel) {
      position = "fixed";
      overflowX = "hidden";
      overflowY = "scroll";
      borders.borderRight = Container.border;
      borders.borderLeft = Container.border;
      zIndex = -2;
    } else {
      if (ui.screenMode === Ui.screenModeLargeLabel) {
        overflowX = "hidden";
        overflowY = "scroll";
      }
      borders = Posts.getBorders({ app, ui });
    }

    const layout = Style.getLayoutBlock({
      position,
      top: Posts.getSelfTop({ app, ui }),
      width: Posts.getWidth({ app, ui }),
      minWidth: Posts.getMinWidth({ app, ui }),
      height: Posts.getSelfHeight({ app, ui }),
      minHeight: Posts.getSelfMinHeight({ app, ui }),
      maxHeight: "auto",
      margin: Posts.getMargin({ app, ui }),
      padding: Posts.getPadding({ app, ui }),
      background,
      overflowScrolling: "touch",
      WebkitOverflowScrolling: "touch",
      overflowX,
      overflowY,
      opacity,
      ...borders,
      zIndex
    });
    const content = {};
    const animation = Style.getAnimationBase({});

    return Style.get({ layout, content, animation });
  }

  static getOl({ app, ui }) {
    let width = "100%";
    let margin = "0";
    let borderRight = "0";
    let borderLeft = "0";

    if (ui.extensionMode === Ui.extensionModeExtBottomLabel) {
      width = Posts.getOlWidth({ app, ui });
      margin = "0px 0px 0px 5%";
      borderRight = Container.border;
      borderLeft = Container.border;
    }

    const layout = Style.getLayoutBlock({
      width,
      margin,
      height: `calc( 100% - ${Main.headerHeight}px )`,
      minHeight: "inherit",
      borderRight,
      borderLeft
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui })
    });
    return Style.get({ layout, content, animation });
  }

  static getMore({ app, ui }) {
    const background = ui.isBubblePost ? Container.themeRGBA : Container.reliefRGBA;
    const margin = ui.isBubblePost ? "15px auto" : "10px auto";
    const layout = Style.getLayoutFlex({
      width: "50%",
      height: Container.notifHeight,
      margin,
      alignItems: "center",
      justifyContent: "center",
      zIndex: "10",
      background,
      borderRadius: "20px"
    });
    const content = Style.getContentBase({
      lineHeight: 2,
      fontSize: "12px",
      color: Container.whiteRGB,
      cursor: "pointer"
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
