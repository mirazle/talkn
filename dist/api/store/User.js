"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(require("api/store/Schema"));
const Post_1 = __importDefault(require("api/store/Post"));
class User extends Schema_1.default {
    static get defaultOffsetFindId() {
        return Post_1.default.defaultFindId;
    }
    constructor(params = {}) {
        super();
        const uid = params && params.uid ? params.uid : "";
        const utype = params && params.utype ? params.utype : "";
        const tuned = params && params.tuned ? params.tuned : "";
        const multistreamed = params && params.multistreamed ? params.multistreamed : false;
        const actioned = params && params.actioned ? params.actioned : "";
        const offsetFindId = params && params.offsetFindId ? params.offsetFindId : User.defaultOffsetFindId;
        const offsetSingleFindId = params && params.offsetSingleFindId ? params.offsetSingleFindId : User.defaultOffsetFindId;
        const offsetMultiFindId = params && params.offsetMultiFindId ? params.offsetMultiFindId : User.defaultOffsetFindId;
        const offsetChildFindId = params && params.offsetChildFindId ? params.offsetChildFindId : User.defaultOffsetFindId;
        const offsetLogsFindId = params && params.offsetLogsFindId ? params.offsetLogsFindId : User.defaultOffsetFindId;
        const requestLoginType = params.requestLoginType ? params.requestLoginType : "";
        const friends = [];
        return this.create({
            uid,
            utype,
            tuned,
            multistreamed,
            actioned,
            offsetFindId,
            offsetSingleFindId,
            offsetMultiFindId,
            offsetChildFindId,
            offsetLogsFindId,
            friends
        });
    }
    static getOffsetFindId({ posts }) {
        if (posts && posts[0] && posts[0]._id) {
            return posts[0]._id;
        }
        return Post_1.default.defaultFindId;
    }
    static getHref(params = {}) {
        if (typeof window !== "undefined" && window.location && window.location.href) {
            return window.location.href;
        }
        if (params && params.href) {
            return params.href;
        }
        return "/";
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map