"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const Marquee_1 = __importDefault(require("client/container/util/Marquee"));
const Icon_1 = __importDefault(require("client/components/Icon"));
class Header extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        this.handleOnClickMenuIcon = this.handleOnClickMenuIcon.bind(this);
    }
    handleOnClickMenuIcon(e) {
        const { clientState } = this.props;
        let { app } = this.apiState;
        let { ui } = clientState;
        if (ui.extensionMode === "NONE") {
            switch (ui.screenMode) {
                case Ui_1.default.screenModeSmallLabel:
                    break;
                default:
                    ui = Ui_1.default.getUiUpdatedOpenFlgs({ app, ui }, "headerMenuIcon");
                    break;
            }
            window.talknWindow.parentCoreApi("onClickToggleDispMenu", app);
        }
    }
    render() {
        const { clientState, handleOnClickToggleMain } = this.props;
        const { app } = this.apiState;
        const { style, ui } = clientState;
        const { icon } = style;
        const HeadTabIcon = Icon_1.default.getHeadTab(icon.headTab, { app, ui });
        return (react_1.default.createElement("header", { "data-component-name": "Header", style: style.header.self },
            this.renderLeft(),
            react_1.default.createElement("span", { "data-component-name": `Header-center`, style: style.header.headTab, onClick: handleOnClickToggleMain },
                react_1.default.createElement(Marquee_1.default, { text: `${app.rootTitle}`, loop: true, hoverToStop: false, trailing: 0, leading: 0 })),
            this.renderRight()));
    }
    renderLeft() {
        const { openInnerNotif, clientState } = this.props;
        const { ui, style } = clientState;
        const { icon } = style;
        const HeaderUserIcon = Icon_1.default.getHeaderUser();
        const MenuIcon = Icon_1.default.getMenu(icon.menu);
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel ||
            ui.extensionMode === Ui_1.default.extensionModeExtModalLabel ||
            ui.extensionMode === Ui_1.default.extensionModeExtIncludeLabel) {
            return (react_1.default.createElement("span", Object.assign({ "data-component-name": `Header-left`, style: style.header.leftIcon, onClick: () => openInnerNotif() }, Icon_1.default.getDecolationProps3("icon", "headerUser", "div")), HeaderUserIcon));
        }
        else {
            return (react_1.default.createElement("span", Object.assign({ "data-component-name": `${this.constructor.name}-left`, style: style.header.leftIcon, onClick: this.handleOnClickMenuIcon }, Icon_1.default.getDecolationProps1("icon", "menu", "div")), MenuIcon));
        }
    }
    renderRight() {
        const { handleOnClickToggleDetail } = this.props;
        const { style } = this.props.clientState;
        const { icon } = style;
        const DetailIcon = Icon_1.default.getDetail(icon.detail);
        return (react_1.default.createElement("span", Object.assign({ "data-component-name": `${this.constructor.name}-right`, style: style.header.rightIcon, onClick: handleOnClickToggleDetail }, Icon_1.default.getDecolationProps3("icon", "detail", "div")),
            DetailIcon,
            this.renderWatchCntComponent()));
    }
    renderWatchCntComponent() {
        const { thread } = this.apiState;
        const { style } = this.props.clientState;
        return (react_1.default.createElement("span", { "data-component-name": "Header-WatchCnt", style: style.header.childAnalyzeWrap },
            react_1.default.createElement("div", { style: style.header.childAnalyzeType }, "LIVE"),
            react_1.default.createElement("div", { style: style.header.childAnalyzeCnt }, thread.watchCnt)));
    }
}
exports.default = Header;
//# sourceMappingURL=Header.js.map