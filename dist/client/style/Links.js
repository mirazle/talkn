"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
class Links {
    constructor(params) {
        const self = Links.getSelf(params);
        const linksUl = Links.getLinksUl(params);
        const linksLi = Links.getLinksLi(params);
        const linksLiActive = Links.getLinksLiActive(params);
        const linksLiUnactive = Links.getLinksLiUnactive(params);
        const linkMenuUl = Links.getLinkMenuUl(params);
        const linkMenuLi = Links.getLinkMenuLi(params);
        const linksTabActive = Links.getLinksTabActive(params);
        const linksTabUnactive = Links.getLinksTabUnactive(params);
        const linksTabLast = Links.getLinksTabLast(params);
        return {
            self,
            linksUl,
            linksLi,
            linksLiActive,
            linksLiUnactive,
            linkMenuUl,
            linkMenuLi,
            linksTabActive,
            linksTabUnactive,
            linksTabLast
        };
    }
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
        return Container_1.default.themeRGB;
    }
    static get unactiveColor() {
        return Container_1.default.fontBaseRGB;
    }
    static getSelfDisplay({ app, ui }) {
        return ui.isOpenLinks ? "flex" : "none";
    }
    static getLinksUlOevrflowY({ app, ui }) {
        return ui.isOpenLinks ? "scroll" : "hidden";
    }
    static getSelf({ app, ui }) {
        const display = Links.getSelfDisplay({ app, ui });
        const layout = index_1.default.getLayoutFlex({
            display,
            width: "100%",
            height: `calc( 100% )`,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "0px 3px 0px 0px"
        });
        const content = index_1.default.getContentBase({
            fontSize: "14px"
        });
        const animation = {};
        return index_1.default.get({ layout, content, animation });
    }
    static getLinksUl({ app, ui }) {
        const overflowY = Links.getLinksUlOevrflowY({ app, ui });
        const layout = index_1.default.getLayoutFlex({
            height: "100%",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            flexDirection: "column",
            overflowX: "hidden",
            overflowY,
            overflowScrolling: "touch",
            WebkitOverflowScrolling: "touch"
        });
        const content = {};
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getLinksLi({ app, ui }) {
        const size = Links.size + "px";
        const layout = index_1.default.getLayoutFlex({
            alignItems: "flex-start",
            flexDirection: "column",
            width: "100%",
            height: size,
            minHeight: size,
            maxHeight: size,
            background: Container_1.default.whiteRGBA,
            borderRadius: "5px",
            padding: "0px 0px 0px 10px",
            marginBottom: "5px"
        });
        const content = index_1.default.getContentBase({
            cursor: "pointer",
            fontSize: "14px",
            lineHeight: "17px"
        });
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getLinksLiActive({ app, ui }) {
        const styles = Links.getLinksLi({ app, ui });
        styles.background = Container_1.default.whiteRGB;
        styles.color = Container_1.default.fontBaseRGB;
        return styles;
    }
    static getLinksLiUnactive({ app, ui }) {
        const styles = Links.getLinksLi({ app, ui });
        styles.background = Container_1.default.calmRGB;
        styles.color = Container_1.default.fontBaseRGB;
        return styles;
    }
    static getLinkMenuUl({ app, ui }) {
        const size = Links.size + "px";
        const layout = index_1.default.getLayoutFlex({
            minHeight: size,
            height: size,
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            flexDirection: "row"
        });
        const content = {};
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getLinkMenuLi({ app, ui }) {
        const size = Links.size - 4 + "px";
        const layout = index_1.default.getLayoutFlex({
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexGrow: 1,
            margin: "5px 1% 0px 0px",
            height: size,
            minHeight: size,
            maxHeight: size,
            background: Container_1.default.reliefRGB,
            borderRadius: "5px"
        });
        const content = index_1.default.getContentBase({
            cursor: "pointer",
            fontSize: "14px",
            lineHeight: "17px",
            color: Container_1.default.whiteRGB
        });
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getLinksTabActive({ app, ui }) {
        const styles = {};
        styles.background = Container_1.default.whiteRGBA;
        styles.color = Container_1.default.fontBaseRGB;
        return styles;
    }
    static getLinksTabUnactive({ app, ui }) {
        const styles = Links.getLinkMenuLi({ app, ui });
        return styles;
    }
    static getLinksTabLast({ app, ui }) {
        const styles = {};
        styles.margin = "5px 0px 0px 0px";
        return styles;
    }
}
exports.default = Links;
//# sourceMappingURL=Links.js.map