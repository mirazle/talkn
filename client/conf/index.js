import define from '../../common/define';
import conf from '../../common/conf';

const { PRODUCTION, DEVELOPMENT, PRODUCTION_DOMAIN, DEVELOPMENT_DOMAIN, PORTS, SUB_DOMAINS } = define;
const { env, domain } = conf;

conf.protcol = location.href.indexOf( 'https' ) === 0 ? 'https' : 'http' ;
conf.server = conf.env === DEVELOPMENT ? DEVELOPMENT_DOMAIN : `${SUB_DOMAINS.CLIENT}${domain}` ;
conf.port = conf.protcol === 'https' ? PORTS.SOCKET_IO.https : PORTS.SOCKET_IO.http;
conf.portalPath = env === PRODUCTION ? `//${SUB_DOMAINS.PORTAL}${domain}/` : `//${domain}:${PORTS.PORTAL}/` ;
conf.clientPath = env === PRODUCTION ? `//${SUB_DOMAINS.CLIENT}${domain}/` : `//${domain}:${PORTS.CLIENT}/` ;
conf.assetsPath = env === PRODUCTION ? `//${SUB_DOMAINS.ASSETS}${domain}/` : `//${domain}:${PORTS.ASSETS}/` ;
conf.assetsImgPath = env === PRODUCTION ? `//${SUB_DOMAINS.ASSETS}${domain}/img/` : `//${domain}:${PORTS.ASSETS}/img/` ;
conf.assetsIconPath = env === PRODUCTION ? `//${SUB_DOMAINS.ASSETS}${domain}/icon/` : `//${domain}:${PORTS.ASSETS}/icon/` ;
conf.sessionPath = env === PRODUCTION ? `//${SUB_DOMAINS.SESSION}${domain}/` : `//${domain}:${PORTS.SESSION}/` ;
conf.scriptName = `//${SUB_DOMAINS.CLIENT}${PRODUCTION_DOMAIN}` ;
conf.cacheKey = {index: "talknIndexList", setting: "talknSettingParams"};

if( conf.env === DEVELOPMENT ){
	switch( Number( location.port ) ){
	case PORTS.PORTAL: conf.scriptName = `//${DEVELOPMENT_DOMAIN}:${PORTS.CLIENT}`; break;
	case PORTS.DEVELOPMENT: conf.scriptName = 'talkn.client.js'; break;
	}
}

export default conf;
