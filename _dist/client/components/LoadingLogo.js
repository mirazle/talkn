"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const Style_1 = __importDefault(require("client/components/Style"));
const conf_1 = __importDefault(require("common/conf"));
class LoadingLogo extends TalknComponent_1.default {
    render() {
        const ch = location.href
            .replace("https:/", "")
            .replace("http:/", "")
            .replace("/localhost:8080", "")
            .replace("/localhost", "")
            .replace("/talkn.io", "");
        return (react_1.default.createElement("div", { className: "LogoScreen" },
            react_1.default.createElement(Style_1.default, Object.assign({}, this.props)),
            react_1.default.createElement("div", { className: "LogoWrap1" }),
            react_1.default.createElement("img", { className: "Logo", src: `//${conf_1.default.assetsImgPath}/talkn_logo2.svg` })));
    }
}
exports.default = LoadingLogo;
//# sourceMappingURL=LoadingLogo.js.map