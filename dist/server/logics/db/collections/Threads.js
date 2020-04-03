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
const Thread_1 = __importDefault(require("api/store/Thread"));
const MongoDB_1 = __importDefault(require("server/listens/db/MongoDB"));
const logics_1 = __importDefault(require("server/logics"));
const Favicon_1 = __importDefault(require("server/logics/Favicon"));
class Threads {
    constructor(collection) {
        this.collection = collection;
        return this;
    }
    findOne(ch, selector = {}, option = {}, buildinSchema = false, called = "Default") {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = { ch };
            let { error, response } = yield this.collection.findOne(condition, selector, option);
            if (buildinSchema) {
                if (!response) {
                    const anyChResponse = yield this.getUnshifAnyChResponse(ch, []);
                    response = anyChResponse[0];
                }
            }
            return { error, response };
        });
    }
    findOneWatchCnt(ch) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = { ch };
            const selector = { watchCnt: 1 };
            const option = {};
            const { error, response } = yield this.collection.findOne(condition, selector, option, false, "finedMenuIndex");
            return response.watchCnt < 0 ? 0 : response.watchCnt;
        });
    }
    findMenuIndex(requestState, setting) {
        return __awaiter(this, void 0, void 0, function* () {
            const { app } = requestState;
            const { rootCh: ch } = app;
            const layer = Thread_1.default.getLayer(ch);
            let condition = {};
            condition.chs = ch;
            condition.postCnt = { $ne: 0 };
            condition.layer = { $gt: layer };
            if (app.findType !== Thread_1.default.findTypeAll) {
                condition.findType = app.findType;
            }
            const selector = { "serverMetas.title": 1, lastPost: 1, watchCnt: 1 };
            const option = {
                sort: { watchCnt: -1, layer: -1 },
                limit: setting.server.getThreadChildrenCnt
            };
            let { response } = yield this.collection.find(condition, selector, option);
            const responseLength = response.length;
            let ExistMainCh = false;
            if (responseLength === 0) {
                response = yield this.getUnshifAnyChResponse(ch, response);
            }
            else {
                for (let i = 0; i < responseLength; i++) {
                    if (response[i].lastPost.ch === ch) {
                        ExistMainCh = true;
                        break;
                    }
                }
                if (!ExistMainCh) {
                    const { response: mainThread } = yield this.findOne(ch, { lastPost: 1 }, {}, true);
                    response.unshift(mainThread);
                }
            }
            return response.map(res => {
                return Object.assign(Object.assign({}, res.lastPost), { title: res.serverMetas.title, watchCnt: res.lastPost.ch === ch ? res.watchCnt + 1 : res.watchCnt });
            });
        });
    }
    save(thread) {
        return __awaiter(this, void 0, void 0, function* () {
            thread.findType = Thread_1.default.getContentTypeFromFindType(thread.contentType);
            thread.updateTime = new Date();
            thread.watchCnt = thread.watchCnt < 0 ? 0 : thread.watchCnt;
            thread.hasSlash = thread.hasSlash === null ? false : thread.hasSlash;
            const { response: resThread } = yield this.collection.save(thread);
            return resThread;
        });
    }
    resetWatchCnt() {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = { watchCnt: { $exists: true, $ne: 0 } };
            const set = { $set: { watchCnt: 0 } };
            const option = { upsert: false, multi: true };
            return yield this.collection.update(condition, set, option);
        });
    }
    saveOnWatchCnt(thread, watchCnt, update = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ch } = thread;
            if (thread.save) {
                thread.watchCnt = update ? watchCnt : thread.watchCnt + watchCnt;
                return yield logics_1.default.db.threads.save(thread);
            }
            else {
                const { response: resThread } = yield logics_1.default.db.threads.findOne(ch);
                if (update) {
                    resThread.watchCnt = watchCnt;
                }
                else {
                    resThread.watchCnt = resThread.watchCnt + watchCnt;
                }
                return yield logics_1.default.db.threads.save(resThread);
            }
        });
    }
    update(ch, upset) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = { ch };
            const set = Object.assign(Object.assign({ ch }, upset), { updateTime: new Date() });
            const option = { upsert: true };
            return yield this.collection.update(condition, set, option);
        });
    }
    updateServerMetas(ch, baseThread, updateThread) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = { ch };
            const serverMetas = Object.assign(Object.assign({}, baseThread.serverMetas), updateThread.serverMetas);
            const set = { ch, serverMetas, updateTime: new Date() };
            const option = { upsert: true };
            yield this.collection.update(condition, set, option);
            return serverMetas;
        });
    }
    getUnshifAnyChResponse(ch, response = []) {
        return __awaiter(this, void 0, void 0, function* () {
            let schema = this.collection.getSchema({ ch });
            schema.title = Thread_1.default.getDefaultTitle();
            schema.chs = Thread_1.default.getChs(ch);
            schema.host = Thread_1.default.getHost(ch);
            schema.layer = Thread_1.default.getLayer(ch);
            schema.lastPost.ch = ch;
            schema.lastPost.chs = Thread_1.default.getChs(ch);
            schema.lastPost.stampId = 0;
            response.unshift(schema);
            return response;
        });
    }
    merge(obj, mergeObj) {
        return Object.assign(Object.assign({}, obj), mergeObj);
    }
    getCh(param) {
        return Thread_1.default.getCh(param, null);
    }
    requestHtmlParams(thread, requestState) {
        return __awaiter(this, void 0, void 0, function* () {
            const { response: htmlParams, iconHrefs } = yield logics_1.default.html.fetch(thread, requestState);
            thread = MongoDB_1.default.getBuiltinObjToSchema(thread, htmlParams);
            if (thread.favicon === Favicon_1.default.defaultFaviconPath) {
                const faviconParams = yield logics_1.default.favicon.fetch(thread, iconHrefs);
                thread = MongoDB_1.default.getBuiltinObjToSchema(thread, Object.assign(Object.assign({}, faviconParams), { favicon: faviconParams.faviconName }));
            }
            if (thread.favicon !== Favicon_1.default.defaultFaviconPath && thread.lastPost.favicon === Favicon_1.default.defaultFaviconPath) {
                thread.lastPost.favicon = thread.favicon;
            }
            return thread;
        });
    }
}
exports.default = Threads;
//# sourceMappingURL=Threads.js.map