"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logics_1 = __importDefault(require("server/logics"));
exports.default = {
    setUp: async () => {
        await logics_1.default.db.threads.resetWatchCnt();
        await logics_1.default.db.users.removeAll();
    },
    setUpUser: async () => {
        return await logics_1.default.db.setting.findOne();
    }
};
//# sourceMappingURL=db.js.map