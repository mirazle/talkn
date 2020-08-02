"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostsSingle_1 = __importDefault(require("api/store/PostsSingle"));
exports.default = (state = [], action) => {
    switch (action.type) {
        case "ON_CLICK_MULTISTREAM":
            return action.postsSingle;
        case "API_TO_SERVER[REQUEST]:changeThread":
            return new PostsSingle_1.default();
        case "SERVER_TO_API[EMIT]:fetchPosts":
        case "SERVER_TO_API[BROADCAST]:post":
            if (action.postsSingle && action.postsSingle.length > 0) {
                return [...state, ...action.postsSingle];
            }
            break;
        case "SERVER_TO_API[EMIT]:getMore":
            if (action.postsSingle && action.postsSingle.length > 0) {
                return [...action.postsSingle, ...state];
            }
            break;
    }
    return state;
};
//# sourceMappingURL=postsSingle.js.map