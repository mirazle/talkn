"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDB_1 = __importDefault(require("server/listens/db/MongoDB"));
class Threads {
    constructor(dbConnection) {
        this.collection = MongoDB_1.default.getCollection(dbConnection, Threads.name);
        return this;
    }
    getSchema(params = {}) {
        return new this.collection(params);
    }
    save(thread) {
        return new Promise(resolve => {
            thread.save((error, response) => {
                if (error)
                    console.warn(error);
                resolve({ response, error });
            });
        });
    }
    update(condition = {}, set = {}, option = {}) {
        return new Promise(resolve => {
            this.collection.updateMany(condition, set, option, (error, response) => {
                if (error)
                    console.warn(error);
                resolve({ response, error });
            });
        });
    }
    findOne(condition = {}, selector = {}, option = {}, called) {
        return new Promise(resolve => {
            this.collection.findOne(condition, selector, option, (error, response) => {
                if (error)
                    console.warn(error);
                resolve({ error, response });
            });
        });
    }
    find(condition = {}, selector = {}, option = {}) {
        return new Promise(resolve => {
            this.collection.find(condition, selector, option, (error, response) => {
                if (error)
                    console.warn(error);
                resolve({ error, response });
            });
        });
    }
}
exports.default = Threads;
//# sourceMappingURL=Threads.js.map