"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const App_1 = __importDefault(require("api/store/App"));
const Ui_1 = __importDefault(require("client/store/Ui"));
const util_1 = __importDefault(require("common/util"));
const conf_1 = __importDefault(require("common/conf"));
const common_1 = require("client/components/common");
const regex = /^\s*$/;
class PostsFooter extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        this.state = { focusSetIntervalId: 0 };
        this.getIconStyle = this.getIconStyle.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    }
    componentDidMount() {
        this.clientAction("COMPONENT_DID_MOUNTS", "PostsFooter");
    }
    handleOnClick(e) {
        const { ui } = this.clientState;
        const postArea = this.refs.postArea;
        const value = postArea.innerHTML;
        if (value !== "" && !App_1.default.validInputPost(value)) {
            this.api("post", { app: { inputPost: ui.inputPost } });
            this.clientAction("ON_CHANGE_INPUT_POST", { ui: { inputPost: "" } });
        }
    }
    handleOnChange(e) {
        if (!App_1.default.validInputPost(e.target.value)) {
            this.clientAction("ON_CHANGE_INPUT_POST", { ui: { inputPost: e.target.value } });
        }
    }
    handleOnKeyPress(e) {
        clearInterval(this.state.focusSetIntervalId);
        if (e.nativeEvent.keyCode === 13) {
            if (e.nativeEvent.shiftKey) {
                this.clientAction("ON_CHANGE_INPUT_POST", { ui: { inputPost: e.target.value + "\n" } });
            }
            else {
                if (!regex.test(e.target.value)) {
                    this.api("post", { app: { inputPost: e.target.value } });
                    this.clientAction("ON_CHANGE_INPUT_POST", { ui: { inputPost: "" } });
                }
            }
        }
    }
    getIconStyle() {
        const { style, thread } = this.props.state;
        const favicon = `https://${conf_1.default.assetsIconPath}${util_1.default.getSaveFaviconName(thread.favicon)}`;
        return thread.favicon ? { ...style.postsFooter.icon, backgroundImage: `url(${favicon})` } : style.postsFooter.icon;
    }
    render() {
        const { state, handleOnClickFooterIcon } = this.props;
        const { style, ui } = state;
        return (react_1.default.createElement("footer", { "data-component-name": "PostsFooter", style: style.postsFooter.self },
            react_1.default.createElement("div", { style: this.getIconStyle(), onClick: handleOnClickFooterIcon }),
            react_1.default.createElement("textarea", { id: "post", "data-component-name": "postArea", style: style.postsFooter.textarea, ref: "postArea", rows: 1, onChange: this.handleOnChange, onKeyPress: this.handleOnKeyPress, value: ui.inputPost, placeholder: "Comment to web" }),
            react_1.default.createElement(common_1.Label, { htmlFor: "post" }),
            this.renderButton()));
    }
    renderButton() {
        const { style, ui } = this.props.state;
        switch (ui.extensionMode) {
            case Ui_1.default.extensionModeExtNoneLabel:
            case Ui_1.default.extensionModeExtEmbedLabel:
                return react_1.default.createElement("button", { "aria-label": "post", style: style.postsFooter.button, onClick: this.handleOnClick });
            default:
                return undefined;
        }
    }
}
exports.default = PostsFooter;
//# sourceMappingURL=PostsFooter.js.map