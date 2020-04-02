"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
const Header_1 = __importDefault(require("./Header"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const Main_1 = __importDefault(require("./Main"));
class Menu {
    constructor(params) {
        const self = Menu.getSelf(params);
        const wrapComponent = Menu.getWrapComponent(params);
        const footer = Menu.getFooter(params);
        const footerChild = Menu.getFooterChild(params);
        const footerChildMoney = Menu.getFooterChildMoney(params);
        return {
            self,
            wrapComponent,
            footer,
            footerChild,
            footerChildMoney
        };
    }
    static get baseWidth() {
        return "300px";
    }
    static getWidth({ app, ui }, addUnit = false) {
        let width = "0";
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                width = "100.0%";
                break;
            case Ui_1.default.screenModeMiddleLabel:
                width = Menu.baseWidth;
                break;
            case Ui_1.default.screenModeLargeLabel:
                width = Menu.baseWidth;
                break;
        }
        return addUnit ? index_1.default.trimUnit(width) : width;
    }
    static getTransform({ app, ui }) {
        let transform = "translate3d( 0px, 0px, 0px )";
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                transform = ui.isOpenMenu ? "translate3d( 0%, 0%, 0px )" : "translate3d( -100% , 0%, 0px )";
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
        const display = "block";
        const background = ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel ? "none" : Container_1.default.reliefRGB;
        const layout = index_1.default.getLayoutBlock({
            display,
            position: "fixed",
            top: "0px",
            left: "0px",
            width: Menu.getWidth({ app, ui }),
            minWidth: Menu.getWidth({ app, ui }),
            height: "100%",
            minHeight: "auto",
            maHeight: "auto",
            margin: `${Header_1.default.headerHeight}px 0px 0px 0px`,
            background,
            WebkitOverflowScrolling: "touch",
            overflow: "hidden"
        });
        const content = {};
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui }),
            transform: Menu.getTransform({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getWrapComponent({ app, ui }) {
        const width = ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel ? "90%" : "100%";
        const borders = {};
        const layout = index_1.default.getLayoutBlock(Object.assign({ width, minWidth: "inherit", maxWidth: "inherit", height: `calc( 100% - ${Main_1.default.headerHeight * 2}px )`, margin: "0 auto" }, borders));
        const content = {};
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getWrap({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: "initial",
            height: "60px",
            minWidth: "initial",
            minHeight: "initial",
            borderRight: Container_1.default.border
        });
        const content = index_1.default.getContentBase({
            textAlign: "left"
        });
        const animation = index_1.default.getAnimationBase({});
        return index_1.default.get({ layout, content, animation });
    }
    static getFooter({ app, ui }) {
        const borders = ui.screenMode === Ui_1.default.screenModeSmallLabel ? { border: Container_1.default.border } : { border: Container_1.default.border };
        const layout = index_1.default.getLayoutFlex(Object.assign({ width: "100%", background: Container_1.default.offWhiteRGB, height: `${Main_1.default.headerHeight}px` }, borders));
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getFooterChild({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            flexGrow: 1,
            height: "100%"
        });
        const content = index_1.default.getContentBase({
            fontSize: "0.5em"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getFooterChildMoney({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            flexGrow: 1,
            height: "100%"
        });
        const content = index_1.default.getContentBase({
            fontSize: "0.5em"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = Menu;
//# sourceMappingURL=Menu.js.map