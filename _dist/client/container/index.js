"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const define_1 = __importDefault(require("common/define"));
const App_1 = __importDefault(require("api/store/App"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const handles_1 = __importDefault(require("api/actions/handles"));
const TalknSession_1 = __importDefault(require("client/operations/TalknSession"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const LoadingLogo_1 = __importDefault(require("client/components/LoadingLogo"));
const Style_1 = __importDefault(require("client/components/Style"));
const Header_1 = __importDefault(require("client/style/Header"));
const PostsFooter_1 = __importDefault(require("client/style/PostsFooter"));
const Icon_1 = __importDefault(require("client/components/Icon"));
const Posts_1 = __importDefault(require("client/components/Posts"));
const Header_2 = __importDefault(require("client/components/Header"));
const PostsFooter_2 = __importDefault(require("client/components/PostsFooter"));
const PostsSupporter_1 = __importDefault(require("client/components/PostsSupporter"));
const DetailRight_1 = __importDefault(require("client/components/DetailRight"));
const DetailModal_1 = __importDefault(require("client/components/DetailModal"));
const index_1 = __importDefault(require("client/components/Menu/index"));
const Board_1 = __importDefault(require("client/components/Board"));
const LockMenu_1 = __importDefault(require("client/components/LockMenu"));
const Media_1 = __importDefault(require("client/components/Media"));
const InnerNotif_1 = __importDefault(require("client/components/InnerNotif"));
const TimeMarker_1 = __importDefault(require("client/components/TimeMarker"));
const mapToStateToProps_1 = __importDefault(require("client/mapToStateToProps/"));
const Marquee_1 = __importDefault(require("client/container/util/Marquee"));
const DateHelper_1 = __importDefault(require("client/container/util/DateHelper"));
const actionWrap_1 = __importDefault(require("client/container/util/actionWrap"));
const componentDidUpdates_1 = __importDefault(require("client/container/componentDidUpdates"));
const TalknWindow_1 = __importDefault(require("client/operations/TalknWindow"));
const Icon_2 = __importDefault(require("client/style/Icon"));
class Container extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        const { thread } = this.apiState;
        const { ui } = props.clientState;
        this.state = { notifs: [] };
        window.talknWindow.parentCoreApi("find", thread.ch);
        if (ui.extensionMode === Ui_1.default.extensionModeExtIncludeLabel || ui.extensionMode === Ui_1.default.extensionModeExtNoneLabel) {
            window.talknWindow.parentCoreApi("findMenuIndex", thread.ch);
        }
        this.getProps = this.getProps.bind(this);
        this.renderSmall = this.renderSmall.bind(this);
        this.renderMiddle = this.renderMiddle.bind(this);
        this.renderLarge = this.renderLarge.bind(this);
        this.renderExtension = this.renderExtension.bind(this);
        this.handleOnClickFooterIcon = this.handleOnClickFooterIcon.bind(this);
        this.handleOnClickTogglePosts = this.handleOnClickTogglePosts.bind(this);
        this.handleOnClickToggleDetail = this.handleOnClickToggleDetail.bind(this);
        this.handleOnClickMultistream = this.handleOnClickMultistream.bind(this);
        this.handleOnClickCh = this.handleOnClickCh.bind(this);
    }
    componentDidMount() {
        window.talknWindow.parentCoreApi("componentDidMounts", "Container");
    }
    componentDidUpdate() {
        componentDidUpdates_1.default(this, "Container");
    }
    getProps() {
        return Object.assign(Object.assign({}, this.props), { componentDidUpdates: componentDidUpdates_1.default, handleOnClickFooterIcon: this.handleOnClickFooterIcon, handleOnClickMultistream: this.handleOnClickMultistream, handleOnClickTogglePosts: this.handleOnClickTogglePosts, handleOnClickToggleDetail: this.handleOnClickToggleDetail, handleOnClickCh: this.handleOnClickCh, nowDate: DateHelper_1.default.getNowYmdhis() });
    }
    handleOnClickToggleDetail(e) {
        const { clientState, onClickOpenLockMenu } = this.props;
        let { app, threadDetail } = this.apiState;
        let { ui } = clientState;
        if (ui.openLockMenu !== Ui_1.default.openLockMenuLabelNo) {
            onClickOpenLockMenu(Ui_1.default.openLockMenuLabelNo);
        }
        else {
            ui = Ui_1.default.getUiUpdatedOpenFlgs({ app, ui }, "headerDetailIcon");
            window.talknWindow.parentCoreApi("onClickToggleDispDetail", { threadDetail, ui });
        }
    }
    handleOnClickTogglePosts(e) {
        const { onClickTogglePosts, onClickToggleDispDetail, onClickOpenLockMenu, clientState } = this.props;
        let { app, thread, threadDetail } = this.apiState;
        let { ui } = clientState;
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel || ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
            onClickTogglePosts({ app, ui });
            if (ui.isOpenDetail) {
                ui.isOpenDetail = false;
                onClickToggleDispDetail({ threadDetail, thread, app, ui });
            }
            if (ui.openLockMenu !== Ui_1.default.openLockMenuLabelNo) {
                onClickOpenLockMenu(Ui_1.default.openLockMenuLabelNo);
            }
            window.talknWindow.parentExtTo("toggleIframe");
            if (!app.isLinkCh) {
                window.talknWindow.parentExtTo("getClientMetas");
            }
        }
    }
    handleOnClickFooterIcon(e) {
        const { toggleDispPostsSupporter } = this.props;
        toggleDispPostsSupporter();
    }
    handleOnClickMultistream() {
        const { app } = this.apiState;
        let { postsMulti, postsSingle } = this.apiState;
        let findFlg = false;
        const postsMultiCache = TalknSession_1.default.getStorage(app.rootCh, define_1.default.storageKey.postsMulti);
        const postsSingleCache = TalknSession_1.default.getStorage(app.rootCh, define_1.default.storageKey.postsSingle);
        postsMulti = postsMultiCache && postsMultiCache.length > 0 ? postsMultiCache : postsMulti;
        postsSingle = postsSingleCache && postsSingleCache.length > 0 ? postsSingleCache : postsSingle;
        app.dispThreadType =
            app.dispThreadType === App_1.default.dispThreadTypeMulti ? App_1.default.dispThreadTypeSingle : App_1.default.dispThreadTypeMulti;
        app.multistreamed = !(app.dispThreadType === App_1.default.dispThreadTypeMulti);
        app.multistream = app.dispThreadType === App_1.default.dispThreadTypeMulti;
        if (app.multistream) {
            if (postsMulti[0] && postsMulti[0]._id) {
                app.offsetFindId = postsMulti[0]._id;
                app.offsetMultiFindId = app.offsetFindId;
            }
            else {
                app.offsetFindId = App_1.default.defaultOffsetFindId;
                app.offsetMultiFindId = App_1.default.defaultOffsetFindId;
                findFlg = true;
            }
        }
        else {
            if (postsSingle[0] && postsSingle[0]._id) {
                app.offsetFindId = postsSingle[0]._id;
                app.offsetSingleFindId = app.offsetFindId;
            }
            else {
                app.offsetFindId = App_1.default.defaultOffsetFindId;
                app.offsetSingleFindId = App_1.default.defaultOffsetFindId;
                findFlg = true;
            }
        }
        this.props.onClickMultistream({ app, postsMulti, postsSingle });
        if (findFlg) {
            window.talknWindow.parentCoreApi("find", app.rootCh);
        }
    }
    handleOnClickCh(toCh, overWriteHasSlash, called = "") {
        const { ui } = this.props.clientState;
        actionWrap_1.default.onClickCh(toCh, ui, overWriteHasSlash, called);
    }
    render() {
        const { style, ui } = this.props.clientState;
        const { app } = this.apiState;
        if (style && style.container && style.container.self && app.tuned) {
            if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel || ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
                return this.renderExtension();
            }
            else {
                switch (ui.screenMode) {
                    case Ui_1.default.screenModeSmallLabel:
                        return this.renderSmall();
                    case Ui_1.default.screenModeMiddleLabel:
                        return this.renderMiddle();
                    case Ui_1.default.screenModeLargeLabel:
                        return this.renderLarge();
                }
            }
        }
        else {
            if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel || ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
                return null;
            }
        }
        return react_1.default.createElement(LoadingLogo_1.default, null);
    }
    renderFixMarker(props) {
        const { app, thread } = this.apiState;
        const { ui, uiTimeMarker, style } = this.props.clientState;
        if (ui.isLoading) {
            const loading = Icon_1.default.getLoading(Icon_2.default.getLoading({ app, ui }));
            return react_1.default.createElement(TimeMarker_1.default, { type: "Fix", label: loading, style: style.timeMarker.fixTimeMarker });
        }
        else if (thread.postCnt > 0 && uiTimeMarker.now) {
            return react_1.default.createElement(TimeMarker_1.default, { type: "Fix", label: uiTimeMarker.now.label, style: style.timeMarker.fixTimeMarker });
        }
        else {
            return undefined;
        }
    }
    renderLinkLabel(props) {
        const { style } = this.props.clientState;
        const { app, thread } = this.apiState;
        if (app.isLinkCh) {
            return (react_1.default.createElement("div", { "data-component-name": "linkLabel", style: style.container.linkLabel },
                react_1.default.createElement(Marquee_1.default, { text: `Link: ${thread.title}`, loop: true, hoverToStop: false, trailing: 0, leading: 0 })));
        }
        else {
            return null;
        }
    }
    renderNewPost(props) {
        const { style } = props.state;
        const log = false;
        let dispNewPost = false;
        const frameHeight = Header_1.default.headerHeight + PostsFooter_1.default.selfHeight;
        const postsFrameHeight = window.innerHeight - frameHeight;
        const postsRealHeight = TalknWindow_1.default.getPostsClientHeight();
        const PostsComponent = document.querySelector("[data-component-name=Posts]");
        if (log)
            console.log("フレーム枠の縦幅： " + postsFrameHeight);
        if (log)
            console.log("実際の投稿縦幅： " + PostsComponent.scrollHeight);
        if (log)
            console.log("最下位スクロール：　" + window.talknWindow.isScrollBottom);
        if (PostsComponent) {
            if (PostsComponent.scrollHeight < postsFrameHeight) {
            }
            else {
                if (window.talknWindow.isScrollBottom) {
                }
                else {
                    dispNewPost = true;
                }
            }
        }
        if (dispNewPost) {
            return (react_1.default.createElement("div", { "data-component-name": "newPost", style: style.container.newPost }, "NEW POST"));
        }
        else {
            return null;
        }
    }
    renderHideScreenBottom(props) {
        const { style } = props.state;
        return react_1.default.createElement("div", { "data-component-name": "hideScreenBottom", style: style.container.hideScreenBottom });
    }
    renderLarge() {
        const { style } = this.props.clientState;
        const props = this.getProps();
        const NewPost = this.renderNewPost(props);
        const LinkLabel = this.renderLinkLabel(props);
        const HideScreenBottom = this.renderHideScreenBottom(props);
        const FixMarker = this.renderFixMarker(props);
        const nowDate = DateHelper_1.default.getNowYmdhis();
        return (react_1.default.createElement("div", { "data-component-name": "Container", style: style.container.self },
            react_1.default.createElement(Style_1.default, Object.assign({}, props)),
            react_1.default.createElement(Posts_1.default, Object.assign({}, props)),
            react_1.default.createElement("span", { "data-component-name": "fixedComponents" },
                react_1.default.createElement(Media_1.default, Object.assign({}, props)),
                react_1.default.createElement(Board_1.default, Object.assign({}, props)),
                LinkLabel,
                NewPost,
                FixMarker,
                react_1.default.createElement(Header_2.default, Object.assign({}, props)),
                react_1.default.createElement(PostsSupporter_1.default, Object.assign({}, props)),
                react_1.default.createElement(DetailRight_1.default, Object.assign({}, props)),
                react_1.default.createElement(LockMenu_1.default, Object.assign({}, props)),
                react_1.default.createElement(PostsFooter_2.default, Object.assign({}, props)),
                react_1.default.createElement(index_1.default, Object.assign({}, props)),
                react_1.default.createElement(InnerNotif_1.default, Object.assign({}, this.props)),
                HideScreenBottom)));
    }
    renderMiddle() {
        const { style } = this.props.clientState;
        const props = this.getProps();
        const NewPost = this.renderNewPost(props);
        const LinkLabel = this.renderLinkLabel(props);
        const HideScreenBottom = this.renderHideScreenBottom(props);
        const FixMarker = this.renderFixMarker(props);
        return (react_1.default.createElement("div", { "data-component-name": "Container", style: style.container.self },
            react_1.default.createElement(Style_1.default, Object.assign({}, props)),
            react_1.default.createElement(Posts_1.default, Object.assign({}, props)),
            react_1.default.createElement("span", { "data-component-name": "fixedComponents" },
                react_1.default.createElement(Media_1.default, Object.assign({}, props)),
                react_1.default.createElement(Board_1.default, Object.assign({}, props)),
                LinkLabel,
                NewPost,
                FixMarker,
                react_1.default.createElement(Header_2.default, Object.assign({}, props)),
                react_1.default.createElement(PostsSupporter_1.default, Object.assign({}, props)),
                react_1.default.createElement(DetailModal_1.default, Object.assign({}, props)),
                react_1.default.createElement(PostsFooter_2.default, Object.assign({}, props)),
                react_1.default.createElement(index_1.default, Object.assign({}, props)),
                react_1.default.createElement(InnerNotif_1.default, Object.assign({}, this.props)),
                HideScreenBottom)));
    }
    renderSmall() {
        const { style } = this.props.clientState;
        const props = this.getProps();
        const NewPost = this.renderNewPost(props);
        const LinkLabel = this.renderLinkLabel(props);
        const HideScreenBottom = this.renderHideScreenBottom(props);
        const FixMarker = this.renderFixMarker(props);
        const nowDate = DateHelper_1.default.getNowYmdhis();
        return (react_1.default.createElement("span", { "data-component-name": "Container", style: style.container.self },
            react_1.default.createElement(Style_1.default, Object.assign({}, props)),
            react_1.default.createElement(Posts_1.default, Object.assign({}, props)),
            react_1.default.createElement("span", { "data-component-name": "fixedComponents" },
                react_1.default.createElement(Media_1.default, Object.assign({}, props)),
                react_1.default.createElement(Board_1.default, Object.assign({}, props)),
                LinkLabel,
                NewPost,
                FixMarker,
                react_1.default.createElement(Header_2.default, Object.assign({}, props)),
                react_1.default.createElement(PostsSupporter_1.default, Object.assign({}, props)),
                react_1.default.createElement(DetailModal_1.default, Object.assign({}, props)),
                react_1.default.createElement(PostsFooter_2.default, Object.assign({}, props)),
                react_1.default.createElement(index_1.default, Object.assign({}, props)),
                react_1.default.createElement(InnerNotif_1.default, Object.assign({}, this.props)),
                HideScreenBottom)));
    }
    renderExtension() {
        const { style } = this.props.clientState;
        const props = this.getProps();
        const NewPost = this.renderNewPost(props);
        const LinkLabel = this.renderLinkLabel(props);
        const extScreenStyle = props.clientState.style.extScreen.self;
        const FixMarker = this.renderFixMarker(props);
        return (react_1.default.createElement("span", { "data-component-name": "Container", style: style.container.self },
            react_1.default.createElement(Style_1.default, Object.assign({}, props)),
            react_1.default.createElement("div", { style: extScreenStyle, "data-component-name": "extScreen" },
                react_1.default.createElement(Posts_1.default, Object.assign({}, props)),
                react_1.default.createElement(Header_2.default, Object.assign({}, props)),
                react_1.default.createElement(Board_1.default, Object.assign({}, props)),
                LinkLabel,
                NewPost,
                FixMarker,
                react_1.default.createElement(PostsSupporter_1.default, Object.assign({}, props)),
                react_1.default.createElement(DetailModal_1.default, Object.assign({}, props)),
                react_1.default.createElement(InnerNotif_1.default, Object.assign({}, this.props))),
            react_1.default.createElement("span", { "data-component-name": "fixedComponents" },
                react_1.default.createElement(PostsFooter_2.default, Object.assign({}, props)))));
    }
}
exports.default = react_redux_1.connect(mapToStateToProps_1.default, Object.assign({}, handles_1.default))(Container);
//# sourceMappingURL=index.js.map