import define from './define';
import os from 'os';
const { PRODUCTION, DEVELOPMENT, PRODUCTION_IP, PRODUCTION_DOMAIN, DEVELOPMENT_DOMAIN, SUB_DOMAINS } = define;
const hostName = os.hostname();
const env = hostName === PRODUCTION_IP || hostName.indexOf( PRODUCTION_DOMAIN ) >= 0 ? PRODUCTION : DEVELOPMENT ;
const domain = env === PRODUCTION ? PRODUCTION_DOMAIN : DEVELOPMENT_DOMAIN ;
const wwwURL = `${SUB_DOMAINS.WWW}.${domain}` ;
const descURL = `${SUB_DOMAINS.DESC}.${domain}` ;
const portalURL = `${SUB_DOMAINS.PORTAL}.${domain}` ;
const clientURL = `${SUB_DOMAINS.CLIENT}.${domain}` ;
const assetsURL = `${SUB_DOMAINS.ASSETS}.${domain}` ;
const autoURL = `${SUB_DOMAINS.AUTO}.${domain}` ;
const extURL = `${SUB_DOMAINS.EXT}.${domain}` ;
const assetsImgPath = `${assetsURL}/img/` ;
const assetsIconPath = `${assetsURL}/icon/` ;
const sessionURL = `${SUB_DOMAINS.SESSION}.${domain}` ;
const description = "talkn can share comments with users watching the same WEB page. Please enjoy the world of talkn.";

export default {
  domain,
  env,
  wwwURL,
  descURL,
  portalURL,
  clientURL,
  assetsURL,
  autoURL,
  extURL,
  assetsImgPath,
  assetsIconPath,
  sessionURL,
  description,
}
