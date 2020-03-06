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
const Sequence_1 = __importDefault(require("common/Sequence"));
const Thread_1 = __importDefault(require("api/store/Thread"));
const collections_1 = __importDefault(require("server/logics/db/collections/"));
const logics_1 = __importDefault(require("server/logics"));
const actions_1 = __importDefault(require("server/actions"));
const testRequestState_1 = __importDefault(require("server/utils/testRequestState"));
exports.default = {
    setUp: () => __awaiter(void 0, void 0, void 0, function* () {
        const io = yield logics_1.default.io.get();
        return io.on("connection", actions_1.default.io.attachAPI);
    }),
    attachAPI: (ioUser) => __awaiter(void 0, void 0, void 0, function* () {
        const setting = yield actions_1.default.db.setUpUser();
        Object.keys(Sequence_1.default.map).forEach(endpoint => {
            const oneSequence = Sequence_1.default.map[endpoint];
            ioUser.on(endpoint, requestState => {
                console.log("------------------------------- " + endpoint);
                console.log(requestState);
                actions_1.default.io[endpoint](ioUser, requestState, setting);
            });
        });
        logics_1.default.io.connectionServer(ioUser);
    }),
    tuned: (ioUser, requestState, setting) => {
        logics_1.default.db.users.update(ioUser.conn.id, requestState.thread.ch);
        logics_1.default.io.tuned(ioUser, requestState, setting);
        return true;
    },
    find: (ioUser, requestState, setting) => __awaiter(void 0, void 0, void 0, function* () {
        actions_1.default.io.exeFind(ioUser, requestState, setting);
    }),
    getMore: (ioUser, requestState, setting) => __awaiter(void 0, void 0, void 0, function* () {
        let { app } = requestState;
        const { ch } = requestState.thread;
        let thread = { ch };
        const isMultistream = Thread_1.default.getStatusIsMultistream(app);
        const postCntKey = isMultistream ? "multiPostCnt" : "postCnt";
        thread[postCntKey] = yield logics_1.default.db.posts.getCounts(requestState, {
            isMultistream
        });
        const { response: posts } = yield logics_1.default.db.posts.find(requestState, setting, { isMultistream, getMore: true });
        app = collections_1.default.getNewApp(requestState.type, app, thread, posts);
        logics_1.default.io.getMore(ioUser, { requestState, thread, posts, app });
    }),
    changeThread: (ioUser, requestState, setting) => __awaiter(void 0, void 0, void 0, function* () {
        const tuned = requestState.app.tuned;
        if (tuned !== "") {
            const ch = requestState.thread.ch;
            const thread = yield logics_1.default.db.threads.saveOnWatchCnt({ ch: tuned }, -1);
            logics_1.default.db.users.update(ioUser.conn.id, ch);
            logics_1.default.io.changeThread(ioUser, {
                requestState,
                thread,
                app: {
                    tuned: ch
                }
            });
        }
        requestState.type = "find";
        yield actions_1.default.io.exeFind(ioUser, requestState, setting);
    }),
    exeFind: (ioUser, requestState, setting) => __awaiter(void 0, void 0, void 0, function* () {
        let { app } = requestState;
        const { ch } = requestState.thread;
        let { response: thread } = yield logics_1.default.db.threads.findOne(ch, {}, {}, true);
        thread.hasSlash = requestState.thread.hasSlash;
        const threadStatus = Thread_1.default.getStatus(thread, app, setting);
        const postCntKey = threadStatus.isMultistream ? "multiPostCnt" : "postCnt";
        thread[postCntKey] = yield logics_1.default.db.posts.getCounts(requestState, threadStatus);
        const { response: posts } = yield logics_1.default.db.posts.find(requestState, setting, threadStatus);
        app = collections_1.default.getNewApp(requestState.type, app, threadStatus, thread, posts);
        if (threadStatus.isRequireUpsert) {
            thread = yield logics_1.default.db.threads.requestHtmlParams(thread, requestState);
            if (threadStatus.isSchema) {
                thread = yield logics_1.default.db.threads.save(thread);
                logics_1.default.io.find(ioUser, { requestState, thread, posts, app });
            }
            else {
                thread = yield logics_1.default.db.threads.saveOnWatchCnt(thread, +1);
                logics_1.default.io.find(ioUser, { requestState, thread, posts, app });
            }
        }
        else {
            if (!threadStatus.isToggleMultistream) {
                thread = yield logics_1.default.db.threads.saveOnWatchCnt(thread, +1);
            }
            logics_1.default.io.find(ioUser, { requestState, thread, posts, app });
        }
    }),
    changeThreadDetail: (ioUser, requestState, setting) => __awaiter(void 0, void 0, void 0, function* () {
        const { ch } = requestState.thread;
        let { response: thread } = yield logics_1.default.db.threads.findOne(ch, {}, {}, true);
        yield logics_1.default.io.changeThreadDetail(ioUser, { requestState, thread });
    }),
    findMenuIndex: (ioUser, requestState, setting) => __awaiter(void 0, void 0, void 0, function* () {
        const menuIndex = yield logics_1.default.db.threads.findMenuIndex(requestState, setting);
        logics_1.default.io.findMenuIndex(ioUser, { requestState, menuIndex });
    }),
    post: (ioUser, requestState, setting) => __awaiter(void 0, void 0, void 0, function* () {
        const { app } = requestState;
        const { ch, emotions } = requestState.thread;
        const thread = { ch, emotions };
        const isMultistream = Thread_1.default.getStatusIsMultistream(app);
        const post = yield logics_1.default.db.posts.save(requestState);
        const emotionKeys = Object.keys(emotions);
        let set = { $inc: { postCnt: 1 }, lastPost: post };
        if (emotionKeys.length > 0) {
            emotionKeys.forEach(emotionModelKey => {
                Object.keys(emotions[emotionModelKey]).forEach(emotionKey => {
                    set["$inc"][`emotions.${emotionModelKey}.${emotionKey}`] = emotions[emotionModelKey][emotionKey];
                });
            });
        }
        const response = yield logics_1.default.db.threads.update(ch, set);
        const postCntKey = isMultistream ? "multiPostCnt" : "postCnt";
        thread[postCntKey] = yield logics_1.default.db.posts.getCounts(requestState, {
            isMultistream
        });
        yield logics_1.default.io.post(ioUser, { requestState, posts: [post], thread });
        return true;
    }),
    updateThread: (ioUser, requestState, setting) => __awaiter(void 0, void 0, void 0, function* () {
        const { ch } = requestState.thread;
        let { response: thread } = yield logics_1.default.db.threads.findOne(ch, {}, {}, true);
        const isMultistream = false;
        const isMediaCh = Thread_1.default.getStatusIsMediaCh(ch);
        thread.postCnt = yield logics_1.default.db.posts.getCounts(requestState, {
            isMediaCh,
            isMultistream
        });
        thread = yield logics_1.default.db.threads.requestHtmlParams(thread, requestState);
        thread = yield logics_1.default.db.threads.save(thread);
        logics_1.default.io.updateThread(ioUser, { requestState, thread });
        return true;
    }),
    updateThreadServerMetas: (ioUser, requestState, setting) => __awaiter(void 0, void 0, void 0, function* () {
        const { ch } = requestState.thread;
        const { response: baseThread } = yield logics_1.default.db.threads.findOne(ch);
        const serverMetas = yield logics_1.default.db.threads.updateServerMetas(ch, baseThread, requestState.thread);
        yield logics_1.default.io.updateThreadServerMetas(ioUser, {
            requestState,
            thread: { serverMetas }
        });
        return true;
    }),
    disconnect: (ioUser, requestState, setting) => __awaiter(void 0, void 0, void 0, function* () {
        const { response: user } = yield logics_1.default.db.users.findOne(ioUser.conn.id);
        if (user && user.ch) {
            yield logics_1.default.db.users.remove(ioUser.conn.id);
            const watchCnt = yield logics_1.default.db.users.getChCnt(user.ch);
            const thread = yield logics_1.default.db.threads.saveOnWatchCnt({ ch: user.ch }, watchCnt, true);
            logics_1.default.io.saveOnWatchCnt(ioUser, {
                requestState: { type: "disconnect" },
                thread
            });
        }
        return true;
    }),
    testAPI: (ioUser, setting) => {
        if (Object.keys(testRequestState_1.default).length > 0) {
            let { chs, state } = testRequestState_1.default.find();
            chs.forEach((ch, index) => {
                const requestState = Object.assign(Object.assign({}, state), { thread: Object.assign(Object.assign({}, state.thread), { ch }) });
                actions_1.default.io["find"](ioUser, requestState, setting);
            });
        }
    }
};
//# sourceMappingURL=io.js.map