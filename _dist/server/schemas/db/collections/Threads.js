"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Posts_1 = __importDefault(require("./Posts"));
const Thread_1 = __importDefault(require("api/store/Thread"));
const Plain_1 = __importDefault(require("common/emotions/model/Plain"));
const Russell_1 = __importDefault(require("common/emotions/model/Russell"));
const RussellSimple_1 = __importDefault(require("common/emotions/model/RussellSimple"));
const html_1 = __importDefault(require("server/schemas/logics/html"));
const Favicon_1 = __importDefault(require("server/logics/Favicon"));
const html = new html_1.default({});
const plain = Plain_1.default.getSchemas();
const russell = Russell_1.default.getSchemas();
const russellSimple = RussellSimple_1.default.getSchemas();
const data = new Date();
exports.default = {
    ch: { type: String, default: "/" },
    chs: { type: [String], default: ["/"] },
    findType: { type: String, default: Thread_1.default.findTypeHtml },
    hasSlash: { type: Boolean, default: false },
    host: { type: String, default: "" },
    layer: { type: Number, default: 0 },
    title: { type: String, default: "talkn" },
    favicon: { type: String, default: Favicon_1.default.defaultFaviconPath },
    faviconType: {
        type: String,
        default: Favicon_1.default.defaultFaviconData.faviconType,
    },
    postCnt: { type: Number, default: 0 },
    multiPostCnt: { type: Number, default: 0 },
    liveCnt: { type: Number, default: 1, min: 0 },
    ...html,
    lastPost: Posts_1.default,
    like: { type: Number, default: 0 },
    emotions: {
        plain,
        russell,
        russellSimple,
    },
    createTime: { type: Date, default: Date },
    updateTime: { type: Date, default: Date },
};
//# sourceMappingURL=Threads.js.map