"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = __importDefault(require("common/conf"));
const util_1 = __importDefault(require("common/util"));
const define_1 = __importDefault(require("common/define"));
const Sequence_1 = __importDefault(require("api/Sequence"));
const App_1 = __importDefault(require("api/store/App"));
const Posts_1 = __importDefault(require("api/store/Posts"));
const Ui_1 = __importDefault(require("client/store/Ui"));
const Container_1 = __importDefault(require("client/style/Container"));
exports.default = {
    updateAction: (store) => (next) => (action) => {
        const state = store.getState();
        action.ui = action.ui ? { ...state.ui, ...action.ui } : state.ui;
        action.app = action.app ? { ...state.app, ...action.app } : state.app;
        if (functions[action.type]) {
            action = functions[action.type](state, action);
        }
        if (action) {
            next(action);
        }
    },
};
const functions = {
    "API_TO_CLIENT[REQUEST]:getMore": (state, action) => {
        action.ui.isLoading = true;
        return action;
    },
    "API_TO_CLIENT[EMIT]:getMore": (state, action) => {
        action.ui.isLoading = false;
        return action;
    },
    "API_TO_CLIENT[REQUEST]:fetchPosts": (state, action) => {
        action.ui.isLoading = true;
        return action;
    },
    "API_TO_CLIENT[REQUEST]:changeThread": (state, action) => {
        action.ui.isLoading = true;
        return action;
    },
    "API_TO_CLIENT[EMIT]:fetchPosts": (state, action) => {
        action.ui.isLoading = false;
        action.ui.detailCh = action.thread.ch;
        if (!action.app.isLinkCh) {
            switch (action.ui.extensionMode) {
                case Ui_1.default.extensionModeExtBottomLabel:
                    if (!action.ui.isOpenPosts && !action.ui.isDispPosts) {
                        const transition = Container_1.default.transitionNotif * 4 + Container_1.default.transitionNotifDisp;
                        window.talknWindow.ext.to("openNotif", { transition });
                    }
                    break;
                case Ui_1.default.extensionModeExtModalLabel:
                    if (!action.app.isMediaCh && action.posts.length > 0) {
                        const id = action.posts[action.posts.length - 1]["_id"];
                        const post = action.posts[action.posts.length - 1]["post"];
                        const stampId = action.posts[action.posts.length - 1]["stampId"];
                        let favicon = action.posts[action.posts.length - 1]["favicon"];
                        favicon = Sequence_1.default.HTTPS_PROTOCOL + "//" + conf_1.default.assetsIconPath + util_1.default.getSaveFaviconName(favicon);
                        window.talknWindow.ext.to("openNotif", {
                            id,
                            post,
                            stampId,
                            favicon,
                            addUnreadCnt: action.posts.length,
                        });
                    }
                    break;
            }
        }
        return action;
    },
    "API_TO_CLIENT[BROADCAST]:post": (state, action) => {
        const postLength = action.posts.length - 1;
        switch (action.ui.extensionMode) {
            case Ui_1.default.extensionModeExtBottomLabel:
                if (!action.ui.isOpenPosts && !action.ui.isDispPosts) {
                    const transition = Container_1.default.transitionNotif * 4 + Container_1.default.transitionNotifDisp;
                    window.talknWindow.ext.to("openNotif", { transition });
                }
                break;
            case Ui_1.default.extensionModeExtModalLabel:
                if (action.posts.length > 0) {
                    const id = action.posts[postLength]["_id"];
                    const post = action.posts[postLength]["post"];
                    const stampId = action.posts[postLength]["stampId"];
                    let favicon = action.posts[postLength]["favicon"];
                    favicon = Sequence_1.default.HTTPS_PROTOCOL + "//" + conf_1.default.assetsIconPath + util_1.default.getSaveFaviconName(favicon);
                    window.talknWindow.ext.to("openNotif", {
                        id,
                        post,
                        stampId,
                        favicon,
                        addUnreadCnt: action.posts.length,
                    });
                }
                break;
        }
        return action;
    },
    "CLIENT_TO_API[EMIT]:getMore": (state, action) => {
        action.ui.isLoading = true;
        return action;
    },
    ON_CLICK_MULTISTREAM: (state, action) => {
        const posts = Posts_1.default.getDispPosts(action);
        const postLength = posts && posts.length ? posts.length : 0;
        if (postLength > 0 && state.ranks.length > 0) {
            action.ranks = state.ranks.map((mi) => {
                if (state.app.rootCh === mi.ch) {
                    return {
                        ...mi,
                        favicon: posts[postLength - 1].favicon,
                        post: posts[postLength - 1].post,
                        stampId: posts[postLength - 1].stampId,
                    };
                }
                else {
                    return mi;
                }
            });
        }
        return action;
    },
    NEXT_POSTS_TIMELINE: (state, action) => {
        const { ui } = state;
        switch (ui.extensionMode) {
            case Ui_1.default.extensionModeExtBottomLabel:
                if (!ui.isOpenPosts && !ui.isDispPosts) {
                    const transition = Container_1.default.transitionNotif * 4 + Container_1.default.transitionNotifDisp;
                    window.talknWindow.ext.to("openNotif", { transition });
                }
                break;
            case Ui_1.default.extensionModeExtModalLabel:
                const postsTimelineLength = action.postsTimeline.length;
                if (postsTimelineLength > 0) {
                    const id = action.postsTimeline[postsTimelineLength - 1]["_id"];
                    const post = action.postsTimeline[postsTimelineLength - 1]["post"];
                    const stampId = action.postsTimeline[postsTimelineLength - 1]["stampId"];
                    let favicon = action.postsTimeline[postsTimelineLength - 1]["favicon"];
                    favicon = Sequence_1.default.HTTPS_PROTOCOL + "//" + conf_1.default.assetsIconPath + util_1.default.getSaveFaviconName(favicon);
                    window.talknWindow.ext.to("openNotif", {
                        id,
                        post,
                        stampId,
                        favicon,
                        addUnreadCnt: postsTimelineLength,
                    });
                }
                break;
        }
        return action;
    },
    TOGGLE_DISP_POSTS_SUPPORTER: (state, action) => {
        state.ui.isOpenPostsSupporter = !state.ui.isOpenPostsSupporter;
        return action;
    },
    TOGGLE_LINKS: (state, action) => {
        action.ui.isOpenLinks = !state.ui.isOpenLinks;
        return action;
    },
    ON_CLICK_TOGGLE_POSTS: (state, action) => {
        action.ui.isOpenPosts = action.ui.isOpenPosts ? action.ui.isOpenPosts : Ui_1.default.getIsOpenPosts(action.ui);
        return action;
    },
    ON_CLICK_TOGGLE_DISP_DETAIL: (state, action) => {
        const threadDetail = state.threads[action.app.detailCh];
        action.threadDetail = { ...threadDetail };
        return action;
    },
    OFF_TRANSITION: (state, action) => {
        action.ui.height = App_1.default.getHeight();
        action.ui.isOpenPosts = action.ui.isOpenPosts ? action.ui.isOpenPosts : Ui_1.default.getIsOpenPosts(action.ui);
        return action;
    },
    ON_TRANSITION_END: (state, action) => {
        action.ui.height = Ui_1.default.getHeight();
        action.ui.isOpenPosts = Ui_1.default.getIsOpenPosts(action.ui);
        return action;
    },
    ON_RESIZE_START_WINDOW: (state, action) => {
        action.ranks = state.ranks;
        return action;
    },
    ON_RESIZE_END_WINDOW: (state, action) => {
        action.ranks = state.ranks;
        return action;
    },
    ON_CLICK_TO_MULTI_THREAD: (state, action) => {
        action.ui.isLoading = !action.ui.isLoading;
        return action;
    },
    ON_CLICK_TOGGLE_DISP_MENU: (state, action) => {
        action.ui.isOpenMenu = !action.ui.isOpenMenu;
        return action;
    },
    TOGGLE_DISP_BOARD: (state, action) => {
        action.ui.isOpenBoard = !state.ui.isOpenBoard;
        return action;
    },
    OPEN_NEW_POST: (state, action) => {
        action.ui.isOpenNewPost = true;
        return action;
    },
    TOGGLE_BUBBLE_POST: (state, action) => {
        action.ui.isBubblePost = !state.ui.isBubblePost;
        return action;
    },
    CLOSE_NEW_POST: (state, action) => {
        action.ui.isOpenNewPost = false;
        return action;
    },
    OPEN_INNER_NOTIF: (state, action) => {
        action.ui.openInnerNotif = action.ui.openInnerNotif === "" ? define_1.default.noInnerNotif : action.ui.openInnerNotif;
        return action;
    },
    ON_CHANGE_INPUT_POST: (state, action) => {
        const inputPost = action.ui.inputPost;
        window.talknWindow.ext.to("setInputPost", { inputPost });
        return action;
    },
    GET_CLIENT_METAS: (state, action) => {
        let updateFlg = false;
        let { clientMetas } = action;
        let { serverMetas } = state.thread;
        action.thread = {};
        Object.keys(clientMetas).forEach((key, i) => {
            if (clientMetas[key] && clientMetas[key] !== "" && serverMetas[key] !== clientMetas[key]) {
                if (!action.thread.serverMetas) {
                    action.thread.serverMetas = {};
                }
                updateFlg = true;
                action.thread.serverMetas[key] = clientMetas[key];
            }
        });
        if (updateFlg) {
            action.threadDetail = { ...state.threadDetail };
            action.threadDetail.serverMetas = {
                ...action.threadDetail.serverMetas,
                ...action.thread.serverMetas,
            };
            return action;
        }
    },
};
//# sourceMappingURL=index.js.map