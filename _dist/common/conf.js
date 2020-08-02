"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const define_1 = __importDefault(require("./define"));
const os_1 = __importDefault(require("os"));
const process_1 = __importDefault(require("process"));
const { PRODUCTION, DEVELOPMENT, PRODUCTION_DOMAIN, DEVELOPMENT_DOMAIN, SUB_DOMAINS, PORTS } = define_1.default;
const apiVer = 1;
const hostName = os_1.default.hostname();
const env = getEnv(hostName);
const isDev = env === DEVELOPMENT;
const domain = env === PRODUCTION ? PRODUCTION_DOMAIN : DEVELOPMENT_DOMAIN;
const wwwURL = `${SUB_DOMAINS.WWW}.${domain}`;
const apiURL = `${SUB_DOMAINS.API}.${domain}`;
const apiAccessURL = isDev ? `${domain}:${PORTS.DEVELOPMENT_API}/talkn.api.js` : `${apiURL}/v${apiVer}`;
const clientURL = isDev ? `${domain}:${PORTS.DEVELOPMENT}/talkn.client.js` : `${SUB_DOMAINS.CLIENT}.${domain}`;
const descURL = `${SUB_DOMAINS.DESC}.${domain}`;
const portalURL = `${SUB_DOMAINS.PORTAL}.${domain}`;
const assetsURL = `${SUB_DOMAINS.ASSETS}.${domain}`;
const autoURL = `${SUB_DOMAINS.AUTO}.${domain}`;
const extURL = `${SUB_DOMAINS.EXT}.${domain}`;
const transactionURL = `${SUB_DOMAINS.TRANSACTION}.${domain}`;
const assetsImgPath = `${assetsURL}/img/`;
const assetsIconPath = `${assetsURL}/icon/`;
const assetsJsPath = `${assetsURL}/js/`;
const sessionURL = `${SUB_DOMAINS.SESSION}.${domain}`;
const description = "talkn can share comments with users watching the same WEB page. Please enjoy the world of talkn.";
const findOneThreadActiveHour = 1;
const findOnePostCnt = 30;
const findOneLimitCnt = 300;
const ogpImages = {
    Html: `//${assetsImgPath}talkn_logo_html.png`,
    Music: `//${assetsImgPath}talkn_logo_music.png`,
    Video: `//${assetsImgPath}talkn_logo_video.png`,
};
const conf = {
    domain,
    env,
    hostName,
    apiURL,
    apiAccessURL,
    wwwURL,
    descURL,
    portalURL,
    clientURL,
    assetsURL,
    autoURL,
    extURL,
    transactionURL,
    assetsImgPath,
    assetsIconPath,
    assetsJsPath,
    sessionURL,
    description,
    apiVer,
    findOneThreadActiveHour,
    findOnePostCnt,
    findOneLimitCnt,
    ogpImages,
};
exports.default = { ...conf };
function getEnv(hostName) {
    if (process_1.default.title === "browser") {
        if (hostName === define_1.default.DEVELOPMENT_DOMAIN) {
            const port = Number(location.port);
            return port === define_1.default.PORTS.DEVELOPMENT || port === define_1.default.PORTS.DEVELOPMENT_API
                ? define_1.default.DEVELOPMENT
                : define_1.default.LOCALHOST;
        }
        return define_1.default.PRODUCTION;
    }
    else {
        return hostName.indexOf(define_1.default.AWS_HOST_KEY) >= 0 ? define_1.default.PRODUCTION : define_1.default.DEVELOPMENT;
    }
}
//# sourceMappingURL=conf.js.map