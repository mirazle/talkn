"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const define_1 = __importDefault(require("common/define"));
const conf_1 = __importDefault(require("common/conf"));
const { SUB_DOMAINS, DEVELOPMENT } = define_1.default;
const { domain } = conf_1.default;
const existLocation = typeof location === "object" ? true : false;
conf_1.default.mediaSecondInterval = 200;
conf_1.default.screenMode = {
    small: 600,
    middle: 960
};
conf_1.default.protcol = existLocation ? (location.href.indexOf("https") === 0 ? "https" : "http") : "";
conf_1.default.server = domain;
conf_1.default.portalPath =
    conf_1.default.env === DEVELOPMENT ? `//${SUB_DOMAINS.PORTAL}.${domain}/` : `//${SUB_DOMAINS.PORTAL}.${domain}/`;
conf_1.default.clientPath = `//${SUB_DOMAINS.CLIENT}.${domain}/`;
conf_1.default.assetsPath = `//${SUB_DOMAINS.ASSETS}.${domain}/`;
conf_1.default.sessionPath = `//${SUB_DOMAINS.SESSION}.${domain}/`;
conf_1.default.cacheKey = { index: "talknIndexList", setting: "talknSettingParams" };
exports.default = conf_1.default;
//# sourceMappingURL=index.js.map