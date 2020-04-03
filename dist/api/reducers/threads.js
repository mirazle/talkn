"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Threads_1 = __importDefault(require("api/store/Threads"));
exports.default = (state = new Threads_1.default(), action) => {
    return action.threads ? state.merge(action.threads) : state;
};
//# sourceMappingURL=threads.js.map