"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDB_1 = __importDefault(require("server/listens/db/MongoDB"));
class Users {
    constructor(dbConnection) {
        this.collection = MongoDB_1.default.getCollection(dbConnection, Users.name);
        return this;
    }
    getSchema(params = {}) {
        return new this.collection(params);
    }
    find(condition, selector, option) {
        return new Promise(resolve => {
            this.collection.find(condition, (error, response) => {
                if (error)
                    console.warn(error);
                resolve({ error, response });
            });
        });
    }
    findOne(condition = {}) {
        return new Promise(resolve => {
            this.collection.findOne(condition, (error, response) => {
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
    remove(uid) {
        return new Promise(resolve => {
            this.collection.deleteOne({ uid }, (error, response) => {
                if (error)
                    console.warn(error);
                resolve({ response, error });
            });
        });
    }
    removeAll() {
        return new Promise(resolve => {
            this.collection.deleteMany({}, (error, response) => {
                if (error)
                    console.warn(error);
                resolve({ response, error });
            });
        });
    }
}
exports.default = Users;
//# sourceMappingURL=Users.js.map