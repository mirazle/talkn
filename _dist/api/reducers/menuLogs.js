"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MenuLogs_1 = __importDefault(require("api/store/MenuLogs"));
exports.default = (state = new MenuLogs_1.default(), action) => {
    switch (action.type) {
        case "SERVER_TO_API[EMIT]:fetchPosts":
            const isFetch = state.find((s) => s.ch === action.thread.lastPost.ch);
            return isFetch ? state : state.unshift(action.thread.lastPost);
        default:
            return action.menuLogs ? state.merge(action.menuLogs) : state;
    }
};
//# sourceMappingURL=menuLogs.js.map