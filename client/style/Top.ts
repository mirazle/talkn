import { CSSProperties } from "styled-components";
import Style from "./index";
import conf from "common/conf";

export default class Top {
  self: CSSProperties;
  logo: CSSProperties;
  searchBarWrap: CSSProperties;
  constructor(params) {
    const self = Top.getSelf();
    const logo = Top.getLogo();
    const searchBarWrap = Top.getSearchBarWrap();
    return {
      self,
      logo,
      searchBarWrap,
    };
  }

  static getSelf() {
    const layout = Style.getLayoutFlex({
      flexFlow: "column wrap",
      alignItems: "center",
      justifyContent: "center",
      width: "100vw",
      height: "100vh",
      margin: "0 auto",
      background: `url(//${conf.assetsURL}/www/img1.jpg) center center no-repeat`,
      backgroundSize: "cover",
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getLogo() {
    const layout = Style.getLayoutFlex({
      width: "200px",
      height: "200px",
      margin: "150px 100px 100px",
      background: `url("//${conf.assetsURL}/logo1.png") 50% / 100% no-repeat`,
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getSearchBarWrap() {
    const layout = Style.getLayoutFlex({
      width: "100%",
      maxWidth: "800px",
      minWidth: "340px",
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
