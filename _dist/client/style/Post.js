"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = __importDefault(require("../../common/conf"));
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
class Post {
    constructor(params) {
        const self = Post.getSelf(params);
        const upper = Post.getUpper(params);
        const upperChild = Post.getUpperChild(params);
        const upperTitle = Post.getUpperTitle(params);
        const upperTimeago = Post.getUpperTimeago(params);
        const bottom = Post.getBottom(params);
        const bottomIcon = Post.getBottomIcon(params);
        const bottomPost = Post.getBottomPost(params);
        return {
            self,
            upper,
            upperChild,
            upperTitle,
            upperTimeago,
            bottom,
            bottomIcon,
            bottomPost,
        };
    }
    static get bubblestampScale() {
        return 2;
    }
    static get stampScale() {
        return 1;
    }
    static getSelf({ app, ui }) {
        const padding = ui.isBubblePost ? "5px 0" : "0";
        const margin = ui.isBubblePost ? "5px 0" : "0";
        const minHeight = ui.isBubblePost ? "40px" : "40px";
        const width = "calc( 100% - 0px )";
        const layout = index_1.default.getLayoutBlock({
            width,
            minWidth: "calc( 100% - 20px )",
            maxWidth: width,
            height: "auto",
            minHeight,
            margin,
            padding,
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getFixTimeMarker({ app, ui }) {
        const timeMarker = Post.getTimeMarker({ app, ui });
        const fixTimeMarker = { ...timeMarker, position: "fixed" };
        return fixTimeMarker;
    }
    static getTimeMarker({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: "18%",
            height: "auto",
            margin: "15px auto 10px auto",
            padding: "5px 10px",
            background: Container_1.default.darkLightRGBA,
            borderRadius: "20px",
        });
        const content = index_1.default.getContentBase({
            color: Container_1.default.whiteRGB,
            letterSpacing: "2px",
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpper({ app, ui }) {
        const display = ui.isBubblePost ? "flex" : "none";
        const layout = index_1.default.getLayoutFlex({
            display,
            justifyContent: "space-between",
            height: "22px",
        });
        const content = index_1.default.getContentBase({
            fontSize: "0.9em",
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpperChild({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            alignItems: "flex-start",
            justifyContent: "center",
            flexGrow: 2,
            width: "20%",
            minWidth: "20%",
            maxWidth: "20%",
        });
        const content = index_1.default.getContentBase({
            textAlign: "left",
            textIndent: "10px",
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpperTitle({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexGrow: 6,
            width: "60%",
            minWidth: "60%",
            maxWidth: "60%",
            margin: "0px 15px 0px 5px",
        });
        const content = index_1.default.getContentBase({
            textAlign: "left",
            whiteSpace: "nowrap",
            wordBreak: "break-all",
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpperTimeago({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexGrow: 2,
            padding: "0px 20px 0px 0px",
            width: "20%",
            minWidth: "20%",
            maxWidth: "20%",
        });
        const content = index_1.default.getContentBase({
            textAlign: "right",
            fontSize: "0.75em",
            letterSpacing: "0.5px",
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottom({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            padding: "0px 10px 0px 0px",
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottomIcon({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            flexGrow: 2,
            width: "20%",
            minWidth: "20%",
            maxWidth: "20%",
            height: `${Container_1.default.getFaviconSize({ app, ui })}px`,
            minHeight: "40px",
            backgroundImage: `url(${conf_1.default.protcol}:${conf_1.default.assetsPath}favicon.ico")`,
            backgroundPosition: "50% 50%",
            backgroundSize: `${Container_1.default.getFaviconSize({ app, ui })}px`,
            backgroundRepeat: "no-repeat",
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottomPost({ app, ui }) {
        const width = "75%";
        const marginRight = "5%";
        const background = ui.isBubblePost ? Container_1.default.themeRGBA : "none";
        const color = ui.isBubblePost ? Container_1.default.whiteRGBA : "rgba(160, 160, 160)";
        const padding = ui.isBubblePost ? "20px 20px 20px 30px" : "0px";
        const layout = index_1.default.getLayoutFlex({
            justifyContent: "flex-start",
            flexGrow: 8,
            width,
            minWidth: width,
            maxWidth: width,
            minHeight: "40px",
            background,
            padding,
            margin: `0px ${marginRight} 0px 0px`,
            borderRadius: "10px",
        });
        const content = index_1.default.getContentBase({
            color,
            textAlign: "left",
            cursor: "pointer",
            wordWrap: "break-word",
            overflowWrap: "break-word",
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = Post;
//# sourceMappingURL=Post.js.map