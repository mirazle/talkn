"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequence_1 = __importDefault(require("api/Sequence"));
class Io {
    constructor(socketIo) {
        this.io = socketIo;
        return this;
    }
    async get() {
        return this.io.get();
    }
    async connectionServer(ioUser) {
        return this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, { type: Sequence_1.default.CONNECTION_SERVER_KEY });
    }
    async tune(ioUser, requestState, setting) {
        const { thread } = requestState;
        const responseEmitState = Sequence_1.default.getResponseState("Emit", requestState, {
            thread,
            user: { uid: ioUser.conn.id },
            setting,
        });
        const responseBroadcastState = Sequence_1.default.getResponseState("Broadcast", requestState, { thread });
        this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, responseEmitState);
        this.io.broadcast(responseBroadcastState.thread.ch, responseBroadcastState);
    }
    async fetchPosts(ioUser, { requestState, thread, posts, app }) {
        const responseEmitState = Sequence_1.default.getResponseState("Emit", requestState, {
            thread,
            posts,
            app,
        });
        this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, responseEmitState);
    }
    async getMore(ioUser, { requestState, thread, posts, app }) {
        const responseEmitState = Sequence_1.default.getResponseState("Emit", requestState, {
            thread,
            posts,
            app,
        });
        this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, responseEmitState);
    }
    async rank(ioUser, { requestState, rank }) {
        const responseEmitState = Sequence_1.default.getResponseState("Emit", requestState, { rank });
        this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, responseEmitState);
    }
    async changeThreadDetail(ioUser, { requestState, thread }) {
        const responseEmitState = Sequence_1.default.getResponseState("Emit", requestState, { thread });
        this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, responseEmitState);
    }
    async updateThread(ioUser, { requestState, thread }) {
        const responseEmitState = Sequence_1.default.getResponseState("Emit", requestState, {
            thread,
        });
        this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, responseEmitState);
    }
    async changeThread(ioUser, { requestState, oldThread, newThread }) {
        const responseEmitState = Sequence_1.default.getResponseState("Emit", requestState, { thread: newThread });
        this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, responseEmitState);
        const responseBroadcastState1 = Sequence_1.default.getResponseState("Broadcast", requestState, { thread: oldThread });
        this.io.broadcast(responseBroadcastState1.thread.ch, responseBroadcastState1);
        const responseBroadcastState2 = Sequence_1.default.getResponseState("Broadcast", requestState, { thread: newThread });
        this.io.broadcast(responseBroadcastState2.thread.ch, responseBroadcastState2);
    }
    async post(ioUser, { requestState, posts, thread }) {
        const responseBroadcastState = Sequence_1.default.getResponseState("Broadcast", requestState, {
            posts,
            thread,
            user: requestState.user,
            rank: posts,
        });
        const chs = posts[0].chs;
        chs.forEach((ch) => {
            responseBroadcastState.posts[0].ch = ch;
            this.io.broadcast(ch, responseBroadcastState);
        });
    }
    async updateThreadServerMetas(ioUser, { requestState, thread }) {
        const responseEmitState = Sequence_1.default.getResponseState("Emit", requestState, {
            thread,
        });
        this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, responseEmitState);
    }
    async disconnect(ioUser, { requestState, thread }) {
        const responseBroadcastState = Sequence_1.default.getResponseState("Broadcast", requestState, { thread });
        return this.io.broadcast(responseBroadcastState.thread.ch, responseBroadcastState);
    }
}
exports.default = Io;
//# sourceMappingURL=Io.js.map