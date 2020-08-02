"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("client/store/Ui"));
const index_1 = __importDefault(require("./index"));
const DetailRight_1 = __importDefault(require("./DetailRight"));
const Menu_1 = __importDefault(require("./Menu"));
const TimeMarker_1 = __importDefault(require("./TimeMarker"));
class Container {
    constructor(params) {
        const self = Container.getSelf(params);
        const multistreamIconWrap = Container.getMultistreamIconWrap(params);
        const newPost = Container.getNewPost(params);
        const hideScreenBottom = Container.getHideScreenBottom(params);
        const linkLabel = Container.getLinkLabel(params);
        return {
            self,
            multistreamIconWrap,
            newPost,
            hideScreenBottom,
            linkLabel,
        };
    }
    static get width() {
        return "100%";
    }
    static get widthRatio() {
        return 0.94;
    }
    static get radius() {
        return "10px";
    }
    static get radiuses() {
        return `${Container.radius} ${Container.radius} 0px 0px`;
    }
    static get openHeight() {
        return 360;
    }
    static get closeHeight() {
        return 360;
    }
    static get threadHeight() {
        return 360;
    }
    static get maxZIndex() {
        return 2147483647;
    }
    static get closeBottom() {
        return 0;
    }
    static get merginRatio() {
        return 0.034;
    }
    static get borderRGB() {
        return index_1.default.mono240RGB;
    }
    static get border() {
        return `0px solid ${Container.borderRGB}`;
    }
    static get lineShadow() {
        return `0px 0px 1px ${Container.lineShadowColor}`;
    }
    static get lineInsetShadow() {
        return `0px 0px 1px ${Container.lineShadowColor} inset`;
    }
    static get lineShadowColor() {
        return Container.downreliefRGB;
    }
    static get shadow() {
        return `${index_1.default.mono230RGB} 0px 0px 5px 0px`;
    }
    static get darkLightRGB() {
        return index_1.default.darkLightRGB;
    }
    static get darkLightRGBA() {
        return index_1.default.darkLightRGBA;
    }
    static get darkRGB() {
        return index_1.default.darkRGB;
    }
    static get darkRGBA() {
        return index_1.default.darkRGBA;
    }
    static get downreliefRGB() {
        return index_1.default.mono160RGB;
    }
    static get reliefRGB() {
        return index_1.default.mono180RGB;
    }
    static get reliefRGBA() {
        return index_1.default.mono180RGBA;
    }
    static get silverRGB() {
        return index_1.default.mono192RGB;
    }
    static get silverRGBA() {
        return index_1.default.mono192RGBA;
    }
    static get lightGrayRGB() {
        return index_1.default.mono211RGB;
    }
    static get lightGrayRGBA() {
        return index_1.default.mono211RGBA;
    }
    static get chromeOffTabRGB() {
        return index_1.default.mono225RGB;
    }
    static get chromeOffTabRGBA() {
        return index_1.default.mono225RGBA;
    }
    static get softCalmRGB() {
        return index_1.default.mono230RGB;
    }
    static get softCalmRGBA() {
        return index_1.default.mono230RGBA;
    }
    static get middleCalmRGBA() {
        return index_1.default.mono235RGBA;
    }
    static get calmRGB() {
        return index_1.default.mono240RGB;
    }
    static get calmRGBA() {
        return index_1.default.mono240RGBA;
    }
    static get lightRGB() {
        return index_1.default.mono245RGB;
    }
    static get lightRGBA() {
        return index_1.default.mono245RGBA;
    }
    static get offWhiteRGB() {
        return index_1.default.mono250RGB;
    }
    static get offWhiteRGBA() {
        return index_1.default.mono250RGBA;
    }
    static get offWhitePlusRGB() {
        return index_1.default.mono252RGB;
    }
    static get offWhitePlusRGBA() {
        return index_1.default.mono252RGBA;
    }
    static get whiteRGB() {
        return index_1.default.mono255RGB;
    }
    static get whiteRGBA() {
        return index_1.default.mono255RGBA;
    }
    static get fontBaseRGB() {
        return index_1.default.fontBaseRGB;
    }
    static get themeRGBString() {
        return "79, 174, 159";
    }
    static get themeLightRGBString() {
        return "89, 184, 169";
    }
    static get themeRGB() {
        return `rgb(${Container.themeRGBString})`;
    }
    static get themeRGBA() {
        return `rgba(${Container.themeRGBString}, 0.96)`;
    }
    static get themeRGBAA() {
        return `rgba(${Container.themeRGBString}, 0.8)`;
    }
    static getBlockSize({ app, ui }) {
        return ui.screenMode === Ui_1.default.screenModeSmallLabel ? 45 : 54;
    }
    static getFaviconSize({ app, ui }) {
        return ui.screenMode === Ui_1.default.screenModeSmallLabel ? 24 : 30;
    }
    static getLightThemeRGBA(alpha = 0.8) {
        return `rgba(${Container.themeLightRGBString}, ${alpha})`;
    }
    static getThemeRGBA(alpha = 0.8) {
        return `rgba(${Container.themeRGBString}, ${alpha})`;
    }
    static getTransitionOn({ app, ui } = {}, removeUnit = false) {
        let transition = String(Container.transitionOn);
        if (app) {
            transition = ui.isTransition ? `${Container.transitionOn}ms` : `${Container.transitionOff}ms`;
        }
        else {
            transition = `${Container.transitionOn}ms`;
        }
        return removeUnit ? index_1.default.trimUnit(transition) : transition;
    }
    static getTransition({ app, ui } = {}, addUnit = false) {
        const transition = ui.isTransition ? `${Container.transitionOn}ms` : `${Container.transitionOff}ms`;
        return addUnit ? index_1.default.trimUnit(transition) : transition;
    }
    static getTransitionFirstOn({ app, ui }, addUnit = false) {
        const transition = ui.isTransition ? `${Container.transitionFirstOn}ms` : `${Container.transitionOff}ms`;
        return addUnit ? index_1.default.trimUnit(transition) : transition;
    }
    static get transitionOn() {
        return 600;
    }
    static get transitionNotif() {
        return 300;
    }
    static get transitionNotifDisp() {
        return 3000;
    }
    static get transitionFirstOn() {
        return 300;
    }
    static get transitionOff() {
        return 0;
    }
    static get notifHeight() {
        return 20;
    }
    static get notifOpenTranslate() {
        return 20;
    }
    static get notifOpenTranslateY() {
        return `translate3d( 0px, -80px, 0px )`;
    }
    static get notifCloseTranslateY() {
        return `translate3d( 0px, 0px, 0px )`;
    }
    static getNotifTranslateY({ app, ui }) {
        return ui.isOpenNewPost ? Container.notifOpenTranslateY : Container.notifCloseTranslateY;
    }
    static getNewPostDisplay({ app, ui }) {
        return ui.isOpenNotif ? "none" : "flex";
    }
    static getWidthPx({ bootOption, app, ui }) {
        if (bootOption) {
            return bootOption.width ? bootOption.width : Container.width;
        }
        else {
            return ui.width;
        }
    }
    static getRightPx({ app }, widthPx) {
        return "0%";
    }
    static get multistreamWrapDefaultTop() {
        return 5;
    }
    static getFontSize({ app, ui }) {
        return ui.screenMode === Ui_1.default.screenModeSmallLabel ? 14 : 15;
    }
    static getLetterSpacing({ app, ui }) {
        return ui.screenMode === Ui_1.default.screenModeSmallLabel ? 1.5 : 2;
    }
    static getSelf({ app, ui, bootOption, type }) {
        let borderRadius = "0px";
        if (ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
            borderRadius = "3px";
        }
        const layout = index_1.default.getLayoutBlock({
            display: "initial",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius,
            opacity: 1,
        });
        const content = index_1.default.getContentBase({
            fontSize: `${Container.getFontSize({ app, ui })}px`,
            lineHeight: `${Container.getFontSize({ app, ui })}px`,
            letterSpacing: `${Container.getLetterSpacing({ app, ui })}px`,
        });
        const animation = index_1.default.getAnimationBase({
            transition: `${Container.transitionFirstOn}ms`,
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getMultistreamIconWrapTop({ app, ui }) {
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            return Container.getBlockSize({ app, ui }) + Container.multistreamWrapDefaultTop + "px";
        }
        else if (ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
            return Container.getBlockSize({ app, ui }) + Container.multistreamWrapDefaultTop + "px";
        }
        else {
            return Container.getBlockSize({ app, ui }) + Container.multistreamWrapDefaultTop + "px";
        }
    }
    static getMultistreamIconWrapRight({ app, ui }) {
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                return "5%";
            case Ui_1.default.screenModeMiddleLabel:
                return "20px";
            case Ui_1.default.screenModeLargeLabel:
                return `calc( ${DetailRight_1.default.getWidth({ app, ui })} + 20px)`;
        }
    }
    static getMultistreamIconWrap({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "30px",
            height: "30px",
            margin: "0 auto",
            background: "rgba(255, 255, 255, 0.8)",
        });
        const content = index_1.default.getContentBase({
            color: "rgb(255,255,255)",
            textAlign: "center",
            lineHeight: 2,
            cursor: "pointer",
        });
        const animation = index_1.default.getAnimationBase({
            transition: Container.transitionOff,
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getNewPost({ app, ui }) {
        let display = Container.getNewPostDisplay({ app, ui });
        const styles = TimeMarker_1.default.getFixTimeMarker({ app, ui });
        delete styles.top;
        return {
            ...styles,
            display,
            zIndex: "1",
            margin: "0px auto",
            fontSize: "0.7em",
            bottom: `-${Container.notifHeight}px`,
            transition: Container.getTransition({ app, ui }),
        };
    }
    static getHideScreenBottom({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            position: "fixed",
            top: `100vh`,
            width: "100vw",
            height: "100vh",
            background: Container.reliefRGB,
            zIndex: Container.maxZIndex,
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase({});
        return index_1.default.get({ layout, content, animation });
    }
    static getLinkLabel({ app, ui }) {
        const top = Container.getBlockSize({ app, ui }) + "px";
        const left = ui.screenMode === Ui_1.default.screenModeSmallLabel ? "0px" : `${Menu_1.default.getWidth({ app, ui })}`;
        const layout = index_1.default.getLayoutFlex({
            maxWidth: "180px",
            position: "fixed",
            top,
            left,
            height: "20px",
            padding: "5px 10px",
            alignItems: "center",
            justifyContent: "flex-start",
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: "1",
            borderRadius: "0px 0px 2px 0px",
        });
        const content = index_1.default.getContentBase({
            lineHeight: 2,
            whiteSpace: "nowrap",
            color: Container.whiteRGB,
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = Container;
//# sourceMappingURL=Container.js.map