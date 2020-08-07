"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("client/store/Ui"));
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
class Header {
    constructor(params) {
        const self = Header.getSelf(params);
        const headTab = Header.getHeadTab(params);
        const rightIcon = Header.getRightIcon(params);
        const leftIcon = Header.getLeftIcon(params);
        const userIcon = Header.getUserIcon(params);
        const userIconImg = Header.getUserIconImg(params);
        const liveCntWrap = Header.getLiveCntWrap(params);
        const childAnalyzeWrap = Header.getChildAnalyzeWrap(params);
        const childAnalyzeType = Header.getChildAnalyzeType(params);
        const childAnalyzeCnt = Header.getChildAnalyzeCnt(params);
        const childTalknLogo = Header.getChildTalknLogo(params);
        return {
            self,
            headTab,
            rightIcon,
            leftIcon,
            userIcon,
            userIconImg,
            liveCntWrap,
            childAnalyzeWrap,
            childAnalyzeType,
            childAnalyzeCnt,
            childTalknLogo,
        };
    }
    static get selfHeight() {
        return "100%";
    }
    static get notifHeight() {
        return 20;
    }
    static get notifOpenTranslate() {
        return 20;
    }
    static get widthRatio() {
        return 0.94;
    }
    static getNotifOpenTranslateY({ app, ui }) {
        return `translate3d( 0px, ${Container_1.default.getBlockSize({ app, ui })}px, 0px )`;
    }
    static get notifCloseTranslateY() {
        return `translate3d( 0px, 0px, 0px )`;
    }
    static getNotifTranslateY({ app, ui }) {
        return ui.isOpenNotif ? Header.getNotifOpenTranslateY({ app, ui }) : Header.notifCloseTranslateY;
    }
    static getMargin({ app, ui }) {
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            return "0px 5% 0px 5%";
        }
        else {
            return "0 auto";
        }
    }
    static getChildAnalyzeRight({ app, ui }) {
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                return "5%";
            case Ui_1.default.screenModeMiddleLabel:
                return "10%";
            case Ui_1.default.screenModeLargeLabel:
                return "15%";
        }
    }
    static getChildAnalyzePositions({ app, ui }) {
        const margin = ui.screenMode === Ui_1.default.screenModeSmallLabel ? "8px 0px 0px 0px" : "7px auto";
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel || ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
            return {
                position: "absolute",
                top: "0px",
                right: Header.getChildAnalyzeRight({ app, ui }),
                margin,
            };
        }
        else {
            return {
                position: "absolute",
                top: "0px",
                right: Header.getChildAnalyzeRight({ app, ui }),
                margin,
            };
        }
    }
    static getBorderRadius({ app, ui }, addUnit = false) {
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            return ui.extensionWidth === "100%" ? "0px" : `${Container_1.default.radius} ${Container_1.default.radius} 0px 0px`;
        }
        else if (ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
            return `${Container_1.default.radius} ${Container_1.default.radius} 0px 0px`;
        }
        return 0;
    }
    static getSelf({ app, ui }) {
        const width = ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel ? "90%" : "100%";
        const borderTop = ui.extensionMode === Ui_1.default.extensionModeExtNoneLabel ? 0 : Container_1.default.border;
        const borderRadius = Header.getBorderRadius({ app, ui });
        const boxShadow = ui.extensionMode === Ui_1.default.extensionModeExtNoneLabel ? Container_1.default.lineShadow : Container_1.default.lineInsetShadow;
        const layout = index_1.default.getLayoutFlex({
            position: "fixed",
            top: 0,
            left: 0,
            width,
            height: `${Container_1.default.getBlockSize({ app, ui })}px`,
            borderTop,
            borderRight: Container_1.default.border,
            borderBottom: Container_1.default.border,
            borderLeft: Container_1.default.border,
            borderRadius,
            background: Container_1.default.whiteRGB,
            margin: Header.getMargin({ app, ui }),
            zIndex: 1000,
            boxShadow,
        });
        const content = index_1.default.getContentBase({
            textAlign: "center",
        });
        const animation = index_1.default.getAnimationBase({
            transform: Header.getNotifTranslateY({ app, ui }),
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getUserIcon(params) {
        const layout = index_1.default.getLayoutBlock({
            flexGrow: 2,
            height: "auto",
        });
        const content = {};
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUserIconImg(params) {
        const layout = index_1.default.getLayoutInlineBlock({
            width: "30px",
            margin: "0px 10px 0px 0px",
        });
        const content = {};
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getLiveCntWrap(params) {
        const layout = index_1.default.getLayoutInlineBlock({
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "3px",
            left: "20%",
        });
        const content = {};
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getHeadTab({ app, ui }) {
        const width = ui.screenMode === Ui_1.default.screenModeSmallLabel ? "60%" : "40%";
        const layout = index_1.default.getLayoutFlex({
            justifyContent: "center",
            width,
            height: "100%",
        });
        const content = index_1.default.getContentBase({
            fontSize: "1.2em",
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getRightIcon({ app, ui }) {
        const width = ui.screenMode === Ui_1.default.screenModeSmallLabel ? "20%" : "30%";
        const layout = index_1.default.getLayoutBlock({
            flexFlow: "column",
            alignItems: "center",
            justifyContent: "center",
            width,
            height: "100%",
        });
        const content = {};
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getLeftIcon({ app, ui }) {
        const width = ui.screenMode === Ui_1.default.screenModeSmallLabel ? "20%" : "30%";
        const layout = index_1.default.getLayoutFlex({
            flexFlow: "column",
            alignItems: "center",
            justifyContent: "center",
            width,
            height: "100%",
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getChildAnalyzeWrap({ app, ui }) {
        const positions = Header.getChildAnalyzePositions({ app, ui });
        const layout = index_1.default.getLayoutFlex({
            ...positions,
            flexDirection: "column",
            width: "40px",
            height: "28px",
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getChildAnalyzeType({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            height: "14px",
            marginBottom: "4px",
        });
        const content = index_1.default.getContentBase({
            color: Container_1.default.themeRGBA,
            fontWeight: "bold",
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getChildAnalyzeCnt({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            height: "14px",
        });
        const content = index_1.default.getContentBase({
            color: Container_1.default.themeRGBA,
            fontWeight: "bold",
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getChildTalknLogo({ app, ui }) {
        const layout = index_1.default.getLayoutInlineBlock({
            position: "absolute",
            width: `${Container_1.default.getBlockSize({ app, ui })}px`,
            height: `${Container_1.default.getBlockSize({ app, ui })}px`,
        });
        const content = index_1.default.getContentBase({
            color: Container_1.default.themeRGBA,
            fontWeight: "bold",
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getNotif({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            position: "relative",
            top: `${Container_1.default.getBlockSize({ app, ui })}px`,
            width: "50%",
            height: Container_1.default.notifHeight,
            margin: "0 auto",
            zIndex: "10",
            background: "rgba(0, 0, 0, 0.4)",
            borderRadius: "20px",
        });
        const content = index_1.default.getContentBase({
            color: "rgb(255,255,255)",
            textAlign: "center",
            lineHeight: 2,
            cursor: "pointer",
        });
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui }),
        });
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = Header;
//# sourceMappingURL=Header.js.map