import define from './define';
import os from 'os';
const { PRODUCTION, DEVELOPMENT, PRODUCTION_IP, PRODUCTION_DOMAIN, DEVELOPMENT_DOMAIN, SUB_DOMAINS } = define;
const hostName = os.hostname();
const env = hostName === PRODUCTION_IP || hostName.indexOf( PRODUCTION_DOMAIN ) >= 0 ? PRODUCTION : DEVELOPMENT ;
const domain = env === PRODUCTION ? PRODUCTION_DOMAIN : DEVELOPMENT_DOMAIN ;
const portalURL = `${SUB_DOMAINS.PORTAL}.${domain}` ;
const clientURL = `${SUB_DOMAINS.CLIENT}.${domain}` ;
const assetsURL = `${SUB_DOMAINS.ASSETS}.${domain}` ;
const sessionURL = `${SUB_DOMAINS.SESSION}.${domain}` ;

export default {
  domain,
  env,
  portalURL,
  clientURL,
  assetsURL,
  sessionURL,
}
