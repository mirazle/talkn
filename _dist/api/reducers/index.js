"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const app_1 = __importDefault(require("./app"));
const user_1 = __importDefault(require("./user"));
const tuneCh_1 = __importDefault(require("./tuneCh"));
const ranks_1 = __importDefault(require("./ranks"));
const thread_1 = __importDefault(require("./thread"));
const threads_1 = __importDefault(require("./threads"));
const threadDetail_1 = __importDefault(require("./threadDetail"));
const analyze_1 = __importDefault(require("./analyze"));
const bootOption_1 = __importDefault(require("./bootOption"));
const setting_1 = __importDefault(require("./setting"));
const posts_1 = __importDefault(require("./posts"));
const postsTimeline_1 = __importDefault(require("./postsTimeline"));
const postsTimelineStock_1 = __importDefault(require("./postsTimelineStock"));
const postsTimelineZero_1 = __importDefault(require("./postsTimelineZero"));
const postsTimelineZeroAfter_1 = __importDefault(require("./postsTimelineZeroAfter"));
const postsMulti_1 = __importDefault(require("./postsMulti"));
const postsSingle_1 = __importDefault(require("./postsSingle"));
const postsChild_1 = __importDefault(require("./postsChild"));
const actioned_1 = __importDefault(require("./actioned"));
exports.reducerFiles = {
    app: app_1.default,
    user: user_1.default,
    tuneCh: tuneCh_1.default,
    ranks: ranks_1.default,
    thread: thread_1.default,
    threads: threads_1.default,
    threadDetail: threadDetail_1.default,
    analyze: analyze_1.default,
    bootOption: bootOption_1.default,
    setting: setting_1.default,
    posts: posts_1.default,
    postsTimeline: postsTimeline_1.default,
    postsTimelineStock: postsTimelineStock_1.default,
    postsTimelineZero: postsTimelineZero_1.default,
    postsTimelineZeroAfter: postsTimelineZeroAfter_1.default,
    postsMulti: postsMulti_1.default,
    postsSingle: postsSingle_1.default,
    postsChild: postsChild_1.default,
    actioned: actioned_1.default,
};
exports.default = redux_1.combineReducers(exports.reducerFiles);
//# sourceMappingURL=index.js.map