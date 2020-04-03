"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("api/store/Ui"));
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
const Posts_1 = __importDefault(require("./Posts"));
const Menu_1 = __importDefault(require("./Menu"));
class PostsFooter {
    constructor(params) {
        const self = PostsFooter.getSelf(params);
        const icon = PostsFooter.getIcon(params);
        const textarea = PostsFooter.getTextarea(params);
        const modalTextarea = PostsFooter.getModalTextarea(params);
        const button = PostsFooter.getButton(params);
        const upper = PostsFooter.getUpper(params);
        const bottom = PostsFooter.getBottom(params);
        return {
            self,
            icon,
            textarea,
            modalTextarea,
            button,
            upper,
            bottom
        };
    }
    static get selfHeight() {
        return 45;
    }
    static getWidth({ app, ui }, addUnit = false) {
        let width = "0";
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel || ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
            width = "100%";
        }
        else {
            switch (ui.screenMode) {
                case Ui_1.default.screenModeSmallLabel:
                    width = "100%";
                    break;
                case Ui_1.default.screenModeMiddleLabel:
                    width = Posts_1.default.getWidth({ app, ui });
                    break;
                case Ui_1.default.screenModeLargeLabel:
                    width = Posts_1.default.getWidth({ app, ui });
                    break;
            }
        }
        return addUnit ? index_1.default.trimUnit(width) : width;
    }
    static getLeft({ app, ui }, addUnit = false) {
        let left = "0";
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            return 0;
        }
        else if (ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
            return 0;
        }
        else {
            switch (ui.screenMode) {
                case Ui_1.default.screenModeSmallLabel:
                    left = "0px";
                    break;
                case Ui_1.default.screenModeMiddleLabel:
                    left = `${Menu_1.default.getWidth({ app, ui })}`;
                    break;
                case Ui_1.default.screenModeLargeLabel:
                    left = Menu_1.default.getWidth({ app, ui });
                    break;
            }
        }
        return addUnit ? index_1.default.trimUnit(left) : left;
    }
    static getBorder({ app, ui }, addUnit = false) {
        switch (ui.extensionMode) {
            case Ui_1.default.extensionModeExtBottomLabel:
                return {
                    borderTop: Container_1.default.border,
                    borderRight: Container_1.default.border,
                    borderLeft: Container_1.default.border
                };
            case Ui_1.default.extensionModeExtModalLabel:
                return { border: Container_1.default.border };
            default:
                if (ui.includeIframeTag) {
                    return { border: Container_1.default.border };
                }
                else {
                    if (ui.screenMode === Ui_1.default.screenModeSmallLabel) {
                        return {
                            borderTop: Container_1.default.border,
                            borderBottom: Container_1.default.border
                        };
                    }
                    else {
                        return {
                            borderTop: Container_1.default.border,
                            borderBottom: Container_1.default.border
                        };
                    }
                }
        }
    }
    static getBorderRadius({ app, ui }, addUnit = false) {
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            return ui.extensionWidth === "100%" ? "0px 0px 0px 0px" : `${Container_1.default.radius} ${Container_1.default.radius} 0px 0px`;
        }
        else if (ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
            return `0px 0px ${Container_1.default.radius} ${Container_1.default.radius}`;
        }
        return 0;
    }
    static getTransform({ app, ui }) {
        let transform = "translate3d( 0px, 0px, 0px )";
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                transform = ui.isOpenMenu ? "translate3d( 0%, 0px, 0px )" : "translate3d( 0px, 0px, 0px )";
                break;
            case Ui_1.default.screenModeMiddleLabel:
                transform = ui.isOpenDetail ? `translate3d( 0px ,0px, 0px )` : "translate3d( 0px ,0px, 0px )";
                break;
            case Ui_1.default.screenModeLargeLabel:
                transform = "translate3d( 0px ,0px, 0px )";
                break;
        }
        return transform;
    }
    static getSelf({ app, ui }) {
        const borders = PostsFooter.getBorder({ app, ui });
        const borderRadius = PostsFooter.getBorderRadius({ app, ui });
        const layout = index_1.default.getLayoutFlex(Object.assign({ position: "fixed", bottom: 0, left: PostsFooter.getLeft({ app, ui }), flexGrow: 1, height: PostsFooter.selfHeight, width: PostsFooter.getWidth({ app, ui }), maxWidth: PostsFooter.getWidth({ app, ui }), background: Container_1.default.offWhiteRGBA, justifyContent: "flex-start", borderRadius }, borders));
        const content = {};
        const animation = index_1.default.getAnimationBase({
            transform: PostsFooter.getTransform({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getIcon({ thread }) {
        const layout = index_1.default.getLayoutInlineBlock({
            width: "20%",
            maxWidth: "20%",
            height: "55%",
            backgroundImage: `url()`,
            backgroundPosition: "center center",
            backgroundSize: "24px 24px",
            backgroundRepeat: "no-repeat",
            zIndex: 9999
        });
        const content = index_1.default.getContentBase({
            cursor: "pointer"
        });
        const animation = {};
        return index_1.default.get({ layout, content, animation });
    }
    static getTextarea({ app, ui }) {
        const width = ui.extensionMode === Ui_1.default.extensionModeExtModalLabel ? "60%" : "54%";
        const layout = index_1.default.getLayoutInlineBlock({
            width,
            maxWidth: width,
            height: "25px",
            background: Container_1.default.whiteRGB,
            padding: "6px",
            margin: "0 3% 0 0",
            outline: "none",
            resize: "none",
            lineHeight: "0.9",
            border: Container_1.default.border,
            borderRadius: "3px",
            WebkitAppearance: "none"
        });
        const content = index_1.default.getContentBase({
            fontSize: "12px",
            textAlign: "left"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getModalTextarea({ app, ui }) {
        const layout = index_1.default.getLayoutInlineBlock({
            width: "60%",
            maxWidth: "60%",
            height: "55%",
            background: Container_1.default.whiteRGB,
            padding: "6px",
            margin: "0 0% 0 0",
            outline: "none",
            resize: "none",
            lineHeight: "0.9",
            border: Container_1.default.border,
            borderRadius: "3px",
            WebkitAppearance: "none"
        });
        const content = index_1.default.getContentBase({
            fontSize: "12px",
            textAlign: "left"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getButton({ app, ui }) {
        const layout = index_1.default.getLayoutInlineBlock({
            outline: "none",
            width: "20%",
            maxWidth: "20%",
            height: "56%",
            margin: "0px 3% 0px 0%",
            background: "rgb(245, 245, 245)",
            border: Container_1.default.border,
            borderRadius: "3px"
        });
        const content = index_1.default.getContentBase({
            fontSize: "12px",
            cursor: "pointer"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpper({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            alignItems: "center",
            justifyContent: "flex-start"
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottom({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            alignItems: "center",
            justifyContent: "center"
        });
        const content = index_1.default.getContentBase({
            fontSize: "10px"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = PostsFooter;
//# sourceMappingURL=PostsFooter.js.map