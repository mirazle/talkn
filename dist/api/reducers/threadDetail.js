"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Thread_1 = __importDefault(require("api/store/Thread"));
exports.default = (state = new Thread_1.default({}, {}, {}), action) => {
    return action.threadDetail ? state.merge(action.threadDetail) : state;
};
//# sourceMappingURL=threadDetail.js.map