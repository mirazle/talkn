"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("server/actions/db"));
const io_1 = __importDefault(require("server/actions/io"));
const express_1 = __importDefault(require("server/actions/express"));
let actions = { db: db_1.default, io: io_1.default, express: express_1.default };
exports.default = actions;
//# sourceMappingURL=index.js.map