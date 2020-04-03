"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state = {}, action) => {
    return action.threadDetail ? Object.assign({}, action.threadDetail) : state;
};
//# sourceMappingURL=threadDetail.js.map