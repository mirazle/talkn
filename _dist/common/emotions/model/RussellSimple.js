"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("common/emotions/index"));
class RussellSimple {
    constructor(type) {
        this.typesArray = [];
        Object.keys(RussellSimple.TYPES).forEach(index => {
            this.typesArray.push(RussellSimple.TYPES[index].LABEL);
        });
    }
    static get TYPES() {
        return [
            index_1.default.TYPES.EXCITE,
            index_1.default.TYPES.HAPPY,
            index_1.default.TYPES.JOY,
            index_1.default.TYPES.RELAX,
            index_1.default.TYPES.SLACK,
            index_1.default.TYPES.MELANCHOLY,
            index_1.default.TYPES.ANGER,
            index_1.default.TYPES.WORRY_FEAR
        ];
    }
    static getSaveBalance(stampId) {
        const balance = {
            1001: [{ [index_1.default.TYPES.EXCITE.ID]: 1 }],
            1002: [{ [index_1.default.TYPES.EXCITE.ID]: 1 }],
            1101: [{ [index_1.default.TYPES.EXCITE.ID]: 1 }],
            1102: [{ [index_1.default.TYPES.EXCITE.ID]: 1 }],
            1103: [{ [index_1.default.TYPES.EXCITE.ID]: 1 }],
            1201: [{ [index_1.default.TYPES.HAPPY.ID]: 1 }],
            1202: [{ [index_1.default.TYPES.HAPPY.ID]: 1 }],
            1203: [{ [index_1.default.TYPES.HAPPY.ID]: 1 }],
            1204: [{ [index_1.default.TYPES.HAPPY.ID]: 1 }],
            1301: [{ [index_1.default.TYPES.JOY.ID]: 1 }],
            1302: [{ [index_1.default.TYPES.JOY.ID]: 1 }],
            1303: [{ [index_1.default.TYPES.JOY.ID]: 1 }],
            1304: [{ [index_1.default.TYPES.JOY.ID]: 1 }],
            1305: [{ [index_1.default.TYPES.JOY.ID]: 1 }],
            1306: [{ [index_1.default.TYPES.JOY.ID]: 1 }],
            1307: [{ [index_1.default.TYPES.JOY.ID]: 1 }],
            1401: [{ [index_1.default.TYPES.JOY.ID]: 1 }],
            1402: [{ [index_1.default.TYPES.JOY.ID]: 1 }],
            1501: [{ [index_1.default.TYPES.JOY.ID]: 1 }],
            1502: [{ [index_1.default.TYPES.JOY.ID]: 1 }],
            1503: [{ [index_1.default.TYPES.JOY.ID]: 1 }],
            1504: [{ [index_1.default.TYPES.JOY.ID]: 1 }],
            1601: [{ [index_1.default.TYPES.RELAX.ID]: 1 }],
            1602: [{ [index_1.default.TYPES.RELAX.ID]: 1 }],
            1701: [{ [index_1.default.TYPES.RELAX.ID]: 1 }],
            1702: [{ [index_1.default.TYPES.RELAX.ID]: 1 }],
            1703: [{ [index_1.default.TYPES.RELAX.ID]: 1 }],
            1801: [{ [index_1.default.TYPES.TIRED.ID]: 1 }],
            1802: [{ [index_1.default.TYPES.TIRED.ID]: 1 }],
            1803: [{ [index_1.default.TYPES.TIRED.ID]: 1 }],
            2001: [{ [index_1.default.TYPES.SLACK.ID]: 1 }],
            2002: [{ [index_1.default.TYPES.SLACK.ID]: 1 }],
            2003: [{ [index_1.default.TYPES.SLACK.ID]: 1 }],
            2004: [{ [index_1.default.TYPES.SLACK.ID]: 1 }],
            2101: [{ [index_1.default.TYPES.SLACK.ID]: 1 }],
            2102: [{ [index_1.default.TYPES.SLACK.ID]: 1 }],
            2103: [{ [index_1.default.TYPES.SLACK.ID]: 1 }],
            2201: [{ [index_1.default.TYPES.MELANCHOLY.ID]: 1 }],
            2202: [{ [index_1.default.TYPES.MELANCHOLY.ID]: 1 }],
            2203: [{ [index_1.default.TYPES.MELANCHOLY.ID]: 1 }],
            2204: [{ [index_1.default.TYPES.MELANCHOLY.ID]: 1 }],
            2205: [{ [index_1.default.TYPES.MELANCHOLY.ID]: 1 }],
            2301: [{ [index_1.default.TYPES.MELANCHOLY.ID]: 1 }],
            2302: [{ [index_1.default.TYPES.MELANCHOLY.ID]: 1 }],
            2303: [{ [index_1.default.TYPES.MELANCHOLY.ID]: 1 }],
            2401: [{ [index_1.default.TYPES.MELANCHOLY.ID]: 1 }],
            2402: [{ [index_1.default.TYPES.MELANCHOLY.ID]: 1 }],
            2403: [{ [index_1.default.TYPES.MELANCHOLY.ID]: 1 }],
            2404: [{ [index_1.default.TYPES.MELANCHOLY.ID]: 1 }],
            2501: [{ [index_1.default.TYPES.MELANCHOLY.ID]: 1 }],
            2502: [{ [index_1.default.TYPES.MELANCHOLY.ID]: 1 }],
            2503: [{ [index_1.default.TYPES.MELANCHOLY.ID]: 1 }],
            2601: [{ [index_1.default.TYPES.ANGER.ID]: 1 }],
            2602: [{ [index_1.default.TYPES.ANGER.ID]: 1 }],
            2701: [{ [index_1.default.TYPES.ANGER.ID]: 1 }],
            2702: [{ [index_1.default.TYPES.ANGER.ID]: 1 }],
            2703: [{ [index_1.default.TYPES.ANGER.ID]: 1 }],
            2704: [{ [index_1.default.TYPES.ANGER.ID]: 1 }],
            2705: [{ [index_1.default.TYPES.ANGER.ID]: 1 }],
            2706: [{ [index_1.default.TYPES.ANGER.ID]: 1 }],
            2801: [{ [index_1.default.TYPES.WORRY_FEAR.ID]: 1 }],
            2802: [{ [index_1.default.TYPES.WORRY_FEAR.ID]: 1 }],
            2803: [{ [index_1.default.TYPES.WORRY_FEAR.ID]: 1 }],
            2804: [{ [index_1.default.TYPES.WORRY_FEAR.ID]: 1 }],
            2805: [{ [index_1.default.TYPES.WORRY_FEAR.ID]: 1 }],
            2806: [{ [index_1.default.TYPES.WORRY_FEAR.ID]: 1 }],
            2807: [{ [index_1.default.TYPES.WORRY_FEAR.ID]: 1 }],
            2901: [{ [index_1.default.TYPES.WORRY_FEAR.ID]: 1 }],
            2902: [{ [index_1.default.TYPES.WORRY_FEAR.ID]: 1 }],
            2903: [{ [index_1.default.TYPES.WORRY_FEAR.ID]: 1 }],
            2904: [{ [index_1.default.TYPES.WORRY_FEAR.ID]: 1 }],
            2905: [{ [index_1.default.TYPES.WORRY_FEAR.ID]: 1 }],
            2906: [{ [index_1.default.TYPES.WORRY_FEAR.ID]: 1 }]
        };
        return balance[stampId] ? balance[stampId] : null;
    }
    static getSchemas() {
        let schemas = {};
        RussellSimple.TYPES.forEach((obj, i) => {
            schemas[obj.LABEL] = { type: Number, default: 0, min: 0 };
        });
        return schemas;
    }
}
exports.default = RussellSimple;
//# sourceMappingURL=RussellSimple.js.map