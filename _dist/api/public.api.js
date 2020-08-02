"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PublicApi {
    constructor(coreApi) {
        return {
            ver: "2020/06/04",
            tune: (ch, broadcastCallback) => coreApi.tune({ thread: { ch } }, broadcastCallback),
            rank: (ch, emitCallback) => coreApi.rank({ thread: { ch } }, emitCallback),
            fetchPosts: (ch, emitCallback) => coreApi.fetchPosts({ thread: { ch } }, emitCallback),
            post: (params = {}, emitCallback) => coreApi.post(params, emitCallback),
            getState: () => coreApi.apiStore.getState(),
        };
    }
}
exports.default = PublicApi;
//# sourceMappingURL=public.api.js.map