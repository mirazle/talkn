import define from '../../common/define';
import conf from '../../common/conf';

const { PRODUCTION, DEVELOPMENT, DEVELOPMENT_DOMAIN } = define;
const { env, domain } = conf;

conf.protcol = location.href.indexOf( 'https' ) === 0 ? 'https' : 'http' ;
conf.server = conf.env === DEVELOPMENT ? DEVELOPMENT_DOMAIN : 'client.talkn.io' ;
conf.port = conf.protcol === 'https' ? 10443 : 10001;
conf.scriptName = '//client.talkn.io' ;
conf.sessionPath = env === PRODUCTION ? `//assets.${domain}` : `//${domain}:8003` ;

if( conf.env === DEVELOPMENT ){
	switch( location.port ){
	case '8000': conf.scriptName = '//localhost:8001'; break;
	case '8080': conf.scriptName = 'talkn.client.js'; break;
	}
}
export default conf;
