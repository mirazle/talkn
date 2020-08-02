"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const Container_1 = __importDefault(require("client/style/Container"));
const Icon_1 = __importDefault(require("client/components/Icon"));
const icon = new Icon_1.default();
class Footer extends TalknComponent_1.default {
    static getIndexBackground() {
        const background = Container_1.default.themeRGBA;
        return {
            top: { background },
            middle: { background },
            bottom: { background },
        };
    }
    render() {
        const { style, app, ui } = this.props.state;
        const UserIcon = Icon_1.default.getUser({ app, ui }, {});
        const IndexIcon = Icon_1.default.getIndex({ app, ui }, Footer.getIndexBackground());
        const Logs = Icon_1.default.getLogs({ app, ui }, {});
        const Setting = Icon_1.default.getSetting({ app, ui }, {});
        return (react_1.default.createElement("div", { "data-component-name": "MenuFooter", style: style.menuFooter.self },
            react_1.default.createElement("div", Object.assign({ style: style.menuFooter.child, onClick: () => this.clientAction("OPEN_INNER_NOTIF") }, icon.getDecolationProps1("icon", "user", "div")),
                UserIcon,
                react_1.default.createElement("div", null, "SOCIAL")),
            react_1.default.createElement("div", Object.assign({ style: style.menuFooter.childIndex }, icon.getDecolationProps1("icon", "index", "div")),
                IndexIcon,
                react_1.default.createElement("div", { style: { color: Container_1.default.themeRGBA } }, "RANK")),
            react_1.default.createElement("div", Object.assign({ style: style.menuFooter.child, onClick: () => this.clientAction("OPEN_INNER_NOTIF") }, icon.getDecolationProps1("icon", "logs", "div")),
                Logs,
                react_1.default.createElement("div", null, "LOGS")),
            react_1.default.createElement("div", Object.assign({ style: style.menuFooter.child, onClick: () => this.clientAction("OPEN_INNER_NOTIF") }, icon.getDecolationProps1("icon", "setting", "div")),
                Setting,
                react_1.default.createElement("div", null, "SETTING"))));
    }
}
exports.default = Footer;
//# sourceMappingURL=Footer.js.map