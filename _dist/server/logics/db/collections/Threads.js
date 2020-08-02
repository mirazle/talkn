"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Thread_1 = __importDefault(require("api/store/Thread"));
const MongoDB_1 = __importDefault(require("server/listens/db/MongoDB"));
const logics_1 = __importDefault(require("server/logics"));
const Favicon_1 = __importDefault(require("server/logics/Favicon"));
const ThreadFindOneInit = {
    selector: {},
    option: {},
    buildinSchema: true,
};
class Threads {
    constructor(collection) {
        this.collection = collection;
        return this;
    }
    async findOne(ch, params = ThreadFindOneInit, called = "Default") {
        const { selector, option, buildinSchema } = params;
        const condition = { ch };
        let { error, response } = await this.collection.findOne(condition, selector, option);
        const isExist = Boolean(response);
        if (buildinSchema) {
            if (!isExist) {
                const anyChResponse = await this.getUnshifAnyChResponse(ch, []);
                response = anyChResponse[0];
            }
        }
        return { error, response, isExist };
    }
    async findOneWatchCnt(ch) {
        const condition = { ch };
        const selector = { liveCnt: 1 };
        const option = {};
        const { error, response } = await this.collection.findOne(condition, { selector, option, buildinSchema: false }, "finedMenuIndex");
        return response.liveCnt < 0 ? 0 : response.liveCnt;
    }
    async rank(requestState, setting) {
        const { app } = requestState;
        const { rootCh: ch } = app;
        const layer = Thread_1.default.getLayer(ch);
        let condition = {};
        condition.chs = ch;
        condition.ch = { $ne: ch };
        condition.postCnt = { $ne: 0 };
        condition.layer = { $gt: layer };
        if (app.findType !== Thread_1.default.findTypeAll) {
            condition.findType = app.findType;
        }
        const selector = { "serverMetas.title": 1, lastPost: 1, liveCnt: 1 };
        const option = {
            sort: { liveCnt: -1, layer: -1 },
            limit: setting.server.getThreadChildrenCnt,
        };
        const { response } = await this.collection.find(condition, selector, option);
        console.log(response);
        return response.map((res) => ({
            ...res.lastPost,
            title: res.serverMetas.title,
            liveCnt: res.liveCnt,
        }));
    }
    async save(thread) {
        thread.findType = Thread_1.default.getContentTypeFromFindType(thread.contentType);
        thread.updateTime = new Date();
        thread.liveCnt = thread.liveCnt < 0 ? 0 : thread.liveCnt;
        thread.hasSlash = thread.hasSlash === null ? false : thread.hasSlash;
        const { response: resThread } = await this.collection.save(thread);
        return resThread;
    }
    async resetWatchCnt() {
        const condition = { liveCnt: { $exists: true, $ne: 0 } };
        const set = { $set: { liveCnt: 0 } };
        const option = { upsert: false, multi: true };
        return await this.collection.update(condition, set, option);
    }
    async tune(thread, liveCnt, update = false) {
        const { ch } = thread;
        if (thread.save) {
            thread.liveCnt = update ? liveCnt : thread.liveCnt + liveCnt;
            thread = await logics_1.default.db.threads.save(thread);
            return { thread, isExist: true };
        }
        else {
            let { response: resThread, isExist } = await logics_1.default.db.threads.findOne(ch);
            if (update) {
                resThread.liveCnt = liveCnt;
            }
            else {
                resThread.liveCnt = resThread.liveCnt + liveCnt;
            }
            const thread = await logics_1.default.db.threads.save(resThread);
            return { thread, isExist };
        }
    }
    async update(ch, upset) {
        const condition = { ch };
        const set = { ch, ...upset, updateTime: new Date() };
        const option = { upsert: true };
        return await this.collection.update(condition, set, option);
    }
    async updateServerMetas(ch, baseThread, updateThread) {
        const condition = { ch };
        const serverMetas = {
            ...baseThread.serverMetas,
            ...updateThread.serverMetas,
        };
        const set = { ch, serverMetas, updateTime: new Date() };
        const option = { upsert: true };
        await this.collection.update(condition, set, option);
        return serverMetas;
    }
    async getUnshifAnyChResponse(ch, response = []) {
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
    }
    merge(obj, mergeObj) {
        return { ...obj, ...mergeObj };
    }
    getCh(param) {
        return Thread_1.default.getCh(param, null);
    }
    async requestHtmlParams(thread, requestState) {
        const { response: htmlParams, iconHrefs } = await logics_1.default.html.fetch(thread, requestState);
        thread = MongoDB_1.default.getBuiltinObjToSchema(thread, htmlParams);
        if (thread.favicon === Favicon_1.default.defaultFaviconPath) {
            const faviconParams = await logics_1.default.favicon.fetch(thread, iconHrefs);
            thread = MongoDB_1.default.getBuiltinObjToSchema(thread, {
                ...faviconParams,
                favicon: faviconParams.faviconName,
            });
        }
        if (thread.favicon !== Favicon_1.default.defaultFaviconPath && thread.lastPost.favicon === Favicon_1.default.defaultFaviconPath) {
            thread.lastPost.favicon = thread.favicon;
        }
        return thread;
    }
}
exports.default = Threads;
//# sourceMappingURL=Threads.js.map