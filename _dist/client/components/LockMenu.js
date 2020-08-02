"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const conf_1 = __importDefault(require("common/conf"));
const Sequence_1 = __importDefault(require("api/Sequence"));
const Ui_1 = __importDefault(require("client/store/Ui"));
const index_1 = __importDefault(require("client/style/index"));
const Container_1 = __importDefault(require("client/style/Container"));
const LockMenu_1 = __importDefault(require("client/style/LockMenu"));
const Icon_1 = __importDefault(require("client/components/Icon"));
const common_1 = require("client/components/common");
const icon = new Icon_1.default();
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
                    style: {
                        ...this.state.style,
                        [type]: {
                            ...this.state.style[type],
                            color: Container_1.default.whiteRGBA,
                            background: Container_1.default.getLightThemeRGBA(0.96),
                        },
                    },
                });
            },
            onMouseLeave: () => {
                if (type === "liEmbed") {
                    document.getSelection().empty();
                }
                this.setState({
                    style: {
                        ...this.state.style,
                        [type]: {
                            ...this.state.style[type],
                            color: index_1.default.fontBaseRGB,
                            background: Container_1.default.whiteRGBA,
                            transform: "scale( 1 )",
                        },
                    },
                });
            },
            onMouseDown: () => {
                this.setState({
                    style: {
                        ...this.state.style,
                        [type]: {
                            ...this.state.style[type],
                            transition: "200ms",
                            transform: "scale( 1.05 )",
                        },
                    },
                });
            },
            onMouseUp: () => {
                this.setState({
                    style: {
                        ...this.state.style,
                        [type]: {
                            ...this.state.style[type],
                            transition: "200ms",
                            transform: "scale( 1 )",
                        },
                    },
                });
            },
        };
    }
    getDecolationPropsEmbed() {
        return {
            onMouseOver: () => {
                this.setState({
                    style: {
                        ...this.state.style,
                        liEmbed: {
                            ...this.state.style.liEmbed,
                            color: Container_1.default.whiteRGBA,
                            background: Container_1.default.themeRGBA,
                        },
                    },
                });
            },
            onMouseLeave: () => {
                this.setState({
                    style: {
                        ...this.state.style,
                        liEmbed: {
                            ...this.state.style.liEmebed,
                            color: index_1.default.fontBaseRGB,
                            background: Container_1.default.whiteRGBA,
                            transform: "scale( 1 )",
                        },
                    },
                });
            },
            onMouseDown: () => {
                this.setState({
                    style: {
                        ...this.state.style,
                        liEmbed: {
                            ...this.state.style.liEmbed,
                            transition: "200ms",
                            transform: "scale( 1.05 )",
                        },
                    },
                });
            },
            onMouseUp: () => {
                this.setState({
                    style: {
                        ...this.state.style,
                        liEmbed: {
                            ...this.state.style.liEmbed,
                            transition: "200ms",
                            transform: "scale( 1 )",
                        },
                    },
                });
            },
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
        const { threadDetail } = this.props.state;
        if (threadDetail.protocol === Sequence_1.default.TALKN_PROTOCOL) {
            location.href = threadDetail.ch;
        }
        else {
            location.href = threadDetail.protocol + "/" + threadDetail.ch;
        }
    }
    handleOnClickToTalkn() {
        const { threadDetail } = this.props.state;
        location.href = `//${conf_1.default.domain}${threadDetail.ch}`;
    }
    render() {
        const { state } = this;
        const { style: stateStyle } = state;
        const { onClickOpenLockMenu } = this.props;
        const { style, threadDetail } = this.props.state;
        const sizePx = Icon_1.default.middleSize;
        const IconHeadTab = Icon_1.default.getHeadTab(LockMenu_1.default.headTabUpdate, this.props.state);
        const IconTwitter = Icon_1.default.getTwitter(state, {}, { sizePx });
        const IconFacebook = Icon_1.default.getFacebook(state, {}, { sizePx });
        const IconTalkn = Icon_1.default.getTalkn({}, state, { sizePx });
        return (react_1.default.createElement("div", { "data-component-name": "LockMenu", style: style.lockMenu.menuShare },
            react_1.default.createElement("header", { style: style.lockMenu.header, onClick: () => onClickOpenLockMenu(Ui_1.default.openLockMenuLabelNo) },
                "SHARE",
                IconHeadTab),
            react_1.default.createElement("ul", { style: style.lockMenu.ul },
                react_1.default.createElement("li", Object.assign({ style: stateStyle.liTwitter, onClick: () => this.clientAction("OPEN_INNER_NOTIF") }, this.getDecolationProps1("liTwitter")),
                    IconTwitter,
                    react_1.default.createElement("div", { style: style.lockMenu.shareLabel }, "Twitter")),
                react_1.default.createElement("li", Object.assign({ style: stateStyle.liFacebook, onClick: () => this.clientAction("OPEN_INNER_NOTIF") }, this.getDecolationProps1("liFacebook")),
                    IconFacebook,
                    react_1.default.createElement("div", { style: style.lockMenu.shareLabel }, "Facebook")),
                react_1.default.createElement("li", Object.assign({ style: stateStyle.liEmbed, onClick: () => {
                        const Input = document.querySelector("[data-component-share-input]");
                        Input.select();
                        document.execCommand("copy");
                        this.clientAction("OPEN_INNER_NOTIF", { ui: { openInnerNotif: "Success copy script tag." } });
                    } }, this.getDecolationProps1("liEmbed")),
                    IconTalkn,
                    react_1.default.createElement("div", { style: style.lockMenu.shareLabel },
                        react_1.default.createElement("input", { id: "copy-script", "data-component-share-input": true, type: "text", style: stateStyle.liEmbedInput, readOnly: true, value: `<script type="text/javascript" async src='//${conf_1.default.extURL}${threadDetail.ch}'></script>` }),
                        react_1.default.createElement(common_1.Label, { htmlFor: "copy-script" }))))));
    }
}
exports.default = LockMenu;
//# sourceMappingURL=LockMenu.js.map