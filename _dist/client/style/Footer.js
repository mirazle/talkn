"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("api/store/Ui"));
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
const Detail_1 = __importDefault(require("./Detail"));
const Menu_1 = __importDefault(require("./Menu"));
class Footer {
    constructor(params) {
        const self = Footer.getSelf(params);
        return {
            self
        };
    }
    static get selfHeight() {
        return 45;
    }
    static getWidth({ app, ui }, addUnit = false) {
        let width = "0";
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                width = "200%";
                break;
            case Ui_1.default.screenModeMiddleLabel:
                width = app.isOpenDetail
                    ? `calc( 100% + ${Menu_1.default.getWidth({ app, ui })} )`
                    : `calc( 100% + ${Detail_1.default.getWidth({ app, ui })} )`;
                break;
            case Ui_1.default.screenModeLargeLabel:
                width = `100%`;
                break;
        }
        return addUnit ? index_1.default.trimUnit(width) : width;
    }
    static getLeft({ app, ui }, addUnit = false) {
        let left = "0";
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                left = "0px";
                break;
            case Ui_1.default.screenModeMiddleLabel:
                left = "0px";
                break;
            case Ui_1.default.screenModeLargeLabel:
                left = "0px";
                break;
        }
        return addUnit ? index_1.default.trimUnit(left) : left;
    }
    static getTransform({ app, ui }) {
        let transform = "translate3d( 0px, 0px, 0px )";
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            transform = ui.isOpenMenu ? "translate3d( 0%, 0px, 0px )" : "translate3d( -50%, 0px, 0px )";
        }
        else {
            switch (ui.screenMode) {
                case Ui_1.default.screenModeSmallLabel:
                    transform = ui.isOpenMenu ? "translate3d( 100%, 0px, 0px )" : "translate3d( 0px, 0px, 0px )";
                    break;
                case Ui_1.default.screenModeMiddleLabel:
                    transform = ui.isOpenDetail ? `translate3d( -${Menu_1.default.baseWidth}, 0px, 0px )` : "translate3d( 0px ,0px, 0px )";
                    break;
                case Ui_1.default.screenModeLargeLabel:
                    transform = "translate3d( 0px ,0px, 0px )";
                    break;
            }
        }
        return transform;
    }
    static getBorders({ app, ui }) {
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            return { border: 0 };
        }
        else {
            return ui.screenMode === Ui_1.default.screenModeSmallLabel
                ? { border: Container_1.default.border }
                : { borderTop: Container_1.default.border, borderBottom: Container_1.default.border };
        }
    }
    static getSelf({ app, ui }) {
        const borders = Footer.getBorders({ app, ui });
        const borderRadius = ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel ? Container_1.default.radiuses : "0px";
        const layout = index_1.default.getLayoutFlex(Object.assign({ position: "fixed", bottom: "0px", left: Footer.getLeft({ app, ui }), height: Footer.selfHeight, width: Footer.getWidth({ app, ui }), zIndex: Container_1.default.maxZIndex, borderRadius, justifyContent: "flex-start" }, borders));
        const content = {};
        const animation = index_1.default.getAnimationBase({
            transform: Footer.getTransform({ app, ui }),
            transition: Container_1.default.getTransition({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = Footer;
//# sourceMappingURL=Footer.js.map