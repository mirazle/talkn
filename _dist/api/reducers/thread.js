"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Thread_1 = __importDefault(require("api/store/Thread"));
exports.default = (state = new Thread_1.default({}, {}, {}), action) => {
    switch (action.type) {
        case "CLIENT_TO_SERVER[EMIT]:tuned":
            return new Thread_1.default(action.thread, {}, {});
        case "SERVER_TO_CLIENT[BROADCAST]:find":
        case "SERVER_TO_CLIENT[BROADCAST]:changeThread":
        case "SERVER_TO_CLIENT[BROADCAST]:disconnect":
        case "SERVER_TO_CLIENT[BROADCAST]:post":
            if (state.ch === action.thread.ch) {
                return action.thread ? state.merge(action.thread) : state;
            }
            break;
        default:
            return action.thread ? state.merge(action.thread) : state;
    }
    return state;
};
//# sourceMappingURL=thread.js.map