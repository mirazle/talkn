"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
const Posts_1 = __importDefault(require("./Posts"));
class InnerNotif {
    constructor(params) {
        const self = InnerNotif.getSelf(params);
        return {
            self,
        };
    }
    static getSelf({ app, ui }) {
        const width = Posts_1.default.getOlWidth({ app, ui }, true);
        const marginOne = (100 - width) / 2;
        const height = app.isOpenInnerNotif ? Container_1.default.getBlockSize({ app, ui }) : 0;
        const layout = index_1.default.getLayoutFlex({
            position: "fixed",
            top: Container_1.default.getBlockSize({ app, ui }) + "px",
            alignItems: "center",
            justifyContent: "center",
            width: `calc( ${width}% - 2px )`,
            margin: `0px calc( ${marginOne}% + 1px ) 0px calc( ${marginOne}% + 1px )`,
            height,
            background: Container_1.default.themeRGBA,
            zIndex: 20,
        });
        const content = index_1.default.getContentBase({
            color: Container_1.default.whiteRGB,
        });
        const animation = index_1.default.getAnimationBase({
            transition: `${Container_1.default.transitionNotif}ms`,
        });
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = InnerNotif;
//# sourceMappingURL=InnerNotif.js.map