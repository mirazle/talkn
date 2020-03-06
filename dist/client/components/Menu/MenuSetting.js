"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
class MenuSetting extends TalknComponent_1.default {
    render() {
        return (react_1.default.createElement("ol", { "data-component-name": "MenuSetting" },
            react_1.default.createElement("li", null, "menu SETTING")));
    }
}
exports.default = MenuSetting;
//# sourceMappingURL=MenuSetting.js.map