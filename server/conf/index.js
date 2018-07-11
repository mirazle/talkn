import define from '../../common/define';
import conf from '../../common/conf';
import fs from 'fs';

const { PRODUCTION } = define;
const { env, domain } = conf;
const localhostPemKey = '/Users/hmiyazaki/talkn/common/pems/localhost.key';
const localhostPemCrt = '/Users/hmiyazaki/talkn/common/pems/localhost.crt';
const productPemKey = '/etc/letsencrypt/live/talkn.io-0001/privkey.pem';
const productPemCrt = '/etc/letsencrypt/live/talkn.io-0001/cert.pem';
const proxySllKeyPem = env === PRODUCTION ? productPemKey :  localhostPemKey;
const proxySllCertPem = env === PRODUCTION ? productPemCrt:  localhostPemCrt;

const sllKeyPem = env === PRODUCTION ? productPemKey :  localhostPemKey;
const sllCertPem = env === PRODUCTION ? productPemCrt :  localhostPemCrt;
const assetsExpressKeyPem = env === PRODUCTION ? productPemKey :  localhostPemKey;
const assetsExpressCertPem = env === PRODUCTION ? productPemCrt :  localhostPemCrt;
const clientSllKeyPem = env === PRODUCTION ? productPemKey :  localhostPemKey;
const clientSllCertPem = env === PRODUCTION ? productPemCrt :  localhostPemCrt;

conf.socketIO = { host: 'localhost', httpPort: 10001, httpsPort: 10443 };
conf.redis = { host: 'localhost', port: 6379 };
conf.mongoDB = { host: 'localhost', port: 27017, dbName: 'talkn', option: { server: { auto_reconnect: true } } };
conf.clientSrcPath = env === PRODUCTION ? '//client.talkn.io' : `//${domain}:8001` ;
conf.serverClientPath = env === PRODUCTION ? '/usr/share/app/talkn/server/endpoints/client/talkn.client.js' : '/Users/hmiyazaki/talkn/server/endpoints/client/talkn.client.js' ;
conf.serverAssetsPath = env === PRODUCTION ? '/usr/share/app/talkn/server/endpoints/assets/' : '/Users/hmiyazaki/talkn/server/endpoints/assets/' ;


conf.sllSubdomainOptions = {pems: {key: fs.readFileSync( sllKeyPem ), cert: fs.readFileSync( sllCertPem ) }, port: 443 };
conf.sllPortalOptions = {pems: {key: fs.readFileSync( sllKeyPem ), cert: fs.readFileSync( sllCertPem ) }, port: 443 };

conf.proxySllOptions = {pems: {key: fs.readFileSync( proxySllKeyPem ), cert: fs.readFileSync( proxySllCertPem ) }, port: 8000 };
conf.sllOptions = {pems: {key: fs.readFileSync( sllKeyPem ), cert: fs.readFileSync( sllCertPem ) }, port: 443 };
conf.assetsExpressOprions = {pems: {key: fs.readFileSync( assetsExpressKeyPem ), cert: fs.readFileSync( assetsExpressCertPem ) } };
conf.clientSllOptions = {pems: {key: fs.readFileSync( clientSllKeyPem ), cert: fs.readFileSync( clientSllCertPem ) }, port: 443 };

export default conf;
