"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const define_1 = __importDefault(require("common/define"));
const App_1 = __importDefault(require("api/store/App"));
const TalknSession_1 = __importDefault(require("client/operations/TalknSession"));
exports.default = {
    "SERVER_TO_API[BROADCAST]:post": setStorageHtmlPosts,
    "SERVER_TO_API[EMIT]:getMore": setStorageHtmlPosts,
    "SERVER_TO_API[EMIT]:fetchPosts": (state, props) => {
        return { state, props };
    },
    "SERVER_TO_API[EMIT]:changeThread": (state, props) => {
        const { app } = state;
        const { rootCh } = app;
        const { storageKey } = define_1.default;
        const postKey = app.dispThreadType === App_1.default.dispThreadTypeMulti ? storageKey.postSingle : storageKey.postMulti;
        TalknSession_1.default.setStorage(rootCh, define_1.default.storageKey[postKey], []);
        return { state, props };
    },
    ON_CLICK_MENU: (state, props) => {
        const { rootCh } = state.app;
        TalknSession_1.default.setStorage(rootCh, define_1.default.storageKey.app, state.app);
        return { state, props };
    },
    RESIZE_END_WINDOW: (state, props) => {
        return { state, props };
    },
    setStoragePosts,
    setStorageHtmlPosts,
    setStoragePostsTimeline,
    getStoragePostsTimeline,
    getStoragePostsTimelineZero,
};
function setStoragePosts(state, props) {
    const { app } = state;
    if (app.isMediaCh) {
        state = setStoragePostsTimeline(state);
        return { state, props };
    }
    else {
        return setStorageHtmlPosts(state, props);
    }
}
function setStorageHtmlPosts(state, props) {
    const { app } = state;
    const { storageKey } = define_1.default;
    if (app.isRootCh) {
        const { postsMulti, postsSingle } = state;
        TalknSession_1.default.setStorage(app.rootCh, storageKey.postsMulti, postsMulti);
        TalknSession_1.default.setStorage(app.rootCh, storageKey.postsSingle, postsSingle);
    }
    return { state, props };
}
function setStoragePostsTimeline(action) {
    const { app, thread, postsTimeline: postsTimelineAll } = action;
    const { storageKey } = define_1.default;
    if (app.isMediaCh) {
        const postsTimelineAllLength = postsTimelineAll && postsTimelineAll.length ? postsTimelineAll.length : 0;
        let postsTimelineZeroSecond = [];
        let postsTimeline = [];
        for (let i = 0; i < postsTimelineAllLength; i++) {
            if (postsTimelineAll[i].currentTime === 0) {
                postsTimelineZeroSecond.push(postsTimelineAll[i]);
            }
            else {
                postsTimeline.push(postsTimelineAll[i]);
            }
        }
        action.postsTimeline = postsTimelineZeroSecond;
        TalknSession_1.default.setStorage(thread.ch, storageKey.postsTimelineZero, postsTimelineZeroSecond);
        TalknSession_1.default.setStorage(thread.ch, storageKey.postsTimeline, postsTimeline);
    }
    return action;
}
function getStoragePostsTimelineZero(rootCh) {
    const { storageKey } = define_1.default;
    const response = TalknSession_1.default.getStorage(rootCh, storageKey.postsTimelineZero);
    return response.constructor.name === "Array" ? response : [];
}
function getStoragePostsTimeline(rootCh) {
    const { storageKey } = define_1.default;
    const response = TalknSession_1.default.getStorage(rootCh, storageKey.postsTimeline);
    return response.constructor.name === "Array" ? response : [];
}
//# sourceMappingURL=storage.js.map