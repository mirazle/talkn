"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(require("api/store/Schema"));
const App_1 = __importDefault(require("api/store/App"));
const Posts_1 = __importDefault(require("api/store/Posts"));
const Thread_1 = __importDefault(require("api/store/Thread"));
const Threads_1 = __importDefault(require("api/store/Threads"));
const storage_1 = __importDefault(require("api/mapToStateToProps/storage"));
exports.default = {
    updateAction: store => next => action => {
        const state = store.getState();
        if (action) {
            action.app = action.app ? Object.assign(Object.assign({}, state.app), action.app) : state.app;
            action.app.actioned = action.type;
        }
        if (functions[action.type]) {
            action = functions[action.type](state, action);
        }
        if (action) {
            next(action);
        }
    }
};
const functions = {
    "CLIENT_TO_SERVER[EMIT]:find": (state, action) => {
    },
    "SERVER_TO_CLIENT[BROADCAST]:find": (state, action) => {
        action.app.tuned = action.thread.ch;
        return action;
    },
    "SERVER_TO_CLIENT[EMIT]:updateThread": (state, action) => {
        action.threads = Threads_1.default.getMergedThreads(state.threads, action.thread);
        action.threadDetail = Object.assign({}, action.thread);
        return action;
    },
    "SERVER_TO_CLIENT[EMIT]:find": (state, action) => {
        action = resolve.caseNoExistResponsePost(state, action);
        action.app[`offset${action.app.dispThreadType}FindId`] = action.app.offsetFindId;
        action.app.detailCh = action.thread.ch;
        action.app.desc = action.thread.serverMetas.title;
        action.app.isRootCh = action.app.rootCh === action.thread.ch;
        action.app.isMediaCh = App_1.default.getIsMediaCh(action.thread.ch);
        action = Object.assign({}, Posts_1.default.getAnyActionPosts(action));
        action.thread.title = action.thread.serverMetas.title;
        action.thread.hasSlash = Schema_1.default.getBool(action.thread.hasSlash);
        action.threads = Threads_1.default.getMergedThreads(state.threads, action.thread);
        action.threadDetail = Object.assign({}, action.thread);
        if (action.app.isRootCh)
            action.app.rootTitle = action.thread.title;
        if (!action.app.isLinkCh) {
        }
        if (action.app.isMediaCh) {
            const src = App_1.default.getMediaSrc(action.thread.protocol, action.thread.ch);
            action.app.chType = App_1.default.getMediaTypeFromSrc(src);
            action = storage_1.default.setStoragePostsTimeline(action);
        }
        else {
            action.app.chType = App_1.default.mediaTagTypeNo;
        }
        return action;
    },
    "CLIENT_TO_SERVER[EMIT]:changeThread": (state, action) => {
        action.app = action.app ? Object.assign(Object.assign({}, state.app), action.app) : state.app;
        action.app.offsetFindId = App_1.default.defaultOffsetFindId;
        action.app.offsetTimelineFindId = App_1.default.defaultOffsetFindId;
        action.app.offsetMultiFindId = App_1.default.defaultOffsetFindId;
        action.app.offsetSingleFindId = App_1.default.defaultOffsetFindId;
        action.app.offsetChildFindId = App_1.default.defaultOffsetFindId;
        action.app.offsetLogsFindId = App_1.default.defaultOffsetFindId;
        action.thread = action.thread ? Object.assign(Object.assign({}, state.thread), action.thread) : state.thread;
        return action;
    },
    CLOSE_LINKS: (state, action) => {
        action.app = action.app ? Object.assign(Object.assign({}, state.app), action.app) : state.app;
        action.thread = action.thread ? Object.assign(Object.assign({}, state.thread), action.thread) : state.thread;
        return action;
    },
    "SERVER_TO_CLIENT[BROADCAST]:post": (state, action) => {
        const { user } = state;
        const postLength = action.posts.length - 1;
        action.app.inputStampId = 0;
        action.user = user;
        const emotionKeys = Object.keys(action.thread.emotions);
        if (action.thread.ch === action.posts[postLength].ch && emotionKeys.length > 0) {
            const actionEmotions = Object.assign({}, action.thread.emotions);
            action.thread.emotions = Object.assign({}, state.thread.emotions);
            Object.keys(actionEmotions).forEach(emotionModelKey => {
                Object.keys(actionEmotions[emotionModelKey]).forEach(emotionKey => {
                    action.thread.emotions[emotionModelKey][emotionKey] =
                        action.thread.emotions[emotionModelKey][emotionKey] + actionEmotions[emotionModelKey][emotionKey];
                });
            });
        }
        else {
            action.thread.emotions = state.thread.emotions;
        }
        action = Posts_1.default.getAnyActionPosts(action);
        return action;
    },
    "CLIENT_TO_SERVER[EMIT]:getMore": (state, action) => {
        action.ui.isLoading = true;
        return action;
    },
    "SERVER_TO_CLIENT[EMIT]:getMore": (state, action) => {
        action.app.offsetFindId = App_1.default.getOffsetFindId({ posts: action.posts });
        action.app[`offset${action.app.dispThreadType}FindId`] = action.app.offsetFindId;
        action = Posts_1.default.getAnyActionPosts(action);
        return action;
    },
    "SERVER_TO_CLIENT[EMIT]:changeThreadDetail": (state, action) => {
        action.app.detailCh = action.thread.ch;
        action.threads = Threads_1.default.getMergedThreads(state.threads, action.thread);
        action.threadDetail = Object.assign({}, action.thread);
        action.threadDetail.title = action.thread.serverMetas.title;
        action.threadDetail.hasSlash =
            action.threadDetail.hasSlash === null ? true : Schema_1.default.getBool(action.threadDetail.hasSlash);
        delete action.thread;
        return action;
    },
    NEXT_POSTS_TIMELINE: (state, action) => {
        return action;
    },
    ON_CLICK_TO_MULTI_THREAD: (state, action) => {
        action.app.isLinkCh = false;
        action.app.isRootCh = action.thread.ch === state.app.rootCh;
        if (state.threads[action.thread.ch]) {
            action.thread = state.threads[action.thread.ch];
        }
        else {
            action.thread = Object.assign(Object.assign({}, state.thread), action.thread);
        }
        return action;
    },
    ON_CLICK_TO_TIMELINE_THREAD: (state, action) => {
        const ch = action.thread.ch;
        action.thread = Object.assign(Object.assign({}, state.thread), action.thread);
        action.thread.ch = ch;
        const src = App_1.default.getMediaSrc(action.thread.protocol, action.thread.ch);
        action.thread.findType = Thread_1.default.getFindTypeFromSrc(src);
        action.postsTimeline = [];
        action.app.isMediaCh = true;
        action.app.offsetFindId = App_1.default.defaultOffsetFindId;
        action.app.offsetChildFindId = App_1.default.defaultOffsetFindId;
        return action;
    },
    ON_CLICK_TO_SINGLE_THREAD: (state, action) => {
        action.thread = Object.assign(Object.assign({}, state.thread), action.thread);
        action.app = state.app;
        action.app.isLinkCh = false;
        return action;
    },
    ON_CLICK_TO_CHILD_THREAD: (state, action) => {
        action.thread = Object.assign(Object.assign({}, state.thread), action.thread);
        action.postsChild = [];
        action.app.offsetFindId = App_1.default.defaultOffsetFindId;
        action.app.offsetChildFindId = App_1.default.defaultOffsetFindId;
        return action;
    },
    TOGGLE_DISP_POSTS_SUPPORTER: (state, action) => {
        return action;
    },
    TOGGLE_LINKS: (state, action) => {
        return action;
    },
    ON_CLICK_MENU: (state, action) => {
        action.app.desc = action.ui.menuComponent;
        return action;
    },
    ON_CLICK_TOGGLE_POSTS: (state, action) => {
        return action;
    },
    OFF_TRANSITION: (state, action) => {
        return action;
    },
    ON_TRANSITION_END: (state, action) => {
        return action;
    },
    RESIZE_END_WINDOW: (state, action) => {
        action.thread = state.thread;
        return action;
    },
    ON_CLICK_TOGGLE_DISP_MENU: (state, action) => {
        return action;
    },
    ON_CLICK_TOGGLE_DISP_DETAIL: (state, action) => {
        action.threadDetail.hasSlash =
            action.threadDetail.hasSlash === null ? true : Schema_1.default.getBool(action.threadDetail.hasSlash);
        return action;
    },
    TOGGLE_DISP_BOARD: (state, action) => {
        return action;
    },
    TOGGLE_BUBBLE_POST: (state, action) => {
        action.thread = state.thread;
        return action;
    },
    START_LINK_MEDIA: (state, action) => {
        action.app.isLinkCh = true;
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
            action.threadDetail = Object.assign({}, state.threadDetail);
            action.threadDetail.serverMetas = Object.assign(Object.assign({}, action.threadDetail.serverMetas), action.thread.serverMetas);
            return action;
        }
    }
};
const resolve = {
    caseNoExistResponsePost: (state, action) => {
        if (action.posts.length === 0) {
            action.posts = state.posts;
            action.existResponsePostFlg = false;
        }
        else {
            action.existResponsePostFlg = true;
        }
        return action;
    }
};
//# sourceMappingURL=index.js.map