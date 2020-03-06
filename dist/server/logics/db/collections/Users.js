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
Object.defineProperty(exports, "__esModule", { value: true });
class Users {
    constructor(collection) {
        this.collection = collection;
        return this;
    }
    getChCnt(ch) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = { ch };
            const { response: user } = yield this.collection.find(condition);
            return user.length;
        });
    }
    find(requestState, setting) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = {
                chs: requestState.thread.ch,
                _id: { $lt: requestState.user.offsetFindId }
            };
            const selector = {};
            const option = { limit: setting.server.findOnePostCnt, sort: { _id: -1 } };
            const result = yield this.collection.find(condition, selector, option);
            result.response.reverse();
            return result;
        });
    }
    findOne(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = { uid };
            return yield this.collection.findOne(condition);
        });
    }
    save(requestState) {
        return __awaiter(this, void 0, void 0, function* () {
            const set = Object.assign(Object.assign({}, requestState.thread), requestState.user);
            const option = { upsert: true };
            return this.collection.save(set, option);
        });
    }
    update(uid, ch) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = { uid };
            const set = { $set: { ch } };
            const option = { upsert: true };
            return this.collection.update(condition, set, option);
        });
    }
    remove(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection.remove(uid);
        });
    }
    removeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection.removeAll();
        });
    }
}
exports.default = Users;
//# sourceMappingURL=Users.js.map