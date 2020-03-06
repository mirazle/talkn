"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Posts_1 = __importDefault(require("server/schemas/db/collections/Posts"));
const Setting_1 = __importDefault(require("server/schemas/db/collections/Setting"));
const Threads_1 = __importDefault(require("server/schemas/db/collections/Threads"));
const Users_1 = __importDefault(require("server/schemas/db/collections/Users"));
const html_1 = __importDefault(require("server/schemas/logics/html"));
exports.default = {
    db: {
        collections: {
            Posts: Posts_1.default,
            Setting: Setting_1.default,
            Threads: Threads_1.default,
            Users: Users_1.default
        }
    },
    logics: {
        html: html_1.default
    }
};
//# sourceMappingURL=index.js.map