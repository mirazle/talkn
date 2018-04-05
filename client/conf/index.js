import conf from '../../common/conf';

conf.protcol = location.href.indexOf( 'https' ) === 0 ? 'https' : 'http' ;
conf.server = conf.env === 'development' ? 'localhost' : 'client.talkn.io' ;
conf.port = conf.protcol === 'https' ? 10443 : 10001;
conf.scriptName = '//client.talkn.io' ;

if( conf.env === 'development' ){
	switch( location.port ){
	case '8000': conf.scriptName = '//localhost:8001'; break;
	case '8080': conf.scriptName = 'talkn.client.js'; break;
	}
}
export default conf;
