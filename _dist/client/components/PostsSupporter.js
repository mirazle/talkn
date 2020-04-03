"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const index_1 = __importDefault(require("common/emotions/index"));
const Icon_1 = __importDefault(require("client/components/Icon"));
class PostsSupporter extends TalknComponent_1.default {
    static get COVER() {
        return "Cover";
    }
    constructor(props) {
        super(props);
        let style = { [PostsSupporter.COVER]: {}, Emojis: {} };
        Object.keys(index_1.default.inputs).forEach(menu => {
            const coverStampId = index_1.default.inputs[menu][0];
            style[PostsSupporter.COVER][coverStampId] = Object.assign({}, props.state.style.postsSupporter.emoji);
            style.Emojis[menu] = {};
            style.Emojis[menu][0] = Object.assign({}, props.state.style.postsSupporter.emoji);
            index_1.default.inputs[menu].forEach(stampId => {
                style.Emojis[menu][stampId] = Object.assign({}, props.state.style.postsSupporter.emoji);
            });
        });
        this.state = {
            style,
            menu: PostsSupporter.COVER
        };
        this.getDisplay = this.getDisplay.bind(this);
    }
    getEvents(menu, toMenu, stampId) {
        switch (menu) {
            case PostsSupporter.COVER:
                return {
                    onMouseOver: e => {
                        this.setState({
                            style: Object.assign(Object.assign({}, this.state.style), { [PostsSupporter.COVER]: Object.assign(Object.assign({}, this.state.style[PostsSupporter.COVER]), { [stampId]: Object.assign(Object.assign({}, this.state.style[PostsSupporter.COVER][stampId]), { transform: "scale(1.1)" }) }) })
                        });
                    },
                    onMouseOut: e => {
                        this.setState({
                            style: Object.assign(Object.assign({}, this.state.style), { [PostsSupporter.COVER]: Object.assign(Object.assign({}, this.state.style[PostsSupporter.COVER]), { [stampId]: Object.assign(Object.assign({}, this.state.style[PostsSupporter.COVER][stampId]), { transform: "scale(1.0)" }) }) })
                        });
                    },
                    onClick: e => {
                        this.setState({ menu: toMenu });
                    }
                };
            default:
                return {
                    onMouseOver: e => {
                        this.setState({
                            style: Object.assign(Object.assign({}, this.state.style), { Emojis: Object.assign(Object.assign({}, this.state.style.Emojis), { [menu]: Object.assign(Object.assign({}, this.state.style.Emojis[menu]), { [stampId]: Object.assign(Object.assign({}, this.state.style.Emojis[menu][stampId]), { transform: "scale(1.1)" }) }) }) })
                        });
                    },
                    onMouseOut: e => {
                        this.setState({
                            style: Object.assign(Object.assign({}, this.state.style), { Emojis: Object.assign(Object.assign({}, this.state.style.Emojis), { [menu]: Object.assign(Object.assign({}, this.state.style.Emojis[menu]), { [stampId]: Object.assign(Object.assign({}, this.state.style.Emojis[menu][stampId]), { transform: "scale(1.0)" }) }) }) })
                        });
                    },
                    onClick: e => {
                        if (stampId !== 0) {
                            const post = index_1.default.map[stampId];
                            window.talknWindow.parentCoreApi("delegatePost", {
                                inputPost: post,
                                inputStampId: stampId,
                                inputCurrentTime: 0
                            });
                        }
                        this.setState({ menu: toMenu });
                    }
                };
        }
    }
    getDisplay(menu) {
        const { clientState } = this.props;
        const { style: propsStyle } = clientState;
        const IconOpenEmoji = Icon_1.default.getOpenEmoji({}, clientState);
        const IconCloseEmoji = Icon_1.default.getCloseEmoji({}, clientState);
        const { style } = this.state;
        let display = [];
        switch (menu) {
            case PostsSupporter.COVER:
                display = Object.keys(index_1.default.inputs).map(label => {
                    const coverStampId = index_1.default.inputs[label][0];
                    return (react_1.default.createElement("li", Object.assign({ key: menu + "_" + coverStampId, style: style[PostsSupporter.COVER][coverStampId] }, this.getEvents(menu, label, coverStampId)),
                        react_1.default.createElement("div", null, index_1.default.map[coverStampId]),
                        react_1.default.createElement("div", { style: propsStyle.postsSupporter.emojiLabel },
                            menu === PostsSupporter.COVER && IconOpenEmoji,
                            label)));
                });
                break;
            default:
                display = index_1.default.inputs[menu].map(stampId => {
                    return (react_1.default.createElement("li", Object.assign({ key: menu + "_" + stampId, style: style.Emojis[menu][stampId] }, this.getEvents(menu, PostsSupporter.COVER, stampId)), index_1.default.map[stampId]));
                });
                display.unshift(react_1.default.createElement("li", Object.assign({ key: "backCover", style: style["Emojis"][menu][0] }, this.getEvents(menu, PostsSupporter.COVER, 0)), IconCloseEmoji));
                break;
        }
        return display;
    }
    render() {
        const { style } = this.props.clientState;
        const { menu } = this.state;
        const lis = this.getDisplay(menu);
        return (react_1.default.createElement("ul", { "data-component-name": "PostsSupporter", style: style.postsSupporter.self }, lis));
    }
}
exports.default = PostsSupporter;
//# sourceMappingURL=PostsSupporter.js.map