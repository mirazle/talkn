"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const App_1 = __importDefault(require("api/store/App"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const util_1 = __importDefault(require("common/util"));
const conf_1 = __importDefault(require("common/conf"));
const regex = /^\s*$/;
class PostsFooter extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        this.state = { focusSetIntervalId: 0 };
        this.renderButton = this.renderButton.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    }
    componentDidMount() {
        window.talknWindow.parentCoreApi("componentDidMounts", "PostsFooter");
    }
    handleOnClick(e) {
        const postArea = this.refs.postArea;
        const value = postArea.innerHTML;
        if (value !== "" && !App_1.default.validInputPost(value)) {
            window.talknWindow.parentCoreApi("post");
            window.talknWindow.parentCoreApi("onChangeInputPost", "");
        }
    }
    handleOnChange(e) {
        if (!App_1.default.validInputPost(e.target.value)) {
            window.talknWindow.parentCoreApi("onChangeInputPost", e.target.value);
        }
    }
    handleOnKeyPress(e) {
        clearInterval(this.state.focusSetIntervalId);
        if (e.nativeEvent.keyCode === 13) {
            if (e.nativeEvent.shiftKey) {
                window.talknWindow.parentCoreApi("onChangeInputPost", e.target.value + "\n");
            }
            else {
                if (!regex.test(e.target.value)) {
                    window.talknWindow.parentCoreApi("post");
                    window.talknWindow.parentCoreApi("onChangeInputPost", "");
                }
            }
        }
    }
    getIconStyle() {
        const { thread } = this.apiStore;
        const { style } = this.props.clientState;
        const favicon = `https://${conf_1.default.assetsIconPath}${util_1.default.getSaveFaviconName(thread.favicon)}`;
        return thread.favicon ? Object.assign(Object.assign({}, style.postsFooter.icon), { backgroundImage: `url(${favicon})` }) : style.postsFooter.icon;
    }
    renderButton() {
        const { style, ui } = this.props.clientState;
        if (ui.extensionMode === Ui_1.default.extensionModeExtModalLabel || ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            return null;
        }
        else {
            return (react_1.default.createElement("button", { style: style.postsFooter.button, onClick: this.handleOnClick }, "talkn"));
        }
    }
    render() {
        const { app } = this.apiStore;
        const { clientState, handleOnClickFooterIcon } = this.props;
        const { style, ui } = clientState;
        const value = app.inputPost;
        const readOnly = ui.extensionMode === Ui_1.default.extensionModeExtModalLabel || ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel;
        return (react_1.default.createElement("div", { "data-component-name": "PostsFooter", style: style.postsFooter.self },
            react_1.default.createElement("div", { style: this.getIconStyle(), onClick: handleOnClickFooterIcon }),
            react_1.default.createElement("textarea", { "data-component-name": "postArea", style: style.postsFooter.textarea, ref: "postArea", rows: 1, readOnly: readOnly, onChange: this.handleOnChange, onKeyPress: this.handleOnKeyPress, value: value, placeholder: "Comment to web" }),
            this.renderButton()));
    }
}
exports.default = PostsFooter;
//# sourceMappingURL=PostsFooter.js.map