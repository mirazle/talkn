"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MenuIndex_1 = __importDefault(require("api/store/MenuIndex"));
const App_1 = __importDefault(require("api/store/App"));
exports.default = (state = new MenuIndex_1.default(), action) => {
    const sortWatchCnt = (a, b) => {
        if (a.ch === action.app.rootCh || b.ch === action.app.rootCh) {
            return 0;
        }
        if (a.watchCnt < b.watchCnt)
            return 1;
        if (a.watchCnt > b.watchCnt)
            return -1;
        return 0;
    };
    switch (action.type) {
        case "ON_CLICK_MULTISTREAM":
            const multistreamPosts = action.app.dispThreadType === App_1.default.dispThreadTypeMulti ? action.postsMulti : action.postsSingle;
            const multistreamPostLength = multistreamPosts && multistreamPosts.length ? multistreamPosts.length : 0;
            if (multistreamPostLength > 0) {
                return state.map(mi => {
                    if (action.app.rootCh === mi.ch) {
                        return Object.assign(Object.assign({}, mi), { favicon: multistreamPosts[multistreamPostLength - 1].favicon, post: multistreamPosts[multistreamPostLength - 1].post });
                    }
                    else {
                        return mi;
                    }
                });
            }
            return state;
        case "SERVER_TO_CLIENT[EMIT]:find":
            if (action.app.isLinkCh) {
                return state;
            }
            const postLength = action.posts && action.posts.length ? action.posts.length : 0;
            if (postLength === 0) {
                return state.map(mi => {
                    if (action.thread.ch === mi.ch) {
                        return Object.assign(Object.assign({}, mi), { title: action.thread.title, favicon: action.thread.favicon, watchCnt: action.thread.watchCnt });
                    }
                    else {
                        return mi;
                    }
                });
            }
            if (action.app.dispThreadType === App_1.default.dispThreadTypeMulti) {
                return state.map(mi => {
                    if (action.thread.ch === mi.ch) {
                        return Object.assign(Object.assign({}, mi), { favicon: action.thread.favicon, stampId: action.posts[postLength - 1].stampId, post: action.posts[postLength - 1].post });
                    }
                    else {
                        return mi;
                    }
                });
            }
            return state;
        case "SERVER_TO_CLIENT[BROADCAST]:find":
        case "SERVER_TO_CLIENT[BROADCAST]:changeThread":
        case "SERVER_TO_CLIENT[BROADCAST]:disconnect":
            return state
                .map(mi => {
                if (action.thread.ch === mi.ch) {
                    return Object.assign(Object.assign({}, mi), { watchCnt: action.thread.watchCnt });
                }
                else {
                    return mi;
                }
            })
                .sort(sortWatchCnt);
        case "SERVER_TO_CLIENT[BROADCAST]:post":
            return state.map(mi => {
                if (action.app.rootCh === mi.ch) {
                    if (action.app.multistream) {
                        return Object.assign(Object.assign({}, mi), { title: action.posts[0].title, stampId: action.posts[0].stampId, favicon: action.posts[0].favicon, post: action.posts[0].post });
                    }
                    else {
                        return mi;
                    }
                }
                if (action.posts[0].ch === mi.ch) {
                    return Object.assign(Object.assign({}, mi), { title: action.posts[0].title, stampId: action.posts[0].stampId, favicon: action.posts[0].favicon, post: action.posts[0].post });
                }
                return mi;
            });
        case "SERVER_TO_CLIENT[EMIT]:findMenuIndex":
            if (state && state.length > 0 && action.menuIndex && action.menuIndex.length > 0) {
                action.menuIndex.shift();
                return [state[0]].concat(action.menuIndex);
            }
            else {
                return action.menuIndex ? action.menuIndex : state;
            }
        default:
            return action.menuIndex ? action.menuIndex : state;
    }
};
//# sourceMappingURL=menuIndex.js.map