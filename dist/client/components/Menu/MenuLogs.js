"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const Icon_1 = __importDefault(require("client/components/Icon"));
class MenuLogs extends TalknComponent_1.default {
    componentDidUpdate() {
        const { actionLog } = this.apiState;
        const { ui } = this.props.clientState;
        switch (actionLog[0]) {
            case "SERVER_TO_CLIENT[EMIT]:changeThread":
                switch (ui.screenMode) {
                    case Ui_1.default.screenModeSmallLabel:
                        ui.isOpenMenu = ui.isOpenMenu ? false : true;
                        window.talknWindow.parentCoreApi("onClickToggleDispMenu", ui);
                        break;
                }
        }
    }
    renderLi() {
        return null;
    }
    render() {
        const { thread } = this.apiState;
        const { style } = this.props.clientState;
        const { ch } = thread;
        const { icon } = style;
        const Search = Icon_1.default.getSearch(icon.search);
        const dispCh = ch.replace("/", "");
        return (react_1.default.createElement("nav", { "data-component-name": "MenuLogs", style: style.menuIndex.self },
            react_1.default.createElement("header", { style: style.menuIndex.header },
                react_1.default.createElement("span", { style: style.menuIndex.headerSearchIcon }, Search),
                react_1.default.createElement("span", { style: style.menuIndex.headerCh },
                    react_1.default.createElement("input", { type: "text", style: style.menuIndex.headerInput, onChange: this.handleOnChange, onKeyPress: this.handleOnKeyPress, defaultValue: "" }))),
            react_1.default.createElement("ol", { style: style.menuIndex.ol }, this.renderLi())));
    }
}
exports.default = MenuLogs;
//# sourceMappingURL=MenuLogs.js.map