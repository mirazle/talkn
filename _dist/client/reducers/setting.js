"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state = {}, action) => {
    return action.setting ? { ...action.setting } : state;
};
//# sourceMappingURL=setting.js.map