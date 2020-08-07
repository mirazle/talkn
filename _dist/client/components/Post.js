"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_timeago_1 = __importDefault(require("react-timeago"));
const Sequence_1 = __importDefault(require("api/Sequence"));
const Ui_1 = __importDefault(require("client/store/Ui"));
const Icon_1 = __importDefault(require("client/components/Icon"));
const util_1 = __importDefault(require("common/util"));
const conf_1 = __importDefault(require("client/conf"));
const MarqueeArea_1 = __importDefault(require("client/container/util/MarqueeArea"));
class Post extends MarqueeArea_1.default {
    constructor(props) {
        super(props);
        const { style, ui } = props;
        this.state = {
            postStyle: style,
            isBubblePost: ui.isBubblePost,
            ...this.superState,
        };
        this.renderUpper = this.renderUpper.bind(this);
        this.renderTime = this.renderTime.bind(this);
        this.getDecolationProps = this.getDecolationProps.bind(this);
    }
    componentWillReceiveProps(props) {
        const { postStyle, isBubblePost } = this.state;
        const beforeIsBubblePost = isBubblePost;
        const afterIsBubblePost = props.ui.isBubblePost;
        if (beforeIsBubblePost !== afterIsBubblePost) {
            this.setState({
                postStyle: {
                    ...postStyle,
                    self: { ...props.style.self },
                    upper: { ...postStyle.upper, display: props.style.upper.display },
                    bottomPost: { ...props.style.bottomPost },
                },
                isBubblePost: afterIsBubblePost,
            });
        }
    }
    getDecolationProps() {
        const { ui } = this.props;
        return {
            onMouseOver: () => {
                this.onMouseOverArea();
                if (ui.isBubblePost) {
                    this.setState({
                        postStyle: {
                            ...this.state.postStyle,
                            self: {
                                ...this.state.postStyle.self,
                                transition: "200ms",
                                transform: "scale( 1.05 )",
                                cursor: "pointer",
                            },
                        },
                    });
                }
            },
            onMouseLeave: () => {
                this.onMouseLeaveArea();
                if (ui.isBubblePost) {
                    this.setState({
                        postStyle: {
                            ...this.state.postStyle,
                            self: {
                                ...this.state.postStyle.self,
                                transition: "600ms",
                                transform: "scale( 1 )",
                                cursor: "default",
                            },
                        },
                    });
                }
            },
            onMouseDown: () => {
                if (ui.isBubblePost) {
                    this.setState({
                        postStyle: {
                            ...this.state.postStyle,
                            self: {
                                ...this.state.postStyle.self,
                                transform: "scale( 1 )",
                                cursor: "pointer",
                            },
                        },
                    });
                }
            },
            onMouseUp: () => {
                if (ui.isBubblePost) {
                    this.setState({
                        postStyle: {
                            ...this.state.postStyle,
                            self: {
                                ...this.state.postStyle.self,
                                transform: "scale( 1.05 )",
                                cursor: "pointer",
                            },
                        },
                    });
                }
            },
        };
    }
    componentDidMount() {
        this.measureText();
    }
    componentWillUnmount() {
        this.clearTimeout();
    }
    shouldComponentUpdate(props) {
        const { app, actionLog } = props;
        if (app.isMediaCh) {
            return true;
        }
        else {
            return !(props.app.actioned === "SCROLL_THREAD");
        }
    }
    componentDidUpdate() {
        this.measureText();
    }
    render() {
        const { app, ui, post, onClickPost } = this.props;
        const { postStyle } = this.state;
        const stampLabel = Icon_1.default.getStampLabel({ app, ui, post });
        let dispFavicon = conf_1.default.assetsIconPath + util_1.default.getSaveFaviconName(post.favicon);
        if (dispFavicon.indexOf(Sequence_1.default.HTTPS_PROTOCOL) !== 0 && dispFavicon.indexOf(Sequence_1.default.HTTP_PROTOCOL) !== 0) {
            if (post.protocol === Sequence_1.default.TALKN_PROTOCOL) {
                dispFavicon = `${Sequence_1.default.HTTPS_PROTOCOL}//${dispFavicon}`;
            }
            else {
                dispFavicon = `${post.protocol}//${dispFavicon}`;
            }
        }
        if (post.dispFlg) {
            return (react_1.default.createElement("li", Object.assign({ "data-component-name": "Post", id: post._id, style: postStyle.self, onClick: () => {
                    onClickPost(post.ch);
                } }, this.getDecolationProps()),
                this.renderUpper(),
                react_1.default.createElement("div", { style: postStyle.bottom },
                    react_1.default.createElement("span", { style: { ...postStyle.bottomIcon, backgroundImage: `url( ${dispFavicon} )` } }),
                    react_1.default.createElement("span", { style: postStyle.bottomPost, dangerouslySetInnerHTML: { __html: this.renderPost(post, ui) } }),
                    stampLabel)));
        }
        else {
            return undefined;
        }
    }
    renderTime() {
        const { postStyle } = this.state;
        const { app, ui, post } = this.props;
        const { createTime, currentTime } = post;
        if (app.isMediaCh) {
            const dispCurrentTime = String(currentTime).split(".")[0];
            return react_1.default.createElement("time", { style: postStyle.upperTimeago },
                dispCurrentTime,
                " sec.");
        }
        else {
            return (react_1.default.createElement("span", { style: postStyle.upperTimeago, className: "timeAgo" },
                react_1.default.createElement(react_timeago_1.default, { date: createTime, formatter: (value, unit, suffix) => {
                        let shortUnit = String(unit);
                        switch (String(unit)) {
                            case "year":
                                shortUnit = "YR";
                                break;
                            case "month":
                                shortUnit = "mo";
                                break;
                            case "week":
                                shortUnit = "wk";
                                break;
                            case "hour":
                                shortUnit = "hr";
                                break;
                            case "minute":
                                shortUnit = "min";
                                break;
                            case "second":
                                shortUnit = "sec";
                                break;
                        }
                        const dispSuffix = ui.extensionMode === Ui_1.default.extensionModeExtNoneLabel ? suffix : suffix.replace("ago", "");
                        return `${value} ${shortUnit} ${dispSuffix}`;
                    } })));
        }
    }
    renderUpper() {
        const { childLayerCnt, post } = this.props;
        const { title, _id } = post;
        const { postStyle } = this.state;
        const childLabel = childLayerCnt > 0 ? `${childLayerCnt}child` : "";
        const marqueeStyle = this.getMarqueeStyle();
        return (react_1.default.createElement("div", { style: { ...postStyle.upper, overflow: "hidden" } },
            react_1.default.createElement("div", { style: postStyle.upperChild }, childLabel),
            react_1.default.createElement("div", { ref: this.marqueeWrapRef, "data-component-name": "MarqueePost", style: postStyle.upperTitle, title: title },
                react_1.default.createElement("span", { ref: this.marqueeTextRef, style: marqueeStyle }, title)),
            this.renderTime()));
    }
    renderPost(post, ui) {
        if (post.stampId) {
            return Icon_1.default.getStampStr(post.post, 0, ui.isBubblePost);
        }
        else {
            return post.post;
        }
    }
}
exports.default = Post;
Post.defaultProps = {
    id: 0,
    app: {},
    ui: {},
    onClickPost: () => { },
    childLayerCnt: 0,
    post: {},
    style: {},
};
//# sourceMappingURL=Post.js.map