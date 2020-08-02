"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("api/store/App"));
const Ui_1 = __importDefault(require("client/store/Ui"));
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
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
            more,
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
        let borders = { borderTop: "0", borderRight: "0", borderBottom: "0", borderLeft: "0" };
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                borders.borderRight = Container_1.default.border;
                borders.borderLeft = Container_1.default.border;
                break;
            case Ui_1.default.screenModeMiddleLabel:
                borders.borderRight = Container_1.default.border;
                break;
            case Ui_1.default.screenModeLargeLabel:
                break;
        }
        return borders;
    }
    static getMargin({ app, ui }, addUnit = false) {
        let margin = "0";
        if (ui.extensionMode === Ui_1.default.extensionModeExtNoneLabel) {
            switch (ui.screenMode) {
                case Ui_1.default.screenModeSmallLabel:
                    margin = `0`;
                    break;
                case Ui_1.default.screenModeMiddleLabel:
                case Ui_1.default.screenModeLargeLabel:
                    margin = `0 0 0 ${Menu_1.default.getWidth({ app, ui })}`;
                    break;
            }
        }
        else {
            switch (ui.screenMode) {
                case Ui_1.default.screenModeSmallLabel:
                    margin = `0`;
                    break;
                case Ui_1.default.screenModeMiddleLabel:
                case Ui_1.default.screenModeLargeLabel:
                    margin = `0 0 0 ${Menu_1.default.getWidth({ app, ui })}`;
                    break;
            }
        }
        return margin;
    }
    static getPadding({ app, ui }) {
        const blockSize = Container_1.default.getBlockSize({ app, ui });
        let padding = "0";
        if (app.isMediaCh) {
            padding = `${blockSize}px 0 ${blockSize}px 0`;
        }
        else {
            if (ui.extensionMode === Ui_1.default.extensionModeExtNoneLabel) {
                switch (ui.screenMode) {
                    case Ui_1.default.screenModeSmallLabel:
                        padding = `${blockSize}px 0 ${blockSize}px 0`;
                        break;
                    case Ui_1.default.screenModeMiddleLabel:
                        padding = `${blockSize}px 0 ${blockSize}px 0`;
                        break;
                    case Ui_1.default.screenModeLargeLabel:
                        padding = `${blockSize}px 0 ${blockSize}px 0`;
                        break;
                }
            }
            else {
                switch (ui.screenMode) {
                    case Ui_1.default.screenModeSmallLabel:
                        padding = `${blockSize}px 0 ${blockSize}px 0`;
                        break;
                    case Ui_1.default.screenModeMiddleLabel:
                    case Ui_1.default.screenModeLargeLabel:
                        padding = `${blockSize}px 0 ${blockSize}px 0`;
                        break;
                }
            }
        }
        return padding;
    }
    static getSelfTransform({ app, ui }) {
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            return ui.isDispPosts
                ? "translate3d(0px, 0px, 0px)"
                : `translate3d(0px, calc( 100% + ${Container_1.default.getBlockSize({ app, ui })}px ), 0px)`;
        }
        else {
            return "translate3d(0px, 0px, 0px)";
        }
    }
    static getSelfHeight({ app, ui }) {
        if (ui.screenMode === Ui_1.default.screenModeLargeLabel) {
            if (app.chType === App_1.default.mediaTagTypeVideo) {
                return `calc( 100% - ${Container_1.default.getBlockSize({ app, ui }) + Container_1.default.getBlockSize({ app, ui }) + Video_1.default.height}px )`;
            }
            else {
                return `100vh`;
            }
        }
        else {
            return "auto";
        }
    }
    static getSelfMinHeight({ app, ui }) {
        if (app.chType === App_1.default.mediaTagTypeVideo) {
            return `calc( 100% - ${Video_1.default.height + Container_1.default.getBlockSize({ app, ui }) + Container_1.default.getBlockSize({ app, ui })}px)`;
        }
        else {
            if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel || ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
                return `calc( 100% - ${Container_1.default.getBlockSize({ app, ui }) + Container_1.default.getBlockSize({ app, ui })}px )`;
            }
            else {
                if (ui.screenMode === Ui_1.default.screenModeLargeLabel) {
                    return `calc( 100% - ${Container_1.default.getBlockSize({ app, ui }) + Container_1.default.getBlockSize({ app, ui })}px )`;
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
                return `${Container_1.default.getBlockSize({ app, ui }) + Video_1.default.height}px`;
            }
        }
        return "0";
    }
    static getSelfLeft({ app, ui }) {
        return "0";
    }
    static getSelfBoxShadow({ app, ui }) {
        let boxShadow = "0px 0px 0px rgba(255,255,255)";
        if (ui.extensionMode === Ui_1.default.extensionModeExtNoneLabel) {
            return boxShadow;
        }
        else {
            switch (ui.screenMode) {
                case Ui_1.default.screenModeSmallLabel:
                    return Container_1.default.lineInsetShadow;
                case Ui_1.default.screenModeMiddleLabel:
                case Ui_1.default.screenModeLargeLabel:
                    return boxShadow;
            }
        }
        return boxShadow;
    }
    static getSelf({ app, ui }) {
        let position = "absolute";
        let overflowX = "hidden";
        let overflowY = "hidden";
        let borders = Posts.getBorders({ app, ui });
        let background = Container_1.default.whiteRGBA;
        const boxShadow = Posts.getSelfBoxShadow({ app, ui });
        if (ui.screenMode === Ui_1.default.screenModeLargeLabel) {
            position = "fixed";
            overflowX = "hidden";
            overflowY = "scroll";
        }
        const layout = index_1.default.getLayoutBlock({
            position: "absolute",
            top: Posts.getSelfTop({ app, ui }),
            left: Posts.getSelfLeft({ app, ui }),
            width: Posts.getWidth({ app, ui }),
            minWidth: Posts.getMinWidth({ app, ui }),
            height: Posts.getSelfHeight({ app, ui }),
            minHeight: "100vh",
            maxHeight: "auto",
            margin: Posts.getMargin({ app, ui }),
            padding: Posts.getPadding({ app, ui }),
            background,
            overflowScrolling: "touch",
            WebkitOverflowScrolling: "touch",
            boxShadow,
            overflowX,
            overflowY,
            ...borders,
        });
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
            height: `100vh`,
            borderRight,
            borderLeft,
        });
        const content = {};
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui }),
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
            borderRadius: "20px",
        });
        const content = index_1.default.getContentBase({
            color: Container_1.default.whiteRGB,
            cursor: "pointer",
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = Posts;
//# sourceMappingURL=Posts.js.map