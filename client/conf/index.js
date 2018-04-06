import define from '../../common/define';
import conf from '../../common/conf';

const { PRODUCTION, DEVELOPMENT, PRODUCTION_DOMAIN, DEVELOPMENT_DOMAIN, PORTS, SUB_DOMAINS } = define;
const { env, domain } = conf;

conf.protcol = location.href.indexOf( 'https' ) === 0 ? 'https' : 'http' ;
conf.server = conf.env === DEVELOPMENT ? DEVELOPMENT_DOMAIN : `${SUB_DOMAINS.CLIENT}${domain}` ;
conf.port = conf.protcol === 'https' ? PORTS.SOCKET_IO.https : PORTS.SOCKET_IO.http;
conf.sessionPath = env === PRODUCTION ? `//${SUB_DOMAINS.SESSION}${domain}` : `//${domain}:${PORTS.SESSION}` ;
conf.scriptName = `//${SUB_DOMAINS.CLIENT}${PRODUCTION_DOMAIN}` ;

if( conf.env === DEVELOPMENT ){
	switch( Number( location.port ) ){
	case PORTS.PORTAL: conf.scriptName = `//${DEVELOPMENT_DOMAIN}:${PORTS.CLIENT}`; break;
	case PORTS.DEVELOPMENT: conf.scriptName = 'talkn.client.js'; break;
	}
}

export default conf;
