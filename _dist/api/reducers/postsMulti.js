"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Posts_1 = __importDefault(require("api/store/Posts"));
const conf_1 = __importDefault(require("common/conf"));
exports.default = (state = [], action) => {
    switch (action.type) {
        case "ON_CLICK_MULTISTREAM":
            return action.postsMulti;
        case "CLIENT_TO_SERVER[EMIT]:changeThread":
            return new Posts_1.default();
        case "SERVER_TO_API[EMIT]:fetchPosts":
            if (action.postsMulti && action.postsMulti.length > 0) {
                if (action.app.isRootCh) {
                    return [...action.postsMulti];
                }
            }
            break;
        case "SERVER_TO_API[BROADCAST]:post":
            if (action.postsMulti && action.postsMulti.length > 0) {
                if (action.app.rootCh === action.postsMulti[0].ch) {
                    return [...state, ...action.postsMulti];
                }
            }
            break;
        case "SERVER_TO_API[EMIT]:getMore":
            if (action.postsMulti && action.postsMulti.length > 0) {
                let morePostMulit = [];
                if (state.length + action.postsMulti.length > conf_1.default.findOneLimitCnt) {
                    morePostMulit = [...action.postsMulti, ...state];
                    return morePostMulit.slice(0, conf_1.default.findOneLimitCnt);
                }
                else {
                    return [...action.postsMulti, ...state];
                }
            }
            break;
    }
    return state;
};
//# sourceMappingURL=postsMulti.js.map