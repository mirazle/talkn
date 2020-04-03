"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
const Header_1 = __importDefault(require("./Header"));
const Posts_1 = __importDefault(require("./Posts"));
class InnerNotif {
    constructor(params) {
        const self = InnerNotif.getSelf(params);
        return {
            self
        };
    }
    static get selfHeight() {
        return Header_1.default.headerHeight;
    }
    static getSelf({ app, ui }) {
        const width = Posts_1.default.getOlWidth({ app, ui }, true);
        const marginOne = (100 - width) / 2;
        const height = app.isOpenInnerNotif ? Header_1.default.headerHeight : 0;
        const layout = index_1.default.getLayoutFlex({
            position: "fixed",
            top: Header_1.default.headerHeight + "px",
            alignItems: "center",
            justifyContent: "center",
            width: `calc( ${width}% - 2px )`,
            margin: `0px calc( ${marginOne}% + 1px ) 0px calc( ${marginOne}% + 1px )`,
            height,
            background: Container_1.default.themeRGBA
        });
        const content = index_1.default.getContentBase({
            color: Container_1.default.whiteRGB
        });
        const animation = index_1.default.getAnimationBase({
            transition: `${Container_1.default.transitionNotif}ms`
        });
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = InnerNotif;
//# sourceMappingURL=InnerNotif.js.map