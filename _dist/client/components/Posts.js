"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const App_1 = __importDefault(require("api/store/App"));
const Ui_1 = __importDefault(require("client/store/Ui"));
const DateHelper_1 = __importDefault(require("client/container/util/DateHelper"));
const Post_1 = __importDefault(require("client/components/Post"));
const TimeMarker_1 = __importDefault(require("client/components/TimeMarker"));
class Posts extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnClickGetMore = this.handleOnClickGetMore.bind(this);
        this.handleOnClickPost = this.handleOnClickPost.bind(this);
        this.state = {
            scrollHeight: 0,
            scrollTop: 0,
            isAnimateScrolling: false,
            posts: [],
        };
    }
    componentDidMount() {
        const { app, ui } = this.props.state;
        if (ui.screenMode === Ui_1.default.screenModeLargeLabel) {
            const Posts = document.querySelector("[data-component-name=Posts]");
            window.talknWindow.dom.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight, { app, ui });
            this.setState({ scrollHeight: Posts.scrollHeight });
            this.animateScrollTo(Posts, 9999999, 400);
        }
        else {
            window.talknWindow.dom.animateScrollTo(99999999, 0);
        }
        this.clientAction("COMPONENT_DID_MOUNTS", { componentDidMounts: "Posts" });
    }
    componentWillReceiveProps(props) {
        const { app, postsTimeline, postsMulti, postsSingle, postsChild } = props.state;
        let posts = [];
        switch (app.dispThreadType) {
            case App_1.default.dispThreadTypeTimeline:
                posts = postsTimeline;
                break;
            case App_1.default.dispThreadTypeMulti:
                posts = postsMulti;
                break;
            case App_1.default.dispThreadTypeSingle:
                posts = postsSingle;
                break;
            case App_1.default.dispThreadTypeChild:
                posts = postsChild;
                break;
            case App_1.default.dispThreadTypeLogs:
                posts = postsChild;
                break;
        }
        if (this.state.posts !== posts) {
            this.setState({ ...this.state, posts });
        }
    }
    componentDidUpdate() {
        this.props.componentDidUpdates(this, "Posts");
    }
    animateScrollTo(element, to, duration, callback = () => { }) {
        if (!this.state.isAnimateScrolling) {
            let start = element.scrollTop;
            let change = to - start;
            let currentTime = 0;
            let increment = 20;
            const animateScroll = () => {
                currentTime += increment;
                let scrollTop = Math.easeInOutQuad(currentTime, start, change, duration);
                element.scrollTop = scrollTop;
                if (currentTime < duration) {
                    this.setState({ isAnimateScrolling: true });
                    setTimeout(animateScroll, increment);
                }
                else {
                    this.setState({ isAnimateScrolling: false });
                    callback();
                }
            };
            animateScroll();
        }
    }
    handleOnMouseDown() {
        const { ui } = this.props.state;
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel || ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
        }
    }
    handleOnClickPost(ch) {
        let { ui, app, threads } = this.props.state;
        if (threads[ch]) {
            ui = Ui_1.default.getUiUpdatedOpenFlgs({ app, ui }, "post");
            this.clientAction("ON_CLICK_TOGGLE_DISP_DETAIL", {
                ui,
                app: { detailCh: ch },
            });
        }
        else {
            this.api("changeThreadDetail", { thread: { ch } });
        }
    }
    handleOnClickGetMore() {
        const HtmlThread = this.refs.thread;
        this.setState({
            ...this.state,
            scrollHeight: HtmlThread.scrollHeight,
        });
        this.api("getMore", {});
    }
    render() {
        const { style } = this.props.state;
        return (react_1.default.createElement("ol", { "data-component-name": "Posts", style: style.posts.self, ref: "thread", onMouseDown: this.handleOnMouseDown, onScroll: (e) => {
                const { scrollTop, clientHeight, scrollHeight } = e.target;
                this.onScroll({ scrollTop, clientHeight, scrollHeight });
            } }, this.renderPostList()));
    }
    renderPostList() {
        const { state, nowDate } = this.props;
        const { app, thread, ui, style } = state;
        const posts = state[`posts${app.dispThreadType}`];
        const postCnt = posts.length;
        let dispPosts = [];
        let beforeDiffDay = 0;
        for (let i = 0; i < postCnt; i++) {
            let timeLabel = "";
            const post = posts[i];
            const postYmdhis = DateHelper_1.default.getMongoYmdhis(post.createTime);
            const diffDay = DateHelper_1.default.getDiffDay(nowDate, postYmdhis);
            const isDispTimeMarker = i === 0 ? true : beforeDiffDay !== diffDay;
            beforeDiffDay = diffDay;
            if (isDispTimeMarker) {
                switch (diffDay) {
                    case 0:
                        timeLabel = "Today";
                        break;
                    case 1:
                        timeLabel = "Yesterday";
                        break;
                    default:
                        timeLabel = `(${postYmdhis.Day})${postYmdhis.M}/${postYmdhis.D}`;
                        break;
                }
                dispPosts.push(react_1.default.createElement(TimeMarker_1.default, { key: `TimeMarker${i}_${timeLabel}`, type: "List", label: timeLabel, style: style.timeMarker.self }));
            }
            dispPosts.push(react_1.default.createElement(Post_1.default, { key: `${post._id}_${i}`, id: post._id, post: post, app: app, ui: ui, childLayerCnt: post.layer - thread.layer, style: style.post, onClickPost: this.handleOnClickPost }));
        }
        return dispPosts;
    }
}
exports.default = Posts;
//# sourceMappingURL=Posts.js.map