"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const MenuUsers_1 = __importDefault(require("client/components/Menu/MenuUsers"));
const MenuIndex_1 = __importDefault(require("client/components/Menu/MenuIndex"));
const MenuLogs_1 = __importDefault(require("client/components/Menu/MenuLogs"));
const MenuSetting_1 = __importDefault(require("client/components/Menu/MenuSetting"));
const Header_1 = __importDefault(require("client/components/Header"));
const MenuFooter_1 = __importDefault(require("client/components/MenuFooter"));
class Menuextends extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        this.handleOnClickLoginTwitter = this.handleOnClickLoginTwitter.bind(this);
        this.handleOnClickLoginFacebook = this.handleOnClickLoginFacebook.bind(this);
        this.handleOnTransitionEnd = this.handleOnTransitionEnd.bind(this);
    }
    componentDidMount() {
        window.talknWindow.parentCoreApi("componentDidMounts", "Menu");
    }
    handleOnClickLoginFacebook() {
        const href = `https://talkn.io:8443/auth/facebook?url=${window.location.href}`;
        location.href = href;
    }
    handleOnClickLoginTwitter() {
        const href = `https://talkn.io:8443/auth/twitter?url=${window.location.href}`;
        location.href = href;
    }
    handleOnTransitionEnd() {
        const { clientState, openMenuTransitionEnd } = this.props;
        const { ui } = clientState;
        if (ui.screenMode === Ui_1.default.screenModeSmallLabel) {
            if (ui.isOpenMenu) {
                openMenuTransitionEnd(window.scrollY);
                window.talknWindow.lockWindow();
            }
        }
    }
    render() {
        const { style } = this.props.clientState;
        return (react_1.default.createElement("div", { "data-component-name": "Menu", onTransitionEnd: this.handleOnTransitionEnd, style: style.menu.self },
            this.renderHeader(),
            react_1.default.createElement("div", { "data-component-name": "MenuBody", style: style.menu.wrapComponent }, this.renderMenuComponent()),
            this.renderFooter()));
    }
    renderMenuComponent() {
        const { ui } = this.props.clientState;
        let menuComponent;
        switch (ui.menuComponent) {
            case Ui_1.default.menuComponentUsersLabel:
                menuComponent = react_1.default.createElement(MenuUsers_1.default, Object.assign({}, this.props));
                break;
            case Ui_1.default.menuComponentIndexLabel:
                menuComponent = react_1.default.createElement(MenuIndex_1.default, Object.assign({}, this.props));
                break;
            case Ui_1.default.menuComponentLogsLabel:
                menuComponent = react_1.default.createElement(MenuLogs_1.default, Object.assign({}, this.props));
                break;
            case Ui_1.default.menuComponentSettingLabel:
                menuComponent = react_1.default.createElement(MenuSetting_1.default, Object.assign({}, this.props));
                break;
        }
        return menuComponent;
    }
    renderHeader() {
        const { ui } = this.props.clientState;
        return ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel || ui.extensionMode === Ui_1.default.extensionModeExtModalLabel ? (react_1.default.createElement(Header_1.default, Object.assign({}, this.props))) : null;
    }
    renderFooter() {
        const { ui } = this.props.clientState;
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel || ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
            return null;
        }
        else {
            switch (ui.screenMode) {
                case Ui_1.default.screenModeSmallLabel:
                case Ui_1.default.screenModeMiddleLabel:
                case Ui_1.default.screenModeLargeLabel:
                    return react_1.default.createElement(MenuFooter_1.default, Object.assign({}, this.props));
            }
        }
    }
}
exports.default = Menuextends;
//# sourceMappingURL=index.js.map