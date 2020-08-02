"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Favicon_1 = __importDefault(require("server/logics/Favicon"));
const SchemaTypes = mongoose_1.default.Schema.Types;
exports.default = {
    protocol: { type: String, default: "talkn:" },
    ch: { type: String, default: "" },
    chs: { type: [String], default: [] },
    layer: { type: Number, default: 0 },
    uid: { type: String, default: "" },
    utype: { type: String, default: "" },
    favicon: { type: String, default: Favicon_1.default.defaultFaviconPath },
    title: { type: String, default: "" },
    post: { type: String, default: "" },
    stampId: { type: Number, default: 0 },
    data: { type: Object, default: {} },
    findType: { type: String, default: "" },
    currentTime: { type: Number, default: 0.0 },
    createTime: { type: Date, default: Date },
    updateTime: { type: Date, default: Date },
    dispFlg: { type: Boolean, default: true }
};
//# sourceMappingURL=Posts.js.map