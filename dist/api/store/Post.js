"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(require("api/store/Schema"));
class Post extends Schema_1.default {
    static get defaultFindId() {
        return "000000000000000000000000";
    }
    constructor(params = {}) {
        super();
        return this.create({});
    }
}
exports.default = Post;
//# sourceMappingURL=Post.js.map