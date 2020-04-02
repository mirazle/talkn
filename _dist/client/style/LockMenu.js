"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const Container_1 = __importDefault(require("./Container"));
const Header_1 = __importDefault(require("./Header"));
const Main_1 = __importDefault(require("./Main"));
class LockMenu {
    constructor(params) {
        const menuShare = LockMenu.getMenuShare(params);
        const header = LockMenu.getHeader(params);
        const ul = LockMenu.getUl(params);
        const liGoWeb = LockMenu.getLiGoWeb(params);
        const liTwitter = LockMenu.getLiTwitter(params);
        const liFacebook = LockMenu.getLiFacebook(params);
        const liEmbed = LockMenu.getLiEmbed(params);
        const liEmbedInput = LockMenu.getLiEmbedInput(params);
        const shareLabel = LockMenu.getShareLabel(params);
        return {
            menuShare,
            header,
            ul,
            liGoWeb,
            liTwitter,
            liFacebook,
            liEmbed,
            liEmbedInput,
            shareLabel
        };
    }
    static get headTabUpdate() {
        return {
            div: {
                position: "absolute",
                top: "13px",
                right: "10px",
                transform: "scale(0.5)"
            }
        };
    }
    static getCommonLayout({ app, ui }) {
        const layout = {
            position: "fixed",
            width: "90%",
            height: "fit-content",
            minHeight: "fit-content",
            maxHeight: "fit-content",
            top: `calc( 100% + ${Header_1.default.headerHeight}px)`,
            left: "5%",
            flexFlow: "column",
            border: Container_1.default.border,
            borderRadius: "5px",
            background: Container_1.default.whiteRGB,
            zIndex: 0
        };
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                layout.width = `${100 * Container_1.default.widthRatio}`;
                layout.left = (100 - layout.width) / 2;
                layout.width = layout.width + "%";
                layout.left = layout.left + "%";
                layout.zIndex = 0;
                break;
            case Ui_1.default.screenModeMiddleLabel:
                layout.width = `${100 * Container_1.default.widthRatio}`;
                layout.left = (100 - layout.width) / 2;
                layout.width = layout.width + "%";
                layout.left = layout.left + "%";
                layout.zIndex = 0;
                break;
            case Ui_1.default.screenModeLargeLabel:
                layout.width = `33.3%`;
                layout.left = `33.3%`;
                layout.zIndex = 1;
                break;
        }
        return layout;
    }
    static getCommonTransform({ app, ui }) {
        return ui.openLockMenu === Ui_1.default.openLockMenuLabelNo ? "translate3d(0px, 0px, 0px)" : `translate3d(0px, -70vh, 0px)`;
    }
    static getPaddingLi({ app, ui }) {
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                return "15px";
            case Ui_1.default.screenModeMiddleLabel:
            case Ui_1.default.screenModeLargeLabel:
                return "15px 15px 15px 20px";
        }
    }
    static getMenuShare({ app, ui }) {
        const commonLayout = LockMenu.getCommonLayout({ app, ui });
        const layout = index_1.default.getLayoutFlex(commonLayout);
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui }),
            transform: LockMenu.getCommonTransform({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getHeader({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: "100%",
            height: Main_1.default.headerHeight,
            maxHeight: Main_1.default.headerHeight,
            borderBottom: Container_1.default.border,
            background: Container_1.default.whiteRGB,
            padding: "0px 20px"
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUl({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "100%"
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getLiGoWeb({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: "100%",
            height: "45px",
            padding: LockMenu.getPaddingLi({ app, ui })
        });
        const content = index_1.default.getContentBase({
            cursor: "pointer"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getLiTwitter({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: "100%",
            height: "45px",
            padding: LockMenu.getPaddingLi({ app, ui }),
            borderBottom: Container_1.default.border
        });
        const content = index_1.default.getContentBase({
            cursor: "pointer"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getLiFacebook({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: "100%",
            height: "45px",
            padding: LockMenu.getPaddingLi({ app, ui }),
            borderBottom: Container_1.default.border
        });
        const content = index_1.default.getContentBase({
            cursor: "pointer"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getLiEmbed({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: "100%",
            height: "45px",
            padding: LockMenu.getPaddingLi({ app, ui })
        });
        const content = index_1.default.getContentBase({
            cursor: "pointer"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getLiEmbedInput({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: "98%",
            height: "25px",
            margin: "0px 0px 0px 20px",
            border: Container_1.default.border,
            borderRadius: "5px",
            padding: "5px"
        });
        const content = index_1.default.getContentBase({
            fontSize: "12px",
            outline: 0,
            cursor: "pointer"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getShareLabel({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            flexGrow: "1"
        });
        const content = index_1.default.getContentBase({
            color: "inherit",
            justifyContent: "flex-start",
            textIndent: "20px",
            textAlign: "left"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = LockMenu;
//# sourceMappingURL=LockMenu.js.map