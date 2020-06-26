import Style from "../index";
import Container from "../Container";
import Ui from "client/store/Ui";

export default class MenuUsers {
  static getWidth({ app, ui }, addUnit = false) {
    let width = "0";
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
        width = "100.0%";
        break;
      case Ui.screenModeMiddleLabel:
        width = "300px";
        break;
      case Ui.screenModeLargeLabel:
        width = "300px";
        break;
    }
    return addUnit ? Style.trimUnit(width) : width;
  }

  static getTransform({ app, ui }) {
    let transform = "translate3d( 0px ,0px, 0px )";
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
        transform = "translate3d( 0px ,0px, 0px )";
        break;
      case Ui.screenModeMiddleLabel:
        transform = app.isOpenDetail ? `translate3d( 0px ,0px, 0px )` : "translate3d( 0px ,0px, 0px )";
        break;
      case Ui.screenModeLargeLabel:
        transform = "translate3d( 0px ,0px, 0px )";
        break;
    }
    return transform;
  }

  self: Object;
  columns: Object;
  column: Object;
  columnLast: Object;
  img: Object;
  imgWrap: Object;
  wrap: Object;
  names: Object;
  namesAddCh: Object;
  constructor(params: any) {
    const self = MenuUsers.getSelf(params);
    const columns = MenuUsers.getColumns(params);
    const column = MenuUsers.getColumn(params);
    const columnLast = MenuUsers.getColumnLast(params);
    const img = MenuUsers.getImg(params);
    const wrap = MenuUsers.getWrap(params);
    const imgWrap = MenuUsers.getImgWrap(params);
    const names = MenuUsers.getNames(params);
    const namesAddCh = MenuUsers.getNamesAddCh(params);
    return {
      self,
      columns,
      column,
      columnLast,
      img,
      imgWrap,
      wrap,
      names,
      namesAddCh,
    };
  }

  static getSelf({ app, ui }) {
    const layout = Style.getLayoutInlineBlock({
      position: "relative",
      width: MenuUsers.getWidth({ app, ui }),
      minWidth: MenuUsers.getWidth({ app, ui }),
      maxWidth: "inherit",
      height: "100%",
      WebkitOverflowScrolling: "touch",
      overflow: "scroll",
      borderTop: 0,
      borderRight: Container.border,
      borderBottom: 0,
      borderLeft: 0,
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getColumns({ app, ui }) {
    const layout = Style.getLayoutBlock({
      width: "inherit",
      minWidth: "inherit",
      maxWidth: "inherit",
      height: "auto",
      borderBottom: Container.border,
      borderRight: Container.border,
      background: Container.whiteRGB,
      overflow: "scroll",
    });
    const content = Style.getContentBase({
      whiteSpace: "nowrap",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getColumn({ app, ui }) {
    const layout = Style.getLayoutBlock({
      width: "inherit",
      minWidth: "inherit",
      maxWidth: "inherit",
      borderBottom: Container.border,
      borderRight: Container.border,
    });
    const content = Style.getContentBase({
      letterSpacing: "2px",
      textAlign: "left",
      lineHeight: "60px",
      whiteSpace: "nowrap",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getColumnLast({ app, ui }) {
    const layout = Style.getLayoutBlock({
      width: "inherit",
      minWidth: "inherit",
      maxWidth: "inherit",
      marginLeft: "20px",
    });
    const content = Style.getContentBase({
      letterSpacing: "2px",
      textAlign: "left",
      lineHeight: "60px",
      whiteSpace: "nowrap",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getWrap({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: "initial",
      height: "60px",
      minWidth: "initial",
      minHeight: "initial",
      borderRight: Container.border,
    });
    const content = Style.getContentBase({
      textAlign: "left",
      content: "getWrap",
    });
    const animation = Style.getAnimationBase({});
    return Style.get({ layout, content, animation });
  }

  static getImgWrap({ app, ui }) {
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      margin: "22px 0px 0px 0px",
      width: "60px",
      maxWidth: "60px",
      minWidth: "60px",
      height: "60px",
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase({});
    return Style.get({ layout, content, animation });
  }

  static getImg({ app, ui }) {
    const layout = Style.getLayoutInlineBlock({
      borderRadius: "50%",
      width: "34px",
      height: "34px",
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getNamesAddCh({ app, ui }) {
    const layout = Style.getLayoutBlock({
      padding: "5px 10px 5px 5px",
      flexGrow: 4,
    });
    const content = Style.getContentBase({
      textAlign: "left",
      lineHeight: "2",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getNames({ app, ui }) {
    const layout = Style.getLayoutBlock({
      flexGrow: 4,
    });
    const content = Style.getContentBase({
      textAlign: "left",
      lineHeight: "1.7",
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
