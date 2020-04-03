"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state = {}, action) => {
    return action.bootOption ? Object.assign({}, action.bootOption) : state;
};
//# sourceMappingURL=bootOption.js.map