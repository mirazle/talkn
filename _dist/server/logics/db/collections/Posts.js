"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Thread_1 = __importDefault(require("api/store/Thread"));
const Post_1 = __importDefault(require("api/store/Post"));
const conf_1 = __importDefault(require("common/conf"));
class Posts {
    constructor(collection) {
        this.collection = collection;
        return this;
    }
    async getCounts(requestState, threadStatus = { isMultistream: false, isMediaCh: false }) {
        const { ch } = requestState.thread;
        const { isMultistream, isMediaCh } = threadStatus;
        let condition = {};
        condition.currentTime = 0;
        if (isMediaCh) {
            condition.ch = ch;
        }
        else {
            if (isMultistream) {
                condition.chs = ch;
            }
            else {
                condition.ch = ch;
            }
        }
        const { response: postCnt } = await this.collection.count(condition);
        return postCnt;
    }
    async count(requestState) {
        const { ch } = requestState.thread;
        const condition = { ch };
        return await this.collection.find(condition).count();
    }
    async find(requestState, setting, status = {
        dispType: "",
        isCreate: false,
        isRequireUpsert: false,
        isMultistream: false,
        isMediaCh: false,
        isToggleMultistream: false,
        getMore: false,
    }) {
        const { isMultistream, getMore, isMediaCh } = status;
        const { thread, app } = requestState;
        const { ch } = thread;
        const offsetFindId = app && app.offsetFindId ? app.offsetFindId : Post_1.default.defaultFindId;
        const getDirection = getMore ? "$lt" : "$gt";
        const chPart = isMultistream ? { chs: ch } : { ch };
        const currentTimePart = isMediaCh ? {} : {};
        const condition = {
            ...currentTimePart,
            ...chPart,
            _id: { [getDirection]: mongoose_1.default.Types.ObjectId(offsetFindId) },
        };
        const sort = isMediaCh ? { currentTime: 1 } : { _id: -1 };
        const limit = isMediaCh ? conf_1.default.findOneLimitCnt : conf_1.default.findOnePostCnt;
        const selector = {};
        const option = { limit, sort };
        const result = await this.collection.find(condition, selector, option);
        if (!isMediaCh) {
            result.response.reverse();
        }
        return result;
    }
    async save(requestState) {
        const { app, user, thread } = requestState;
        const post = this.collection.getSchema({
            protocol: thread.protocol,
            ch: thread.ch,
            chs: thread.chs,
            layer: Thread_1.default.getLayer(thread.ch),
            uid: user.uid,
            utype: user.utype,
            favicon: thread.favicon,
            title: thread.title,
            post: app.inputPost,
            stampId: app.inputStampId ? app.inputStampId : 0,
            findType: thread.findType,
            currentTime: app.inputCurrentTime,
            data: "",
            updateTime: new Date(),
        });
        return post.save();
    }
    async update(requestState, posts) {
        const condition = { ch: requestState.ch };
        const set = { ch: requestState.ch, ...posts };
        const option = { upsert: true };
        return this.collection.update(condition, set, option);
    }
    async getSchema(params = {}) {
        return this.collection.getSchema(params);
    }
}
exports.default = Posts;
//# sourceMappingURL=Posts.js.map