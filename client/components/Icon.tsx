import React from "react";
import TalknComponent from "client/components/TalknComponent";
import Emotions from "common/emotions/index";
import Schema from "api/store/Schema";
import { default as IconStyle } from "client/style/Icon";

const emotionCoverTypes = new Emotions();

export default class Icon extends TalknComponent<{}, {}> {
  static get smallSize() {
    return IconStyle.smallSize;
  }
  static get middleSize() {
    return IconStyle.middleSize;
  }
  static get largeSize() {
    return IconStyle.largeSize;
  }
  static get bigSize() {
    return IconStyle.bigSize;
  }

  static generateImageIcon(name = "Twitter", state: any = {}, overStyle, option: any = {}) {
    if (IconStyle[`get${name}`]) {
      const onClick = option.onClick ? option.onClick : () => {};
      const href = option.href ? option.href : "";
      const style = Icon.getOveredStyle(IconStyle[`get${name}`](state, option), overStyle);

      if (!Schema.isAnonymousFunc(onClick)) {
        return <div data-component-type={`Icon${name}`} onClick={onClick} style={style} />;
      }

      if (href !== "") {
        return <a href={href} data-component-type={`Icon${name}`} style={style} />;
      }

      return <div data-component-type={`Icon${name}`} style={style} />;
    }
    return undefined;
  }

  static getOveredStyle(baseStyle = {}, overStyle = {}) {
    Object.keys(overStyle).forEach((key) => {
      if (baseStyle[key]) {
        if (typeof baseStyle[key] === "object") {
          baseStyle[key] = { ...baseStyle[key], ...overStyle[key] };
        } else {
          baseStyle[key] = overStyle[key];
        }
      }
    });
    return baseStyle;
  }

  constructor(props?) {
    super(props);
  }

  getDecolationProps1(styleKey, eleType, tagName) {
    return {
      onMouseOver: () => {
        this.clientAction("UPDATE_STYLE", {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: "0px 0px 20px rgba(240, 240, 240, 0.7 ) inset",
            transition: "200ms",
            transform: "scale( 1 )",
            borderRadius: "100px",
            cursor: "pointer",
          },
        });
      },
      onMouseLeave: () => {
        this.clientAction("UPDATE_STYLE", {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: "0px 0px 0px rgba(240, 240, 240, 0.7)",
            transition: "600ms",
            transform: "scale( 1 )",
            borderRadius: "100px",
            cursor: "default",
          },
        });
      },
      onMouseDown: () => {
        this.clientAction("UPDATE_STYLE", {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: "0px 0px 30px rgba(235, 235, 235, 0.7) inset ",
            transform: "scale( 0.8 )",
            borderRadius: "100px",
            cursor: "pointer",
          },
        });
      },
      onMouseUp: () => {
        this.clientAction("UPDATE_STYLE", {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: "0px 0px 20px rgba(240, 240, 240, 0.7) inset",
            transform: "scale( 1 )",
            borderRadius: "100px",
            cursor: "pointer",
          },
        });
      },
    };
  }

  getDecolationProps2(styleKey, eleType, tagName) {
    return {
      onMouseOver: () => {
        this.clientAction("UPDATE_STYLE", {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: "0px 0px 20px rgba(200, 200, 200, 0.7 ) inset",
            transition: "200ms",
            transform: "scale( 1 )",
            borderRadius: "0px",
            cursor: "pointer",
          },
        });
      },
      onMouseLeave: () => {
        this.clientAction("UPDATE_STYLE", {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: "0px 0px 0px rgba(220, 220, 220, 0.7)",
            transition: "600ms",
            transform: "scale( 1 )",
            borderRadius: "0px",
            cursor: "default",
          },
        });
      },
      onMouseDown: () => {
        this.clientAction("UPDATE_STYLE", {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: "0px 0px 30px rgba(200, 200, 200, 0.7) inset ",
            transform: "scale( 0.8 )",
            borderRadius: "0px",
            cursor: "pointer",
          },
        });
      },
      onMouseUp: () => {
        this.clientAction("UPDATE_STYLE", {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: "0px 0px 20px rgba(240, 240, 240, 0.7) inset",
            transform: "scale( 1 )",
            borderRadius: "0px",
            cursor: "pointer",
          },
        });
      },
    };
  }

  getDecolationProps3(styleKey, eleType, tagName) {
    return {
      onMouseOver: () => {
        this.clientAction("UPDATE_STYLE", {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: "0px 0px 20px rgba(240, 240, 240, 0.7 ) inset",
            transition: "200ms",
            transform: "scale( 1 )",
            cursor: "pointer",
          },
        });
      },
      onMouseLeave: () => {
        this.clientAction("UPDATE_STYLE", {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: "0px 0px 0px rgba(240, 240, 240, 0.7)",
            transition: "600ms",
            transform: "scale( 1 )",
            cursor: "default",
          },
        });
      },
      onMouseDown: () => {
        this.clientAction("UPDATE_STYLE", {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: "0px 0px 30px rgba(235, 235, 235, 0.7) inset ",
            transform: "scale( 0.8 )",
            cursor: "pointer",
          },
        });
      },
      onMouseUp: () => {
        this.clientAction("UPDATE_STYLE", {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: "0px 0px 20px rgba(240, 240, 240, 0.7) inset",
            transform: "scale( 1 )",
            cursor: "pointer",
          },
        });
      },
    };
  }

  static getEmpty(state: any = {}, overStyle, option: any = {}) {
    const style = Icon.getOveredStyle(IconStyle.getEmpty(state, option), overStyle);
    return <div data-component-type={"IconEmpty"} style={style} />;
  }
  /*
  static getMultistreamIcon(props) {
    const { state } = props;
    const { style, ui } = state;
    const ThunderIcon = Icon.getThunder(IconStyle.getThunder(state));
    if (ui.menuComponent === "Index" && app.isRootCh) {
      return (
        <div data-component-name={"multistreamIcon"} style={style.container.multistreamIconWrap}>
          {ThunderIcon}
        </div>
      );
    } else {
      return null;
    }
  }
*/

  static getLiveCnt({ app, ui }, liveCnt = 0, isHighligt = false): React.ReactNode {
    const style = IconStyle.getLiveCnt({ app, ui });
    style.div.boxShadow = isHighligt ? "0px 0px 20px rgba(79, 174, 159, 0.96)" : "0px 0px 0px rgba(79, 174, 159, 1)";
    console.log(isHighligt + " " + style.div.boxShadow);
    return (
      <span style={style.div}>
        <span style={style.circle}>{liveCnt}</span>
      </span>
    );
  }

  static getStampStr(post, dispLabelStampId, isBubble = true) {
    const stampStrStyle = IconStyle.getStampStr(isBubble);
    if (dispLabelStampId > 0) {
      const stampLabelStrStyle = IconStyle.getStampLabelAtMenuStr();
      const stampType = emotionCoverTypes.belongCoverTypes[dispLabelStampId]
        ? emotionCoverTypes.belongCoverTypes[dispLabelStampId]
        : "No";
      return (
        `<div data-component-name="stamp" style="${stampStrStyle}">` +
        post +
        `<span data-component-name="stamp-label" style="${stampLabelStrStyle}"> (${stampType})</span>` +
        `</div >`
      );
    } else {
      return `<div data-component-name="stamp" style="${stampStrStyle}">` + post + `</div >`;
    }
  }

  static getStampLabel({ app, ui, post }, type = "default") {
    if (post.stampId > 0) {
      const stampLabelStyle = IconStyle.getStampLabel({ app, ui });
      let stampType = emotionCoverTypes.belongCoverTypes[post.stampId]
        ? emotionCoverTypes.belongCoverTypes[post.stampId]
        : "No";
      return (
        <div data-component-name={"stamp-label-div"} style={stampLabelStyle.div}>
          <div data-component-name={"stamp-label"} style={stampLabelStyle.label}>
            ({stampType})
          </div>
        </div>
      );
    } else {
      return undefined;
    }
  }

  static getTwitter(state = {}, overStyle, option = {}): React.ReactNode {
    return Icon.generateImageIcon("Twitter", state, overStyle, option);
  }

  static getFacebook(state = {}, overStyle, option = {}): React.ReactNode {
    return Icon.generateImageIcon("Facebook", state, overStyle, option);
  }

  static getAppstore(state = {}, overStyle, option = {}): React.ReactNode {
    return Icon.generateImageIcon("Appstore", state, overStyle, option);
  }

  static getAndroid(state = {}, overStyle, option = {}): React.ReactNode {
    return Icon.generateImageIcon("Android", state, overStyle, option);
  }

  static getHome(state = {}, overStyle, option = {}): React.ReactNode {
    return Icon.generateImageIcon("Home", state, overStyle, option);
  }

  static getGraph(state: any = {}, overStyle, option: any = {}): React.ReactNode {
    const onClick = option.onClick ? option.onClick : () => {};
    const style = Icon.getOveredStyle(IconStyle.getGraph(state, option), overStyle);
    return <div data-component-type={"IconGraph"} onClick={onClick} style={style} />;
  }

  static getTalkn(state = {}, overStyle, option = {}): React.ReactNode {
    return Icon.generateImageIcon("Talkn", state, overStyle, option);
  }

  static getTalknLogo(style): React.ReactNode {
    return <div data-component-type={"IconTalknLogo"} style={style.img} />;
  }

  static getChromeExtension(overStyle, state = {}, option = {}) {
    return Icon.generateImageIcon("ChromeExtension", state, overStyle, option);
  }

  static getTag(style): React.ReactNode {
    return (
      <div data-component-type={"IconTag"} style={style.div}>
        <div style={style.left}></div>
        <div style={style.right}></div>
        <div style={style.bar}></div>
      </div>
    );
  }

  static getHomeCss(style): React.ReactNode {
    return (
      <div data-component-type={"IconHomeCss"} style={style.div}>
        <div style={style.leaf}></div>
        <div style={style.base}></div>
        <div style={style.door}></div>
      </div>
    );
  }

  static getSearch(style): React.ReactNode {
    return (
      <div data-component-type={"IconSearch"} style={style.div}>
        <span style={style.circle}></span>
        <span style={style.bar}></span>
      </div>
    );
  }

  static getUser({ app, ui }: any, overStyle = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getUser({ app, ui }), overStyle);
    return (
      <div data-component-type={"IconUser"} style={style.div}>
        <span style={style.bottom}></span>
        <span style={style.top}></span>
      </div>
    );
  }

  static getHeaderUser({ app, ui }: any, overStyle = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getHeaderUser({ app, ui }), overStyle);
    return (
      <div data-component-type={"IconUser"} style={style.div}>
        <span style={style.bottom}></span>
        <span style={style.top}></span>
      </div>
    );
  }

  static getLogs({ app, ui }: any, overStyle = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getLogs({ app, ui }), overStyle);
    return (
      <div data-component-type={"IconLogs"} style={style.div}>
        <div style={style.foot1}>
          <span style={style.foot1Top}></span>
          <span style={style.foot1Bottom}></span>
          <span style={style.foot1Space}></span>
        </div>
        <div style={style.foot2}>
          <span style={style.foot2Top}></span>
          <span style={style.foot2Bottom}></span>
          <span style={style.foot2Space}></span>
        </div>
      </div>
    );
  }

  static getSetting({ app, ui }: any, overStyle = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getSetting({ app, ui }), overStyle);
    return (
      <div data-component-type={"IconSetting"} style={style.div}>
        <div style={style.wing1} />
        <div style={style.wing2} />
        <div style={style.wing3} />
        <div style={style.wing4} />
        <div style={style.wing5} />
        <div style={style.wing6} />
        <div style={style.wing7} />
        <div style={style.wing8} />
        <div style={style.circle} />
      </div>
    );
  }

  static getMenu(style): React.ReactNode {
    return (
      <div data-component-type={"IconMenu"} style={style.div}>
        <div style={style.dot} />
        <div style={style.dot} />
        <div style={style.dot} />
      </div>
    );
  }

  static getIndex({ app, ui }, overStyle: any = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getIndex({ app, ui }), overStyle);
    return (
      <div data-component-type={"IconIndex"} style={style.div}>
        <div style={style.wrap}>
          <span style={style.top}></span>
          <span style={style.middle}></span>
          <span style={style.bottom}></span>
        </div>
      </div>
    );
  }

  static getDetail(style): React.ReactNode {
    return (
      <div data-component-type={"IconDetail"} style={style.div}>
        <div style={style.wrap}>
          <span style={style.bar1}></span>
          <span style={style.bar2}></span>
          <span style={style.bar3}></span>
          <span style={style.bar4}></span>
          <span style={style.mekuri}></span>
        </div>
      </div>
    );
  }

  static getThunder(style): React.ReactNode {
    return (
      <div data-component-type={"IconThunder"} style={style.div}>
        <div data-component-type={"IconThunderWrap"} style={style.wrap}>
          <span data-component-type={"IconThunderTop"} style={style.top}></span>
          <span data-component-type={"IconThunderBottom"} style={style.bottom}></span>
        </div>
      </div>
    );
  }

  static getBubble(style): React.ReactNode {
    return (
      <div data-component-type={"IconBubbleDiv"} style={style.div}>
        <div data-component-type={"IconBubble"} style={style.bubble}></div>
        <div data-component-type={"IconBubbleBar"} style={style.bubbleBar}></div>
      </div>
    );
  }

  static getPlay(style): React.ReactNode {
    return (
      <div data-component-type={"IconPlayDiv"} style={style.div}>
        <div data-component-type={"IconPlayCircle"} style={style.playCircle}></div>
        <div data-component-type={"IconPlayTriangle"} style={style.playTriangle}></div>
      </div>
    );
  }

  static getLinks(style): React.ReactNode {
    return (
      <div data-component-type={"IconLinksDiv"} style={style.div}>
        <div data-component-type={"IconLinksA1"} style={style.linksA1}></div>
        <div data-component-type={"IconLinksB1"} style={style.linksB1}></div>
        <div data-component-type={"IconLinksA2"} style={style.linksA2}></div>
        <div data-component-type={"IconLinksB2"} style={style.linksB2}></div>
      </div>
    );
  }

  static getHeadTab(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getHeadTab(params), overStyle);
    return (
      <div data-component-type={"IconHeadTab"} style={style.div}>
        <span style={style.left}></span>
        <span style={style.right}></span>
      </div>
    );
  }

  static getHeart(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getHeart(params), overStyle);
    return (
      <div data-component-type={"IconHeart"} style={style.div}>
        <div style={style.before}></div>
        <div style={style.after}></div>
      </div>
    );
  }

  static getShare(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getShare(params), overStyle);
    return (
      <div data-component-type={"IconShare"} style={style.div}>
        <div style={style.arrow}></div>
        <div style={style.bar}></div>
        <div style={style.whiteBar1}></div>
        <div style={style.whiteBar2}></div>
        <div style={style.base}></div>
      </div>
    );
  }

  static getMoney(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getMoney(params), overStyle);
    return (
      <div data-component-type={"IconMoney"} style={style.div}>
        <div style={style.outer}>
          <div style={style.inner}></div>
        </div>
      </div>
    );
  }

  static getOpenEmoji(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getOpenEmoji(params), overStyle);
    return <div data-component-type={"IconOpenEmoji"} style={style.div} />;
  }

  static getCloseEmoji(overStyle, params: any = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getCloseEmoji(params), overStyle);
    return <div data-component-type={"IconCloseEmoji"} style={style.div} />;
  }

  static getClose(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getClose(params), overStyle);
    return (
      <div data-component-type={"IconClose"} style={style.div}>
        <div style={style.circle}>
          <div style={style.bar1} />
          <div style={style.bar2} />
        </div>
      </div>
    );
  }

  static getCh(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getCh(params), overStyle);
    return (
      <div data-component-type={"IconCh"} style={style.div}>
        <div data-component-type={"IconChCircle1"} style={style.circle1}>
          <div data-component-type={"IconChCircle2"} style={style.circle2}>
            <div data-component-type={"IconChStr"} style={style.str}>
              CH
            </div>
          </div>
        </div>
        <div data-component-type={"IconShadow1"} style={style.shadow1} />
        <div data-component-type={"IconShadow2"} style={style.shadow2} />
      </div>
    );
  }

  static getUpdate(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getUpdate(params), overStyle);
    return (
      <div data-component-type={"IconUpdate"} style={style.div}>
        <div style={style.circle}>
          <div style={style.bar} />
          <div style={style.white} />
        </div>
      </div>
    );
  }

  static getLoading(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getLoading(params), overStyle);
    return (
      <div data-component-type={"IconLoading"} style={style.div}>
        <div style={style.circle} />
        <div style={style.after} />
      </div>
    );
  }

  static getTune(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getTune(params), overStyle);
    return (
      <div data-component-type={"IconTune"} style={style.div}>
        <div data-component-type={"IconSide1"} style={style.side1}></div>
        <div data-component-type={"IconSide2"} style={style.side2}></div>
        <div data-component-type={"IconCut"} style={style.cut}></div>
        <div data-component-type={"IconCenter"} style={style.center}></div>

        <div data-component-type={"IconTerminalLeftTop1"} style={style.terminalLeftTop1}></div>
        <div data-component-type={"IconTerminalLeftTop2"} style={style.terminalLeftTop2}></div>
        <div data-component-type={"IconTerminalLeftBottom1"} style={style.terminalLeftBottom1}></div>
        <div data-component-type={"IconTerminalLeftBottom2"} style={style.terminalLeftBottom2}></div>

        <div data-component-type={"IconTerminalRightTop1"} style={style.terminalRightTop1}></div>
        <div data-component-type={"IconTerminalRightTop2"} style={style.terminalRightTop2}></div>
        <div data-component-type={"IconTerminalRightBottom1"} style={style.terminalRightBottom1}></div>
        <div data-component-type={"IconTerminalRightBottom2"} style={style.terminalRightBottom2}></div>
      </div>
    );
  }
}
