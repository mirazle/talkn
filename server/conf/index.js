import define from '../../common/define';
import conf from '../../common/conf';
import fs from 'fs';

const { PRODUCTION } = define;
const { env, domain } = conf;
const proxySllKeyPem = env === PRODUCTION ? '/etc/letsencrypt/live/talkn.io-0001/privkey.pem' :  '/Users/hmiyazaki/talkn/server/conf/*.localhost.key';
const proxySllCertPem = env === PRODUCTION ? '/etc/letsencrypt/live/talkn.io-0001/cert.pem' :  '/Users/hmiyazaki/talkn/server/conf/*.localhost.crt';
const sllKeyPem = env === PRODUCTION ? '/etc/letsencrypt/live/talkn.io/privkey.pem' :  '/Users/hmiyazaki/talkn/server/conf/localhost.key';
const sllCertPem = env === PRODUCTION ? '/etc/letsencrypt/live/talkn.io/cert.pem' :  '/Users/hmiyazaki/talkn/server/conf/*.localhost.crt';
const clientSllKeyPem = env === PRODUCTION ? '/etc/letsencrypt/live/client.talkn.io/privkey.pem' :  '/Users/hmiyazaki/talkn/server/conf/*.localhost.key';
const clientSllCertPem = env === PRODUCTION ? '/etc/letsencrypt/live/client.talkn.io/cert.pem' :  '/Users/hmiyazaki/talkn/server/conf/*.localhost.crt';

conf.socketIO = { host: 'localhost', httpPort: 10001, httpsPort: 10443 };
conf.redis = { host: 'localhost', port: 6379 };
conf.mongoDB = { host: 'localhost', port: 27017, dbName: 'talkn', option: { server: { auto_reconnect: true } } };

conf.clientSrcPath = env === PRODUCTION ? '//client.talkn.io' : `//${domain}:8001` ;
conf.clientPath = env === PRODUCTION ? '/usr/share/app/talkn/server/endpoints/client/talkn.client.js' : '/Users/hmiyazaki/talkn/server/endpoints/client/talkn.client.js' ;
conf.assetsPath = env === PRODUCTION ? '/usr/share/app/talkn/server/endpoints/assets/' : '/Users/hmiyazaki/talkn/server/endpoints/assets/' ;
conf.proxySllOptions = {pems: {key: fs.readFileSync( proxySllKeyPem ), cert: fs.readFileSync( proxySllCertPem ) }, httpsPort: 443, httpPort: 80 };
conf.sllOptions = {pems: {key: fs.readFileSync( sllKeyPem ), cert: fs.readFileSync( sllCertPem ) }, port: 443 };
conf.clientSllOptions = {pems: {key: fs.readFileSync( clientSllKeyPem ), cert: fs.readFileSync( clientSllCertPem ) }, port: 443 };

export default conf;
