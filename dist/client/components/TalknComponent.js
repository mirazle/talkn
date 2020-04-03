"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
class TalknComponent extends react_1.Component {
    get apiStore() {
        return window.talknWindow.apiState;
    }
    get apiState() {
        return window.talknWindow.apiState.getState();
    }
    coreApi(method, params, callback = () => { }) {
        return window.talknWindow.parentCoreApi(method, params, callback);
    }
}
exports.default = TalknComponent;
//# sourceMappingURL=TalknComponent.js.map