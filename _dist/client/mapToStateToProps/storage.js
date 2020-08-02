"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const define_1 = __importDefault(require("common/define"));
const App_1 = __importDefault(require("api/store/App"));
const TalknSession_1 = __importDefault(require("client/operations/TalknSession"));
exports.default = {
    "API_TO_CLIENT[BROADCAST]:post": setStorageHtmlPosts,
    "API_TO_CLIENT[EMIT]:getMore": setStorageHtmlPosts,
    "API_TO_CLIENT[EMIT]:fetchPosts": (clientState, apiState, props) => {
        setStoragePosts(clientState, apiState, props);
        return { clientState, apiState, props };
    },
    "API_TO_CLIENT[EMIT]:changeThread": (clientState, apiState, props) => {
        const { app } = apiState;
        const { rootCh } = app;
        const { storageKey } = define_1.default;
        const postKey = app.dispThreadType === App_1.default.dispThreadTypeMulti ? storageKey.postSingle : storageKey.postMulti;
        TalknSession_1.default.setStorage(rootCh, define_1.default.storageKey[postKey], []);
        return { clientState, apiState, props };
    },
    ON_CLICK_MENU: (clientState, apiState, props) => {
        const { rootCh } = apiState.app;
        TalknSession_1.default.setStorage(rootCh, define_1.default.storageKey.app, clientState.app);
        return { clientState, apiState, props };
    },
    RESIZE_END_WINDOW: (clientState, apiState, props) => {
        return { clientState, apiState, props };
    },
    setStoragePosts,
    setStorageHtmlPosts,
    setStoragePostsTimeline,
    getStoragePostsTimeline,
    getStoragePostsTimelineZero,
};
function setStoragePosts(clientState, apiState, props) {
    const { app } = apiState;
    if (app.isMediaCh) {
        apiState = setStoragePostsTimeline(apiState);
        return { apiState, clientState, props };
    }
    else {
        return setStorageHtmlPosts(clientState, apiState, props);
    }
}
function setStorageHtmlPosts(clientState, apiState, props) {
    const { app } = apiState;
    const { storageKey } = define_1.default;
    if (app.isRootCh) {
        const { postsMulti, postsSingle } = apiState;
        TalknSession_1.default.setStorage(app.rootCh, storageKey.postsMulti, postsMulti);
        TalknSession_1.default.setStorage(app.rootCh, storageKey.postsSingle, postsSingle);
    }
    return { clientState, apiState, props };
}
function setStoragePostsTimeline(apiState) {
    const { app, thread, postsTimeline: postsTimelineAll } = apiState;
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
        apiState.postsTimeline = postsTimelineZeroSecond;
        TalknSession_1.default.setStorage(thread.ch, storageKey.postsTimelineZero, postsTimelineZeroSecond);
        TalknSession_1.default.setStorage(thread.ch, storageKey.postsTimeline, postsTimeline);
    }
    return apiState;
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