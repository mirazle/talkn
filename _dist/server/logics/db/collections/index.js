"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("api/store/App"));
const Threads_1 = __importDefault(require("server/logics/db/collections/Threads"));
const Posts_1 = __importDefault(require("server/logics/db/collections/Posts"));
const Setting_1 = __importDefault(require("server/logics/db/collections/Setting"));
const Users_1 = __importDefault(require("server/logics/db/collections/Users"));
class Collections {
    constructor(mongoDB) {
        this.threads = new Threads_1.default(mongoDB.Threads);
        this.posts = new Posts_1.default(mongoDB.Posts);
        this.setting = new Setting_1.default(mongoDB.Setting);
        this.users = new Users_1.default(mongoDB.Users);
        return this;
    }
    static getNewApp(type, app, threadStatus, thread, posts = []) {
        const tuned = thread.ch;
        let dispThreadType = "";
        if (type === "getMore") {
            dispThreadType = app.dispThreadType;
        }
        else {
            const { stepTo } = App_1.default.getStepToDispThreadType({ app }, threadStatus, thread.ch);
            switch (stepTo) {
                case `${App_1.default.dispThreadTypeTimeline} to ${App_1.default.dispThreadTypeMulti}`:
                    dispThreadType = App_1.default.dispThreadTypeMulti;
                    break;
                case `${App_1.default.dispThreadTypeTimeline} to ${App_1.default.dispThreadTypeTimeline}`:
                    dispThreadType = App_1.default.dispThreadTypeTimeline;
                    break;
                case `${App_1.default.dispThreadTypeMulti} to ${App_1.default.dispThreadTypeMulti}`:
                    dispThreadType = App_1.default.dispThreadTypeMulti;
                    break;
                case `${App_1.default.dispThreadTypeMulti} to ${App_1.default.dispThreadTypeTimeline}`:
                    dispThreadType = App_1.default.dispThreadTypeTimeline;
                    break;
                case `${App_1.default.dispThreadTypeMulti} to ${App_1.default.dispThreadTypeChild}`:
                    dispThreadType = App_1.default.dispThreadTypeChild;
                    break;
                case `${App_1.default.dispThreadTypeSingle} to ${App_1.default.dispThreadTypeChild}`:
                    dispThreadType = App_1.default.dispThreadTypeChild;
                    break;
                case `${App_1.default.dispThreadTypeChild} to ${App_1.default.dispThreadTypeMulti}`:
                    dispThreadType = App_1.default.dispThreadTypeMulti;
                    break;
                case `${App_1.default.dispThreadTypeChild} to ${App_1.default.dispThreadTypeSingle}`:
                    dispThreadType = App_1.default.dispThreadTypeSingle;
                    break;
                case `${App_1.default.dispThreadTypeChild} to ${App_1.default.dispThreadTypeChild}`:
                    dispThreadType = App_1.default.dispThreadTypeChild;
                    break;
                case `${App_1.default.dispThreadTypeSingle} to ${App_1.default.dispThreadTypeSingle}`:
                    dispThreadType = App_1.default.dispThreadTypeSingle;
                    break;
                case `${App_1.default.dispThreadTypeSingle} to ${App_1.default.dispThreadTypeMulti}`:
                    dispThreadType = App_1.default.dispThreadTypeMulti;
                    break;
            }
        }
        const offsetFindId = App_1.default.getOffsetFindId({ posts });
        return {
            ...app,
            tuned,
            offsetFindId,
            dispThreadType,
        };
    }
}
exports.default = Collections;
//# sourceMappingURL=index.js.map