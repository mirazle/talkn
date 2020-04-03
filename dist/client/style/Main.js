"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
const Footer_1 = __importDefault(require("./Footer"));
const Ui_1 = __importDefault(require("api/store/Ui"));
class Main {
    constructor(params) {
        const self = Main.getSelf(params);
        const notif = {};
        return {
            self,
            notif
        };
    }
    static get selfHeight() {
        return "100%";
    }
    static get closeHeight() {
        return 45;
    }
    static getOpenHeight({ app, ui }, called) {
        switch (ui.extensionMode) {
            case Ui_1.default.extensionModeExtModalLabel:
            case Ui_1.default.extensionModeExtBottomLabel:
                return 450;
            default:
                return window.innerHeight;
        }
    }
    static get headerHeight() {
        return 45;
    }
    static get notifOpenTranslate() {
        return 20;
    }
    static get notifHeight() {
        return 20;
    }
    static get widthRatio() {
        return 0.94;
    }
    static getWidth({ app, ui }, addUnit = false) {
        const width = "100%";
        return addUnit ? index_1.default.trimUnit(width) : width;
    }
    static getSelfHeightPx({ app, ui }) {
        return `calc( 100vh - ${Footer_1.default.selfHeight}px )`;
    }
    static getSelfRight({ bootOption, app, ui }, widthPx, addUnit = false) {
        let right = "0px";
        return addUnit ? index_1.default.trimUnit(right) : right;
    }
    static getSelfOpenTranslateY() {
        return -Footer_1.default.selfHeight + "px";
    }
    static getSelfCloseTranslateY() {
        return Main.getSelfHeightPx({});
    }
    static getSelf(params) {
        const { app, ui, bootOption } = params;
        const widthPx = Main.getWidth(app);
        const heightPx = Main.getSelfHeightPx(params);
        const right = Main.getSelfRight(params, widthPx);
        const translateY = Main.getSelfOpenTranslateY();
        const layout = index_1.default.getLayoutBlock({
            position: "absolute",
            width: widthPx,
            height: heightPx,
            right: right,
            bottom: 0,
            overflow: "visible",
            borderBottom: "none",
            margin: "0 auto",
            zIndex: Container_1.default.maxZIndex
        });
        const content = index_1.default.getContentBase({
            textAlign: "left"
        });
        const animation = index_1.default.getAnimationBase({
            transform: `translate3d(0px, ${translateY}, 0px)`,
            transition: Container_1.default.getTransition({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = Main;
//# sourceMappingURL=Main.js.map