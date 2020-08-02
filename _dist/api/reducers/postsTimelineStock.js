"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostsTimelineStock_1 = __importDefault(require("api/store/PostsTimelineStock"));
exports.default = (state = [], action) => {
    switch (action.type) {
        case "SERVER_TO_API[BROADCAST]:post":
            return action.postsTimelineStock ? [...state, action.postsTimelineStock] : state;
        case "CLEAR_POSTS_TIMELINE":
            return action.postsTimelineStock ? [...state, action.postsTimelineStock] : state;
        default:
            return action.postsTimelineStock ? new PostsTimelineStock_1.default(action.postsTimelineStock) : state;
    }
};
//# sourceMappingURL=postsTimelineStock.js.map