"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDB_1 = __importDefault(require("server/listens/db/MongoDB"));
class Setting {
    constructor(dbConnection) {
        this.collection = MongoDB_1.default.getCollection(dbConnection, Setting.name);
        return this;
    }
    getSchema(params = {}) {
        return new this.collection(params);
    }
    findOne(condition = {}, selector = {}, option = {}) {
        return new Promise(resolve => {
            this.collection.findOne((error, response) => {
                if (error)
                    throw error;
                resolve(response);
            });
        });
    }
}
exports.default = Setting;
//# sourceMappingURL=Setting.js.map