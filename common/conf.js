import define from './define';
import os from 'os';
const { PRODUCTION, DEVELOPMENT, PRODUCTION_IP, PRODUCTION_DOMAIN, DEVELOPMENT_DOMAIN } = define;
const hostName = os.hostname();
const env = hostName === PRODUCTION_IP || hostName.indexOf( PRODUCTION_DOMAIN ) >= 0 ? PRODUCTION : DEVELOPMENT ;
const domain = env === PRODUCTION ? PRODUCTION_DOMAIN : DEVELOPMENT_DOMAIN ;

export default {
  domain,
  env,
}
