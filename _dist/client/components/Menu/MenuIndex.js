"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const Thread_1 = __importDefault(require("api/store/Thread"));
const conf_1 = __importDefault(require("common/conf"));
const Icon_1 = __importDefault(require("client/components/Icon"));
const MenuIndexList_1 = __importDefault(require("client/components/Menu/MenuIndexList"));
class MenuIndex extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        const { app } = this.apiState;
        const { style } = props.clientState;
        const { rootCh } = app;
        this.state = { rootCh, style: style.menuIndex.headerUpdateIcon };
        this.handleOnClickUpdate = this.handleOnClickUpdate.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    }
    getDecolationProps() {
        return {};
    }
    handleOnClickUpdate(ch) {
        const { rootCh } = this.apiState.app;
        window.talknWindow.parentCoreApi("findMenuIndex", rootCh);
    }
    handleOnChange(e) {
        this.setState({ rootCh: e.target.value });
    }
    handleOnKeyPress(e) {
        if (e.nativeEvent.keyCode === 13) {
            const value = e.target.value;
            let href = "";
            if (value.indexOf("http://") === 0) {
                href = value.replace(/^http:\//, "");
            }
            else if (value.indexOf("https://") === 0) {
                href = value.replace(/^https:\//, "");
            }
            else if (value.indexOf("//") === 0) {
                href = value.replace(/^\/\//, "/");
            }
            else if (value.indexOf("/") === 0) {
                href = value;
            }
            else {
                href = `/${value}`;
            }
            location.href = `https://${conf_1.default.domain}${href}`;
        }
    }
    componentDidUpdate() {
        const { app, actionLog } = this.apiState;
        const { ui } = this.props.clientState;
        switch (actionLog[0]) {
            case "SERVER_TO_CLIENT[EMIT]:changeThread":
                switch (ui.screenMode) {
                    case Ui_1.default.screenModeSmallLabel:
                        if (!app.isLinkCh) {
                            window.talknWindow.parentCoreApi("onClickToggleDispMenu");
                        }
                        break;
                }
        }
    }
    render() {
        const headerUpdateIconStyle = this.state.style;
        const { state, onChangeFindType } = this.props;
        const { style } = this.props.clientState;
        const { icon } = style;
        const IconCh = Icon_1.default.getCh(icon.ch);
        const IconTune = Icon_1.default.getTune(icon.tune);
        const IconSearch = Icon_1.default.getSearch(icon.search);
        return (react_1.default.createElement("nav", { "data-component-name": "MenuIndex", style: style.menuIndex.self },
            react_1.default.createElement("header", { style: style.menuIndex.header },
                react_1.default.createElement("div", { style: style.menuIndex.headerSearchIcon }, IconTune),
                react_1.default.createElement("input", { type: "text", style: style.menuIndex.headerInput, onChange: this.handleOnChange, onKeyPress: this.handleOnKeyPress, placeholder: "CH", value: this.state.rootCh }),
                react_1.default.createElement("div", Object.assign({ style: headerUpdateIconStyle }, this.getDecolationProps()),
                    react_1.default.createElement("select", { onChange: onChangeFindType, style: style.menuIndex.headerFindSelect },
                        react_1.default.createElement("option", null, Thread_1.default.findTypeAll),
                        react_1.default.createElement("option", null, Thread_1.default.findTypeHtml),
                        react_1.default.createElement("option", null, Thread_1.default.findTypeMusic),
                        react_1.default.createElement("option", null, Thread_1.default.findTypeVideo)))),
            react_1.default.createElement("ol", { style: style.menuIndex.ol }, this.renderLi())));
    }
    renderLi() {
        const { clientState, handleOnClickCh } = this.props;
        const { app, thread, menuIndex } = this.apiState;
        const { ui, style } = clientState;
        return menuIndex.map((mi, index) => {
            return (react_1.default.createElement(MenuIndexList_1.default, { key: `${mi.ch}_${index}`, id: `${mi.ch}_${index}`, app: app, ui: ui, thread: thread, menuIndexList: mi, handleOnClickCh: handleOnClickCh, rank: index, style: style.menuIndexList }));
        });
    }
}
exports.default = MenuIndex;
//# sourceMappingURL=MenuIndex.js.map