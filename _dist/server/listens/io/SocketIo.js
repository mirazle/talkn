"use strict";
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
    }
    async get() {
        return this.io;
    }
    async on(key, callback) {
        this.io.on(key, callback);
    }
    async broadcast(key, state) {
        this.io.emit(key, state);
    }
    async emit(ioUser, key, state) {
        ioUser.emit(key, state);
    }
}
exports.default = SocketIo;
//# sourceMappingURL=SocketIo.js.map