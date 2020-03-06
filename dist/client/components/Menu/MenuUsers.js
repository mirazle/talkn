"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const Marquee_1 = __importDefault(require("client/container/util/Marquee"));
class MenuUsers extends TalknComponent_1.default {
    renderFriendLiLabel(name, icon, ch) {
        const { style } = this.props.clientState;
        const href = `/${ch}`;
        const label = ch ? (react_1.default.createElement("div", { style: style.menuUsers.namesAddCh },
            react_1.default.createElement(Marquee_1.default, { text: name, loop: true, hoverToStop: false, trailing: 0, leading: 0 }),
            react_1.default.createElement(Marquee_1.default, { text: ch, loop: true, hoverToStop: false, trailing: 0, leading: 0 }))) : (react_1.default.createElement("div", { style: style.menuUsers.names },
            react_1.default.createElement("br", null),
            name));
        return (react_1.default.createElement("a", { style: style.menuUsers.wrap, href: href, "data-li-a": true },
            react_1.default.createElement("div", { style: style.menuUsers.imgWrap },
                react_1.default.createElement("img", { style: style.menuUsers.img, src: icon })),
            label));
    }
    render() {
        const { style } = this.props.clientState;
        return (react_1.default.createElement("div", { "data-component-name": "MenuUsers", style: style.menuUsers.self },
            react_1.default.createElement("ol", { style: style.menuUsers.columns })));
    }
}
exports.default = MenuUsers;
//# sourceMappingURL=MenuUsers.js.map