"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
class Loading {
    constructor(params) {
        const self = Loading.getSelf();
        return {
            self
        };
    }
    static getSelf() {
        const layout = index_1.default.getLayoutFlex({
            margin: "0 auto",
            height: "100vh",
            width: "10%"
        });
        const content = {};
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = Loading;
//# sourceMappingURL=Loading.js.map