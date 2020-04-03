"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("api/store/App"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const TalknWindow_1 = __importDefault(require("client/operations/TalknWindow"));
const TalknMedia_1 = __importDefault(require("client/operations/TalknMedia"));
const storage_1 = __importDefault(require("client/mapToStateToProps/storage"));
exports.default = (self, constructorName) => {
    const { props } = self;
    const { actionLog } = props.state;
    const actionName = actionLog[0];
    if (componentDidUpdates[constructorName]) {
        if (componentDidUpdates[constructorName][actionName]) {
            componentDidUpdates[constructorName][actionName](self);
        }
    }
};
const componentDidUpdates = {
    Container: {
        "SERVER_TO_CLIENT[EMIT]:find": self => {
            const { ui } = self.props.clientState;
            const { app, thread } = self.apiState;
            const Posts = document.querySelector("[data-component-name=Posts]");
            const ch = thread.ch;
            ui.postsHeight += TalknWindow_1.default.getPostsHeight();
            self.props.updatePostsHeight(ui.postsHeight);
            if (ui.extensionMode === "NONE" && Posts) {
                switch (ui.screenMode) {
                    case Ui_1.default.screenModeLargeLabel:
                        Posts.scrollTop = 99999999;
                        break;
                    default:
                        window.scrollTo(0, 99999999);
                        break;
                }
                window.talknWindow.threadHeight = Posts.clientHeight;
                if (app.dispThreadType === App_1.default.dispThreadTypeTimeline) {
                    TalknMedia_1.default.init("FIND");
                    const timeline = storage_1.default.getStoragePostsTimeline(ch);
                    const media = TalknMedia_1.default.getMedia(thread);
                    window.talknMedia = new TalknMedia_1.default();
                    window.talknMedia.setTimeline(timeline);
                    window.talknMedia.startMedia(media);
                }
            }
            if (ui.extensionMode === Ui_1.default.extensionModeExtNoneLabel) {
                switch (ui.screenMode) {
                    case Ui_1.default.screenModeLargeLabel:
                        if (Posts && Posts.scrollHeight) {
                            window.talknWindow.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight);
                        }
                        break;
                    case Ui_1.default.screenModeMiddleLabel:
                    case Ui_1.default.screenModeSmallLabel:
                        window.talknWindow.updateUiTimeMarker(window.scrollY - window.innerHeight);
                        break;
                }
            }
            else {
                window.talknWindow.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight);
            }
            if (!ui.isOpenLinks) {
                window.talknWindow.parentCoreApi("closeLinks");
            }
            window.talknWindow.parentExtTo("find", self.props.state);
            window.talknWindow.resizeEndWindow();
        },
        "SERVER_TO_CLIENT[EMIT]:changeThreadDetail": self => {
            const { ui } = self.props.clientState;
            const { thread, threadDetail } = self.apiState;
            if (!ui.isOpenDetail) {
                ui.isOpenDetail = true;
                window.talknWindow.parentCoreApi("onClickToggleDispDetail", { threadDetail, thread, ui });
            }
        },
        ON_CLICK_MULTISTREAM: self => {
            const { ui } = self.props.clientState;
            const Posts = document.querySelector("[data-component-name=Posts]");
            if (ui.extensionMode === Ui_1.default.extensionModeExtNoneLabel) {
                switch (ui.screenMode) {
                    case Ui_1.default.screenModeLargeLabel:
                        window.talknWindow.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight);
                        break;
                    case Ui_1.default.screenModeMiddleLabel:
                    case Ui_1.default.screenModeSmallLabel:
                        window.talknWindow.updateUiTimeMarker(window.scrollY - window.innerHeight);
                        break;
                }
            }
            else {
                window.talknWindow.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight);
            }
        },
        ON_TRANSITION_END: self => {
            const { ui } = self.props.clientState;
            ui.postsHeight += TalknWindow_1.default.getPostsHeight();
            self.props.updatePostsHeight(ui.postsHeight);
        },
        ON_CHANGE_FIND_TYPE: self => {
            const { ch } = self.props.clientState.thread;
            window.talknWindow.parentCoreApi("findMenuIndex", ch);
        },
        DELEGATE_POST: self => {
            window.talknWindow.parentCoreApi("post");
            window.talknWindow.parentCoreApi("onChangeInputPost");
            window.talknWindow.parentCoreApi("closeDispPostsSupporter");
        },
        GET_CLIENT_METAS: self => {
            const { app, thread } = self.props.clientState;
            const { serverMetas } = thread;
            if (!app.isLinkCh) {
                window.talknWindow.parentCoreApi("updateThreadServerMetas", serverMetas);
            }
        },
        ON_CLICK_TOGGLE_DISP_DETAIL: self => {
            const { ui } = self.props.clientState;
            if (ui.extensionMode === Ui_1.default.extensionModeExtModalLabel || ui.extensionMode === Ui_1.default.extensionModeExtIncludeLabel) {
                window.talknWindow.parentExtTo("getClientMetas");
            }
        },
        TOGGLE_BUBBLE_POST: self => {
            const { ui } = self.props.clientState;
            const Posts = document.querySelector("[data-component-name=Posts]");
            if (ui.extensionMode === Ui_1.default.extensionModeExtNoneLabel) {
                switch (ui.screenMode) {
                    case Ui_1.default.screenModeLargeLabel:
                        Posts.scrollTop = Posts.scrollHeight - Posts.clientHeight;
                        window.talknWindow.updateUiTimeMarker(Posts.scrollTop);
                        break;
                    case Ui_1.default.screenModeMiddleLabel:
                    case Ui_1.default.screenModeSmallLabel:
                        const wndowScrollY = window.scrollY - window.innerHeight;
                        window.scrollTo(0, wndowScrollY);
                        window.talknWindow.updateUiTimeMarker(wndowScrollY);
                        break;
                }
            }
            else {
                Posts.scrollTop = Posts.scrollHeight - Posts.clientHeight;
                window.talknWindow.updateUiTimeMarker(Posts.scrollTop);
            }
        },
        RESIZE_END_WINDOW: self => { }
    },
    Posts: {
        "SERVER_TO_CLIENT[BROADCAST]:find": self => {
            changeLockMode(self, "Posts");
        },
        RESIZE_END_WINDOW: self => {
            changeLockMode(self, "Posts");
        },
        SCROLL_THREAD: self => { },
        NEXT_POSTS_TIMELINE: post,
        "SERVER_TO_CLIENT[BROADCAST]:post": post,
        "CLIENT_TO_SERVER[EMIT]:getMore": self => { },
        "SERVER_TO_CLIENT[EMIT]:getMore": self => {
            const { ui } = self.props.clientState;
            const Posts = document.querySelector("[data-component-name=Posts]");
            if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel ||
                ui.extensionMode === Ui_1.default.extensionModeExtIncludeLabel ||
                ui.extensionMode === Ui_1.default.extensionModeExtModalLabel) {
                Posts.scrollTop = Posts.scrollHeight - self.state.scrollHeight;
            }
            else {
                if (ui.screenMode === Ui_1.default.screenModeLargeLabel) {
                    Posts.scrollTop = Posts.scrollHeight - self.state.scrollHeight;
                }
                else {
                    const scrollTo = Posts.clientHeight - window.talknWindow.threadHeight;
                    window.scrollTo(0, scrollTo);
                    window.talknWindow.threadHeight = Posts.clientHeight;
                }
            }
            switch (ui.screenMode) {
                case Ui_1.default.screenModeLargeLabel:
                    window.talknWindow.updateUiTimeMarker(Posts.scrollTop);
                    break;
                case Ui_1.default.screenModeMiddleLabel:
                case Ui_1.default.screenModeSmallLabel:
                    window.talknWindow.updateUiTimeMarker(window.scrollY);
                    break;
            }
        }
    }
};
function changeLockMode(self, called) {
    const { ui } = self.props.clientState;
    const { actionLog } = self.apiState;
    if (ui.extensionMode === Ui_1.default.extensionModeExtNoneLabel) {
        if (ui.screenMode === Ui_1.default.screenModeLargeLabel) {
            if (called === "Posts") {
                if (actionLog[0] === "SERVER_TO_CLIENT[BROADCAST]:find") {
                    self.refs.thread.scrollTop = 999999;
                }
                else {
                }
            }
            else {
                if (actionLog[0] === "SERVER_TO_CLIENT[EMIT]:find") {
                }
                else {
                }
            }
            window.talknWindow.lockWindow({});
        }
        else {
            window.talknWindow.unlockWindow({});
        }
    }
}
function post(self) {
    const { ui } = self.props.clientState;
    const { app } = self.apiState;
    const Posts = document.querySelector("[data-component-name=Posts]");
    ui.postsHeight += TalknWindow_1.default.getLastPostHeight();
    const postsScrollFunc = () => {
        if (ui.isOpenPosts && window.talknWindow.isScrollBottom) {
            self.animateScrollTo(Posts, Posts.scrollHeight, 400, self.props.endAnimateScrollTo);
        }
        if (ui.isOpenPosts) {
            self.props.openNewPost();
        }
    };
    if (ui.extensionMode === "NONE") {
        if (ui.screenMode === Ui_1.default.screenModeLargeLabel) {
            postsScrollFunc();
        }
        else {
            window.talknWindow.threadHeight = Posts.clientHeight;
            if (ui.isOpenPosts && window.talknWindow.isScrollBottom) {
                window.talknWindow.animateScrollTo(window.talknWindow.threadHeight, 400, self.props.endAnimateScrollTo);
            }
            if (ui.isOpenPosts) {
                self.props.openNewPost();
            }
        }
    }
    else {
        postsScrollFunc();
    }
}
//# sourceMappingURL=componentDidUpdates.js.map