import os from 'os';
import process from 'process';

import define from './define';

const { PRODUCTION, DEVELOPMENT, PRODUCTION_DOMAIN, DEVELOPMENT_DOMAIN, SUB_DOMAINS, PORTS } = define;
const apiVer = 1;
const hostName = os.hasOwnProperty('hostname') ? os.hostname() : 'localhost';
const env = getEnv(hostName);
const files = {
  client: 'talkn.client.js',
  api: 'talkn.api.js',
  wsWorker: 'ws.api.worker.js',
  ext: 'talkn.ext.js',
};
const isDev = env === DEVELOPMENT;
const domain = env === PRODUCTION ? PRODUCTION_DOMAIN : DEVELOPMENT_DOMAIN;
const wwwURL = `${SUB_DOMAINS.WWW}.${domain}`;
const apiURL = `${SUB_DOMAINS.API}.${domain}`;
const apiAccessURL = isDev ? `${domain}:${PORTS.DEVELOPMENT_API}/${files.api}` : `${apiURL}/v${apiVer}`;
const clientURL = isDev ? `${domain}:${PORTS.DEVELOPMENT_CLIENT}/${files.client}` : `${SUB_DOMAINS.CLIENT}.${domain}`;
const descURL = `${SUB_DOMAINS.DESC}.${domain}`;
const portalURL = `${SUB_DOMAINS.PORTAL}.${domain}`;
const assetsURL = `${SUB_DOMAINS.ASSETS}.${domain}`;
const autoURL = `${SUB_DOMAINS.AUTO}.${domain}`;
const extURL = `${SUB_DOMAINS.EXT}.${domain}`;
const ownURL = `${SUB_DOMAINS.OWN}.${domain}`;
const newsURL = `${SUB_DOMAINS.NEWS}.${domain}`;
const bannerURL = `${SUB_DOMAINS.BANNER}.${domain}`;
const transactionURL = `${SUB_DOMAINS.TRANSACTION}.${domain}`;
const assetsImgPath = `${assetsURL}/img/`;
const assetsIconPath = `${assetsURL}/icon/`;
const assetsJsPath = `${assetsURL}/js/`;
const sessionURL = `${SUB_DOMAINS.SESSION}.${domain}`;
const description = 'talkn can share comments with users watching the same WEB page. Please enjoy the world of talkn.';
const lpLanguages = [
  'en',
  'zh',
  'ja',
  'de',
  'fr',
  'hi',
  'pt',
  'it',
  'ru',
  'ko',
  'es',
  'id',
  'tr',
  'nl',
  'ar',
  'zh-TW',
  'pl',
  'sv',
  'th',
  'fa',
  'nn',
  'ga',
  'he',
  'mr',
];

const findOneThreadActiveHour = 1;
const findOnePostCnt = 30;
const findOneLimitCnt = 300;
const ogpImages = {
  Html: `//${assetsImgPath}talkn_logo_html.png`,
  Music: `//${assetsImgPath}talkn_logo_music.png`,
  Video: `//${assetsImgPath}talkn_logo_video.png`,
};
const defaultFavicon = `//${SUB_DOMAINS.ASSETS}.${domain}/favicon.ico`;

const conf: any = {
  domain,
  env,
  files,
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
  ownURL,
  newsURL,
  bannerURL,
  transactionURL,
  assetsImgPath,
  assetsIconPath,
  assetsJsPath,
  sessionURL,
  description,
  apiVer,
  lpLanguages,
  findOneThreadActiveHour,
  findOnePostCnt,
  findOneLimitCnt,
  ogpImages,
  defaultFavicon,
};
export default { ...conf };

// TODO: Move to server conf( not use from client ).
function getEnv(hostName) {
  // from client.
  if (process.title === 'browser') {
    if (location.href.indexOf(define.DEVELOPMENT_DOMAIN) >= 0) {
      const port = Number(location.port);
      return port === define.PORTS.DEVELOPMENT_CLIENT ||
        port === define.PORTS.DEVELOPMENT_API ||
        port === define.PORTS.DEVELOPMENT_TOP ||
        port === define.PORTS.DEVELOPMENT_RANK
        ? define.DEVELOPMENT
        : define.LOCALHOST;
    }
    return define.PRODUCTION;
    // from server.
  } else {
    return hostName.indexOf(define.AWS_HOST_KEY) >= 0 ? define.PRODUCTION : define.DEVELOPMENT;
  }
}
