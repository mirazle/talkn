import define from '../../common/define';
import conf from '../../common/conf';

const { PRODUCTION, DEVELOPMENT, PRODUCTION_DOMAIN, DEVELOPMENT_DOMAIN, PORTS, SUB_DOMAINS } = define;
const { env, domain } = conf;
const existLocation = typeof location === 'object' ? true : false ;

conf.protcol = existLocation ? ( location.href.indexOf( 'https' ) === 0 ? 'https' : 'http' ) : '' ;
conf.server = domain;
conf.portalPath = `//${SUB_DOMAINS.PORTAL}.${domain}/` ;
conf.clientPath = `//${SUB_DOMAINS.CLIENT}.${domain}/` ;
conf.assetsPath = `//${SUB_DOMAINS.ASSETS}.${domain}/` ;
conf.sessionPath = `//${SUB_DOMAINS.SESSION}.${domain}/` ;
conf.cacheKey = {index: "talknIndexList", setting: "talknSettingParams"};

export default conf;
