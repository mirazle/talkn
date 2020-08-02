"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostsTimelineZero_1 = __importDefault(require("api/store/PostsTimelineZero"));
exports.default = (state = [], action) => {
    switch (action.type) {
        case "SERVER_TO_API[BROADCAST]:post":
            return action.postsTimelineZero ? [...state, action.postsTimelineZero] : state;
        case "CLEAR_POSTS_TIMELINE":
            return action.postsTimelineZero ? [...state, action.postsTimelineZero] : state;
        default:
            return action.postsTimelineZero ? new PostsTimelineZero_1.default(action.postsTimelineZero) : state;
    }
};
//# sourceMappingURL=postsTimelineZero.js.map