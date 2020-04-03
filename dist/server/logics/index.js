"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("server/logics/express"));
const sns_1 = __importDefault(require("server/logics/sns"));
const collections_1 = __importDefault(require("server/logics/db/collections"));
const Io_1 = __importDefault(require("server/logics/Io"));
const Html_1 = __importDefault(require("server/logics/Html"));
const Favicon_1 = __importDefault(require("server/logics/Favicon"));
const Fs_1 = __importDefault(require("server/logics/Fs"));
const Passport_1 = __importDefault(require("server/logics/Passport"));
const MongoDB_1 = __importDefault(require("server/listens/db/MongoDB"));
const SocketIo_1 = __importDefault(require("server/listens/io/SocketIo"));
const mongoDB = new MongoDB_1.default();
const socketIo = new SocketIo_1.default();
exports.default = {
    express: express_1.default,
    sns: new sns_1.default(),
    db: new collections_1.default(mongoDB),
    io: new Io_1.default(socketIo),
    html: new Html_1.default(),
    favicon: new Favicon_1.default(),
    fs: new Fs_1.default(),
    passport: new Passport_1.default()
};
//# sourceMappingURL=index.js.map