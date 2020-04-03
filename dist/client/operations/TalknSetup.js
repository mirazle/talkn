"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TalknSetupJs {
    static setupMath() {
        Math.easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1)
                return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        };
    }
}
exports.default = TalknSetupJs;
//# sourceMappingURL=TalknSetup.js.map