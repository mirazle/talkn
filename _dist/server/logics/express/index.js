"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Portal_1 = __importDefault(require("server/logics/express/Portal"));
const Session_1 = __importDefault(require("server/logics/express/Session"));
const Client_1 = __importDefault(require("server/logics/express/Client"));
const Assets_1 = __importDefault(require("server/logics/express/Assets"));
exports.default = {
    portal: new Portal_1.default(),
    session: new Session_1.default(),
    client: new Client_1.default(),
    assets: new Assets_1.default()
};
//# sourceMappingURL=index.js.map