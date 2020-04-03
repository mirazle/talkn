"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("api/store/App"));
const PostMulti_1 = __importDefault(require("api/store/PostMulti"));
const PostTimeline_1 = __importDefault(require("api/store/PostTimeline"));
const PostSingle_1 = __importDefault(require("api/store/PostSingle"));
class Posts {
    constructor() {
        return [];
    }
    static getDispPosts(state) {
        const { app, postsTimeline, postsMulti, postsSingle, postsChild, postsLogs } = state;
        switch (app.dispThreadType) {
            case App_1.default.dispThreadTypeTimeline:
                return postsTimeline;
            case App_1.default.dispThreadTypeMulti:
                return postsMulti;
            case App_1.default.dispThreadTypeSingle:
                return postsSingle;
            case App_1.default.dispThreadTypeChild:
                return postsChild;
            case App_1.default.dispThreadTypeLogs:
                return postsLogs;
        }
    }
    static getAnyActionPosts(action) {
        const { app, posts } = action;
        const existPosts = posts && posts.length > 0;
        action.postsMulti = new PostMulti_1.default();
        action.postsTimeline = new PostTimeline_1.default();
        action.postsSingle = new PostSingle_1.default();
        action.postsChild = [];
        action.postsLogs = [];
        switch (app.dispThreadType) {
            case App_1.default.dispThreadTypeTimeline:
                action.postsTimeline = existPosts ? posts : [];
                break;
            case App_1.default.dispThreadTypeMulti:
                action.postsMulti = existPosts ? posts : [];
                break;
            case App_1.default.dispThreadTypeSingle:
                action.postsSingle = existPosts ? posts : [];
                break;
            case App_1.default.dispThreadTypeChild:
                action.postsChild = existPosts ? posts : [];
                break;
            case App_1.default.dispThreadTypeLogs:
                action.postsLogs = existPosts ? posts : [];
                break;
        }
        return action;
    }
}
exports.default = Posts;
//# sourceMappingURL=Posts.js.map