"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const Ui_1 = __importDefault(require("client/store/Ui"));
const Marquee_1 = __importDefault(require("client/container/util/Marquee"));
const Icon_1 = __importDefault(require("client/components/Icon"));
const icon = new Icon_1.default();
class Header extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        this.handleOnClickMenuIcon = this.handleOnClickMenuIcon.bind(this);
    }
    handleOnClickMenuIcon(e) {
        const { state } = this.props;
        let { ui, app } = state;
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                break;
            default:
                ui = Ui_1.default.getUiUpdatedOpenFlgs({ app, ui }, "headerMenuIcon");
                break;
        }
        this.clientAction("ON_CLICK_TOGGLE_DISP_MENU", { ui });
    }
    render() {
        const { state, handleOnClickToggleMain } = this.props;
        const { style, ui, app } = state;
        const { icon } = style;
        const HeadTabIcon = Icon_1.default.getHeadTab(icon.headTab, { app, ui });
        return (react_1.default.createElement("header", { "data-component-name": "Header", style: style.header.self },
            this.renderLeft(),
            react_1.default.createElement("span", { "data-component-name": `Header-center`, style: style.header.headTab, onClick: handleOnClickToggleMain },
                react_1.default.createElement(Marquee_1.default, { text: app.rootTitle, loop: true, hoverToStop: false, trailing: 0, leading: 0 })),
            this.renderRight()));
    }
    renderLeft() {
        const { app, ui, style } = this.props.state;
        const { icon: IconStyle } = style;
        const HeaderUserIcon = Icon_1.default.getHeaderUser({ app, ui });
        const MenuIcon = Icon_1.default.getMenu(IconStyle.menu);
        return (react_1.default.createElement("span", Object.assign({ "data-component-name": `${this.constructor.name}-left`, style: style.header.leftIcon, onClick: this.handleOnClickMenuIcon }, icon.getDecolationProps1("icon", "menu", "div")), MenuIcon));
    }
    renderRight() {
        const { handleOnClickToggleDetail } = this.props;
        const { style, app, ui, thread } = this.props.state;
        const { icon: iconStyle } = style;
        const DetailIcon = Icon_1.default.getDetail(iconStyle.detail);
        const liveCnt = ui.screenMode === Ui_1.default.screenModeSmallLabel ? Icon_1.default.getLiveCnt({ app, ui }, thread.liveCnt) : undefined;
        return (react_1.default.createElement("span", Object.assign({ "data-component-name": `${this.constructor.name}-right`, style: style.header.rightIcon, onClick: handleOnClickToggleDetail }, icon.getDecolationProps3("icon", "detail", "div")),
            DetailIcon,
            react_1.default.createElement("div", { style: style.header.liveCntWrap }, liveCnt)));
    }
}
exports.default = Header;
//# sourceMappingURL=Header.js.map