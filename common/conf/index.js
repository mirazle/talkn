import os from 'os';
const PRODUCTION = 'production';
const DEVELOPMENT = 'development';
const PRODUCTION_IP = 'ip-172-31-27-3';
const PRODUCTION_DOMAIN = 'talkn.io';

const hostName = os.hostname();
const env = hostName === PRODUCTION_IP || hostName.indexOf( PRODUCTION_DOMAIN ) >= 0 ? PRODUCTION : DEVELOPMENT ;
const domain = env === PRODUCTION ? 'talkn.io' : 'localhost' ;

const proxySllKeyPem = env === PRODUCTION ? '/etc/letsencrypt/live/talkn.io-0001/privkey.pem' :  '/Users/hmiyazaki/talkn/server/conf/*.localhost.key';
const proxySllCertPem = env === PRODUCTION ? '/etc/letsencrypt/live/talkn.io-0001/cert.pem' :  '/Users/hmiyazaki/talkn/server/conf/*.localhost.crt';
const proxySllPems = {key:  proxySllKeyPem , cert:proxySllCertPem };

const clientSllKeyPem = env === PRODUCTION ? '/etc/letsencrypt/live/client.talkn.io/privkey.pem' :  '/Users/hmiyazaki/talkn/server/conf/*.localhost.key';
const clientSllCertPem = env === PRODUCTION ? '/etc/letsencrypt/live/client.talkn.io/cert.pem' :  '/Users/hmiyazaki/talkn/server/conf/*.localhost.crt';
const clientSllPems = {key:  clientSllKeyPem , cert:clientSllCertPem };

const sllKeyPem = env === PRODUCTION ? '/etc/letsencrypt/live/talkn.io/privkey.pem' :  '/Users/hmiyazaki/talkn/server/conf/localhost.key';
const sllCertPem = env === PRODUCTION ? '/etc/letsencrypt/live/talkn.io/cert.pem' :  '/Users/hmiyazaki/talkn/server/conf/*.localhost.crt';
const sllPems = {key: sllKeyPem , cert: sllCertPem} ;

const clientSrcPath = env === PRODUCTION ? '//client.talkn.io' : `//${domain}:8001` ;
const clientPath = env === PRODUCTION ? '/usr/share/app/talkn/server/endpoints/client/talkn.client.js' : '/Users/hmiyazaki/talkn/server/endpoints/client/talkn.client.js' ;
const assetsPath = env === PRODUCTION ? '/usr/share/app/talkn/server/endpoints/assets/' : '/Users/hmiyazaki/talkn/server/endpoints/assets/' ;

export default {
  domain,
  env,
  clientPath,
  clientSrcPath,
  assetsPath,
  sllOptions:{ pems: sllPems, port: 443 },
  proxySllOptions:{ pems: proxySllPems, port: 443 },
  clientSllOptions:{ pems: clientSllPems, port: 443 },
  user: {},
  client: {sync_time: 500, stream_sync_term: 12,stream_sync_term_cnt: 12},
  ssl: { key: '/etc/letsencrypt/live/discovery-plus.com/cert.pem', cert: '/etc/letsencrypt/live/discovery-plus.com/privkey.pem' },
  socket_io: { host: 'localhost', http_port: 10001, https_port: 10443 },
  redis: { host: 'localhost', port: 6379 },
  mongoDB: { host: 'localhost', port: 27017, dbName: 'talkn', option: { server: { auto_reconnect: true } } },
  localMap:{ jp: 'ja', cn: 'zh', de: 'de', fr: 'fr', gb: 'gb', br: 'br', us: 'en'}
}
