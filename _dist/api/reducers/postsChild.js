"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Posts_1 = __importDefault(require("api/store/Posts"));
exports.default = (state = [], action) => {
    switch (action.type) {
        case "API_TO_SERVER[REQUEST]:changeThread":
            return new Posts_1.default();
        case "SERVER_TO_API[EMIT]:fetchPosts":
        case "SERVER_TO_API[BROADCAST]:post":
            if (action.postsChild && action.postsChild.length > 0) {
                if (action.thread.ch === action.postsChild[0].ch) {
                    return [...state, ...action.postsChild];
                }
            }
            break;
        case "SERVER_TO_API[EMIT]:getMore":
            if (action.postsChild && action.postsChild.length > 0) {
                return [...action.postsChild, ...state];
            }
            break;
    }
    return state;
};
//# sourceMappingURL=postsChild.js.map