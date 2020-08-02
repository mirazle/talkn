"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("api/store/Post"));
exports.default = (state = new Post_1.default(), action) => {
    switch (action.type) {
        case "SERVER_TO_API[EMIT]:tune":
            return new Post_1.default(action.thread.lastPost);
        case "SERVER_TO_API[BROADCAST]:tune":
        case "SERVER_TO_API[BROADCAST]:changeThread":
        case "SERVER_TO_API[BROADCAST]:disconnect":
            const { thread } = action;
            if (thread.ch === state.ch) {
                return { ...state, liveCnt: thread.liveCnt };
            }
            break;
        case "SERVER_TO_API[BROADCAST]:post":
            const post = action.posts[0];
            if (post.ch === state.ch) {
                return {
                    ...state,
                    title: post.title,
                    stampId: post.stampId,
                    favicon: post.favicon,
                    post: post.post,
                };
            }
    }
    return state;
};
//# sourceMappingURL=tuneCh.js.map