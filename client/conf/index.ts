import define from "common/define";
import conf from "common/conf";

const { SUB_DOMAINS, DEVELOPMENT } = define;
const { domain } = conf;
const existLocation = typeof location === "object" ? true : false;
conf.mediaSecondInterval = 200;
conf.screenMode = {
  small: 600,
  middle: 960,
};
console.log(conf.env);
conf.protcol = existLocation ? (location.href.indexOf("https") === 0 ? "https" : "http") : "";
conf.server = domain;
conf.portalPath =
  conf.env === DEVELOPMENT ? `//${SUB_DOMAINS.PORTAL}.${domain}/` : `//${SUB_DOMAINS.PORTAL}.${domain}/`;
conf.clientPath = `//${SUB_DOMAINS.CLIENT}.${domain}/`;
conf.assetsPath = `//${SUB_DOMAINS.ASSETS}.${domain}/`;
conf.sessionPath = `//${SUB_DOMAINS.SESSION}.${domain}/`;
conf.cacheKey = { index: "talknIndexList", setting: "talknSettingParams" };

export default conf;
