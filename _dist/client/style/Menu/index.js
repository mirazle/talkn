"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = __importDefault(require("common/conf"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const index_1 = __importDefault(require("../index"));
const Container_1 = __importDefault(require("../Container"));
const Main_1 = __importDefault(require("../Main"));
class MenuIndex {
    constructor(params) {
        const self = MenuIndex.getSelf(params);
        const header = MenuIndex.getHeader(params);
        const headerSearchIcon = MenuIndex.getHeaderSearchIcon(params);
        const headerInput = MenuIndex.getHeaderInput(params);
        const headerFindSelect = MenuIndex.getHeaderFindSelect(params);
        const headerUpdateIcon = MenuIndex.getHeaderUpdateIcon(params);
        const ol = MenuIndex.getOl(params);
        return {
            self,
            header,
            headerSearchIcon,
            headerInput,
            headerFindSelect,
            headerUpdateIcon,
            ol,
            headerCh: {}
        };
    }
    static get iconSize() {
        return "25px";
    }
    static get liHeight() {
        return 90;
    }
    static getSelf({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "100%",
            height: "100%",
            margin: "0 auto"
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase({});
        return index_1.default.get({ layout, content, animation });
    }
    static getHeader({ app, ui }) {
        const borders = ui.screenMode === Ui_1.default.screenModeSmallLabel
            ? { borderBottom: Container_1.default.border, borderLeft: 0 }
            : {
                borderBottom: Container_1.default.border,
                borderLeft: 0,
                borderRight: Container_1.default.border
            };
        const layout = index_1.default.getLayoutFlex(Object.assign(Object.assign({ width: "100%", height: `${MenuIndex.liHeight / 2}px` }, borders), { background: Container_1.default.lightRGB }));
        const content = index_1.default.getContentBase({
            textAlign: "left"
        });
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getHeaderSearchIcon({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            justifyContent: "center",
            alignItems: "center",
            width: "72px",
            height: "45px"
        });
        const content = index_1.default.getContentBase({
            fontSize: "13px",
            color: Container_1.default.reliefRGBA,
            fontWeight: "bold"
        });
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getHeaderInput({ app, ui }) {
        const layout = index_1.default.getLayoutInlineBlock({
            width: "calc( 100% - 120px )",
            height: "25px",
            padding: "0px 0px 1px 10px",
            background: Container_1.default.whiteRGB,
            outline: "none",
            resize: "none",
            border: Container_1.default.border,
            borderRadius: "3px",
            WebkitAppearance: "none"
        });
        const content = index_1.default.getContentBase({
            whiteSpace: "nowrap",
            fontSize: "14px",
            lineHeight: "2",
            textAlign: "left"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getHeaderUpdateIcon({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: "70px",
            height: "50px",
            alignItems: "center",
            justifyContent: "flex-start"
        });
        const content = index_1.default.getContentBase({
            cursor: "pointer"
        });
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getHeaderFindSelect({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: "100%",
            height: "50px",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            WebkitAppearance: "none",
            padding: "10px"
        });
        const content = index_1.default.getContentBase({
            outline: 0,
            cursor: "pointer",
            fontSize: "14px"
        });
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getOl({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "100%",
            height: `calc( 100% - ${Main_1.default.headerHeight}px )`,
            overflowX: "hidden",
            overflowY: "scroll"
        });
        const content = {};
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getLiActive() {
        const layout = index_1.default.getLayoutBlock({
            position: "relative",
            width: "initial",
            height: `${MenuIndex.liHeight}px`,
            padding: "10px",
            borderBottom: Container_1.default.border,
            zIndex: 3,
            borderRight: `1px solid ${Container_1.default.whiteRGB}`,
            background: Container_1.default.whiteRGB
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getLiUnactive() {
        const layout = index_1.default.getLayoutBlock({
            position: "relative",
            width: "initial",
            height: `${MenuIndex.liHeight}px`,
            padding: "10px",
            borderBottom: Container_1.default.border,
            background: Container_1.default.offWhiteRGB,
            borderRight: Container_1.default.border
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpper() {
        const layout = index_1.default.getLayoutBlock({
            width: "100%",
            height: "20px"
        });
        const content = index_1.default.getContentBase({
            fontSize: "10px"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpperSpace() {
        const layout = index_1.default.getLayoutInlineBlock({
            width: "20%"
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpperRight() {
        const layout = index_1.default.getLayoutInlineBlock({
            width: "80%"
        });
        const content = index_1.default.getContentBase({
            textAlign: "left"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottom() {
        const layout = index_1.default.getLayoutBlock({
            width: "100%",
            height: "50px"
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottomIcon() {
        const layout = index_1.default.getLayoutInlineBlock({
            width: "20%",
            height: "50px",
            backgroundImage: `url(${conf_1.default.protcol}:${conf_1.default.assetsPath}favicon.ico")`,
            backgroundPosition: "50% 15%",
            backgroundSize: "20px 20px",
            backgroundRepeat: "no-repeat"
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottomPost() {
        const layout = index_1.default.getLayoutInlineBlock({
            width: "80%",
            flexGrow: 2
        });
        const content = index_1.default.getContentBase({
            lineHeight: 2,
            textAlign: "left"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = MenuIndex;
//# sourceMappingURL=index.js.map