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
const https_1 = __importDefault(require("https"));
const socket_io_1 = __importDefault(require("socket.io"));
const socket_io_redis_1 = __importDefault(require("socket.io-redis"));
const conf_1 = __importDefault(require("server/conf"));
class SocketIo {
    constructor() {
        const httpsServer = https_1.default.createServer(conf_1.default.sslOptions);
        httpsServer.listen(conf_1.default.socketIO.port);
        const io = socket_io_1.default(httpsServer);
        console.log("SOCKET IO RUN : " + conf_1.default.socketIO.port);
        this.io = io.adapter(socket_io_redis_1.default({ host: conf_1.default.redis.host, port: conf_1.default.redis.port }));
        return this;
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.io;
        });
    }
    on(key, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.on(key, callback);
        });
    }
    broadcast(key, state) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit(key, state);
        });
    }
    emit(ioUser, key, state) {
        return __awaiter(this, void 0, void 0, function* () {
            ioUser.emit(key, state);
        });
    }
}
exports.default = SocketIo;
//# sourceMappingURL=SocketIo.js.map