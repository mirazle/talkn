"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const App_1 = __importDefault(require("api/store/App"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const UiTimeMarker_1 = __importDefault(require("api/store/UiTimeMarker"));
const DateHelper_1 = __importDefault(require("client/container/util/DateHelper"));
const Post_1 = __importDefault(require("client/components/Post"));
const TimeMarker_1 = __importDefault(require("client/components/TimeMarker"));
const conf_1 = __importDefault(require("common/conf"));
class Posts extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnScroll = this.handleOnScroll.bind(this);
        this.handleOnClickGetMore = this.handleOnClickGetMore.bind(this);
        this.handleOnClickPost = this.handleOnClickPost.bind(this);
        this.state = {
            scrollHeight: 0,
            scrollTop: 0,
            isAnimateScrolling: false,
            posts: []
        };
    }
    componentDidMount() {
        const { ui } = this.props.clientState;
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel ||
            ui.extensionMode === Ui_1.default.extensionModeExtIncludeLabel ||
            ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
            const Posts = document.querySelector("[data-component-name=Posts]");
            window.talknWindow.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight);
            this.setState({ scrollHeight: Posts.scrollHeight });
            this.animateScrollTo(Posts, 9999999, 400);
        }
        else {
            window.talknWindow.animateScrollTo(99999999, 0);
        }
        window.talknWindow.parentCoreApi("componentDidMounts", "Posts");
    }
    componentWillReceiveProps(props) {
        const { app, postsTimeline, postsMulti, postsSingle, postsChild } = this.apiState;
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
            this.setState(Object.assign(Object.assign({}, this.state), { posts }));
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
        const { ui } = this.props.clientState;
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel || ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
        }
    }
    handleOnScroll(e) {
        const { app, thread } = this.apiState;
        const { ui } = this.props.clientState;
        let { uiTimeMarker } = this.props.clientState;
        if (ui.isOpenNewPost) {
            this.props.closeNewPost();
        }
        const { clientHeight, scrollTop, scrollHeight } = e.target;
        const isScrollBottom = scrollHeight === scrollTop + clientHeight;
        window.talknWindow.setIsScrollBottom({ app, ui }, isScrollBottom);
        const newUiTimeMarker = UiTimeMarker_1.default.update(scrollTop, uiTimeMarker);
        if (uiTimeMarker.now.label !== newUiTimeMarker.now.label) {
            window.talknWindow.parentCoreApi("onScrollUpdateTimeMarker", newUiTimeMarker);
        }
        if (scrollTop === 0) {
            if (thread.postCnt > conf_1.default.findOnePostCnt) {
                const timeMarkerList = document.querySelector("[data-component-name=TimeMarkerList]");
                if (timeMarkerList && timeMarkerList.style) {
                    timeMarkerList.style.opacity = 0;
                }
                const HtmlThread = this.refs.thread;
                this.setState(Object.assign(Object.assign({}, this.state), { scrollHeight: HtmlThread.scrollHeight }));
                window.talknWindow.exeGetMore(this.props.clientState);
            }
        }
    }
    handleOnClickPost(ch) {
        const { app, threads } = this.apiState;
        let { ui } = this.props.clientState;
        if (threads[ch]) {
            ui = Ui_1.default.getUiUpdatedOpenFlgs({ app, ui }, "post");
            window.talknWindow.parentCoreApi("onClickToggleDispDetail", {
                threadDetail: threads[ch],
                ui
            });
        }
        else {
            window.talknWindow.parentCoreApi("changeThreadDetail", ch);
        }
    }
    handleOnClickGetMore() {
        const HtmlThread = this.refs.thread;
        this.setState(Object.assign(Object.assign({}, this.state), { scrollHeight: HtmlThread.scrollHeight }));
        window.talknWindow.parentCoreApi("getMore");
    }
    render() {
        const { style } = this.props.clientState;
        return (react_1.default.createElement("ol", { "data-component-name": "Posts", style: style.posts.self, ref: "thread", onMouseDown: this.handleOnMouseDown, onScroll: this.handleOnScroll }, this.renderPostList()));
    }
    renderPostList() {
        const { app, thread } = this.apiState;
        const { clientState, nowDate } = this.props;
        const { ui, style } = clientState;
        const posts = clientState[`posts${app.dispThreadType}`];
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