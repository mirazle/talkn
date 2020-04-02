"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("api/store/Ui"));
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
        const stampLabelWrap = Post.getStampLabelWrap(params);
        const stampLabel = Post.getStampLabel(params);
        return {
            self,
            upper,
            upperChild,
            upperTitle,
            upperTimeago,
            bottom,
            bottomIcon,
            bottomPost,
            stampLabelWrap,
            stampLabel
        };
    }
    static get bubblestampScale() {
        return 2;
    }
    static get stampScale() {
        return 1;
    }
    static get fontSize() {
        return 14;
    }
    static get iconSize() {
        return "25px";
    }
    static getStampTag(post, isBubble = true) {
        const style = Post.getStampStyle(isBubble);
        return `<div class="talknStamps" style="${style}">${post}</div>`;
    }
    static getStampStyle(isBubble = true) {
        const scale = isBubble ? Post.bubblestampScale : Post.stampScale;
        return `display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;transform: scale(${scale});font-size: 50px;`;
    }
    static getSelf({ app, ui }) {
        const padding = ui.isBubblePost ? "10px 0px 10px 0px" : "0px 0px 0px 0px";
        const minHeight = ui.isBubblePost ? "75px" : "40px";
        const width = "calc( 100% - 0px )";
        const layout = index_1.default.getLayoutBlock({
            width,
            minWidth: "calc( 100% - 20px )",
            maxWidth: width,
            height: "auto",
            minHeight,
            padding
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getFixTimeMarker({ app, ui }) {
        const timeMarker = Post.getTimeMarker({ app, ui });
        const fixTimeMarker = Object.assign(Object.assign({}, timeMarker), { position: "fixed" });
        return fixTimeMarker;
    }
    static getTimeMarker({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: "18%",
            height: "auto",
            margin: "15px auto 10px auto",
            padding: "5px 10px",
            background: Container_1.default.darkLightRGBA,
            borderRadius: "20px"
        });
        const content = index_1.default.getContentBase({
            color: Container_1.default.whiteRGB,
            letterSpacing: "2px",
            fontSize: "0.1em"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpper({ app, ui }) {
        const display = ui.isBubblePost ? "flex" : "none";
        const layout = index_1.default.getLayoutFlex({
            display,
            justifyContent: "space-between",
            height: "20px"
        });
        const content = index_1.default.getContentBase({
            fontSize: "14px"
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
            maxWidth: "20%"
        });
        const content = index_1.default.getContentBase({
            textAlign: "left",
            textIndent: "10px"
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
            margin: "0px 15px 0px 5px"
        });
        const content = index_1.default.getContentBase({
            textAlign: "left",
            whiteSpace: "nowrap",
            wordBreak: "break-all"
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
            maxWidth: "20%"
        });
        const content = index_1.default.getContentBase({
            textAlign: "right",
            fontSize: "0.75em",
            letterSpacing: "0.5px"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottom({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            padding: "0px 10px 0px 0px"
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
            height: Post.iconSize,
            backgroundImage: `url(${conf_1.default.protcol}:${conf_1.default.assetsPath}favicon.ico")`,
            backgroundPosition: "50% 50%",
            backgroundSize: "24px 24px",
            backgroundRepeat: "no-repeat"
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottomPost({ app, ui }) {
        const background = ui.isBubblePost ? Container_1.default.themeRGBA : "none";
        const color = ui.isBubblePost ? Container_1.default.whiteRGBA : "rgba(160, 160, 160)";
        const padding = ui.isBubblePost ? "15px 15px 15px 25px" : "0px";
        const layout = index_1.default.getLayoutBlock({
            flexGrow: 8,
            width: "79%",
            minWidth: "79%",
            maxWidth: "79%",
            background,
            padding,
            margin: "0px 1% 0px 0px",
            borderRadius: "10px"
        });
        const content = index_1.default.getContentBase({
            color,
            lineHeight: 1.7,
            fontSize: `${Post.fontSize}px`,
            textAlign: "left",
            cursor: "pointer",
            wordWrap: "break-word",
            overflowWrap: "break-word"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getStampLabelWrap({ app, ui }) {
        const right = Ui_1.default.screenModeSmallLabel === ui.screenMode ? "9%" : "7%";
        const layout = index_1.default.getLayoutFlex({
            position: "absolute",
            bottom: "10px",
            right,
            width: "100%",
            height: "20px",
            justifyContent: "flex-end",
            alignItems: "center",
            zIndex: 10
        });
        const content = index_1.default.getContentBase({
            textAlign: "right"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getStampLabel({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: "100px",
            height: "inherit",
            padding: "5px",
            background: "rgba(80, 80 ,80, 0.2)",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px 5px 0px 0px"
        });
        const content = index_1.default.getContentBase({
            fontSize: "10px",
            color: Container_1.default.whiteRGB
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = Post;
//# sourceMappingURL=Post.js.map