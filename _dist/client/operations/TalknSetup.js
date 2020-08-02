"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = __importDefault(require("common/conf"));
const define_1 = __importDefault(require("common/define"));
class TalknSetupJs {
    constructor() {
        TalknSetupJs.setupMath();
    }
    static setupMath() {
        Math.easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1)
                return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        };
    }
    static setupLog() {
        if (conf_1.default.env === define_1.default.PRODUCTION && window.talknWindow) {
            window.log = (params) => {
                const { ui } = window.talknWindow.store.getState();
                console.log(ui.iFrameId);
            };
        }
    }
}
exports.default = TalknSetupJs;
//# sourceMappingURL=TalknSetup.js.map