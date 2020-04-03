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
class Io {
    constructor(socketIo) {
        this.io = socketIo;
        return this;
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.io.get();
        });
    }
    connectionServer(ioUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, {
                type: Sequence_1.default.CONNECTION_SERVER_KEY
            });
        });
    }
    tuned(ioUser, requestState, setting) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseEmitState = Sequence_1.default.getResponseState("Emit", requestState, {
                user: { uid: ioUser.conn.id },
                setting
            });
            return this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, responseEmitState);
        });
    }
    find(ioUser, { requestState, thread, posts, app }) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseEmitState = Sequence_1.default.getResponseState("Emit", requestState, {
                thread,
                posts,
                app
            });
            const responseBroadcastState = Sequence_1.default.getResponseState("Broadcast", requestState, { thread });
            this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, responseEmitState);
            this.io.broadcast(responseBroadcastState.thread.ch, responseBroadcastState);
            return true;
        });
    }
    getMore(ioUser, { requestState, thread, posts, app }) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseEmitState = Sequence_1.default.getResponseState("Emit", requestState, {
                thread,
                posts,
                app
            });
            this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, responseEmitState);
            return true;
        });
    }
    findMenuIndex(ioUser, { requestState, menuIndex }) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseEmitState = Sequence_1.default.getResponseState("Emit", requestState, {
                menuIndex
            });
            this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, responseEmitState);
            return true;
        });
    }
    changeThreadDetail(ioUser, { requestState, thread }) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseEmitState = Sequence_1.default.getResponseState("Emit", requestState, { thread });
            this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, responseEmitState);
            return true;
        });
    }
    updateThread(ioUser, { requestState, thread }) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseEmitState = Sequence_1.default.getResponseState("Emit", requestState, {
                thread
            });
            this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, responseEmitState);
            return true;
        });
    }
    changeThread(ioUser, { requestState, thread, app }) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseEmitState = Sequence_1.default.getResponseState("Emit", requestState, {
                app
            });
            const responseBroadcastState = Sequence_1.default.getResponseState("Broadcast", requestState, { thread });
            this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, responseEmitState);
            this.io.broadcast(responseBroadcastState.thread.ch, responseBroadcastState);
            return true;
        });
    }
    post(ioUser, { requestState, posts, thread }) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseBroadcastState = Sequence_1.default.getResponseState("Broadcast", requestState, {
                posts,
                thread,
                menuIndex: posts
            });
            const chs = posts[0].chs;
            chs.forEach(ch => {
                responseBroadcastState.thread.ch = ch;
                this.io.broadcast(ch, responseBroadcastState);
            });
            return true;
        });
    }
    updateThreadServerMetas(ioUser, { requestState, thread }) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseEmitState = Sequence_1.default.getResponseState("Emit", requestState, {
                thread
            });
            this.io.emit(ioUser, Sequence_1.default.CATCH_ME_KEY, responseEmitState);
            return true;
        });
    }
    saveOnWatchCnt(ioUser, { requestState, thread }) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseBroadcastState = Sequence_1.default.getResponseState("Broadcast", requestState, { thread });
            return this.io.broadcast(responseBroadcastState.thread.ch, responseBroadcastState);
        });
    }
}
exports.default = Io;
//# sourceMappingURL=Io.js.map