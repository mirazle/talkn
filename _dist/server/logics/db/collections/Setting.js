"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Setting {
    constructor(collection) {
        this.collection = collection;
        return this;
    }
    async findOne(buildinSchema = true) {
        let responses = await this.collection.findOne();
        if (buildinSchema) {
            if (!responses || !responses.response) {
                responses = await this.collection.getSchema();
            }
        }
        return responses;
    }
}
exports.default = Setting;
//# sourceMappingURL=Setting.js.map