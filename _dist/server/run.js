"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = __importDefault(require("server/actions"));
class TalknServer {
    async start() {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
        await actions_1.default.db.setUp();
        await actions_1.default.io.setUp();
        await actions_1.default.express.setUp();
    }
}
const talknServer = new TalknServer();
talknServer.start();
//# sourceMappingURL=run.js.map