"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostsTimelineZeroAfter_1 = __importDefault(require("api/store/PostsTimelineZeroAfter"));
exports.default = (state = [], action) => {
    switch (action.type) {
        case "SERVER_TO_API[BROADCAST]:post":
            return action.postsTimelineZeroAfter ? [...state, action.postsTimelineZeroAfter] : state;
        case "CLEAR_POSTS_TIMELINE":
            return action.postsTimelineZeroAfter ? [...state, action.postsTimelineZeroAfter] : state;
        default:
            return action.postsTimelineZeroAfter ? new PostsTimelineZeroAfter_1.default(action.postsTimelineZeroAfter) : state;
    }
};
//# sourceMappingURL=postsTimelineZeroAfter.js.map