"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("api/store/Ui"));
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
class ExtScreen {
    constructor(params) {
        const self = ExtScreen.getSelf(params);
        return {
            self
        };
    }
    static getTop({ app, ui }) {
        return ui.extensionMode === Ui_1.default.extensionModeExtModalLabel ? "0%" : "100%";
    }
    static getSelfTransform({ app, ui }, call = "") {
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            return ui.isDispPosts ? "translate3d(0px, -100%, 0px)" : `translate3d(0px, 0%, 0px)`;
        }
        else {
            return "translate3d(0px, 0px, 0px)";
        }
    }
    static getSelfTransition({ app, ui }) {
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            return ui.isDispPosts ? `${Container_1.default.transitionOn}ms` : `${Container_1.default.transitionOn}ms`;
        }
        else {
            return "0ms";
        }
    }
    static getSelf({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            position: "fixed",
            top: ExtScreen.getTop({ app, ui }),
            justifyContent: "flex-start",
            alignItems: "flex-start",
            height: "100%"
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase({
            transform: ExtScreen.getSelfTransform({ app, ui }),
            transition: ExtScreen.getSelfTransition({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = ExtScreen;
//# sourceMappingURL=ExtScreen.js.map