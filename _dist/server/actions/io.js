"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequence_1 = __importDefault(require("api/Sequence"));
const Thread_1 = __importDefault(require("api/store/Thread"));
const collections_1 = __importDefault(require("server/logics/db/collections/"));
const logics_1 = __importDefault(require("server/logics"));
const actions_1 = __importDefault(require("server/actions"));
const testRequestState_1 = __importDefault(require("server/utils/testRequestState"));
exports.default = {
    setUp: async () => {
        const io = await logics_1.default.io.get();
        return io.on("connection", actions_1.default.io.attachAPI);
    },
    attachAPI: async (ioUser, tt) => {
        const setting = await actions_1.default.db.setUpUser();
        Object.keys(Sequence_1.default.map).forEach((endpoint) => {
            const oneSequence = Sequence_1.default.map[endpoint];
            ioUser.on(endpoint, (requestState) => {
                console.log("------------------------------- " + endpoint);
                console.log(requestState);
                actions_1.default.io[endpoint](ioUser, requestState, setting);
            });
        });
        logics_1.default.io.connectionServer(ioUser);
    },
    tune: async (ioUser, requestState, setting) => {
        let { app, thread: requestThread } = requestState;
        const { ch } = requestThread;
        const liveCnt = await logics_1.default.db.users.getIncLiveCnt(ioUser.conn.id, ch);
        let { thread, isExist } = await logics_1.default.db.threads.tune({ ch }, liveCnt, true);
        requestState.thread = thread;
        const threadStatus = Thread_1.default.getStatus(thread, app, isExist, setting);
        requestState.app = collections_1.default.getNewApp(requestState.type, app, threadStatus, thread);
        if (threadStatus.isRequireUpsert) {
            thread = await logics_1.default.db.threads.requestHtmlParams(thread, requestState);
            if (threadStatus.isCreate) {
                thread = await logics_1.default.db.threads.save(thread);
                logics_1.default.io.tune(ioUser, requestState, setting);
            }
            else {
                logics_1.default.io.tune(ioUser, requestState, setting);
            }
        }
        else {
            logics_1.default.io.tune(ioUser, requestState, setting);
        }
    },
    fetchPosts: async (ioUser, requestState, setting) => {
        actions_1.default.io.exeFetchPosts(ioUser, requestState, setting);
    },
    getMore: async (ioUser, requestState, setting) => {
        let { app } = requestState;
        const { ch } = requestState.thread;
        let thread = { ch };
        const threadStatus = Thread_1.default.getStatus(thread, app, true, setting);
        threadStatus.getMore = true;
        const postCntKey = threadStatus.isMultistream ? "multiPostCnt" : "postCnt";
        thread[postCntKey] = await logics_1.default.db.posts.getCounts(requestState, threadStatus);
        const { response: posts } = await logics_1.default.db.posts.find(requestState, setting, threadStatus);
        app = collections_1.default.getNewApp(requestState.type, app, thread, posts);
        logics_1.default.io.getMore(ioUser, { requestState, thread, posts, app });
    },
    changeThread: async (ioUser, requestState, setting) => {
        const oldCh = requestState.app.tuned;
        const { thread: oldThread } = await logics_1.default.db.threads.tune({ ch: oldCh }, -1);
        const newCh = requestState.thread.ch;
        const { thread: newThread } = await logics_1.default.db.threads.tune({ ch: newCh }, +1);
        logics_1.default.db.users.getIncLiveCnt(ioUser.conn.id, newCh);
        logics_1.default.io.changeThread(ioUser, {
            requestState,
            oldThread,
            newThread,
        });
        requestState.thread = newThread;
        actions_1.default.io.exeFetchPosts(ioUser, { ...requestState, type: "fetchPosts" }, setting);
    },
    exeFetchPosts: async (ioUser, requestState, setting) => {
        const uid = ioUser.conn.id;
        const { ch } = requestState.thread;
        let { app } = requestState;
        let { response: thread, isExist } = await logics_1.default.db.threads.findOne(ch, { buildinSchema: true });
        thread.hasSlash = requestState.thread.hasSlash;
        const threadStatus = Thread_1.default.getStatus(thread, app, isExist, setting);
        const postCntKey = threadStatus.isMultistream ? "multiPostCnt" : "postCnt";
        thread[postCntKey] = await logics_1.default.db.posts.getCounts(requestState, threadStatus);
        const { response: posts } = await logics_1.default.db.posts.find(requestState, setting, threadStatus);
        app = collections_1.default.getNewApp(requestState.type, app, threadStatus, thread, posts);
        const isTune = await logics_1.default.db.users.isTuneUser(uid, ch);
        if (!isTune) {
        }
        logics_1.default.io.fetchPosts(ioUser, { requestState, thread, posts, app });
    },
    changeThreadDetail: async (ioUser, requestState, setting) => {
        const { ch } = requestState.thread;
        let { response: thread } = await logics_1.default.db.threads.findOne(ch, { buildinSchema: true });
        await logics_1.default.io.changeThreadDetail(ioUser, { requestState, thread });
    },
    rank: async (ioUser, requestState, setting) => {
        const rank = await logics_1.default.db.threads.rank(requestState, setting);
        logics_1.default.io.rank(ioUser, { requestState, rank });
    },
    post: async (ioUser, requestState, setting) => {
        const { app } = requestState;
        const { ch, emotions } = requestState.thread;
        const thread = { ch, emotions };
        const threadStatus = Thread_1.default.getStatus(thread, app, true, setting);
        const post = await logics_1.default.db.posts.save(requestState);
        const emotionKeys = emotions ? Object.keys(emotions) : [];
        let set = { $inc: { postCnt: 1 }, lastPost: post };
        if (emotionKeys.length > 0) {
            emotionKeys.forEach((emotionModelKey) => {
                Object.keys(emotions[emotionModelKey]).forEach((emotionKey) => {
                    set["$inc"][`emotions.${emotionModelKey}.${emotionKey}`] = emotions[emotionModelKey][emotionKey];
                });
            });
        }
        const response = await logics_1.default.db.threads.update(ch, set);
        const postCntKey = threadStatus.isMultistream ? "multiPostCnt" : "postCnt";
        thread[postCntKey] = await logics_1.default.db.posts.getCounts(requestState, threadStatus);
        await logics_1.default.io.post(ioUser, { requestState, posts: [post], thread });
    },
    updateThread: async (ioUser, requestState, setting) => {
        const { ch } = requestState.thread;
        let { response: thread } = await logics_1.default.db.threads.findOne(ch, { buildinSchema: true });
        const isMultistream = false;
        const isMediaCh = Thread_1.default.getStatusIsMediaCh(ch);
        thread.postCnt = await logics_1.default.db.posts.getCounts(requestState, {
            isMediaCh,
            isMultistream,
        });
        thread = await logics_1.default.db.threads.requestHtmlParams(thread, requestState);
        thread = await logics_1.default.db.threads.save(thread);
        logics_1.default.io.updateThread(ioUser, { requestState, thread });
        return true;
    },
    updateThreadServerMetas: async (ioUser, requestState, setting) => {
        const { ch } = requestState.thread;
        const { response: baseThread } = await logics_1.default.db.threads.findOne(ch);
        const serverMetas = await logics_1.default.db.threads.updateServerMetas(ch, baseThread, requestState.thread);
        await logics_1.default.io.updateThreadServerMetas(ioUser, {
            requestState,
            thread: { serverMetas },
        });
        return true;
    },
    disconnect: async (ioUser, requestState, setting) => {
        const { response: user } = await logics_1.default.db.users.findOne(ioUser.conn.id);
        if (user && user.ch) {
            await logics_1.default.db.users.remove(ioUser.conn.id);
            const liveCnt = await logics_1.default.db.users.getLiveCnt(user.ch);
            const { thread } = await logics_1.default.db.threads.tune({ ch: user.ch }, liveCnt, true);
            logics_1.default.io.disconnect(ioUser, {
                requestState: { type: "disconnect" },
                thread,
            });
        }
        return true;
    },
    testAPI: (ioUser, setting) => {
        if (Object.keys(testRequestState_1.default).length > 0) {
            let { chs, state } = testRequestState_1.default.find();
            chs.forEach((ch, index) => {
                const requestState = {
                    ...state,
                    thread: { ...state.thread, ch },
                };
                actions_1.default.io["find"](ioUser, requestState, setting);
            });
        }
    },
};
//# sourceMappingURL=io.js.map