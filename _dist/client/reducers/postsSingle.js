"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Posts_1 = __importDefault(require("api/store/Posts"));
exports.default = (state = new Posts_1.default(), action) => {
    return action.postsSingle ? [...action.postsSingle] : state;
};
//# sourceMappingURL=postsSingle.js.map