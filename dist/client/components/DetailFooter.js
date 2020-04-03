"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const conf_1 = __importDefault(require("common/conf"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const Icon_1 = __importDefault(require("client/components/Icon"));
const Container_1 = __importDefault(require("client/style/Container"));
class DetailFooter extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        this.handleOnClickLike = this.handleOnClickLike.bind(this);
        this.handleOnClickShare = this.handleOnClickShare.bind(this);
        this.handleOnClickPortal = this.handleOnClickPortal.bind(this);
    }
    handleOnClickLike() {
        const { clientState, onClickOpenLockMenu, openInnerNotif } = this.props;
        const { ui } = clientState;
        if (ui.openLockMenu !== Ui_1.default.openLockMenuLabelNo) {
            onClickOpenLockMenu(Ui_1.default.openLockMenuLabelNo);
        }
        else {
            openInnerNotif();
        }
    }
    handleOnClickShare() {
        const { clientState, onClickOpenLockMenu, openInnerNotif } = this.props;
        const { ui } = clientState;
        if (ui.openLockMenu !== Ui_1.default.openLockMenuLabelNo) {
            onClickOpenLockMenu(Ui_1.default.openLockMenuLabelNo);
        }
        else {
            onClickOpenLockMenu(Ui_1.default.openLockMenuLabelShare);
        }
    }
    handleOnClickPortal() {
        const { ui } = this.props.clientState;
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel || ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
            window.talknWindow.parentExtTo("linkTo", { href: `https://${conf_1.default.wwwURL}` });
        }
        else {
            location.href = `https://${conf_1.default.wwwURL}`;
        }
    }
    render() {
        const { mode, clientState } = this.props;
        const { app } = this.apiState;
        const { ui, style } = clientState;
        if ((ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel || ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) &&
            mode === "default") {
            return null;
        }
        else {
            const HeartIcon = Icon_1.default.getHeart({}, { app, ui });
            const ShareIcon = Icon_1.default.getShare({}, { app, ui });
            const MoneyIcon = Icon_1.default.getMoney({}, { app, ui });
            const shareColor = clientState.ui.openLockMenu === Ui_1.default.openLockMenuLabelShare ? Container_1.default.themeRGBA : Container_1.default.fontBaseRGB;
            return (react_1.default.createElement("footer", { "data-component-name": "DetailFooter", style: style.detailFooter.self },
                react_1.default.createElement("div", { style: style.detailFooter.childLike, onClick: this.handleOnClickLike },
                    HeartIcon,
                    react_1.default.createElement("div", null, "LIKE")),
                react_1.default.createElement("div", { style: style.detailFooter.childShare, onClick: this.handleOnClickShare },
                    ShareIcon,
                    react_1.default.createElement("div", { style: { color: shareColor } }, "SHARE")),
                react_1.default.createElement("div", { style: style.detailFooter.childMoney, onClick: this.handleOnClickPortal },
                    MoneyIcon,
                    react_1.default.createElement("div", null, "ABOUT"))));
        }
    }
}
exports.default = DetailFooter;
//# sourceMappingURL=DetailFooter.js.map