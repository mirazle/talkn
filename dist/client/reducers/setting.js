"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state = {}, action) => {
    return action.setting ? Object.assign({}, action.setting) : state;
};
//# sourceMappingURL=setting.js.map