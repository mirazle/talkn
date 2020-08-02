"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Thread_1 = __importDefault(require("api/store/Thread"));
exports.default = (state = new Thread_1.default({}, {}), action) => {
    switch (action.type) {
        case "SETUPED_API_STORE":
        case "SERVER_TO_API[EMIT]:tune":
        case "SERVER_TO_API[EMIT]:changeThread":
            return new Thread_1.default(action.thread);
        case "SERVER_TO_API[BROADCAST]:tune":
        case "SERVER_TO_API[BROADCAST]:changeThread":
        case "SERVER_TO_API[BROADCAST]:disconnect":
            if (state.ch === action.thread.ch) {
                return action.thread ? state.merge(action.thread) : state;
            }
        case "SERVER_TO_API[BROADCAST]:post":
            if (state.ch === action.thread.ch) {
                return action.thread ? state.merge(action.thread) : state;
            }
    }
    return state;
};
//# sourceMappingURL=thread.js.map