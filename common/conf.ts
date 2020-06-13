import define from "./define";
import os from "os";
import process from "process";

const {
  PRODUCTION,
  DEVELOPMENT,
  PRODUCTION_IP,
  LOCALHOST,
  PRODUCTION_DOMAIN,
  DEVELOPMENT_DOMAIN,
  SUB_DOMAINS,
  PORTS,
} = define;
const apiVer = 1;
const hostName = os.hostname();
const env = getEnv(hostName);
const isDev = env === DEVELOPMENT;
const domain = env === PRODUCTION ? PRODUCTION_DOMAIN : DEVELOPMENT_DOMAIN;
const wwwURL = `${SUB_DOMAINS.WWW}.${domain}`;
const apiURL = `${SUB_DOMAINS.API}.${domain}`;
const apiAccessURL = isDev ? `${LOCALHOST}:${PORTS.DEVELOPMENT_API}/talkn.api.js` : `${apiURL}/v${apiVer}`;
const clientURL = isDev ? `${LOCALHOST}:${PORTS.DEVELOPMENT}/talkn.client.js` : `${SUB_DOMAINS.CLIENT}.${domain}`;
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

const findOnePostCnt = 30;
const findOneLimitCnt = 300;
const ogpImages = {
  Html: `//${assetsImgPath}talkn_logo_html.png`,
  Music: `//${assetsImgPath}talkn_logo_music.png`,
  Video: `//${assetsImgPath}talkn_logo_video.png`,
};

const conf: any = {
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
  findOnePostCnt,
  findOneLimitCnt,
  ogpImages,
};
export default { ...conf };

function getEnv(hostName) {
  if (hostName === define.PRODUCTION_IP || hostName.indexOf(define.PRODUCTION_DOMAIN) >= 0) {
    return define.PRODUCTION;
  } else {
    if (process.title === "browser") {
      const port = Number(location.port);
      if (port === define.PORTS.DEVELOPMENT || port === define.PORTS.DEVELOPMENT_API) {
        return define.DEVELOPMENT;
      }
    }
    return define.LOCALHOST;
  }
}
