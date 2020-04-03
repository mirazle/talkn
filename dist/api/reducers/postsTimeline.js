"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Posts_1 = __importDefault(require("api/store/Posts"));
exports.default = (state = new Posts_1.default(), action) => {
    switch (action.type) {
        case "CLIENT_TO_SERVER[EMIT]:changeThread":
            return new Posts_1.default();
        case "UNMOUNT_POSTS_TIMELINE":
            return state.map(pt => {
                pt.dispFlg = pt.currentTime <= action.mediaCurrentTime;
                return pt;
            });
        case "CLEAR_POSTS_TIMELINE":
            return state.filter(pt => pt.currentTime <= action.mediaCurrentTime);
        case "SERVER_TO_CLIENT[EMIT]:find":
            if (action.postsTimeline && action.postsTimeline.length > 0) {
                return [...state, ...action.postsTimeline];
            }
            break;
        case "NEXT_POSTS_TIMELINE":
            if (action.postsTimeline && action.postsTimeline.length > 0) {
                return [...state, ...action.postsTimeline];
            }
            break;
        case "PREV_POSTS_TIMELINE":
            if (action.postsTimeline && action.postsTimeline.length > 0) {
                return [...action.postsTimeline];
            }
            break;
        case "SERVER_TO_CLIENT[BROADCAST]:post":
            if (action.postsTimeline &&
                action.postsTimeline.length > 0 &&
                action.postsTimeline[0].uid === action.user.uid &&
                action.postsTimeline[0].ch === action.thread.ch) {
                if (action.postsTimeline && action.postsTimeline.length > 0) {
                    return [...state, ...action.postsTimeline];
                }
            }
            break;
        case "SERVER_TO_CLIENT[EMIT]:getMore":
            if (action.postsTimeline && action.postsTimeline.length > 0) {
                return [...action.postsTimeline, ...state];
            }
            break;
    }
    return state;
};
//# sourceMappingURL=postsTimeline.js.map