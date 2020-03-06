"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state = {}, action) => {
    return action.threads ? Object.assign({}, action.threads) : state;
};
//# sourceMappingURL=threads.js.map