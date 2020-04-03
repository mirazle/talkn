"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Thread_1 = __importDefault(require("api/store/Thread"));
const conf_1 = __importDefault(require("common/conf"));
class Posts {
    constructor(collection) {
        this.collection = collection;
        return this;
    }
    getCounts(requestState, threadStatus = { isMultistream: false, isMediaCh: false }) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const { response: postCnt } = yield this.collection.count(condition);
            return postCnt;
        });
    }
    count(requestState) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ch } = requestState.thread;
            const condition = { ch };
            return yield this.collection.find(condition).count();
        });
    }
    find(requestState, setting, status = {
        isMultistream: false,
        getMore: false,
        isMediaCh: false
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { isMultistream, getMore, isMediaCh } = status;
            const { thread, app } = requestState;
            const { ch } = thread;
            const getDirection = getMore ? "$lt" : "$gt";
            const chPart = isMultistream ? { chs: ch } : { ch };
            const currentTimePart = isMediaCh ? {} : {};
            const condition = Object.assign(Object.assign(Object.assign({}, currentTimePart), chPart), { _id: { [getDirection]: mongoose_1.default.Types.ObjectId(app.offsetFindId) } });
            const sort = isMediaCh ? { currentTime: 1 } : { _id: -1 };
            const limit = isMediaCh ? conf_1.default.findOneLimitCnt : conf_1.default.findOnePostCnt;
            const selector = {};
            const option = { limit, sort };
            const result = yield this.collection.find(condition, selector, option);
            if (!isMediaCh) {
                result.response.reverse();
            }
            return result;
        });
    }
    save(requestState) {
        return __awaiter(this, void 0, void 0, function* () {
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
                updateTime: new Date()
            });
            return post.save();
        });
    }
    update(requestState, posts) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = { ch: requestState.ch };
            const set = Object.assign({ ch: requestState.ch }, posts);
            const option = { upsert: true };
            return this.collection.update(condition, set, option);
        });
    }
    getSchema(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection.getSchema(params);
        });
    }
}
exports.default = Posts;
//# sourceMappingURL=Posts.js.map