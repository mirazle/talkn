"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const index_1 = __importDefault(require("common/emotions/index"));
const Schema_1 = __importDefault(require("api/store/Schema"));
const Icon_1 = __importDefault(require("client/style/Icon"));
const emotionCoverTypes = new index_1.default();
class Icon extends TalknComponent_1.default {
    static get smallSize() {
        return Icon_1.default.smallSize;
    }
    static get middleSize() {
        return Icon_1.default.middleSize;
    }
    static get largeSize() {
        return Icon_1.default.largeSize;
    }
    static get bigSize() {
        return Icon_1.default.bigSize;
    }
    static generateImageIcon(name = "Twitter", state = {}, overStyle, option = {}) {
        if (Icon_1.default[`get${name}`]) {
            const onClick = option.onClick ? option.onClick : () => { };
            const href = option.href ? option.href : "";
            const style = Icon.getOveredStyle(Icon_1.default[`get${name}`](state, option), overStyle);
            if (!Schema_1.default.isAnonymousFunc(onClick)) {
                return react_1.default.createElement("div", { "data-component-type": `Icon${name}`, onClick: onClick, style: style });
            }
            if (href !== "") {
                return react_1.default.createElement("a", { href: href, "data-component-type": `Icon${name}`, style: style });
            }
            return react_1.default.createElement("div", { "data-component-type": `Icon${name}`, style: style });
        }
        return undefined;
    }
    static getOveredStyle(baseStyle = {}, overStyle = {}) {
        Object.keys(overStyle).forEach((key) => {
            if (baseStyle[key]) {
                if (typeof baseStyle[key] === "object") {
                    baseStyle[key] = { ...baseStyle[key], ...overStyle[key] };
                }
                else {
                    baseStyle[key] = overStyle[key];
                }
            }
        });
        return baseStyle;
    }
    constructor(props) {
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
    static getEmpty(state = {}, overStyle, option = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getEmpty(state, option), overStyle);
        return react_1.default.createElement("div", { "data-component-type": "IconEmpty", style: style });
    }
    static getLiveCnt({ app, ui }, liveCnt = 0) {
        const style = Icon_1.default.getLiveCnt({ app, ui });
        return (react_1.default.createElement("span", { style: style.div },
            react_1.default.createElement("span", { style: style.circle }, liveCnt)));
    }
    static getStampStr(post, dispLabelStampId, isBubble = true) {
        const stampStrStyle = Icon_1.default.getStampStr(isBubble);
        if (dispLabelStampId > 0) {
            const stampLabelStrStyle = Icon_1.default.getStampLabelAtMenuStr();
            const stampType = emotionCoverTypes.belongCoverTypes[dispLabelStampId]
                ? emotionCoverTypes.belongCoverTypes[dispLabelStampId]
                : "No";
            return (`<div data-component-name="stamp" style="${stampStrStyle}">` +
                post +
                `<span data-component-name="stamp-label" style="${stampLabelStrStyle}"> (${stampType})</span>` +
                `</div >`);
        }
        else {
            return `<div data-component-name="stamp" style="${stampStrStyle}">` + post + `</div >`;
        }
    }
    static getStampLabel({ app, ui, post }, type = "default") {
        if (post.stampId > 0) {
            const stampLabelStyle = Icon_1.default.getStampLabel({ app, ui });
            let stampType = emotionCoverTypes.belongCoverTypes[post.stampId]
                ? emotionCoverTypes.belongCoverTypes[post.stampId]
                : "No";
            return (react_1.default.createElement("div", { "data-component-name": "stamp-label-div", style: stampLabelStyle.div },
                react_1.default.createElement("div", { "data-component-name": "stamp-label", style: stampLabelStyle.label },
                    "(",
                    stampType,
                    ")")));
        }
        else {
            return undefined;
        }
    }
    static getTwitter(state = {}, overStyle, option = {}) {
        return Icon.generateImageIcon("Twitter", state, overStyle, option);
    }
    static getFacebook(state = {}, overStyle, option = {}) {
        return Icon.generateImageIcon("Facebook", state, overStyle, option);
    }
    static getAppstore(state = {}, overStyle, option = {}) {
        return Icon.generateImageIcon("Appstore", state, overStyle, option);
    }
    static getAndroid(state = {}, overStyle, option = {}) {
        return Icon.generateImageIcon("Android", state, overStyle, option);
    }
    static getHome(state = {}, overStyle, option = {}) {
        return Icon.generateImageIcon("Home", state, overStyle, option);
    }
    static getGraph(state = {}, overStyle, option = {}) {
        const onClick = option.onClick ? option.onClick : () => { };
        const style = Icon.getOveredStyle(Icon_1.default.getGraph(state, option), overStyle);
        return react_1.default.createElement("div", { "data-component-type": "IconGraph", onClick: onClick, style: style });
    }
    static getTalkn(state = {}, overStyle, option = {}) {
        return Icon.generateImageIcon("Talkn", state, overStyle, option);
    }
    static getTalknLogo(style) {
        return react_1.default.createElement("div", { "data-component-type": "IconTalknLogo", style: style.img });
    }
    static getChromeExtension(overStyle, state = {}, option = {}) {
        return Icon.generateImageIcon("ChromeExtension", state, overStyle, option);
    }
    static getTag(style) {
        return (react_1.default.createElement("div", { "data-component-type": "IconTag", style: style.div },
            react_1.default.createElement("div", { style: style.left }),
            react_1.default.createElement("div", { style: style.right }),
            react_1.default.createElement("div", { style: style.bar })));
    }
    static getHomeCss(style) {
        return (react_1.default.createElement("div", { "data-component-type": "IconHomeCss", style: style.div },
            react_1.default.createElement("div", { style: style.leaf }),
            react_1.default.createElement("div", { style: style.base }),
            react_1.default.createElement("div", { style: style.door })));
    }
    static getSearch(style) {
        return (react_1.default.createElement("div", { "data-component-type": "IconSearch", style: style.div },
            react_1.default.createElement("span", { style: style.circle }),
            react_1.default.createElement("span", { style: style.bar })));
    }
    static getUser({ app, ui }, overStyle = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getUser({ app, ui }), overStyle);
        return (react_1.default.createElement("div", { "data-component-type": "IconUser", style: style.div },
            react_1.default.createElement("span", { style: style.bottom }),
            react_1.default.createElement("span", { style: style.top })));
    }
    static getHeaderUser({ app, ui }, overStyle = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getHeaderUser({ app, ui }), overStyle);
        return (react_1.default.createElement("div", { "data-component-type": "IconUser", style: style.div },
            react_1.default.createElement("span", { style: style.bottom }),
            react_1.default.createElement("span", { style: style.top })));
    }
    static getLogs({ app, ui }, overStyle = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getLogs({ app, ui }), overStyle);
        return (react_1.default.createElement("div", { "data-component-type": "IconLogs", style: style.div },
            react_1.default.createElement("div", { style: style.foot1 },
                react_1.default.createElement("span", { style: style.foot1Top }),
                react_1.default.createElement("span", { style: style.foot1Bottom }),
                react_1.default.createElement("span", { style: style.foot1Space })),
            react_1.default.createElement("div", { style: style.foot2 },
                react_1.default.createElement("span", { style: style.foot2Top }),
                react_1.default.createElement("span", { style: style.foot2Bottom }),
                react_1.default.createElement("span", { style: style.foot2Space }))));
    }
    static getSetting({ app, ui }, overStyle = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getSetting({ app, ui }), overStyle);
        return (react_1.default.createElement("div", { "data-component-type": "IconSetting", style: style.div },
            react_1.default.createElement("div", { style: style.wing1 }),
            react_1.default.createElement("div", { style: style.wing2 }),
            react_1.default.createElement("div", { style: style.wing3 }),
            react_1.default.createElement("div", { style: style.wing4 }),
            react_1.default.createElement("div", { style: style.wing5 }),
            react_1.default.createElement("div", { style: style.wing6 }),
            react_1.default.createElement("div", { style: style.wing7 }),
            react_1.default.createElement("div", { style: style.wing8 }),
            react_1.default.createElement("div", { style: style.circle })));
    }
    static getMenu(style) {
        return (react_1.default.createElement("div", { "data-component-type": "IconMenu", style: style.div },
            react_1.default.createElement("div", { style: style.dot }),
            react_1.default.createElement("div", { style: style.dot }),
            react_1.default.createElement("div", { style: style.dot })));
    }
    static getIndex({ app, ui }, overStyle = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getIndex({ app, ui }), overStyle);
        return (react_1.default.createElement("div", { "data-component-type": "IconIndex", style: style.div },
            react_1.default.createElement("div", { style: style.wrap },
                react_1.default.createElement("span", { style: style.top }),
                react_1.default.createElement("span", { style: style.middle }),
                react_1.default.createElement("span", { style: style.bottom }))));
    }
    static getDetail(style) {
        return (react_1.default.createElement("div", { "data-component-type": "IconDetail", style: style.div },
            react_1.default.createElement("div", { style: style.wrap },
                react_1.default.createElement("span", { style: style.bar1 }),
                react_1.default.createElement("span", { style: style.bar2 }),
                react_1.default.createElement("span", { style: style.bar3 }),
                react_1.default.createElement("span", { style: style.bar4 }),
                react_1.default.createElement("span", { style: style.mekuri }))));
    }
    static getThunder(style) {
        return (react_1.default.createElement("div", { "data-component-type": "IconThunder", style: style.div },
            react_1.default.createElement("div", { "data-component-type": "IconThunderWrap", style: style.wrap },
                react_1.default.createElement("span", { "data-component-type": "IconThunderTop", style: style.top }),
                react_1.default.createElement("span", { "data-component-type": "IconThunderBottom", style: style.bottom }))));
    }
    static getBubble(style) {
        return (react_1.default.createElement("div", { "data-component-type": "IconBubbleDiv", style: style.div },
            react_1.default.createElement("div", { "data-component-type": "IconBubble", style: style.bubble }),
            react_1.default.createElement("div", { "data-component-type": "IconBubbleBar", style: style.bubbleBar })));
    }
    static getPlay(style) {
        return (react_1.default.createElement("div", { "data-component-type": "IconPlayDiv", style: style.div },
            react_1.default.createElement("div", { "data-component-type": "IconPlayCircle", style: style.playCircle }),
            react_1.default.createElement("div", { "data-component-type": "IconPlayTriangle", style: style.playTriangle })));
    }
    static getLinks(style) {
        return (react_1.default.createElement("div", { "data-component-type": "IconLinksDiv", style: style.div },
            react_1.default.createElement("div", { "data-component-type": "IconLinksA1", style: style.linksA1 }),
            react_1.default.createElement("div", { "data-component-type": "IconLinksB1", style: style.linksB1 }),
            react_1.default.createElement("div", { "data-component-type": "IconLinksA2", style: style.linksA2 }),
            react_1.default.createElement("div", { "data-component-type": "IconLinksB2", style: style.linksB2 })));
    }
    static getHeadTab(overStyle, params = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getHeadTab(params), overStyle);
        return (react_1.default.createElement("div", { "data-component-type": "IconHeadTab", style: style.div },
            react_1.default.createElement("span", { style: style.left }),
            react_1.default.createElement("span", { style: style.right })));
    }
    static getHeart(overStyle, params = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getHeart(params), overStyle);
        return (react_1.default.createElement("div", { "data-component-type": "IconHeart", style: style.div },
            react_1.default.createElement("div", { style: style.before }),
            react_1.default.createElement("div", { style: style.after })));
    }
    static getShare(overStyle, params = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getShare(params), overStyle);
        return (react_1.default.createElement("div", { "data-component-type": "IconShare", style: style.div },
            react_1.default.createElement("div", { style: style.arrow }),
            react_1.default.createElement("div", { style: style.bar }),
            react_1.default.createElement("div", { style: style.whiteBar1 }),
            react_1.default.createElement("div", { style: style.whiteBar2 }),
            react_1.default.createElement("div", { style: style.base })));
    }
    static getMoney(overStyle, params = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getMoney(params), overStyle);
        return (react_1.default.createElement("div", { "data-component-type": "IconMoney", style: style.div },
            react_1.default.createElement("div", { style: style.outer },
                react_1.default.createElement("div", { style: style.inner }))));
    }
    static getOpenEmoji(overStyle, params = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getOpenEmoji(params), overStyle);
        return react_1.default.createElement("div", { "data-component-type": "IconOpenEmoji", style: style.div });
    }
    static getCloseEmoji(overStyle, params = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getCloseEmoji(params), overStyle);
        return react_1.default.createElement("div", { "data-component-type": "IconCloseEmoji", style: style.div });
    }
    static getClose(overStyle, params = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getClose(params), overStyle);
        return (react_1.default.createElement("div", { "data-component-type": "IconClose", style: style.div },
            react_1.default.createElement("div", { style: style.circle },
                react_1.default.createElement("div", { style: style.bar1 }),
                react_1.default.createElement("div", { style: style.bar2 }))));
    }
    static getCh(overStyle, params = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getCh(params), overStyle);
        return (react_1.default.createElement("div", { "data-component-type": "IconCh", style: style.div },
            react_1.default.createElement("div", { "data-component-type": "IconChCircle1", style: style.circle1 },
                react_1.default.createElement("div", { "data-component-type": "IconChCircle2", style: style.circle2 },
                    react_1.default.createElement("div", { "data-component-type": "IconChStr", style: style.str }, "CH"))),
            react_1.default.createElement("div", { "data-component-type": "IconShadow1", style: style.shadow1 }),
            react_1.default.createElement("div", { "data-component-type": "IconShadow2", style: style.shadow2 })));
    }
    static getUpdate(overStyle, params = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getUpdate(params), overStyle);
        return (react_1.default.createElement("div", { "data-component-type": "IconUpdate", style: style.div },
            react_1.default.createElement("div", { style: style.circle },
                react_1.default.createElement("div", { style: style.bar }),
                react_1.default.createElement("div", { style: style.white }))));
    }
    static getLoading(overStyle, params = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getLoading(params), overStyle);
        return (react_1.default.createElement("div", { "data-component-type": "IconLoading", style: style.div },
            react_1.default.createElement("div", { style: style.circle }),
            react_1.default.createElement("div", { style: style.after })));
    }
    static getTune(overStyle, params = {}) {
        const style = Icon.getOveredStyle(Icon_1.default.getTune(params), overStyle);
        return (react_1.default.createElement("div", { "data-component-type": "IconTune", style: style.div },
            react_1.default.createElement("div", { "data-component-type": "IconSide1", style: style.side1 }),
            react_1.default.createElement("div", { "data-component-type": "IconSide2", style: style.side2 }),
            react_1.default.createElement("div", { "data-component-type": "IconCut", style: style.cut }),
            react_1.default.createElement("div", { "data-component-type": "IconCenter", style: style.center }),
            react_1.default.createElement("div", { "data-component-type": "IconTerminalLeftTop1", style: style.terminalLeftTop1 }),
            react_1.default.createElement("div", { "data-component-type": "IconTerminalLeftTop2", style: style.terminalLeftTop2 }),
            react_1.default.createElement("div", { "data-component-type": "IconTerminalLeftBottom1", style: style.terminalLeftBottom1 }),
            react_1.default.createElement("div", { "data-component-type": "IconTerminalLeftBottom2", style: style.terminalLeftBottom2 }),
            react_1.default.createElement("div", { "data-component-type": "IconTerminalRightTop1", style: style.terminalRightTop1 }),
            react_1.default.createElement("div", { "data-component-type": "IconTerminalRightTop2", style: style.terminalRightTop2 }),
            react_1.default.createElement("div", { "data-component-type": "IconTerminalRightBottom1", style: style.terminalRightBottom1 }),
            react_1.default.createElement("div", { "data-component-type": "IconTerminalRightBottom2", style: style.terminalRightBottom2 })));
    }
}
exports.default = Icon;
//# sourceMappingURL=Icon.js.map