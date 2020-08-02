"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(require("api/store/Schema"));
class Threads extends Schema_1.default {
    constructor(params = {}) {
        super();
        return this.create(params);
    }
    static getMergedThreads(baseThreads, mergeThread) {
        baseThreads[mergeThread.ch] = { ...mergeThread };
        return baseThreads;
    }
}
exports.default = Threads;
//# sourceMappingURL=Threads.js.map