"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PublicApi {
    constructor(coreApi) {
        return {
            version: "1.0",
            find: (params = {}, callback = () => { }) => {
                coreApi.find(params, callback);
            },
            post: (params = {}, callback = () => { }) => {
                coreApi.post(params, callback);
            }
        };
    }
}
exports.default = PublicApi;
//# sourceMappingURL=public.api.js.map