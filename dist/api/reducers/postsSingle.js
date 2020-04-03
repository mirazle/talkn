"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Posts_1 = __importDefault(require("api/store/Posts"));
exports.default = (state = new Posts_1.default(), action) => {
    switch (action.type) {
        case "ON_CLICK_MULTISTREAM":
            return action.postsSingle;
        case "CLIENT_TO_SERVER[EMIT]:changeThread":
            return new Posts_1.default();
        case "SERVER_TO_CLIENT[EMIT]:find":
        case "SERVER_TO_CLIENT[BROADCAST]:post":
            if (action.postsSingle && action.postsSingle.length > 0) {
                return [...state, ...action.postsSingle];
            }
            break;
        case "SERVER_TO_CLIENT[EMIT]:getMore":
            if (action.postsSingle && action.postsSingle.length > 0) {
                return [...action.postsSingle, ...state];
            }
            break;
    }
    return state;
};
//# sourceMappingURL=postsSingle.js.map