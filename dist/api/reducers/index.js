"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const app_1 = __importDefault(require("./app"));
const user_1 = __importDefault(require("./user"));
const menuIndex_1 = __importDefault(require("./menuIndex"));
const thread_1 = __importDefault(require("./thread"));
const threads_1 = __importDefault(require("./threads"));
const threadDetail_1 = __importDefault(require("./threadDetail"));
const analyze_1 = __importDefault(require("./analyze"));
const bootOption_1 = __importDefault(require("./bootOption"));
const setting_1 = __importDefault(require("./setting"));
const posts_1 = __importDefault(require("./posts"));
const postsTimeline_1 = __importDefault(require("./postsTimeline"));
const postsMulti_1 = __importDefault(require("./postsMulti"));
const postsSingle_1 = __importDefault(require("./postsSingle"));
const postsChild_1 = __importDefault(require("./postsChild"));
const actionLog_1 = __importDefault(require("./actionLog"));
const reducers = redux_1.combineReducers({
    app: app_1.default,
    user: user_1.default,
    menuIndex: menuIndex_1.default,
    thread: thread_1.default,
    threads: threads_1.default,
    threadDetail: threadDetail_1.default,
    analyze: analyze_1.default,
    bootOption: bootOption_1.default,
    setting: setting_1.default,
    posts: posts_1.default,
    postsTimeline: postsTimeline_1.default,
    postsMulti: postsMulti_1.default,
    postsSingle: postsSingle_1.default,
    postsChild: postsChild_1.default,
    actionLog: actionLog_1.default
});
exports.default = reducers;
//# sourceMappingURL=index.js.map