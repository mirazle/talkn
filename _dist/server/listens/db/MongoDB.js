"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const conf_1 = __importDefault(require("server/conf"));
const schemas_1 = __importDefault(require("server/schemas"));
const Threads_1 = __importDefault(require("server/listens/db/Threads"));
const Posts_1 = __importDefault(require("server/listens/db/Posts"));
const Users_1 = __importDefault(require("server/listens//db/Users"));
const Setting_1 = __importDefault(require("server/listens/db/Setting"));
class MongoDB {
    constructor() {
        mongoose_1.default.set("useFindAndModify", false);
        mongoose_1.default.set("useUnifiedTopology", true);
        mongoose_1.default.set("useCreateIndex", true);
        mongoose_1.default.Promise = global.Promise;
        const { host, port, dbName, option } = conf_1.default.mongoDB;
        const address = `mongodb://${host}:${port}/${dbName}`;
        const dbConnection = mongoose_1.default.createConnection(address, option);
        console.log(`MONGO DB RUN : ${conf_1.default.mongoDB.port}`);
        return {
            Setting: new Setting_1.default(dbConnection),
            Threads: new Threads_1.default(dbConnection),
            Posts: new Posts_1.default(dbConnection),
            Users: new Users_1.default(dbConnection)
        };
    }
    static getSchema(collectionName) {
        return mongoose_1.default.Schema(schemas_1.default.db.collections[collectionName], {
            collection: collectionName
        });
    }
    static getCollection(con, collectionName) {
        const schema = MongoDB.getSchema(collectionName);
        return con.model(collectionName, schema);
    }
    static getBuiltinObjToSchema(schema, builtinObj) {
        Object.keys(schema.toJSON()).forEach(key => {
            if (builtinObj[key]) {
                let builtinValue = builtinObj[key];
                if (builtinValue.constructor.name === "Object") {
                    builtinValue = MongoDB.getBuiltinObjToSchema(schema[key], builtinValue);
                }
                else {
                    schema[key] = builtinValue;
                }
            }
        });
        return schema;
    }
    static getDefineSchemaObj(obj) {
        Object.keys(obj).forEach(key => {
            let values = obj[key];
            if (typeof values === "object") {
                if (!values.type && !values.default) {
                    values = MongoDB.getDefineSchemaObj(values);
                }
                else if (values.default ||
                    values.default === "" ||
                    values.default === 0) {
                    obj[key] = values.default;
                }
                else {
                    obj[key] = values;
                }
            }
        });
        return obj;
    }
}
exports.default = MongoDB;
//# sourceMappingURL=MongoDB.js.map