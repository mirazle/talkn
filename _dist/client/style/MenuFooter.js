"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("api/store/Ui"));
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
const Main_1 = __importDefault(require("./Main"));
const Menu_1 = __importDefault(require("./Menu"));
class MenuFooter {
    constructor(params) {
        const self = MenuFooter.getSelf(params);
        const child = MenuFooter.getChild(params);
        const childIndex = MenuFooter.getChildIndex(params);
        return {
            self,
            child,
            childIndex
        };
    }
    static getWidth({ app, ui }, addUnit = false) {
        let width = "0";
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            width = "50%";
        }
        else {
            switch (ui.screenMode) {
                case Ui_1.default.screenModeSmallLabel:
                    width = "100%";
                    break;
                case Ui_1.default.screenModeMiddleLabel:
                    width = Menu_1.default.baseWidth;
                    break;
                case Ui_1.default.screenModeLargeLabel:
                    width = Menu_1.default.baseWidth;
                    break;
            }
        }
        return addUnit ? index_1.default.trimUnit(width) : width;
    }
    static getSelf({ app, ui }) {
        const borders = ui.screenMode === Ui_1.default.screenModeSmallLabel ? { border: Container_1.default.border } : { border: Container_1.default.border };
        const borderRadius = ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel ? Container_1.default.radiuses : "0px";
        const layout = index_1.default.getLayoutFlex(Object.assign({ width: MenuFooter.getWidth({ app, ui }), minWidth: MenuFooter.getWidth({ app, ui }), height: `${Main_1.default.headerHeight}px`, background: Container_1.default.offWhiteRGB, borderRadius }, borders));
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getChild({ app, ui }) {
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
    static getChildIndex({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            flexGrow: 1,
            height: "100%"
        });
        const content = index_1.default.getContentBase({
            fontSize: "0.5em",
            fontWeight: "bold"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = MenuFooter;
//# sourceMappingURL=MenuFooter.js.map