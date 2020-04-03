"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("api/store/App"));
const User_1 = __importDefault(require("api/store/User"));
const MenuIndex_1 = __importDefault(require("api/store/MenuIndex"));
const MenuLogs_1 = __importDefault(require("api/store/MenuLogs"));
const Posts_1 = __importDefault(require("api/store/Posts"));
const Analyze_1 = __importDefault(require("api/store/Analyze"));
const BootOption_1 = __importDefault(require("api/store/BootOption"));
const Thread_1 = __importDefault(require("api/store/Thread"));
const ActionLogs_1 = __importDefault(require("api/store/ActionLogs"));
class State {
    constructor(window, bootOption = {}, caches = {}) {
        this.menuIndex = new MenuIndex_1.default();
        this.menuLogs = new MenuLogs_1.default(caches.menuLogs);
        this.posts = new Posts_1.default();
        this.postsMulti = new Posts_1.default();
        this.postsSingle = new Posts_1.default();
        this.postsChild = new Posts_1.default();
        this.postsTimeline = new Posts_1.default();
        this.postsLogs = new Posts_1.default();
        this.analyze = new Analyze_1.default();
        this.bootOption = new BootOption_1.default(bootOption);
        this.thread = new Thread_1.default(window, this.bootOption, caches.thread);
        this.threadDetail = new Thread_1.default(window, this.bootOption, caches.thread);
        this.app = new App_1.default(State.getAppParams(this.thread, this.bootOption, caches));
        this.user = new User_1.default(State.getUserParams(this, caches));
        this.actionLog = new ActionLogs_1.default();
    }
    static getAppParams(thread, bootOption, caches) {
        return Object.assign(Object.assign({ isTransition: true, rootTitle: thread.title }, bootOption), thread);
    }
    static getUserParams(self, caches) {
        if (caches && caches.user && caches.user.uid) {
            return Object.assign({}, caches.user);
        }
        else {
            const dispThreadType = self.thread.ch === self.app.rootCh ? App_1.default.dispThreadTypeMulti : App_1.default.dispThreadTypeSingle;
            return { dispThreadType };
        }
    }
    get appName() {
        return this.app.name;
    }
    get talknIndex() {
        return this.app.talknIndex;
    }
    get ch() {
        return this.thread.ch;
    }
}
exports.default = State;
//# sourceMappingURL=index.js.map