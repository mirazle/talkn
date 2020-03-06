"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const conf_1 = __importDefault(require("common/conf"));
const Sequence_1 = __importDefault(require("api/Sequence"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const index_1 = __importDefault(require("client/style/index"));
const Container_1 = __importDefault(require("client/style/Container"));
const LockMenu_1 = __importDefault(require("client/style/LockMenu"));
const Icon_1 = __importDefault(require("client/components/Icon"));
class LockMenu extends TalknComponent_1.default {
    getDecolationProps1(type) {
        return {
            onMouseOver: () => {
                if (type === "liEmbed") {
                    const input = document.getElementById("Id");
                    if (input) {
                        input.select();
                    }
                }
                this.setState({
                    style: Object.assign(Object.assign({}, this.state.style), { [type]: Object.assign(Object.assign({}, this.state.style[type]), { color: Container_1.default.whiteRGB, background: Container_1.default.getThemeRGBA(0.7) }) })
                });
            },
            onMouseLeave: () => {
                if (type === "liEmbed") {
                    document.getSelection().empty();
                }
                this.setState({
                    style: Object.assign(Object.assign({}, this.state.style), { [type]: Object.assign(Object.assign({}, this.state.style[type]), { color: index_1.default.fontBaseRGB, background: Container_1.default.whiteRGBA, transform: "scale( 1 )" }) })
                });
            },
            onMouseDown: () => {
                this.setState({
                    style: Object.assign(Object.assign({}, this.state.style), { [type]: Object.assign(Object.assign({}, this.state.style[type]), { transition: "200ms", transform: "scale( 1.05 )" }) })
                });
            },
            onMouseUp: () => {
                this.setState({
                    style: Object.assign(Object.assign({}, this.state.style), { [type]: Object.assign(Object.assign({}, this.state.style[type]), { transition: "200ms", transform: "scale( 1 )" }) })
                });
            }
        };
    }
    getDecolationPropsEmbed() {
        return {
            onMouseOver: () => {
                this.setState({
                    style: Object.assign(Object.assign({}, this.state.style), { liEmbed: Object.assign(Object.assign({}, this.state.style.liEmbed), { color: Container_1.default.whiteRGB, background: Container_1.default.themeRGB }) })
                });
            },
            onMouseLeave: () => {
                this.setState({
                    style: Object.assign(Object.assign({}, this.state.style), { liEmbed: Object.assign(Object.assign({}, this.state.style.liEmebed), { color: index_1.default.fontBaseRGB, background: Container_1.default.whiteRGBA, transform: "scale( 1 )" }) })
                });
            },
            onMouseDown: () => {
                this.setState({
                    style: Object.assign(Object.assign({}, this.state.style), { liEmbed: Object.assign(Object.assign({}, this.state.style.liEmbed), { transition: "200ms", transform: "scale( 1.05 )" }) })
                });
            },
            onMouseUp: () => {
                this.setState({
                    style: Object.assign(Object.assign({}, this.state.style), { liEmbed: Object.assign(Object.assign({}, this.state.style.liEmbed), { transition: "200ms", transform: "scale( 1 )" }) })
                });
            }
        };
    }
    constructor(props) {
        super(props);
        const { lockMenu: style } = props.state.style;
        this.state = { style };
        this.getDecolationProps1 = this.getDecolationProps1.bind(this);
        this.handleOnClickToWeb = this.handleOnClickToWeb.bind(this);
        this.handleOnClickToTalkn = this.handleOnClickToTalkn.bind(this);
    }
    handleOnClickToWeb() {
        const { threadDetail } = this.apiState;
        if (threadDetail.protocol === Sequence_1.default.TALKN_PROTOCOL) {
            location.href = threadDetail.ch;
        }
        else {
            location.href = threadDetail.protocol + "/" + threadDetail.ch;
        }
    }
    handleOnClickToTalkn() {
        const { threadDetail } = this.apiState;
        location.href = `//${conf_1.default.domain}${threadDetail.ch}`;
    }
    render() {
        const { state } = this;
        const { style: stateStyle } = state;
        const { openInnerNotif, onClickOpenLockMenu } = this.props;
        const { threadDetail } = this.apiState;
        const { style } = this.props.clientState;
        const IconHeadTab = Icon_1.default.getHeadTab(LockMenu_1.default.headTabUpdate, this.props.clientState);
        const IconTwitter = Icon_1.default.getTwitter({}, state, { sizePx: Icon_1.default.middleSize });
        const IconFacebook = Icon_1.default.getFacebook({}, state, {
            sizePx: Icon_1.default.middleSize
        });
        const IconTalkn = Icon_1.default.getTalkn({}, state, { sizePx: Icon_1.default.middleSize });
        return (react_1.default.createElement("div", { "data-component-name": "LockMenu", style: style.lockMenu.menuShare },
            react_1.default.createElement("header", { style: style.lockMenu.header, onClick: () => onClickOpenLockMenu(Ui_1.default.openLockMenuLabelNo) },
                "SHARE",
                IconHeadTab),
            react_1.default.createElement("ul", { style: style.lockMenu.ul },
                react_1.default.createElement("li", Object.assign({ style: stateStyle.liTwitter, onClick: () => openInnerNotif() }, this.getDecolationProps1("liTwitter")),
                    IconTwitter,
                    react_1.default.createElement("div", { style: style.lockMenu.shareLabel }, "Twitter")),
                react_1.default.createElement("li", Object.assign({ style: stateStyle.liFacebook, onClick: () => openInnerNotif() }, this.getDecolationProps1("liFacebook")),
                    IconFacebook,
                    react_1.default.createElement("div", { style: style.lockMenu.shareLabel }, "Facebook")),
                react_1.default.createElement("li", Object.assign({ style: stateStyle.liEmbed, onClick: () => {
                        const Input = document.querySelector("[data-component-share-input]");
                        Input.select();
                        document.execCommand("copy");
                        openInnerNotif("Success copy script tag.");
                    } }, this.getDecolationProps1("liEmbed")),
                    IconTalkn,
                    react_1.default.createElement("div", { style: style.lockMenu.shareLabel },
                        react_1.default.createElement("input", { "data-component-share-input": true, type: "text", style: stateStyle.liEmbedInput, readOnly: true, value: `<script type="text/javascript" async src='//${conf_1.default.extURL}${threadDetail.ch}'></script>` }))))));
    }
}
exports.default = LockMenu;
//# sourceMappingURL=LockMenu.js.map