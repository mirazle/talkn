"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
class Link {
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
    static get activeBgColor() {
        return Container_1.default.whiteRGBA;
    }
    static get unactiveBgColor() {
        return "rgba( 235, 235, 235, 0.96 )";
    }
    static getSelf({ app, ui }) {
        const size = Link.size + "px";
        const layout = index_1.default.getLayoutFlex({
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
    static getTuneLi({ app, ui }) {
        const styles = Link.getActiveLi({ app, ui });
        styles.alignItems = "center";
        return styles;
    }
    static getActiveLi({ app, ui }) {
        const styles = Link.getSelf({ app, ui });
        styles.background = Link.activeBgColor;
        styles.color = Container_1.default.fontBaseRGB;
        return styles;
    }
    static getUnactiveLi({ app, ui }) {
        const styles = Link.getSelf({ app, ui });
        styles.background = Link.unactiveBgColor;
        styles.color = Container_1.default.fontBaseRGB;
        return styles;
    }
}
exports.default = Link;
//# sourceMappingURL=Link.js.map