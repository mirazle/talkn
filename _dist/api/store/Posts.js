"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("api/store/App"));
const PostMulti_1 = __importDefault(require("api/store/PostMulti"));
const PostsTimeline_1 = __importDefault(require("api/store/PostsTimeline"));
const PostsTimelineStock_1 = __importDefault(require("api/store/PostsTimelineStock"));
const PostsSingle_1 = __importDefault(require("api/store/PostsSingle"));
class Posts {
    constructor(params = []) {
        return params;
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
    static getAnyActionPosts(action, state) {
        const { app, posts } = action;
        const existPosts = posts && posts.length > 0;
        action.postsMulti = new PostMulti_1.default();
        action.postsSingle = new PostsSingle_1.default();
        action.postsChild = [];
        action.postsLogs = [];
        switch (app.dispThreadType) {
            case App_1.default.dispThreadTypeTimeline:
                action = Posts.getAnyActionPostsTimeline(action, posts, state, existPosts);
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
    static getAnyActionPostsTimeline(action, posts, state, existPosts) {
        if (action.type === "SERVER_TO_API[BROADCAST]:post") {
            action.postsTimeline = new PostsTimeline_1.default();
            action.postsTimeline.push(action.posts[0]);
        }
        else if (action.type === "SERVER_TO_API[EMIT]:fetchPosts") {
            action.postsTimeline = new PostsTimeline_1.default();
            action.postsTimelineStock = new PostsTimelineStock_1.default();
            if (existPosts) {
                const postsLength = posts.length;
                for (let i = 0; i < postsLength; i++) {
                    if (posts[i].currentTime === 0) {
                        action.postsTimeline.push(posts[i]);
                    }
                    else {
                        action.postsTimelineStock.push(posts[i]);
                    }
                }
            }
        }
        return action;
    }
}
exports.default = Posts;
//# sourceMappingURL=Posts.js.map