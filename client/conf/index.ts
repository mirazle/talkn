import process from "process";
import Sequence from "api/Sequence";
import define from "common/define";
import conf from "common/conf";

if (process.title === "browser") {
  const { SUB_DOMAINS, DEVELOPMENT } = define;
  conf.domain =
    location.href.indexOf(`${Sequence.HTTPS_PROTOCOL}//${define.DEVELOPMENT_DOMAIN}`) === 0
      ? define.DEVELOPMENT_DOMAIN
      : define.PRODUCTION_DOMAIN;
  const existLocation = typeof location === "object" ? true : false;
  conf.mediaSecondInterval = 200;
  conf.screenMode = {
    small: 600,
    middle: 960,
  };
  conf.protcol = existLocation ? (location.href.indexOf("https") === 0 ? "https" : "http") : "";
  conf.portalPath =
    conf.env === DEVELOPMENT ? `//${SUB_DOMAINS.PORTAL}.${conf.domain}/` : `//${SUB_DOMAINS.PORTAL}.${conf.domain}/`;
  conf.clientPath = `//${SUB_DOMAINS.CLIENT}.${conf.domain}/`;
  conf.assetsPath = `//${SUB_DOMAINS.ASSETS}.${conf.domain}/`;
  conf.sessionPath = `//${SUB_DOMAINS.SESSION}.${conf.domain}/`;
  conf.cacheKey = { index: "talknIndexList", setting: "talknSettingParams" };
  conf.assetsIconPath = `${SUB_DOMAINS.ASSETS}.${conf.domain}/icon/`;
}

export default conf;
