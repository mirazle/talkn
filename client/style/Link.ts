import Style from "./index";
import Container from "./Container";
export default class Link {
  static get tuneSize() {
    return 50;
  }
  static get size() {
    return 54;
  }
  static get padding() {
    return 5;
  }
  static get right() {
    return 0;
  }
  static get activeColor() {
    return Container.themeRGB;
  }
  static get unactiveColor() {
    return Container.fontBaseRGB;
  }
  static get activeBgColor() {
    return Container.whiteRGBA;
  }
  static get unactiveBgColor() {
    return "rgba( 235, 235, 235, 0.96 )";
  }

  self: Object;
  tuneLi: Object;
  activeLi: Object;
  unactiveLi: Object;
  constructor(params) {
    const self = Link.getSelf(params);
    const tuneLi = Link.getTuneLi(params);
    const activeLi = Link.getActiveLi(params);
    const unactiveLi = Link.getUnactiveLi(params);

    return {
      self,
      tuneLi,
      activeLi,
      unactiveLi
    };
  }

  static getSelf({ app }) {
    const size = Link.size + "px";
    const layout = Style.getLayoutFlex({
      alignItems: "flex-start",
      flexDirection: "column",
      width: "100%",
      height: size,
      minHeight: size,
      maxHeight: size,
      background: Link.activeBgColor,
      borderRadius: "5px",
      padding: "0px 0px 0px 10px",
      marginBottom: "5px"
    });
    const content = Style.getContentBase({
      cursor: "pointer",
      fontSize: "14px",
      lineHeight: "17px"
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition(app)
    });
    return Style.get({ layout, content, animation });
  }

  static getTuneLi({ app }) {
    const styles: any = Link.getActiveLi({ app });
    styles.alignItems = "center";
    return styles;
  }

  static getActiveLi({ app }) {
    const styles: any = Link.getSelf({ app });
    styles.background = Link.activeBgColor;
    styles.color = Container.fontBaseRGB;
    return styles;
  }

  static getUnactiveLi({ app }) {
    const styles: any = Link.getSelf({ app });
    styles.background = Link.unactiveBgColor;
    styles.color = Container.fontBaseRGB;
    return styles;
  }
}
