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
        Object.keys(index_1.default.inputs).forEach((menu) => {
            const coverStampId = index_1.default.inputs[menu][0];
            style[PostsSupporter.COVER][coverStampId] = {
                ...props.state.style.postsSupporter.emoji,
            };
            style.Emojis[menu] = {};
            style.Emojis[menu][0] = { ...props.state.style.postsSupporter.emoji };
            index_1.default.inputs[menu].forEach((stampId) => {
                style.Emojis[menu][stampId] = {
                    ...props.state.style.postsSupporter.emoji,
                };
            });
        });
        this.state = {
            style,
            menu: PostsSupporter.COVER,
        };
        this.getDisplay = this.getDisplay.bind(this);
    }
    getEvents(menu, toMenu, stampId) {
        switch (menu) {
            case PostsSupporter.COVER:
                return {
                    onMouseOver: (e) => {
                        this.setState({
                            style: {
                                ...this.state.style,
                                [PostsSupporter.COVER]: {
                                    ...this.state.style[PostsSupporter.COVER],
                                    [stampId]: {
                                        ...this.state.style[PostsSupporter.COVER][stampId],
                                        transform: "scale(1.1)",
                                    },
                                },
                            },
                        });
                    },
                    onMouseOut: (e) => {
                        this.setState({
                            style: {
                                ...this.state.style,
                                [PostsSupporter.COVER]: {
                                    ...this.state.style[PostsSupporter.COVER],
                                    [stampId]: {
                                        ...this.state.style[PostsSupporter.COVER][stampId],
                                        transform: "scale(1.0)",
                                    },
                                },
                            },
                        });
                    },
                    onClick: (e) => {
                        this.setState({ menu: toMenu });
                    },
                };
            default:
                return {
                    onMouseOver: (e) => {
                        this.setState({
                            style: {
                                ...this.state.style,
                                Emojis: {
                                    ...this.state.style.Emojis,
                                    [menu]: {
                                        ...this.state.style.Emojis[menu],
                                        [stampId]: {
                                            ...this.state.style.Emojis[menu][stampId],
                                            transform: "scale(1.1)",
                                        },
                                    },
                                },
                            },
                        });
                    },
                    onMouseOut: (e) => {
                        this.setState({
                            style: {
                                ...this.state.style,
                                Emojis: {
                                    ...this.state.style.Emojis,
                                    [menu]: {
                                        ...this.state.style.Emojis[menu],
                                        [stampId]: {
                                            ...this.state.style.Emojis[menu][stampId],
                                            transform: "scale(1.0)",
                                        },
                                    },
                                },
                            },
                        });
                    },
                    onClick: (e) => {
                        if (stampId !== 0) {
                            const post = index_1.default.map[stampId];
                            const app = {
                                inputPost: post,
                                inputStampId: stampId,
                                inputCurrentTime: 0,
                            };
                            this.api("post", { app });
                            this.clientAction("CLOSE_DISP_POSTS_SUPPORTER", { ui: { isOpenPostsSupporter: false } });
                        }
                        this.setState({ menu: toMenu });
                    },
                };
        }
    }
    getDisplay(menu) {
        const { state } = this.props;
        const { style: propsStyle } = state;
        const IconOpenEmoji = Icon_1.default.getOpenEmoji({}, state);
        const IconCloseEmoji = Icon_1.default.getCloseEmoji({}, state);
        const { style } = this.state;
        let display = [];
        switch (menu) {
            case PostsSupporter.COVER:
                display = Object.keys(index_1.default.inputs).map((label) => {
                    const coverStampId = index_1.default.inputs[label][0];
                    return (react_1.default.createElement("li", Object.assign({ key: menu + "_" + coverStampId, style: style[PostsSupporter.COVER][coverStampId] }, this.getEvents(menu, label, coverStampId)),
                        react_1.default.createElement("div", null, index_1.default.map[coverStampId]),
                        react_1.default.createElement("div", { style: propsStyle.postsSupporter.emojiLabel },
                            menu === PostsSupporter.COVER && IconOpenEmoji,
                            label)));
                });
                break;
            default:
                display = index_1.default.inputs[menu].map((stampId) => {
                    return (react_1.default.createElement("li", Object.assign({ key: menu + "_" + stampId, style: style.Emojis[menu][stampId] }, this.getEvents(menu, PostsSupporter.COVER, stampId)), index_1.default.map[stampId]));
                });
                display.unshift(react_1.default.createElement("li", Object.assign({ key: "backCover", style: style["Emojis"][menu][0] }, this.getEvents(menu, PostsSupporter.COVER, 0)), IconCloseEmoji));
                break;
        }
        return display;
    }
    render() {
        const { style } = this.props.state;
        const { menu } = this.state;
        const lis = this.getDisplay(menu);
        return (react_1.default.createElement("ul", { "data-component-name": "PostsSupporter", style: style.postsSupporter.self }, lis));
    }
}
exports.default = PostsSupporter;
//# sourceMappingURL=PostsSupporter.js.map