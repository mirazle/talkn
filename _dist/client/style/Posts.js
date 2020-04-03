"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("api/store/App"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
const Header_1 = __importDefault(require("./Header"));
const PostsFooter_1 = __importDefault(require("./PostsFooter"));
const Main_1 = __importDefault(require("./Main"));
const Menu_1 = __importDefault(require("./Menu"));
const Detail_1 = __importDefault(require("./Detail"));
const Video_1 = __importDefault(require("./Media/Video"));
class Posts {
    constructor(params) {
        const self = Posts.getSelf(params);
        const ol = Posts.getOl(params);
        const more = Posts.getMore(params);
        return {
            self,
            ol,
            more
        };
    }
    static getSelfDisplay({ app, ui }) {
        return ui.isOpenNotif ? "none" : "flex";
    }
    static getMinWidth({ app, ui }, addUnit = false) {
        let width = "200px";
        return addUnit ? index_1.default.trimUnit(width) : width;
    }
    static getOlWidth({ app, ui }, addUnit = false) {
        const width = ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel ? "90%" : "100%";
        return addUnit ? index_1.default.trimUnit(width) : width;
    }
    static getWidth({ app, ui }, addUnit = false) {
        let width = "100%";
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            width = "90%";
        }
        else {
            switch (ui.screenMode) {
                case Ui_1.default.screenModeSmallLabel:
                    return "100%";
                case Ui_1.default.screenModeMiddleLabel:
                    return `calc(100% - ${Menu_1.default.getWidth({ app, ui }, false)})`;
                case Ui_1.default.screenModeLargeLabel:
                    width = `calc( ${100 - Detail_1.default.getWidth({ app, ui }, false)}% - ${Menu_1.default.getWidth({ app, ui }, false)} )`;
                    break;
            }
        }
        return addUnit ? index_1.default.trimUnit(width) : width;
    }
    static closeIndexTransform({ app, ui }) {
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                return `translate3d( -${ui.width}px, 0px, 0px)`;
            case Ui_1.default.screenModeMiddleLabel:
                return `translate3d( -${Menu_1.default.getWidth({ app, ui })}px, 0px, 0px)`;
            case Ui_1.default.screenModeLargeLabel:
                return `translate3d( -${Menu_1.default.getWidth({ app, ui })}px, 0px, 0px)`;
        }
    }
    static openIndexTransform(option) {
        return `translate3d( 0px, 0px, 0px)`;
    }
    static get headerHeight() {
        return 35;
    }
    static getBorders({ app, ui }) {
        return ui.extensionMode === Ui_1.default.screenModeSmallLabel
            ? { borderRight: Container_1.default.border, borderLeft: Container_1.default.border }
            : {};
    }
    static getMargin({ app, ui }, addUnit = false) {
        let margin = "0";
        let marginTop = "0";
        let marginBottom = "0";
        margin = `${Header_1.default.headerHeight}px 0px 0px 0px`;
        marginTop = app.isMediaCh ? `0px` : "0px";
        marginBottom = app.isMediaCh ? `0px` : "0px";
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            margin = `${marginTop} 5% ${Header_1.default.headerHeight}px 5%`;
        }
        else if (ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
            margin = `${marginTop} 0px ${PostsFooter_1.default.selfHeight}px 0px`;
        }
        else {
            switch (ui.screenMode) {
                case Ui_1.default.screenModeSmallLabel:
                    margin = `${marginTop} 0px ${marginBottom} 0px`;
                    break;
                case Ui_1.default.screenModeMiddleLabel:
                    margin = `${marginTop} 0px ${marginBottom} ${Menu_1.default.getWidth({ app, ui })}`;
                    break;
                case Ui_1.default.screenModeLargeLabel:
                    margin = `${marginTop} 0px ${marginBottom} ${Menu_1.default.getWidth({ app, ui })}`;
                    break;
            }
        }
        return margin;
    }
    static getPadding({ app, ui }, addUnit = false) {
        let padding = "0";
        let paddingTop = "0";
        let paddingBottom = "0";
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            padding = "0px";
        }
        else if (ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
            padding = "0px";
        }
        else {
            if (app.isMediaCh) {
                switch (app.chType) {
                    case App_1.default.mediaTagTypeAudio:
                        paddingBottom = `${PostsFooter_1.default.selfHeight}px`;
                    case App_1.default.mediaTagTypeVideo:
                        paddingBottom = `${PostsFooter_1.default.selfHeight}px`;
                }
            }
            switch (ui.screenMode) {
                case Ui_1.default.screenModeSmallLabel:
                    padding = `0px 0px ${PostsFooter_1.default.selfHeight}px 0px`;
                    break;
                case Ui_1.default.screenModeMiddleLabel:
                    padding = `0px 0px ${PostsFooter_1.default.selfHeight}px 0px`;
                    break;
                case Ui_1.default.screenModeLargeLabel:
                    padding = `0px 0px 0px 0px`;
                    break;
            }
        }
        return padding;
    }
    static getSelfTransform({ app, ui }) {
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            return ui.isDispPosts
                ? "translate3d(0px, 0px, 0px)"
                : `translate3d(0px, calc( 100% + ${PostsFooter_1.default.selfHeight}px ), 0px)`;
        }
        else {
            return "translate3d(0px, 0px, 0px)";
        }
    }
    static getSelfHeight({ app, ui }) {
        switch (ui.extensionMode) {
            case Ui_1.default.extensionModeExtBottomLabel:
            case Ui_1.default.extensionModeExtModalLabel:
                return `calc( 100% - ${Main_1.default.headerHeight + PostsFooter_1.default.selfHeight}px )`;
            case Ui_1.default.extensionModeExtIncludeLabel:
                return `100%`;
            default:
                if (ui.screenMode === Ui_1.default.screenModeLargeLabel) {
                    if (app.chType === App_1.default.mediaTagTypeVideo) {
                        return `calc( 100% - ${Main_1.default.headerHeight + PostsFooter_1.default.selfHeight + Video_1.default.height}px )`;
                    }
                    else {
                        return `calc( 100% - ${Main_1.default.headerHeight + PostsFooter_1.default.selfHeight}px )`;
                    }
                }
                else {
                    return "auto";
                }
        }
    }
    static getSelfMinHeight({ app, ui }) {
        if (app.chType === App_1.default.mediaTagTypeVideo) {
            return `calc( 100% - ${Video_1.default.height + PostsFooter_1.default.selfHeight + Header_1.default.headerHeight}px)`;
        }
        else {
            if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel || ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
                return `calc( 100% - ${Main_1.default.headerHeight + PostsFooter_1.default.selfHeight}px )`;
            }
            else {
                if (ui.screenMode === Ui_1.default.screenModeLargeLabel) {
                    return `calc( 100% - ${Main_1.default.headerHeight + PostsFooter_1.default.selfHeight}px )`;
                }
                else {
                    return "auto";
                }
            }
        }
    }
    static getSelfTop({ app, ui }) {
        if (ui.extensionMode === Ui_1.default.extensionModeExtNoneLabel) {
            if (app.chType === App_1.default.mediaTagTypeVideo) {
                return `${Header_1.default.headerHeight + Video_1.default.height}px`;
            }
        }
        return `${Header_1.default.headerHeight}px`;
    }
    static getSelf({ app, ui }) {
        let position = "absolute";
        let overflowX = "hidden";
        let overflowY = "hidden";
        let borders = { borderRight: 0, borderLeft: 0 };
        let background = Container_1.default.whiteRGBA;
        let zIndex = 1;
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel || ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
            position = "fixed";
            overflowX = "hidden";
            overflowY = "scroll";
            borders.borderRight = Container_1.default.border;
            borders.borderLeft = Container_1.default.border;
            zIndex = -2;
        }
        else {
            if (ui.screenMode === Ui_1.default.screenModeLargeLabel) {
                overflowX = "hidden";
                overflowY = "scroll";
            }
            borders = Posts.getBorders({ app, ui });
        }
        const layout = index_1.default.getLayoutBlock(Object.assign(Object.assign({ position, top: Posts.getSelfTop({ app, ui }), width: Posts.getWidth({ app, ui }), minWidth: Posts.getMinWidth({ app, ui }), height: Posts.getSelfHeight({ app, ui }), minHeight: Posts.getSelfMinHeight({ app, ui }), maxHeight: "auto", margin: Posts.getMargin({ app, ui }), padding: Posts.getPadding({ app, ui }), background, overflowScrolling: "touch", WebkitOverflowScrolling: "touch", overflowX,
            overflowY }, borders), { zIndex }));
        const content = {};
        const animation = index_1.default.getAnimationBase({});
        return index_1.default.get({ layout, content, animation });
    }
    static getOl({ app, ui }) {
        let width = "100%";
        let margin = "0";
        let borderRight = "0";
        let borderLeft = "0";
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            width = Posts.getOlWidth({ app, ui });
            margin = "0px 0px 0px 5%";
            borderRight = Container_1.default.border;
            borderLeft = Container_1.default.border;
        }
        const layout = index_1.default.getLayoutBlock({
            width,
            margin,
            height: `calc( 100% - ${Main_1.default.headerHeight}px )`,
            minHeight: "inherit",
            borderRight,
            borderLeft
        });
        const content = {};
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getMore({ app, ui }) {
        const background = ui.isBubblePost ? Container_1.default.themeRGBA : Container_1.default.reliefRGBA;
        const margin = ui.isBubblePost ? "15px auto" : "10px auto";
        const layout = index_1.default.getLayoutFlex({
            width: "50%",
            height: Container_1.default.notifHeight,
            margin,
            alignItems: "center",
            justifyContent: "center",
            zIndex: "10",
            background,
            borderRadius: "20px"
        });
        const content = index_1.default.getContentBase({
            lineHeight: 2,
            fontSize: "12px",
            color: Container_1.default.whiteRGB,
            cursor: "pointer"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = Posts;
//# sourceMappingURL=Posts.js.map