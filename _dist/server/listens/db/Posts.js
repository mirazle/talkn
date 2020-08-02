"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDB_1 = __importDefault(require("server/listens/db/MongoDB"));
class Posts {
    constructor(dbConnection) {
        this.collection = MongoDB_1.default.getCollection(dbConnection, Posts.name);
        return this;
    }
    getSchema(params = {}) {
        return new this.collection(params);
    }
    count(condition) {
        return new Promise(resolve => {
            this.collection.countDocuments(condition, (error, response) => {
                if (error)
                    console.warn(error);
                resolve({ error, response });
            });
        });
    }
    find(condition, selector, option) {
        return new Promise(resolve => {
            this.collection.find(condition, selector, option, (error, response) => {
                if (error)
                    console.warn(error);
                resolve({ error, response });
            });
        });
    }
    save(set = {}, option = {}) {
        return new Promise(resolve => {
            const post = new this.collection(set);
            post.save((error, response) => {
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
}
exports.default = Posts;
//# sourceMappingURL=Posts.js.map