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
      more,
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
    let borders = { borderTop: "0", borderRight: "0", borderBottom: "0", borderLeft: "0" };
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
        borders.borderRight = Container.border;
        borders.borderLeft = Container.border;
        break;
      case Ui.screenModeMiddleLabel:
        borders.borderRight = Container.border;
        break;
      case Ui.screenModeLargeLabel:
        break;
    }
    return borders;
  }

  static getMargin({ app, ui }, addUnit = false) {
    let margin = "0";
    if (ui.extensionMode === Ui.extensionModeExtNoneLabel) {
      switch (ui.screenMode) {
        case Ui.screenModeSmallLabel:
          margin = `0`;
          break;
        case Ui.screenModeMiddleLabel:
        case Ui.screenModeLargeLabel:
          margin = `0 0 0 ${Menu.getWidth({ app, ui })}`;
          break;
      }
    } else {
      switch (ui.screenMode) {
        case Ui.screenModeSmallLabel:
          margin = `0`;
          break;
        case Ui.screenModeMiddleLabel:
        case Ui.screenModeLargeLabel:
          margin = `0 0 0 ${Menu.getWidth({ app, ui })}`;
          break;
      }
    }
    return margin;
  }

  static getPadding({ app, ui }) {
    const blockSize = Container.getBlockSize({ app, ui });
    let padding = "0";
    if (app.isMediaCh) {
      padding = `${blockSize * 2.3}px 0 ${blockSize}px 0`;
    } else {
      if (ui.extensionMode === Ui.extensionModeExtNoneLabel) {
        switch (ui.screenMode) {
          case Ui.screenModeSmallLabel:
            padding = `${blockSize}px 0 ${blockSize}px 0`;
            break;
          case Ui.screenModeMiddleLabel:
            padding = `${blockSize}px 0 ${blockSize}px 0`;
            break;
          case Ui.screenModeLargeLabel:
            padding = `${blockSize}px 0 ${blockSize}px 0`;
            break;
        }
      } else {
        switch (ui.screenMode) {
          case Ui.screenModeSmallLabel:
            padding = `${blockSize}px 0 ${blockSize}px 0`;
            break;
          case Ui.screenModeMiddleLabel:
          case Ui.screenModeLargeLabel:
            padding = `${blockSize}px 0 ${blockSize}px 0`;
            break;
        }
      }
    }
    return padding;
  }

  static getSelfTransform({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeExtBottomLabel) {
      return ui.isDispPosts
        ? "translate3d(0px, 0px, 0px)"
        : `translate3d(0px, calc( 100% + ${Container.getBlockSize({ app, ui })}px ), 0px)`;
    } else {
      return "translate3d(0px, 0px, 0px)";
    }
  }

  static getSelfHeight({ app, ui }) {
    if (ui.screenMode === Ui.screenModeLargeLabel) {
      if (app.chType === App.mediaTagTypeVideo) {
        return `calc( 100% - ${
          Container.getBlockSize({ app, ui }) + Container.getBlockSize({ app, ui }) + Video.height
        }px )`;
      } else {
        return `100vh`;
      }
    } else {
      return "auto";
    }
  }

  static getSelfMinHeight({ app, ui }) {
    if (app.chType === App.mediaTagTypeVideo) {
      return `calc( 100% - ${
        Video.height + Container.getBlockSize({ app, ui }) + Container.getBlockSize({ app, ui })
      }px)`;
    } else {
      if (ui.extensionMode === Ui.extensionModeExtBottomLabel || ui.extensionMode === Ui.extensionModeExtModalLabel) {
        return `calc( 100% - ${Container.getBlockSize({ app, ui }) + Container.getBlockSize({ app, ui })}px )`;
      } else {
        if (ui.screenMode === Ui.screenModeLargeLabel) {
          return `calc( 100% - ${Container.getBlockSize({ app, ui }) + Container.getBlockSize({ app, ui })}px )`;
        } else {
          return "auto";
        }
      }
    }
  }

  static getSelfTop({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeExtNoneLabel) {
      if (app.chType === App.mediaTagTypeVideo) {
        return `${Container.getBlockSize({ app, ui }) + Video.height}px`;
      }
    }
    return "0";
  }

  static getSelfLeft({ app, ui }) {
    return "0";
  }

  static getSelfBoxShadow({ app, ui }) {
    let boxShadow = "0px 0px 0px rgba(255,255,255)";
    if (ui.extensionMode === Ui.extensionModeExtNoneLabel) {
      return boxShadow;
    } else {
      switch (ui.screenMode) {
        case Ui.screenModeSmallLabel:
          return Container.lineInsetShadow;
        case Ui.screenModeMiddleLabel:
        case Ui.screenModeLargeLabel:
          return boxShadow;
      }
    }
    return boxShadow;
  }

  static getSelf({ app, ui }) {
    let position = "absolute";
    let overflowX = "hidden";
    let overflowY = "hidden";
    let borders = Posts.getBorders({ app, ui });
    let background = Container.whiteRGBA;
    const boxShadow = Posts.getSelfBoxShadow({ app, ui });
    // screen mode large is Posts scroll( no window scroll ).
    if (ui.screenMode === Ui.screenModeLargeLabel) {
      position = "fixed";
      overflowX = "hidden";
      overflowY = "scroll";
    }

    const layout = Style.getLayoutBlock({
      position: "absolute",
      top: Posts.getSelfTop({ app, ui }),
      left: Posts.getSelfLeft({ app, ui }),
      width: Posts.getWidth({ app, ui }),
      minWidth: Posts.getMinWidth({ app, ui }),
      height: Posts.getSelfHeight({ app, ui }),
      minHeight: "100vh",
      maxHeight: "auto",
      margin: Posts.getMargin({ app, ui }),
      padding: Posts.getPadding({ app, ui }),
      background,
      overflowScrolling: "touch",
      WebkitOverflowScrolling: "touch",
      boxShadow,
      overflowX,
      overflowY,
      ...borders,
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
      height: `100vh`,
      borderRight,
      borderLeft,
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
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
      borderRadius: "20px",
    });
    const content = Style.getContentBase({
      color: Container.whiteRGB,
      cursor: "pointer",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
